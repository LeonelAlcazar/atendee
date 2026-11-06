import { afterEach, describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import matter from 'gray-matter';
import { load } from 'cheerio';
import {
  latestUpdate,
  loadPosts,
  loadPostsForRuntime,
  parsePost,
  renderMarkdown,
} from './blog-content';
import { createBlogFeed } from './blog-feed';
import { postGraph, postMetadata } from './blog-seo';

// Self-contained on purpose: real guides change, and these rules must not.
const frontmatter = {
  title: 'Guía de prueba para automatizar WhatsApp',
  seoTitle: 'Guía de prueba para WhatsApp',
  description:
    'Una descripción de prueba con el largo suficiente para pasar la validación del catálogo.',
  summary:
    'Un resumen de prueba con el largo suficiente para pasar la validación del catálogo de guías.',
  publishedAt: '2026-09-10',
  updatedAt: '2026-09-10',
  category: 'automotor',
  tags: ['WhatsApp', 'prueba'],
  related: ['alpha', 'beta'],
  faq: [
    {
      q: '¿Qué pregunta de prueba es esta?',
      a: 'Una respuesta de prueba con el largo mínimo que pide el esquema.',
    },
    {
      q: '¿Qué otra pregunta de prueba es esta?',
      a: 'Otra respuesta de prueba con el largo mínimo que pide el esquema.',
    },
  ],
};
const body = ['Primera', 'Segunda', 'Tercera']
  .map((name) => `## ${name}\n\n${'palabra '.repeat(110)}`)
  .join('\n\n');
const temp: string[] = [];
afterEach(() =>
  temp
    .splice(0)
    .forEach((dir) => rmSync(dir, { recursive: true, force: true })),
);
function fixture(overrides: Record<string, unknown> = {}) {
  return matter.stringify(body, { ...frontmatter, ...overrides });
}
const example = fixture();
function tempBlog() {
  const dir = mkdtempSync(join(tmpdir(), 'atende-blog-'));
  temp.push(dir);
  for (const slug of ['alpha', 'beta', 'gamma'])
    writeFileSync(
      join(dir, `${slug}.md`),
      fixture({
        related: ['alpha', 'beta', 'gamma'].filter((other) => other !== slug),
      }),
    );
  return dir;
}

describe('Markdown publication boundary', () => {
  it('renders readable tables, links, lists and stable distinct heading anchors', () => {
    const { html, headings } = renderMarkdown(
      '## ¿Cómo empezar?\n\nUna **respuesta** y [guía](/blog).\n\n## ¿Cómo empezar?\n\n- Paso uno\n- Paso dos\n\n| Dato | Uso |\n| --- | --- |\n| Modelo | Consulta |',
    );
    const $ = load(html);
    expect(headings.map((item) => item.id)).toEqual([
      'seccion-como-empezar',
      'seccion-como-empezar-2',
    ]);
    expect($('strong').text()).toBe('respuesta');
    expect($('a').attr('href')).toBe('/blog');
    expect($('li')).toHaveLength(2);
    expect(renderMarkdown('## Atende & WhatsApp').headings[0].text).toBe(
      'Atende & WhatsApp',
    );
    expect($('.blog-table[tabindex="0"] table tbody td')).toHaveLength(2);
  });
  it('removes scripts, raw HTML, event handlers and unsafe URLs', () => {
    const { html } = renderMarkdown(
      '## Prueba\n\n<script>alert(1)</script>\n\n<iframe src="https://example.com"></iframe>\n\n[click](javascript:alert%281%29) ![x](x "onerror=alert(1)")\n\n<img src=x onerror=alert(1)>',
    );
    const $ = load(html);
    expect($('script, iframe, img, [onclick], [onerror]')).toHaveLength(0);
    expect($('a[href^="javascript:"]')).toHaveLength(0);
    expect(html).not.toContain('alert(1)');
  });
  it('rejects invalid metadata, impossible dates, H1s and traversal filenames', () => {
    expect(() =>
      parsePost(fixture({ publishedAt: '2026-02-30' }), 'example.md'),
    ).toThrow();
    expect(() =>
      parsePost(fixture({ updatedAt: '2026-09-01' }), 'example.md'),
    ).toThrow();
    expect(() =>
      parsePost(fixture({ category: 'missing' }), 'example.md'),
    ).toThrow();
    expect(() =>
      parsePost(fixture({ draft: 'false' }), 'example.md'),
    ).toThrow();
    expect(() => parsePost(example, '../secret.md')).toThrow();
    expect(() =>
      parsePost('---js\nprocess.exit()\n---\ntext', 'example.md'),
    ).toThrow();
    expect(() => renderMarkdown('# Another H1')).toThrow();
  });
  it('excludes drafts and scheduled posts from listing and RSS, rejecting dangling published relations', () => {
    const dir = tempBlog();
    writeFileSync(join(dir, 'draft.md'), fixture({ draft: true }));
    writeFileSync(
      join(dir, 'future.md'),
      fixture({ publishedAt: '2027-01-01', updatedAt: '2027-01-01' }),
    );
    const posts = loadPosts(dir, new Date('2026-09-10T12:00:00Z'));
    expect(posts.map((post) => post.slug)).toEqual(['alpha', 'beta', 'gamma']);
    expect(createBlogFeed(posts)).not.toContain('/future');
    expect(createBlogFeed(posts)).not.toContain('/draft');
    writeFileSync(
      join(dir, 'alpha.md'),
      fixture({ related: ['beta', 'draft'] }),
    );
    expect(() => loadPosts(dir, new Date('2026-09-10T12:00:00Z'))).toThrow(
      /related/,
    );
  });
  it('publishes a scheduled post on its date from the same files, so ISR needs no rebuild', () => {
    const dir = tempBlog();
    writeFileSync(
      join(dir, 'scheduled.md'),
      fixture({ publishedAt: '2026-10-01', updatedAt: '2026-10-01' }),
    );
    writeFileSync(join(dir, 'draft.md'), fixture({ draft: true }));
    const slugs = (now: string) =>
      loadPosts(dir, new Date(now)).map((post) => post.slug);
    expect(slugs('2026-09-30T12:00:00Z')).not.toContain('scheduled');
    expect(slugs('2026-10-01T12:00:00Z')).toContain('scheduled');
    expect(slugs('2026-09-30T12:00:00Z')).not.toContain('scheduled');
    expect(slugs('2030-01-01T12:00:00Z')).not.toContain('draft');
  });
  it('schedules on the Argentine calendar, matching the -03:00 published in schema', () => {
    const dir = tempBlog();
    writeFileSync(
      join(dir, 'scheduled.md'),
      fixture({ publishedAt: '2026-10-01', updatedAt: '2026-10-01' }),
    );
    const slugs = (now: string) =>
      loadPosts(dir, new Date(now)).map((post) => post.slug);
    // 23:59 on the 30th in Córdoba is already the 1st in UTC.
    expect(slugs('2026-10-01T02:59:00Z')).not.toContain('scheduled');
    expect(slugs('2026-10-01T03:00:00Z')).toContain('scheduled');
  });
  describe('at runtime, one bad post costs only itself', () => {
    const now = new Date('2026-09-10T12:00:00Z');
    const load = (dir: string, at = now) => {
      const problems: string[] = [];
      const posts = loadPostsForRuntime(dir, at, (message) =>
        problems.push(message),
      );
      return { posts, problems };
    };
    it('drops a related link to a missing post and reports it, where the strict loader throws', () => {
      const dir = tempBlog();
      writeFileSync(
        join(dir, 'alpha.md'),
        fixture({ related: ['beta', 'does-not-exist'] }),
      );
      expect(() => loadPosts(dir, now)).toThrow(/related/);
      const { posts, problems } = load(dir);
      expect(posts.map((post) => post.slug)).toEqual([
        'alpha',
        'beta',
        'gamma',
      ]);
      expect(posts[0].related).toEqual(['beta']);
      expect(problems).toEqual([
        'alpha: related links must name distinct published posts',
      ]);
    });
    it('survives the date a scheduled post with a bad relation goes live', () => {
      const dir = tempBlog();
      writeFileSync(
        join(dir, 'scheduled.md'),
        fixture({
          publishedAt: '2026-10-01',
          updatedAt: '2026-10-01',
          related: ['alpha', 'draft'],
        }),
      );
      writeFileSync(join(dir, 'draft.md'), fixture({ draft: true }));
      const launch = new Date('2026-10-01T12:00:00Z');
      expect(loadPosts(dir, now)).toHaveLength(3);
      expect(() => loadPosts(dir, launch)).toThrow(/related/);
      const { posts } = load(dir, launch);
      expect(posts.find((post) => post.slug === 'scheduled')?.related).toEqual([
        'alpha',
      ]);
    });
    it('skips an invalid file and keeps the rest', () => {
      const dir = tempBlog();
      writeFileSync(join(dir, 'broken.md'), 'no frontmatter');
      expect(() => loadPosts(dir, now)).toThrow(/frontmatter/);
      const { posts, problems } = load(dir);
      expect(posts).toHaveLength(3);
      expect(problems[0]).toMatch(/^Skipped broken\.md/);
    });
    it('never publishes a future modified date', () => {
      const dir = tempBlog();
      writeFileSync(join(dir, 'alpha.md'), fixture({ updatedAt: '2026-12-01' }));
      expect(() => loadPosts(dir, now)).toThrow(/future review date/);
      const { posts } = load(dir);
      expect(posts[0].updatedAt).toBe('2026-09-10');
    });
    it('still fails on a missing folder, so ISR keeps the last good page', () => {
      expect(() => load(join(tmpdir(), 'atende-no-such-folder'))).toThrow();
    });
  });
  it('finds the latest editorial date, and none for an empty list', () => {
    expect(
      latestUpdate([
        { updatedAt: '2026-09-10' },
        { updatedAt: '2026-11-06' },
        { updatedAt: '2026-10-01' },
      ]),
    ).toBe('2026-11-06');
    expect(latestUpdate([])).toBeUndefined();
  });
  it('keeps article schema, social metadata and RSS aligned with the Markdown source', () => {
    const post = parsePost(example, 'example.md');
    const graph = postGraph(post)['@graph'];
    const article = graph.find((node) => node['@type'] === 'BlogPosting');
    expect(article).toMatchObject({
      headline: post.title,
      abstract: post.summary,
      datePublished: '2026-09-10T09:00:00-03:00',
      dateModified: '2026-09-10T09:00:00-03:00',
      wordCount: post.wordCount,
    });
    expect(
      graph.find((node) => node['@type'] === 'WebPage'),
    ).toMatchObject({ dateModified: '2026-09-10T09:00:00-03:00' });
    expect(postMetadata(post).openGraph).toMatchObject({
      type: 'article',
      publishedTime: '2026-09-10T09:00:00-03:00',
      modifiedTime: '2026-09-10T09:00:00-03:00',
    });
    const feed = load(
      createBlogFeed([{ ...post, title: 'Atende & WhatsApp <guía>' }]),
      { xml: true },
    );
    expect(feed('item title').text()).toBe('Atende & WhatsApp <guía>');
    expect(feed('item pubDate').text()).toBe('Thu, 10 Sep 2026 12:00:00 GMT');
  });
});

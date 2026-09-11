import { afterEach, describe, expect, it } from 'vitest';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import matter from 'gray-matter';
import { load } from 'cheerio';
import { loadPosts, parsePost, renderMarkdown } from './blog-content';
import { createBlogFeed } from './blog-feed';
import { postGraph, postMetadata } from './blog-seo';

const example = readFileSync(
  join(
    process.cwd(),
    'content/blog/como-automatizar-whatsapp-concesionaria.md',
  ),
  'utf8',
);
const temp: string[] = [];
afterEach(() =>
  temp
    .splice(0)
    .forEach((dir) => rmSync(dir, { recursive: true, force: true })),
);
function fixture(overrides: Record<string, unknown> = {}) {
  const { data, content } = matter(example);
  return matter.stringify(content, { ...data, ...overrides });
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
    const dir = mkdtempSync(join(tmpdir(), 'atende-blog-'));
    temp.push(dir);
    for (const slug of ['alpha', 'beta', 'gamma'])
      writeFileSync(
        join(dir, `${slug}.md`),
        fixture({
          related: ['alpha', 'beta', 'gamma'].filter((other) => other !== slug),
        }),
      );
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
  it('keeps article schema, social metadata and RSS aligned with the Markdown source', () => {
    const post = parsePost(example, 'example.md');
    const graph = postGraph(post)['@graph'];
    const article = graph.find((node) => node['@type'] === 'BlogPosting');
    expect(article).toMatchObject({
      headline: post.title,
      abstract: post.summary,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      wordCount: post.wordCount,
    });
    expect(postMetadata(post).openGraph).toMatchObject({
      type: 'article',
      publishedTime: post.publishedAt,
    });
    const feed = load(
      createBlogFeed([{ ...post, title: 'Atende & WhatsApp <guía>' }]),
      { xml: true },
    );
    expect(feed('item title').text()).toBe('Atende & WhatsApp <guía>');
  });
});

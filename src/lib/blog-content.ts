import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked, Renderer } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { decodeHTML } from 'entities';
import { z } from 'zod';
import { blogTopics } from '../content/blog-topics';

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slug = z.string().regex(slugPattern);
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const parsed = new Date(value);
    return (
      !Number.isNaN(parsed.getTime()) &&
      parsed.toISOString().slice(0, 10) === value
    );
  }, 'Invalid calendar date');
const schema = z
  .object({
    title: z.string().min(15).max(115),
    seoTitle: z.string().min(15).max(68),
    description: z.string().min(70).max(180),
    summary: z.string().min(80).max(600),
    publishedAt: date,
    updatedAt: date,
    category: z.enum(blogTopics.map((topic) => topic.slug)),
    sector: z.string().min(3).optional(),
    tags: z.array(z.string().min(2)).min(2).max(6),
    related: z.array(slug).min(2).max(4),
    draft: z.boolean().default(false),
    faq: z
      .array(
        z.object({ q: z.string().min(10), a: z.string().min(30) }).strict(),
      )
      .min(2)
      .max(5),
    sources: z
      .array(
        z
          .object({
            title: z.string().min(5),
            url: z.url().refine((url) => url.startsWith('https://')),
            checkedAt: date,
          })
          .strict(),
      )
      .default([]),
  })
  .strict()
  .refine(
    (post) => post.updatedAt >= post.publishedAt,
    'updatedAt must not precede publishedAt',
  );

export type Heading = { id: string; text: string; depth: number };
export type BlogPost = z.infer<typeof schema> & {
  slug: string;
  html: string;
  headings: Heading[];
  wordCount: number;
  readingMinutes: number;
};

export function renderMarkdown(markdown: string) {
  const headings: Heading[] = [];
  const ids = new Set<string>();
  const renderer = new Renderer();
  renderer.html = () => ''; // Markdown only: never execute raw HTML or MDX.
  renderer.heading = function ({ tokens, depth }) {
    if (depth === 1)
      throw new Error('Use H2/H3 in Markdown; the title supplies the only H1');
    const inline = this.parser.parseInline(tokens);
    const plain = decodeHTML(
      sanitizeHtml(inline, { allowedTags: [], allowedAttributes: {} }),
    );
    const base = `seccion-${
      plain
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'tema'
    }`;
    let id = base;
    let index = 2;
    while (ids.has(id)) id = `${base}-${index++}`;
    ids.add(id);
    headings.push({ id, text: plain, depth });
    return `<h${depth} id="${id}">${inline}</h${depth}>`;
  };
  const parser = new Marked({ renderer, gfm: true, async: false });
  const html = sanitizeHtml(parser.parse(markdown) as string, {
    allowedTags: [
      'p',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'a',
      'ul',
      'ol',
      'li',
      'strong',
      'em',
      'del',
      'blockquote',
      'pre',
      'code',
      'hr',
      'br',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
    ],
    allowedAttributes: {
      a: ['href', 'title'],
      h2: ['id'],
      h3: ['id'],
      h4: ['id'],
      h5: ['id'],
      h6: ['id'],
      ol: ['start'],
    },
    allowedSchemes: ['https', 'http', 'mailto'],
    allowProtocolRelative: false,
    transformTags: { table: () => ({ tagName: 'table', attribs: {} }) },
  })
    .replace(
      /<table>/g,
      '<div class="blog-table" role="region" aria-label="Tabla comparativa" tabindex="0"><table>',
    )
    .replace(/<\/table>/g, '</table></div>');
  const text = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return {
    html,
    headings,
    wordCount,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 220)),
  };
}

export function parsePost(raw: string, filename: string): BlogPost {
  const postSlug = filename.replace(/\.md$/, '');
  if (
    !filename.endsWith('.md') ||
    !slugPattern.test(postSlug) ||
    ['editorial', 'tema', 'feed.xml'].includes(postSlug)
  ) {
    throw new Error(`Invalid or reserved Markdown filename: ${filename}`);
  }
  // Disable gray-matter's alternate executable frontmatter engines.
  if (!raw.startsWith('---\n') && !raw.startsWith('---\r\n'))
    throw new Error(`${filename}: YAML frontmatter required`);
  const { data, content } = matter(raw);
  const result = schema.safeParse(data);
  if (!result.success) throw new Error(`${filename}: ${result.error.message}`);
  const rendered = renderMarkdown(content);
  if (
    rendered.headings.filter((heading) => heading.depth === 2).length < 3 ||
    rendered.wordCount < 300
  ) {
    throw new Error(
      `${filename}: published guides need at least three H2 sections and 300 words`,
    );
  }
  if (result.data.category === 'alternativas' && !result.data.sources.length)
    throw new Error(`${filename}: comparisons require sources`);
  return { ...result.data, slug: postSlug, ...rendered };
}

export function loadPosts(
  directory = path.join(process.cwd(), 'content/blog'),
  now = new Date(),
): BlogPost[] {
  const today = now.toISOString().slice(0, 10);
  const posts = readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .map((file) =>
      parsePost(readFileSync(path.join(directory, file), 'utf8'), file),
    );
  const published = posts.filter(
    (post) => !post.draft && post.publishedAt <= today,
  );
  const available = new Set(published.map((post) => post.slug));
  for (const post of published) {
    if (
      post.updatedAt > today ||
      post.sources.some((source) => source.checkedAt > today)
    )
      throw new Error(`${post.slug}: future review date`);
    if (
      new Set(post.related).size !== post.related.length ||
      post.related.some((item) => item === post.slug || !available.has(item))
    ) {
      throw new Error(
        `${post.slug}: related links must name distinct published posts`,
      );
    }
  }
  return published.sort(
    (a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) ||
      a.slug.localeCompare(b.slug),
  );
}

export function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}

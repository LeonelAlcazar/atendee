import { site } from '@/content/site';
import { getBlogTopic } from '@/content/blog-topics';
import type { BlogPost } from './blog-content';
import { toSchemaDate } from './dates';
import { createPageMetadata } from './metadata';
import { organizationId, pageGraph } from './structured-data';

// Repeats on each post so `isPartOf` resolves without the /blog page.
export const blogNode = {
  '@type': 'Blog',
  '@id': `${site.url}/blog#blog`,
  url: `${site.url}/blog`,
  name: 'Blog de Atende',
};

export function postMetadata(post: BlogPost) {
  const path = `/blog/${post.slug}` as const;
  const metadata = createPageMetadata({
    title: post.seoTitle,
    description: post.description,
    path,
  });
  return {
    ...metadata,
    authors: [{ name: 'Equipo Atende', url: `${site.url}/blog/editorial` }],
    alternates: {
      ...metadata.alternates,
      types: { 'application/rss+xml': `${site.url}/blog/feed.xml` },
    },
    openGraph: {
      ...metadata.openGraph,
      type: 'article' as const,
      publishedTime: toSchemaDate(post.publishedAt),
      modifiedTime: toSchemaDate(post.updatedAt),
      authors: [`${site.url}/blog/editorial`],
      section: getBlogTopic(post.category)!.name,
      tags: post.tags,
    },
  };
}
export function postBreadcrumbs(post: BlogPost) {
  const topic = getBlogTopic(post.category)!;
  return [
    { name: 'Inicio', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: topic.name, path: `/blog/tema/${topic.slug}` },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
}
export function postGraph(post: BlogPost) {
  const url = `${site.url}/blog/${post.slug}`;
  return pageGraph({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    updated: post.updatedAt,
    breadcrumbs: postBreadcrumbs(post),
    faq: post.faq,
    extra: [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        url,
        headline: post.title,
        description: post.description,
        abstract: post.summary,
        datePublished: toSchemaDate(post.publishedAt),
        dateModified: toSchemaDate(post.updatedAt),
        // Same values as the Organization node: one @id cannot hold two urls.
        author: {
          '@type': 'Organization',
          '@id': organizationId,
          name: site.name,
          url: site.url,
        },
        publisher: { '@id': organizationId },
        image: [`${site.url}/og.png`],
        inLanguage: 'es-AR',
        articleSection: getBlogTopic(post.category)!.name,
        keywords: post.tags.join(', '),
        wordCount: post.wordCount,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        isPartOf: blogNode,
        ...(post.sources.length
          ? { citation: post.sources.map((source) => source.url) }
          : {}),
      },
    ],
  });
}

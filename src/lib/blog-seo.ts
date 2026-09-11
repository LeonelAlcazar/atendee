import { site } from '@/content/site';
import { getBlogTopic } from '@/content/blog-topics';
import type { BlogPost } from './blog-content';
import { createPageMetadata } from './metadata';
import { organizationId, pageGraph } from './structured-data';

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
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
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
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
          '@type': 'Organization',
          '@id': organizationId,
          name: 'Atende',
          url: `${site.url}/blog/editorial`,
        },
        publisher: { '@id': organizationId },
        image: [`${site.url}/og.png`],
        inLanguage: 'es-AR',
        articleSection: getBlogTopic(post.category)!.name,
        keywords: post.tags.join(', '),
        wordCount: post.wordCount,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        isPartOf: { '@id': `${site.url}/blog#blog` },
        ...(post.sources.length
          ? { citation: post.sources.map((source) => source.url) }
          : {}),
      },
    ],
  });
}

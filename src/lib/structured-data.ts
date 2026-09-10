import { site } from '@/content/site';
import type { FaqItem } from '@/content/faq';

export type Breadcrumb = { name: string; path: string };
export type StructuredNode = Record<string, unknown>;

export const organizationId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;
export const softwareId = `${site.url}/#software`;

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function pageGraph({
  path,
  title,
  description,
  faq = [],
  breadcrumbs = [],
  extra = [],
}: {
  path: string;
  title: string;
  description: string;
  faq?: readonly FaqItem[];
  breadcrumbs?: Breadcrumb[];
  extra?: StructuredNode[];
}) {
  const url = path === '/' ? site.url : new URL(path, site.url).href;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: 'es-AR',
        isPartOf: { '@id': websiteId },
        about: { '@id': softwareId },
        ...(breadcrumbs.length
          ? { breadcrumb: { '@id': `${url}#breadcrumb` } }
          : {}),
        ...(faq.length ? { hasPart: { '@id': `${url}#faq` } } : {}),
      },
      ...(breadcrumbs.length
        ? [
            {
              '@type': 'BreadcrumbList',
              '@id': `${url}#breadcrumb`,
              itemListElement: breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: new URL(item.path, site.url).href,
              })),
            },
          ]
        : []),
      ...(faq.length
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${url}#faq`,
              inLanguage: 'es-AR',
              mainEntity: faq.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            },
          ]
        : []),
      ...extra,
    ],
  };
}

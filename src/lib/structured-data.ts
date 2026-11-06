import { site } from '@/content/site';
import type { FaqItem } from '@/content/faq';
import { actionStatus } from '@/content/status';
import { toSchemaDate } from './dates';

export type Breadcrumb = { name: string; path: string };
export type StructuredNode = Record<string, unknown>;

export const organizationId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;
export const softwareId = `${site.url}/#software`;

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

// Connected actions go first (Rule 1) and keep their "a pedido" label, so the
// schema never reads as an action that works without a connection.
export function softwareFeatureList() {
  return [
    ...actionStatus.filter((row) => row.status === 'on-request'),
    ...actionStatus.filter((row) => row.status === 'included'),
  ].map((row) => `${row.action} (${row.label})`);
}

export function entityGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: site.name,
        alternateName: site.domain,
        url: site.url,
        description: site.description,
        slogan: site.tagline,
        logo: {
          '@type': 'ImageObject',
          url: `${site.url}/atende-instagram-logo.png`,
        },
        telephone: `+${site.whatsapp.number}`,
        email: site.email,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: `+${site.whatsapp.number}`,
          email: site.email,
          contactType: 'customer service',
          availableLanguage: 'es',
        },
        areaServed: 'AR',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Córdoba',
          addressCountry: 'AR',
        },
        ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${site.url}/`,
        name: site.name,
        alternateName: site.domain,
        inLanguage: 'es-AR',
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': softwareId,
        name: site.name,
        url: `${site.url}/`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        provider: { '@id': organizationId },
        description: site.description,
        featureList: softwareFeatureList(),
      },
    ],
  };
}

export function pageGraph({
  path,
  title,
  description,
  updated,
  faq = [],
  breadcrumbs = [],
  extra = [],
}: {
  path: string;
  title: string;
  description: string;
  updated?: string;
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
        ...(updated ? { dateModified: toSchemaDate(updated) } : {}),
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

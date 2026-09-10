import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { legalPages, pages } from '@/content/pages';
import { servicios } from '@/content/servicios';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.values(pages),
    ...servicios.map((service) => ({ path: `/servicios/${service.slug}`, updated: pages.services.updated })),
    ...legalPages,
  ].map(({ path, updated }) => ({ url: path === '/' ? site.url : new URL(path, site.url).href, lastModified: updated }));
}

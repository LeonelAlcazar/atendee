import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-07-17');
  return [
    { url: site.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/servicios`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/casos-de-uso`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/terminos-y-condiciones`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/politica-de-privacidad`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];
}

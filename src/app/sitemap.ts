import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/servicios`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/casos-de-uso`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/terminos-y-condiciones`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/politica-de-privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}

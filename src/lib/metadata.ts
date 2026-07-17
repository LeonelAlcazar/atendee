import type { Metadata } from 'next';
import { site } from '@/content/site';

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | '/';
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  const socialTitle = `${title} — ${site.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: site.name,
      locale: 'es_AR',
      type: 'website',
      images: ['/og.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: ['/og.png'],
    },
  };
}

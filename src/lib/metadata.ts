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
    title: { absolute: socialTitle },
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
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Atende: atención por WhatsApp con IA para tu negocio' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [{ url: '/og.png', alt: 'Atende: atención por WhatsApp con IA para tu negocio' }],
    },
  };
}

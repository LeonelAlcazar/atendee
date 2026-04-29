import { site } from '@/content/site';

const data = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${site.url}#business`,
      name: site.name,
      url: site.url,
      description: site.description,
      telephone: `+${site.whatsapp.number}`,
      email: site.email,
      areaServed: 'AR',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Córdoba',
        addressCountry: 'AR',
      },
    },
    {
      '@type': 'Service',
      name: 'Automatización de WhatsApp para PyMEs',
      provider: { '@id': `${site.url}#business` },
      areaServed: 'AR',
      description: site.description,
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

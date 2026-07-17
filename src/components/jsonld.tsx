import { site } from '@/content/site';

const data = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}#organization`,
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
      '@type': 'SoftwareApplication',
      '@id': `${site.url}#software`,
      name: 'Atende',
      url: site.appUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      provider: { '@id': `${site.url}#organization` },
      description: site.description,
      featureList: [
        'Respuestas automáticas por WhatsApp',
        'Bandeja compartida de conversaciones',
        'Derivación a atención humana',
        'Gestión de equipos',
      ],
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

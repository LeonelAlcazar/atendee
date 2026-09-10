import { site } from '@/content/site';
import { organizationId, serializeJsonLd, softwareId, websiteId } from '@/lib/structured-data';

const data = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: site.name,
      url: site.url,
      description: site.description,
      logo: { '@type': 'ImageObject', url: `${site.url}/atende-instagram-logo.png` },
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
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${site.url}/`,
      name: 'Atende',
      inLanguage: 'es-AR',
      publisher: { '@id': organizationId },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': softwareId,
      name: 'Atende',
      url: `${site.url}/`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      provider: { '@id': organizationId },
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

export function JsonLd({ value = data }: { value?: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(value) }}
    />
  );
}

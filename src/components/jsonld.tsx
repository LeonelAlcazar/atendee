import { entityGraph, serializeJsonLd } from '@/lib/structured-data';

export function JsonLd({ value = entityGraph() }: { value?: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(value) }}
    />
  );
}

import { describe, expect, it } from 'vitest';
import { pageGraph, serializeJsonLd } from './structured-data';

describe('JSON-LD output', () => {
  it('cannot terminate the script when content contains HTML', () => {
    const content = { text: '</script><script>alert("x")</script> & café' };
    const serialized = serializeJsonLd(content);
    expect(serialized).not.toContain('<');
    expect(JSON.parse(serialized)).toEqual(content);
  });
  it('uses canonical absolute URLs and exactly the supplied visible FAQ content', () => {
    const faq = [
      {
        q: '¿Qué incluye?',
        a: 'Respuestas configuradas y bandeja compartida.',
      },
    ];
    const graph = pageGraph({
      path: '/precios',
      title: 'Precios',
      description: 'Planes',
      faq,
      breadcrumbs: [
        { name: 'Inicio', path: '/' },
        { name: 'Precios', path: '/precios' },
      ],
    });
    expect(graph['@graph']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          '@type': 'WebPage',
          url: 'https://www.atende.com.ar/precios',
        }),
        expect.objectContaining({
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: faq[0].q,
              acceptedAnswer: { '@type': 'Answer', text: faq[0].a },
            },
          ],
        }),
        expect.objectContaining({
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: 'https://www.atende.com.ar/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Precios',
              item: 'https://www.atende.com.ar/precios',
            },
          ],
        }),
      ]),
    );
  });
});

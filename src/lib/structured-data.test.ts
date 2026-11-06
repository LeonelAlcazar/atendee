import { describe, expect, it } from 'vitest';
import { actionStatus } from '@/content/status';
import {
  entityGraph,
  pageGraph,
  serializeJsonLd,
  softwareFeatureList,
} from './structured-data';

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
  it('adds a timezone-aware dateModified only when the page has a date', () => {
    const page = { path: '/precios', title: 'Precios', description: 'Planes' };
    const webPage = (graph: ReturnType<typeof pageGraph>) =>
      graph['@graph'].find((node) => node['@type'] === 'WebPage');
    expect(webPage(pageGraph({ ...page, updated: '2026-11-06' }))).toMatchObject(
      { dateModified: '2026-11-06T09:00:00-03:00' },
    );
    expect(webPage(pageGraph(page))).not.toHaveProperty('dateModified');
  });
});

describe('site entities', () => {
  const nodes = entityGraph()['@graph'] as Record<string, unknown>[];
  const node = (type: string) => nodes.find((item) => item['@type'] === type)!;

  it('describes the organization with facts that have a source', () => {
    const organization = node('Organization');
    expect(organization).toMatchObject({
      name: 'Atende',
      alternateName: 'atende.com.ar',
      areaServed: 'AR',
      address: { addressLocality: 'Córdoba', addressCountry: 'AR' },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+543512901337',
        email: 'hola@atende.com.ar',
        availableLanguage: 'es',
      },
    });
    expect(organization.slogan).toEqual(expect.any(String));
    expect((organization.contactPoint as object)).toHaveProperty('contactType');
    for (const key of ['legalName', 'taxID', 'foundingDate', 'aggregateRating'])
      expect(organization).not.toHaveProperty(key);
  });
  it('publishes sameAs only when the catalog has real profiles', () => {
    expect(node('Organization')).not.toHaveProperty('sameAs');
  });
  it('names the site consistently and sells no offer', () => {
    expect(node('WebSite')).toMatchObject({
      name: 'Atende',
      alternateName: 'atende.com.ar',
    });
    expect(node('SoftwareApplication')).toMatchObject({ name: 'Atende' });
    expect(node('SoftwareApplication')).not.toHaveProperty('offers');
  });
  it('leads the feature list with connected actions, each one conditional', () => {
    const features = softwareFeatureList();
    const connected = actionStatus.filter((row) => row.status === 'on-request');
    expect(features).toHaveLength(actionStatus.length);
    features.slice(0, connected.length).forEach((feature, index) => {
      expect(feature).toContain(connected[index].action);
      expect(feature).toContain('A pedido');
    });
    features
      .slice(connected.length)
      .forEach((feature) => expect(feature).not.toContain('A pedido'));
  });
});

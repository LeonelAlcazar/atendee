import { describe, expect, it } from 'vitest';
import { pages } from '@/content/pages';
import { rubros } from '@/content/rubros';
import { servicios } from '@/content/servicios';
import { actionStatus } from '@/content/status';
import type { BlogPost } from './blog-content';
import { checkClaims } from './claims';
import { createLlmsTxt } from './llms';

const post = (slug: string, category: string) =>
  ({
    slug,
    category,
    title: `Título de ${slug}`,
    description: `Descripción de ${slug}`,
  }) as BlogPost;
const text = createLlmsTxt([
  post('guia', 'guias'),
  post('bot', 'bot-de-whatsapp'),
  post('rival', 'alternativas'),
  post('rubro', 'salud'),
]);
const sections = text.split(/^## /m);

describe('llms.txt', () => {
  it('follows the llmstxt.org structure', () => {
    expect(text.startsWith('# Atende\n\n> ')).toBe(true);
    expect(text.match(/^# /gm)).toHaveLength(1);
    expect(text.match(/^> /gm)).toHaveLength(1);
    expect(text.match(/^## .+$/gm)).toEqual([
      '## Producto',
      '## Rubros',
      '## Guías',
      '## Comparativas',
      '## Optional',
    ]);
    for (const section of sections.slice(1))
      for (const line of section.split('\n').slice(2).filter(Boolean))
        expect(line).toMatch(
          /^- \[[^\]]+\]\(https:\/\/www\.atende\.com\.ar\/[^)\s]*\)(: .+)?$/,
        );
  });
  it('leads with the action, conditional on the connection', () => {
    const summary = text.split('\n')[2];
    expect(summary).toContain('Conectado a la agenda');
    expect(summary).toContain('se arma a pedido');
    expect(summary).toContain('el equipo confirma');
  });
  it('publishes the full status table and the real limits', () => {
    for (const row of actionStatus)
      expect(text).toContain(`${row.action}: ${row.label}.`);
    expect(text).toContain('con la API oficial de Meta o con un QR');
    expect(text).not.toContain('No es la API oficial');
    expect(text).toContain('Es una demo, no un cliente.');
  });
  it('comes from the catalogs, so new pages cannot be left out', () => {
    for (const page of Object.values(pages).filter((page) => page.path !== '/'))
      expect(text).toContain(`(https://www.atende.com.ar${page.path})`);
    for (const service of servicios)
      expect(text).toContain(`/servicios/${service.slug})`);
    for (const rubro of rubros)
      expect(text).toContain(`/casos-de-uso/${rubro.slug})`);
  });
  it('keeps sector guides in the skippable section', () => {
    const [optional] = sections.filter((item) => item.startsWith('Optional'));
    expect(optional).toContain('/blog/rubro)');
    expect(optional).toContain('/blog/tema/salud)');
    expect(optional).toContain('/blog/editorial)');
    expect(text.indexOf('/blog/guia)')).toBeLessThan(text.indexOf('## Optional'));
  });
  it('lists only the posts it receives, and passes the claims checker', () => {
    expect(text).not.toContain('/blog/draft');
    expect(checkClaims('llms.md', text).findings).toEqual([]);
  });
});

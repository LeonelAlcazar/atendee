import { describe, expect, it } from 'vitest';
import { faqAnchor, faqAnchors } from './faq-anchors';

describe('faqAnchor', () => {
  it('slugs the question with a prefix', () => {
    expect(faqAnchor('¿Qué es Atende?')).toBe('pregunta-que-es-atende');
    expect(faqAnchor('¿Atende es lo mismo que Atendium o AtiendeApp?')).toBe(
      'pregunta-atende-es-lo-mismo-que-atendium-o-atiendeapp',
    );
    expect(faqAnchor('¿?')).toBe('pregunta-sin-titulo');
  });
  it('cuts long questions at a word boundary', () => {
    const id = faqAnchor(`¿${'palabra '.repeat(20)}final?`);
    expect(id.length).toBeLessThanOrEqual(81);
    expect(id.endsWith('-')).toBe(false);
    expect(id).toMatch(/^pregunta-(palabra-)*palabra$/);
  });
});

describe('faqAnchors', () => {
  it('keeps ids unique on one page', () => {
    expect(faqAnchors(['¿Cuánto sale?', '¿Cuánto sale?', 'Otra'])).toEqual([
      'pregunta-cuanto-sale',
      'pregunta-cuanto-sale-2',
      'pregunta-otra',
    ]);
  });
});

import { describe, expect, it } from 'vitest';
import type { BlogPost } from './blog-content';
import {
  isSectorGuide,
  maxWorstSharedShare,
  repeatedHeadings,
  sharedSequenceReport,
} from './template-metrics';

const guide = (slug: string, html: string, headings: string[] = []) =>
  ({
    slug,
    html,
    headings: headings.map((text) => ({ id: text, text, depth: 2 })),
  }) as BlogPost;

describe('anti-template guard', () => {
  it('allows an H2 in three guides and flags it in four, ignoring case and accents', () => {
    const guides = ['a', 'b', 'c'].map((slug) =>
      guide(slug, '', ['Cómo implementarlo']),
    );
    expect(repeatedHeadings(guides)).toEqual([]);
    expect(
      repeatedHeadings([...guides, guide('d', '', ['COMO IMPLEMENTARLO?'])]),
    ).toEqual([{ heading: 'como implementarlo', guides: 4 }]);
  });
  it('ignores H3s when counting repeated headings', () => {
    const guides = ['a', 'b', 'c', 'd'].map((slug) => ({
      ...guide(slug, ''),
      headings: [{ id: 'x', text: 'Ejemplo', depth: 3 }],
    }));
    expect(repeatedHeadings(guides)).toEqual([]);
  });
  it('counts one repeated heading once per guide', () => {
    const guides = ['a', 'b', 'c'].map((slug) => guide(slug, '', ['Uno', 'uno']));
    expect(repeatedHeadings(guides)).toEqual([]);
  });
  it('measures the share of 5-word sequences another guide also uses', () => {
    const shared = 'uno dos tres cuatro cinco seis';
    const report = sharedSequenceReport([
      guide('a', `<p>${shared} siete ocho nueve diez</p>`),
      guide('b', `<p>${shared} once doce trece catorce</p>`),
      guide('c', '<p>quince dieciséis diecisiete dieciocho diecinueve</p>'),
    ]);
    expect(report.shares.map((item) => item.share)).toEqual([0, 1 / 3, 1 / 3]);
    expect(report.median).toBeCloseTo(1 / 3);
    expect(report.worst?.share).toBeCloseTo(1 / 3);
  });
  it('reads words across tags, so markup cannot hide a shared sentence', () => {
    const report = sharedSequenceReport([
      guide('a', '<p>uno dos <strong>tres</strong> cuatro cinco</p>'),
      guide('b', '<p>uno dos tres cuatro</p><p>cinco</p>'),
    ]);
    expect(report.median).toBe(1);
  });
  it('exposes one cloned guide that the median hides', () => {
    const words = (seed: string) =>
      Array.from({ length: 40 }, (_, index) => `${seed}${index}`).join(' ');
    const guides = ['a', 'b', 'c', 'd', 'e'].map((slug) =>
      guide(slug, `<p>${words(slug)}</p>`),
    );
    const report = sharedSequenceReport([
      ...guides,
      guide('clone', `<p>${words('a')}</p>`),
    ]);
    expect(report.median).toBe(0);
    expect(report.worst?.share).toBeGreaterThan(maxWorstSharedShare);
  });
  it('treats a guide as one by its slug, even without a sector', () => {
    expect(isSectorGuide({ slug: 'como-automatizar-whatsapp-x' })).toBe(true);
    expect(isSectorGuide({ slug: 'otra', sector: 'Motos' })).toBe(true);
    expect(isSectorGuide({ slug: 'bot-de-whatsapp' })).toBe(false);
  });
  it('returns zero for an empty catalog', () => {
    expect(sharedSequenceReport([])).toMatchObject({ median: 0, shares: [] });
  });
});

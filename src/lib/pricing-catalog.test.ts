import { describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));
// Outside a Next request there is no data cache: the wrapper is an identity.
vi.mock('next/cache', () => ({ unstable_cache: <T,>(fn: T) => fn }));

const { getCatalog, loadCatalog } = await import('./pricing-catalog');
const { catalogSentence, responseLine } = await import('./pricing-copy');

const plan = {
  name: 'Plan con IA',
  priceLabel: 'Etiqueta A',
  bestFor: null,
  monthlyAgentResponseLimit: 1000,
  automationAllowed: true,
  recommended: false,
};
const now = new Date('2026-11-26T15:00:00Z');

describe('loadCatalog', () => {
  it('returns the plans with the Argentine date they were read', async () => {
    await expect(loadCatalog(async () => [plan], now)).resolves.toEqual({
      plans: [plan],
      checkedAt: '2026-11-26',
    });
  });
  it('keeps an empty catalog: it is a published state, not a failure', async () => {
    await expect(loadCatalog(async () => [], now)).resolves.toEqual({
      plans: [],
      checkedAt: '2026-11-26',
    });
  });
  it('throws on an unavailable or invalid catalog, so no failure is cached', async () => {
    await expect(loadCatalog(async () => null, now)).rejects.toThrow(
      'Public plan catalog unavailable',
    );
  });
});

describe('getCatalog', () => {
  it('passes through the cached catalog', async () => {
    const catalog = { plans: [plan], checkedAt: '2026-11-26' };
    await expect(getCatalog(async () => catalog)).resolves.toBe(catalog);
  });
  it('returns null when no catalog was ever read, without the error', async () => {
    await expect(
      getCatalog(async () => {
        throw new Error('PRIVATE_UPSTREAM_CANARY');
      }),
    ).resolves.toBeNull();
  });
});

describe('catalogSentence', () => {
  const manual = { ...plan, name: 'Plan manual', priceLabel: 'Etiqueta M', automationAllowed: false, monthlyAgentResponseLimit: 0 };
  it('lists the plans with their literal labels, the connection and the date', () => {
    expect(
      catalogSentence(
        [plan, { ...plan, name: 'Plan grande', priceLabel: 'Etiqueta B' }, manual],
        '2026-11-26',
      ),
    ).toBe(
      'Los planes con IA son Plan con IA (Etiqueta A) y Plan grande (Etiqueta B). Plan manual (Etiqueta M) es manual, sin asistente. La conexión con tu sistema se cotiza aparte, a pedido. Precios publicados al 26 de noviembre de 2026.',
    );
  });
  it('handles one plan, only manual plans and an empty catalog', () => {
    expect(catalogSentence([plan], '2026-11-26')).toMatch(/^El plan con IA es Plan con IA \(Etiqueta A\)\./);
    expect(catalogSentence([manual], '2026-11-26')).toMatch(/^Plan manual \(Etiqueta M\) es manual, sin asistente\./);
    expect(catalogSentence([], '2026-11-26')).toBeNull();
  });
  it('never writes a price of its own', () => {
    expect(catalogSentence([plan], '2026-11-26')).not.toMatch(/\$|\d+\s?(pesos|ars)/i);
  });
});

describe('responseLine', () => {
  it('describes each kind of plan', () => {
    expect(responseLine(plan)).toBe('Hasta 1.000 respuestas del asistente por mes.');
    expect(responseLine({ ...plan, monthlyAgentResponseLimit: 0 })).toBe('Sin respuestas mensuales incluidas.');
    expect(responseLine({ ...plan, automationAllowed: false })).toBe('Atención manual, sin asistente.');
  });
});

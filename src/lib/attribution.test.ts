import { describe, expect, it } from 'vitest';
import { parseUtm, rememberFirstTouch, withFirstTouch } from './attribution';

function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (index) => [...data.keys()][index] ?? null,
    removeItem: (key) => void data.delete(key),
    setItem: (key, value) => void data.set(key, String(value)),
  };
}

describe('parseUtm', () => {
  it('keeps only the five utm parameters', () => {
    expect(
      parseUtm('?utm_source=ig&utm_medium=paid&fbclid=PRIVATE&utm_term=&gclid=x'),
    ).toEqual({ utm_source: 'ig', utm_medium: 'paid' });
    expect(parseUtm('?fbclid=PRIVATE')).toBeNull();
    expect(parseUtm('')).toBeNull();
  });
  it('caps long values', () => {
    expect(parseUtm(`?utm_campaign=${'x'.repeat(400)}`)?.utm_campaign).toHaveLength(150);
  });
});

describe('rememberFirstTouch', () => {
  it('stores the first landing and ignores later campaigns in the same visit', () => {
    const storage = memoryStorage();
    expect(rememberFirstTouch('?utm_source=ig', storage)).toEqual({ utm_source: 'ig' });
    expect(rememberFirstTouch('?utm_source=google', storage)).toEqual({ utm_source: 'ig' });
    expect(rememberFirstTouch('', storage)).toEqual({ utm_source: 'ig' });
  });
  it('stores nothing without utm parameters', () => {
    const storage = memoryStorage();
    expect(rememberFirstTouch('?a=1', storage)).toBeNull();
    expect(storage.length).toBe(0);
  });
  it('works with blocked storage and with corrupt values', () => {
    const blocked = {
      getItem() {
        throw new Error('blocked');
      },
      setItem() {
        throw new Error('blocked');
      },
    } as unknown as Storage;
    expect(rememberFirstTouch('?utm_source=ig', blocked)).toEqual({ utm_source: 'ig' });
    expect(rememberFirstTouch('?utm_source=ig', null)).toEqual({ utm_source: 'ig' });
    const corrupt = memoryStorage();
    corrupt.setItem('atende:first-touch', '{not json');
    expect(rememberFirstTouch('', corrupt)).toBeNull();
  });
});

describe('withFirstTouch', () => {
  const utm = { utm_source: 'ig', utm_campaign: 'nov' };
  it('adds missing utm parameters to sign-up links only', () => {
    expect(withFirstTouch('https://app.atende.com.ar/empezar?ref=home-footer', utm)).toBe(
      'https://app.atende.com.ar/empezar?ref=home-footer&utm_source=ig&utm_campaign=nov',
    );
    expect(
      withFirstTouch('https://app.atende.com.ar/empezar?ref=x&utm_source=mail', utm),
    ).toBe('https://app.atende.com.ar/empezar?ref=x&utm_source=mail&utm_campaign=nov');
    expect(withFirstTouch('https://app.atende.com.ar/', utm)).toBe('https://app.atende.com.ar/');
    expect(withFirstTouch('/demo', utm)).toBe('/demo');
    expect(withFirstTouch('https://app.atende.com.ar/empezar', null)).toBe(
      'https://app.atende.com.ar/empezar',
    );
  });
});

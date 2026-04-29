import { describe, it, expect } from 'vitest';
import { buildWaLink } from './wa';

describe('buildWaLink', () => {
  it('returns the bare wa.me link with no context', () => {
    expect(buildWaLink()).toBe('https://wa.me/543512901337');
  });

  it('appends url-encoded context as ?text= prefilled message', () => {
    const link = buildWaLink('Hola, vi atende.com.ar');
    expect(link).toBe(
      'https://wa.me/543512901337?text=Hola%2C%20vi%20atende.com.ar',
    );
  });

  it('handles unicode and special characters', () => {
    const link = buildWaLink('¿Cuánto sale?');
    expect(link).toContain('https://wa.me/543512901337?text=');
    expect(decodeURIComponent(link.split('?text=')[1])).toBe('¿Cuánto sale?');
  });

  it('strips leading/trailing whitespace before encoding', () => {
    const link = buildWaLink('   hola   ');
    expect(link).toBe('https://wa.me/543512901337?text=hola');
  });

  it('returns bare link if context is only whitespace', () => {
    expect(buildWaLink('   ')).toBe('https://wa.me/543512901337');
  });
});

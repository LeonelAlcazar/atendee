import { describe, it, expect } from 'vitest';
import { buildWaLink, waRef } from './wa';

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

describe('buildWaLink with a source reference', () => {
  it('adds the reference to a one-line message', () => {
    const link = buildWaLink('Hola, vi atende.com.ar y quiero hacer una consulta', 'precios, pie');
    expect(decodeURIComponent(link.split('?text=')[1])).toBe(
      'Hola, vi atende.com.ar y quiero hacer una consulta (Ref: precios, pie)',
    );
    expect(link.startsWith('https://wa.me/543512901337?text=')).toBe(true);
  });

  it('puts the reference on its own line after a multi-line message', () => {
    const link = buildWaLink('Hola\nNegocio: Lo de Ana', 'demo, directo');
    expect(decodeURIComponent(link.split('?text=')[1])).toBe(
      'Hola\nNegocio: Lo de Ana\n(Ref: demo, directo)',
    );
  });

  it('ignores an empty reference and never prefills a reference alone', () => {
    expect(buildWaLink('hola', '  ')).toBe('https://wa.me/543512901337?text=hola');
    expect(buildWaLink('', 'inicio, pie')).toBe('https://wa.me/543512901337');
  });
});

describe('waRef', () => {
  it('names the page by its path and the home as inicio', () => {
    expect(waRef('/', 'pie')).toBe('inicio, pie');
    expect(waRef('/precios', 'calculadora')).toBe('precios, calculadora');
    expect(waRef('/blog/mensajes-de-recordatorio-de-turnos', 'guía')).toBe(
      'blog/mensajes-de-recordatorio-de-turnos, guía',
    );
    expect(waRef('/demo?rubro=x#y', 'directo')).toBe('demo, directo');
    expect(waRef(null, 'menú')).toBe('inicio, menú');
  });
});

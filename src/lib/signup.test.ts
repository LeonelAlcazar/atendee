import { describe, expect, it } from 'vitest';
import {
  buildSignupLink,
  buildSignupStartUrl,
  isSignupHref,
  pageRef,
  refPattern,
  signupRef,
} from './signup';

describe('pageRef', () => {
  it.each([
    ['/', 'home'],
    [null, 'home'],
    ['/precios', 'precios'],
    ['/demo?rubro=x', 'demo'],
    ['/blog/recordatorios-de-turnos-por-whatsapp', 'blog-recordatorios-de-turnos-por-whatsapp'],
    ['/blog/tema/salud', 'tema-salud'],
    ['/casos-de-uso/clinicas-y-consultorios', 'rubro-clinicas-y-consultorios'],
    ['/servicios/turnos-whatsapp', 'servicio-turnos-whatsapp'],
    ['/que-es-atende/', 'que-es-atende'],
    ['/Precios Ñandú', 'precios-nandu'],
  ])('%s → %s', (path, ref) => {
    expect(pageRef(path)).toBe(ref);
  });
});

describe('signupRef', () => {
  it('joins page and placement', () => {
    expect(signupRef('home', 'hero')).toBe('home-hero');
    expect(signupRef(pageRef('/precios'), 'footer')).toBe('precios-footer');
  });
  it('always fits the app pattern and keeps the placement', () => {
    const longest = pageRef('/blog/recordatorio-de-turnos-para-servicio-tecnico-a-domicilio');
    for (const placement of ['footer', 'sales']) {
      const ref = signupRef(longest, placement);
      expect(ref).toMatch(refPattern);
      expect(ref.endsWith(`-${placement}`)).toBe(true);
      expect(ref).not.toMatch(/--/);
    }
  });
});

describe('buildSignupLink', () => {
  it('opens the sign-up door with the reference', () => {
    expect(buildSignupLink('precios-footer')).toBe(
      'https://app.atende.com.ar/empezar?ref=precios-footer',
    );
  });
  it('drops a reference outside the contract', () => {
    expect(buildSignupLink('Bad Ref')).toBe('https://app.atende.com.ar/empezar');
  });
});

describe('buildSignupStartUrl', () => {
  it('produces contract C1', () => {
    const href = buildSignupStartUrl({
      negocio: '  peluquería en Nueva Córdoba, turnos de corte y color  ',
      ref: 'home-hero',
      utm: { utm_source: 'instagram', utm_medium: 'paid', utm_campaign: 'nov' },
    });
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe('https://app.atende.com.ar/empezar');
    expect([...url.searchParams]).toEqual([
      ['negocio', 'peluquería en Nueva Córdoba, turnos de corte y color'],
      ['ref', 'home-hero'],
      ['utm_source', 'instagram'],
      ['utm_medium', 'paid'],
      ['utm_campaign', 'nov'],
    ]);
  });
  it('caps the description at 600 characters and omits empty values', () => {
    const url = new URL(buildSignupStartUrl({ negocio: 'a'.repeat(700), ref: 'home-hero' }));
    expect(url.searchParams.get('negocio')).toHaveLength(600);
    expect(new URL(buildSignupStartUrl({ negocio: '   ', ref: 'home-hero' })).search).toBe(
      '?ref=home-hero',
    );
  });
  it('strips control characters', () => {
    const url = new URL(buildSignupStartUrl({ negocio: 'hola\u0000\u0007 mundo\r\nchau' }));
    expect(url.searchParams.get('negocio')).toBe('hola mundo\nchau');
  });
});

describe('isSignupHref', () => {
  it('matches only the app sign-up door', () => {
    expect(isSignupHref('https://app.atende.com.ar/empezar?ref=x')).toBe(true);
    expect(isSignupHref('https://app.atende.com.ar/')).toBe(false);
    expect(isSignupHref('https://app.atende.com.ar.evil.test/empezar')).toBe(false);
    expect(isSignupHref('/empezar')).toBe(false);
  });
});

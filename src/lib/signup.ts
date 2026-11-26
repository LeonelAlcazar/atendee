import { site } from '../content/site';

// Contract C1 with the app: GET /empezar, every parameter optional.
// `ref` names the page and placement that sent the visitor; `negocio` is what
// they typed in the home hero. The app keeps both through the AuthKit round
// trip and saves them with the espacio.
export const signupPath = '/empezar';
export const signupUrl = `${site.appUrl}${signupPath}`;
export const refPattern = /^[a-z0-9-]{1,60}$/;
export const negocioMaxLength = 600;
export const utmKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;
export type UtmKey = (typeof utmKeys)[number];
export type Utm = Partial<Record<UtmKey, string>>;

const refMax = 60;
const clean = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// A short, stable name for a page: "home", "precios", "blog-<slug>",
// "rubro-<slug>", "servicio-<slug>", "tema-<slug>".
export function pageRef(pathname: string | null | undefined): string {
  const segments = (pathname ?? '/')
    .split(/[?#]/)[0]
    .split('/')
    .filter(Boolean);
  if (!segments.length) return 'home';
  const [first, second, third] = segments;
  let parts = segments;
  if (first === 'blog' && second === 'tema' && third) parts = ['tema', third];
  else if (first === 'casos-de-uso' && second) parts = ['rubro', second];
  else if (first === 'servicios' && second) parts = ['servicio', second];
  return clean(parts.join('-')) || 'home';
}

// `<page>-<placement>`, cut to the 60 characters the app accepts. The page
// part gives way, so the placement always survives.
export function signupRef(page: string, placement: string): string {
  const tail = clean(placement).slice(0, 20) || 'link';
  const head = clean(page)
    .slice(0, refMax - tail.length - 1)
    .replace(/-+$/, '');
  return head ? `${head}-${tail}` : tail;
}

// Every "Crear mi espacio" or "Empezá en la app" link goes through here.
// "Entrar" stays the bare app root.
export function buildSignupLink(ref: string): string {
  const url = new URL(signupUrl);
  if (refPattern.test(ref)) url.searchParams.set('ref', ref);
  return url.href;
}

// Removes control characters and caps the length, so a value never breaks
// the URL or the app's limits.
export function cleanParam(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .replace(/\r\n?/g, '\n')
    .trim()
    .slice(0, max)
    .trim();
}

// The URL the home hero opens. Same shape as the plain GET form, which is
// what a browser without JavaScript sends.
export function buildSignupStartUrl({
  negocio,
  ref,
  utm,
}: {
  negocio?: string;
  ref?: string;
  utm?: Utm | null;
}): string {
  const url = new URL(signupUrl);
  const text = cleanParam(negocio, negocioMaxLength);
  if (text) url.searchParams.set('negocio', text);
  if (ref && refPattern.test(ref)) url.searchParams.set('ref', ref);
  for (const key of utmKeys) {
    const value = cleanParam(utm?.[key], 150);
    if (value) url.searchParams.set(key, value);
  }
  return url.href;
}

export function isSignupHref(href: string): boolean {
  try {
    const url = new URL(href);
    return url.origin === site.appUrl && url.pathname === signupPath;
  } catch {
    return false;
  }
}

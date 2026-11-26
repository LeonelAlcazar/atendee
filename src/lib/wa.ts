import { site } from '../content/site';

// The team line. The optional reference ("precios, pie") tells the team which
// page and placement started the chat; it survives because it is part of the
// message the visitor sends.
export function buildWaLink(context?: string, ref?: string): string {
  const base = `https://wa.me/${site.whatsapp.number}`;
  const trimmed = context?.trim();
  if (!trimmed) return base;
  const reference = ref?.trim();
  const text = reference
    ? `${trimmed}${trimmed.includes('\n') ? '\n' : ' '}(Ref: ${reference})`
    : trimmed;
  return `${base}?text=${encodeURIComponent(text)}`;
}

// "inicio, pie", "precios, calculadora", "blog/mensajes-de-recordatorio, guía".
export function waRef(pathname: string | null | undefined, placement: string): string {
  const path = (pathname ?? '/').split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
  return `${path || 'inicio'}, ${placement}`;
}

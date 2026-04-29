import { site } from '@/content/site';

export function buildWaLink(context?: string): string {
  const base = `https://wa.me/${site.whatsapp.number}`;
  if (!context) return base;
  const trimmed = context.trim();
  if (!trimmed) return base;
  return `${base}?text=${encodeURIComponent(trimmed)}`;
}

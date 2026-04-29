# atende.com.ar

Static marketing site for atende — WhatsApp automation for Argentinian PyMEs.

## Stack

- Next.js 15 (App Router) with `output: 'export'` (fully static)
- TypeScript, strict
- Tailwind CSS v4 (CSS-based config)
- Self-hosted Google Fonts (Instrument Sans, Inter Tight, IBM Plex Mono)
- Framer Motion (hero entrance + stat counters only)
- Vitest (for `src/lib/wa.ts`)

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Static output lands in `out/`. Deploy that directory to any static host.

## Test

```bash
npm test
```

## Editing copy

All Spanish copy lives in `src/content/`:

- `site.ts` — phone number, domain, tagline (single source of truth)
- `servicios.ts` — three services + example conversations
- `casos.ts` — vertical case examples
- `faq.ts` — landing page FAQ
- `stats.ts` — stat numbers (placeholder; replace before launch)

Components contain zero hardcoded copy. To change the WhatsApp number or domain, edit `site.ts`.

## Pre-launch checklist

See `docs/superpowers/specs/2026-04-29-atende-site-design.md` section 12 for the items that need real data before going live.

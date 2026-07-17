# atende.com.ar

Static marketing site for Atende, the WhatsApp automation and shared-inbox product for Argentine businesses.

The public site lives at `https://www.atende.com.ar`. Account entry and guided onboarding live at `https://app.atende.com.ar`.

## Stack

- Next.js 15 App Router with `output: 'export'`
- React 19 and strict TypeScript
- Tailwind CSS v4 with a hand-built component system
- `next/font` for self-hosted Instrument Sans, Inter Tight, and IBM Plex Mono
- Lucide React for the small number of interface icons
- Vitest for URL helper tests

The site has no server runtime, CMS, form handler, analytics dependency, or client-side animation library. `npm run build` creates the deployable `out/` directory.

## Develop

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm test
npx tsc --noEmit
npm run build
```

## Content

Spanish marketing copy and shared product facts live in `src/content/`:

- `site.ts` — public domain, app domain, contact details, tagline, and trust statements
- `landing.ts` — landing-page positioning, features, onboarding steps, control story, and CTA copy
- `servicios.ts` — detailed service examples and conversations
- `casos.ts` — vertical examples
- `faq.ts` — landing-page questions and answers

Keep product claims aligned with the working app. In particular, the current connection flow uses the QR experience shown in `app.atende.com.ar`; do not describe it as a Meta Business API approval flow.

## Social assets

- `public/icon.svg` is the source favicon mark
- `public/favicon.ico` contains common browser icon sizes
- `public/og-source.svg` is the editable 1200×630 social-card source
- `public/og.png` is the exported social card used by page metadata

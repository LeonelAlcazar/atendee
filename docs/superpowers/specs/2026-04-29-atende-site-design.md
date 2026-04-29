# atende.com.ar — Site Design Spec

**Date:** 2026-04-29
**Status:** Approved (pending user spec review)
**Owner:** Leonel Alcázar

## 1. Purpose

Static SSR/SSG marketing site for **atende**, a WhatsApp-automation service for Argentinian SMBs. The site sells three packaged offerings — customer-service bot, appointment booking, and sales funnels — and converts every interaction into a WhatsApp conversation with `+54 351 290 1337`.

The site is **not** a self-service product portal. There is no login, no signup form, no pricing page. Every CTA opens WhatsApp with a prefilled, context-aware message.

## 2. Audience

- Argentinian SMB owners and operators, 25–55 years old
- Verticals: clínicas, peluquerías/estéticas, inmobiliarias, comercios de barrio, estudios profesionales
- **Non-technical** — they understand WhatsApp deeply but don't know what an "API" is, don't want to install anything, and don't want to learn a new tool
- Mostly mobile (Android-heavy in AR)

## 3. Goals & Non-Goals

### Goals
- Convey trust and competence in under 5 seconds
- Make the value proposition legible without technical vocabulary
- Move qualified visitors to WhatsApp with one tap
- Look hand-crafted — explicitly avoid the generic "AI-generated SaaS landing" aesthetic
- Lighthouse mobile scores ≥ 95 across all four metrics

### Non-Goals
- No e-commerce, no checkout, no in-site billing
- No auth, no dashboard preview, no live demo
- No blog at launch (can be added later — leave room in IA)
- No multi-language (Spanish AR only)
- No CMS — content lives in TypeScript files; redeploy to update

## 4. Architecture

- **Framework:** Next.js 15 (App Router) with `output: 'export'` — fully static, no server runtime
- **Language:** TypeScript, strict mode
- **Styling:** Tailwind CSS v4 + a `globals.css` with CSS custom properties for palette/shadows
- **Fonts:** self-hosted via `next/font/google` (Instrument Sans, Inter Tight, IBM Plex Mono)
- **Icons:** Lucide React, used sparingly (≤2 per section), always paired with a typographic label
- **Animation:** Framer Motion for hero entrance + scroll-revealed stat counters only
- **Forms:** none — every CTA is `<a href="https://wa.me/543512901337?text=...">`
- **SEO:** static `metadata` exports per page, Next.js native `app/sitemap.ts` + `app/robots.ts` (no extra package), JSON-LD `LocalBusiness` + `Service` schemas, `lang="es-AR"`
- **OG image:** hand-designed PNG in `/public/og.png` (1200×630), one per site (not per-page)
- **Analytics:** Plausible, optional, env-flagged
- **Hosting:** any static host (Vercel / Netlify / Cloudflare Pages); deploy artifact is the `out/` directory
- **Performance budget:** ≤80KB JS on landing, LCP <1.5s on 4G mobile

### No component library
shadcn / Radix / Material defaults produce the exact "AI-slop" aesthetic the user wants to avoid. All UI primitives are hand-built in `src/components/ui/`. This is a deliberate choice and a non-negotiable constraint.

## 5. Information Architecture

```
/                     Landing
/servicios            Detailed services
/casos-de-uso         Vertical case examples
/404                  Custom 404 ("No atendemos esto.")
```

### Persistent shell

**Header** (sticky, shrinks on scroll):
- Wordmark `atende.` (period as brand mark) — links to `/`
- Nav: `Servicios` · `Casos de uso` · `FAQ` (FAQ anchors to landing FAQ)
- CTA button: "Hablar por WhatsApp" (forest bg, ink border, hard shadow)
- Mobile: wordmark + CTA only; hamburger opens full-screen brutalist menu (no drawer)

**Footer:**
- Wordmark + 1-line pitch
- Repeated WhatsApp CTA
- Contact line: WhatsApp number + email placeholder
- Legal: `atende es un servicio de [tu razón social] · Córdoba, Argentina · 2026`
- No social icons (empty social rows scream template)

### Cross-page conventions
- Every page ends with the same "Empezá hoy." CTA block
- Every WhatsApp link carries a `?text=` prefilled per page so leads can be triaged
- A single `buildWaLink(context: string)` helper in `src/lib/wa.ts` produces all links

## 6. Page-by-Page Content & UX

### `/` — Landing

1. **Hero** — full viewport, asymmetric grid
   - Eyebrow tag (mono, uppercase): `WHATSAPP BUSINESS · ARGENTINA`
   - Headline (Instrument Sans, ~96px desktop): "Tu negocio **atendido** mientras dormís."
   - Sub (Inter Tight, ~20px): "Bots de atención, turnos y ventas por WhatsApp. Sin apps, sin que tus clientes aprendan nada nuevo."
   - Primary CTA: "Hablar por WhatsApp" (forest block, coral hover)
   - Secondary CTA: "Ver cómo funciona" (border-only, anchors to How-it-works)
   - Right side / bottom: hand-drawn SVG WhatsApp chat mockup, 3 messages cycling via CSS keyframes
   - Trust strip (mono): `Sin instalación` · `Sin contratos` · `Setup en 48h` · `Soporte humano`

2. **Servicios teaser** — 3 asymmetric cards (sizes 1.2x / 1x / 0.9x)
   - `01` Atención automática · `02` Turnos por WhatsApp · `03` Ventas y seguimiento
   - Coral number, title, 2-line description, mini chat-bubble illustration
   - Hover: translate 4px, shadow shifts to 8px

3. **Cómo funciona** — 4 steps (Charlamos · Diseñamos el flujo · Conectamos tu WhatsApp · Mejoramos con datos)
   - Horizontal scroll on desktop, vertical stack on mobile
   - Big coral numbers, short text

4. **Por qué atende** — 3 stat blocks
   - **Placeholder numbers — must be replaced with real, defensible figures before launch**
   - Suggested format: "+80% consultas resueltas sin humano · -60% tiempo de respuesta · 24/7"
   - Stats animate count-up when scrolled into view

5. **Casos de uso teaser** — 4 vertical chips with one-line proof each
   - Clínicas · Peluquerías · Inmobiliarias · Comercios
   - Links to `/casos-de-uso`

6. **FAQ** — 6 questions, native `<details>` element styled brutalist (no JS)
   - ¿Necesito WhatsApp Business API?
   - ¿Pierdo el control de mi número?
   - ¿Cuánto tarda el setup?
   - ¿Funciona con mi sistema de turnos actual?
   - ¿Qué pasa si un cliente quiere hablar con una persona?
   - ¿Cuánto cuesta?

7. **CTA final** — oversized "Empezá hoy." block, single WhatsApp button

### `/servicios`

- Smaller hero (mono eyebrow + headline + 1 sentence)
- Three full sections, one per service, alternating layout (text left/mockup right, then flipped)
- Each: big number, title, what it does, "qué te llevás" bulleted list (chunky square bullets), example WhatsApp conversation as styled chat mockup, "Pedir este servicio" CTA with prefilled message

### `/casos-de-uso`

- Hero
- 4–6 vertical cases as full-width brutalist cards stacked
- Each: industry name, common problem, what atende does, sample conversation
- Final CTA: "¿No ves tu rubro? Lo armamos a medida." → WhatsApp

### `/404`

- Brutalist "404. No atendemos esto."
- Link back home
- Personality moment, not a generic error page

## 7. Brand System

### Palette (CSS custom properties)

```
--bg:     #F8F5EF   /* cream */
--ink:    #141414   /* near-black */
--forest: #0F3D2E   /* primary block / CTA bg */
--coral:  #FF5D3B   /* numbers, accents, hover pop */
--mute:   #6B6760   /* secondary text */
--line:   #141414   /* borders always full ink */
```

### Typography

- **Display (Instrument Sans):** 96 / 72 / 56 / 40 / 32 — tracking -2%, weight 600
- **Body (Inter Tight):** 20 / 18 / 16 — weight 400/500
- **Mono (IBM Plex Mono):** 13 / 12 — uppercase, tracking +5% — eyebrows, tags, labels only

### Voice & tone

Informal but neutral Spanish AR (per user choice C):
- "vos"-style verbs ("atendé", "empezá", "hablá") — second-person but not heavy lunfardo
- "tu negocio" / "tus clientes" — close but not chummy
- Avoid corporate jargon ("optimizar", "potenciar", "soluciones integrales") — these are AI-slop tells
- Avoid Anglicisms when a clean Spanish word exists ("setup" is fine, "onboarding" is not)

### Components (hand-built in `src/components/ui/`)

- **`<Button>`** — variants:
  - `primary`: forest bg, cream text, 2px ink border, 6px hard ink shadow; on hover translate 2px + shadow turns coral
  - `outline`: transparent, 2px ink border; on hover fills forest
- **`<Card>`** — cream bg, 2px ink border, 6px hard ink shadow, configurable padding
- **`<Tag>`** — mono, uppercase, ink border, no shadow, optional coral fill
- **`<ChatMockup>`** — pure CSS phone frame + chat bubbles
  - Props: `messages: { from: 'them' | 'us', text: string, ts?: string }[]`
  - Bubbles: 2px ink border, 3px hard shadow
- **`<SectionHeader>`** — eyebrow (mono) + display headline + optional sub. Used everywhere for consistency.

### Illustration approach

- Hand-drawn SVG style: single 2px ink stroke + flat coral/forest fills
- Slight hand-drawn jitter via a global `feTurbulence` SVG filter (applied once)
- **3–5 custom illustrations total** for the whole site — reuse aggressively
- No icon-as-illustration substitutions
- No stock photos. No AI-generated images.

### Motion

- Hero text: fade + 8px y-offset, 400ms, once on mount
- Stat numbers: count-up on `useInView`
- Cards: CSS-only hover translate (no JS)
- **Banned:** parallax, Lottie, auto-playing video, stagger-fade-on-every-section, scroll-jacking

## 8. Project Structure

```
automation-page/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # fonts, header, footer, root metadata
│   │   ├── page.tsx                # /
│   │   ├── servicios/page.tsx
│   │   ├── casos-de-uso/page.tsx
│   │   ├── not-found.tsx           # 404
│   │   ├── globals.css             # CSS vars, base resets, brutalist defaults
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/                     # Button, Card, Tag, ChatMockup, SectionHeader
│   │   ├── layout/                 # Header, Footer, Nav, MobileMenu
│   │   ├── landing/                # Hero, ServiciosTeaser, ComoFunciona, Stats, CasosTeaser, FAQ, CTAFinal
│   │   ├── servicios/              # ServiceBlock
│   │   └── casos/                  # CaseBlock
│   ├── content/                    # All Spanish copy lives here
│   │   ├── site.ts                 # phone, domain, meta — single source of truth
│   │   ├── servicios.ts
│   │   ├── casos.ts
│   │   └── faq.ts
│   └── lib/
│       └── wa.ts                   # buildWaLink(context)
├── public/
│   ├── og.png                      # 1200×630
│   ├── favicon.ico
│   ├── icon.svg
│   └── illustrations/              # SVGs
├── docs/superpowers/specs/
│   └── 2026-04-29-atende-site-design.md
├── next.config.ts                  # output: 'export'
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## 9. Single Source of Truth

`src/content/site.ts`:

```ts
export const site = {
  name: 'atende',
  domain: 'atende.com.ar',
  whatsapp: {
    number: '543512901337',         // E.164 without +
    display: '+54 351 290 1337',
  },
  email: 'hola@atende.com.ar',      // placeholder — confirm before launch
  location: 'Córdoba, Argentina',
} as const;
```

All other files reference these values. Changing the phone or domain is a one-line edit.

## 10. Acceptance Criteria

- `npm run build` produces a fully static `out/` directory deployable to any static host
- Every page has a unique `<title>` and `<meta name="description">`
- `<html lang="es-AR">` on every page
- JSON-LD `LocalBusiness` + `Service` on `/`
- All Spanish copy lives in `src/content/*` — components contain zero hardcoded copy
- WhatsApp number and domain referenced only via `site.ts`
- Lighthouse mobile (Moto G4 throttling): Performance ≥ 95, A11y ≥ 95, Best Practices = 100, SEO = 100
- LCP < 1.5s on 4G, CLS = 0
- No layout shift, no third-party network requests on initial render except self-hosted fonts
- Site renders correctly with JS disabled (FAQ uses `<details>`, CTAs are plain `<a>` — both work without JS)
- Tested on Chrome desktop, Safari iOS, Chrome Android

## 11. Out of Scope (Explicit)

- Pricing page or visible prices anywhere
- Contact form, newsletter signup, lead form
- Live chat widget on the site itself (the WhatsApp button IS the chat)
- Blog / articles / resources section
- Customer login / dashboard / portal
- A/B testing infrastructure
- Multi-language support
- CMS integration
- Cookie consent banner (no tracking cookies if Plausible is used)

## 12. Open Items Before Launch

These are the only fields that need real data before going live:

1. **Stat numbers** in landing section 4 — replace placeholders with defensible figures
2. **Email address** in `site.ts` — confirm `hola@atende.com.ar` or change
3. **Razón social / business legal name** in footer
4. **Real customer logos or testimonials** — optional; if present, add a "Confían en atende" strip below hero
5. **OG image** — hand-designed `/public/og.png`

## 13. Future (Post-Launch)

Not building now, but the IA leaves room for:
- `/blog` or `/notas` for content marketing
- `/precios` if pricing model changes to public tiers
- Per-vertical landing pages (`/clinicas`, `/peluquerias`) for paid traffic

# atende.com.ar

Marketing site and Markdown blog for Atende, the WhatsApp automation and shared-inbox product for Argentine businesses.

The public site lives at `https://www.atende.com.ar`. Account entry and guided onboarding live at `https://app.atende.com.ar`.

## Stack

- Next.js 15 App Router with `output: 'standalone'` and request-time SSR for the blog
- React 19 and strict TypeScript
- Tailwind CSS v4 with a hand-built component system
- `next/font` for self-hosted Instrument Sans, Inter Tight, and IBM Plex Mono
- Lucide React for the small number of interface icons
- Vitest for content, contact and structured-data tests; Cheerio for auditing production HTTP responses

The blog reads validated Markdown from `content/blog/` on the server. The demo form prepares a WhatsApp/email inquiry in the browser. `npm run build` creates the deployable `.next/standalone/` directory, including Markdown and assets; `npm start` runs its Node server. The previous static `out/` deployment is no longer used. See [blog publishing and deployment](docs/blog.md) for setup and the editorial workflow.

## Develop

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run verify
```

## Content

The blog starts with 40 Spanish articles across 30 sectors, six tool comparisons and four practical guides. Edit or add `.md` files in `content/blog/`; [the publishing guide](docs/blog.md) documents frontmatter, drafts, scheduling, topics and validation.

Spanish marketing copy and shared product facts live in `src/content/`:

- `site.ts` — public domain, app domain, contact details, tagline, and trust statements
- `landing.ts` — landing-page positioning, features, onboarding steps, control story, and CTA copy
- `servicios.ts` — detailed service examples and conversations
- `casos.ts` — vertical examples
- `faq.ts` — landing-page questions and answers
- `pages.ts` — commercial page metadata and sitemap modification dates
- `pricing.ts` — buying and pricing questions

Solution detail pages, `/precios` and `/demo` support the B2B buying flow. See [SEO and sales notes](docs/seo-and-sales.md) for product-claim sources, conversion events, verification and search monitoring.

Keep product claims aligned with the working app. In particular, the current connection flow uses the QR experience shown in `app.atende.com.ar`; do not describe it as a Meta Business API approval flow.

## Social assets

- `public/icon.svg` is the source favicon mark
- `public/favicon.ico` contains common browser icon sizes
- `public/og-source.svg` is the editable 1200×630 social-card source
- `public/og.png` is the exported social card used by page metadata

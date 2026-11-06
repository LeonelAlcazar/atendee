# atende.com.ar

Marketing site and Markdown blog for Atende, the WhatsApp automation product for Argentine businesses. Connected to a business's agenda or systems, Atende books, quotes and records orders in the conversation, with the team supervising from a shared inbox.

The public site lives at `https://www.atende.com.ar`. Account entry and guided onboarding live at `https://app.atende.com.ar`.

## Stack

- Next.js 15 App Router with `output: 'standalone'`; the blog is prerendered and regenerated hourly (ISR)
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

This runs the unit tests, TypeScript, `check:claims` (banned product claims), the content checks (including the anti-template guard), the production build and the HTTP audit in `check:seo`. Each one can also run alone; see [blog publishing](docs/blog.md#verification).

## Content

The blog holds Spanish sector guides, tool comparisons and practical guides. `npm run check:content` prints the current counts. Edit or add `.md` files in `content/blog/`; [the publishing guide](docs/blog.md) documents frontmatter, drafts, scheduling, topics and validation.

Spanish marketing copy and shared product facts live in `src/content/`:

- `site.ts` — public domain, app domain, contact details, tagline, trust statements and confirmed social profiles
- `status.ts` — the public status of each action: included or on request
- `landing.ts` — landing-page positioning, features, setup steps, control story, and CTA copy
- `servicios.ts` — detailed service examples and conversations
- `rubros.ts` — the six `/casos-de-uso/[slug]` pages
- `casos.ts` — the use-case hub
- `faq.ts` — landing-page questions and answers
- `pages.ts` — commercial page metadata and sitemap modification dates
- `pricing.ts` — buying and pricing questions
- `blog-topics.ts` — blog topics, their matching rubro, and blog page metadata

Solution pages, rubro pages, `/integraciones`, `/precios` and `/demo` support the B2B buying flow. `/que-es-atende`, `/preguntas-frecuentes` and `/nosotros` state what the product is, its limits and who is behind it. See [SEO and sales notes](docs/seo-and-sales.md) for the product-claim rules, conversion events, verification and search monitoring, and the [off-site and measurement plan](docs/geo-offsite-plan.md) for the work that happens outside this repository.

The [October 2026 Search Console analysis](docs/search-console-2026-10-28.md) documents all seven exports, their limitations, the content priorities and the follow-up measurement plan.

Keep product claims aligned with the working app. Connected actions are built on request for each business, so write them as conditional: "conectado a tu agenda, Atende reserva el turno". The current connection flow uses the QR experience shown in `app.atende.com.ar`; do not describe it as a Meta Business API approval flow. `AGENTS.md` at the workspace root holds the full rules, and `npm run check:claims` enforces the phrases that have gone wrong before.

## After a deploy

Submit the URLs that changed to IndexNow by hand. It is not part of the build:

```bash
npm run indexnow -- --dry-run --since YYYY-MM-DD
npm run indexnow -- --since YYYY-MM-DD
```

See [SEO and sales notes](docs/seo-and-sales.md#indexnow).

## Social assets

- `public/icon.svg` is the source favicon mark
- `public/favicon.ico` contains common browser icon sizes
- `public/og-source.svg` is the editable 1200×630 social-card source
- `public/og.png` is the exported social card used by page metadata

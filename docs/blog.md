# Markdown blog: publishing and runtime

The blog's articles are ordinary Markdown files in `content/blog/`: sector guides, tool comparisons and general guides. `npm run check:content` prints the current counts. The file name is the public slug: `content/blog/como-automatizar-whatsapp-concesionaria.md` becomes `/blog/como-automatizar-whatsapp-concesionaria`.

## Add or edit an article

Copy a related article, choose a unique lowercase ASCII filename with hyphens, and edit its YAML frontmatter and Markdown body. The following is a frontmatter example, not a complete publishable article:

```yaml
---
title: "Cómo automatizar WhatsApp en tu negocio"
seoTitle: "WhatsApp para tu negocio: guía de automatización"
description: "Una descripción propia y concreta de lo que resuelve esta guía, para quién está escrita y qué aprenderá quien la lea."
summary: "Una respuesta directa a la consulta del lector, que explique el proceso recomendado y qué debe verificar una persona antes de confirmar una operación."
publishedAt: "2026-09-10"
updatedAt: "2026-09-10"
category: "guias"
sector: "Nombre del rubro" # Optional; omit for general guides and comparisons.
tags: ["WhatsApp", "automatización"]
related:
  - "como-automatizar-whatsapp-empresa"
  - "whatsapp-ia-atencion-humana"
draft: true
faq:
  - q: "¿Qué información necesita el negocio para empezar?"
    a: "Prepará respuestas vigentes, un responsable de revisión y los criterios para pasar una conversación a una persona."
  - q: "¿Se confirman acciones en otros sistemas automáticamente?"
    a: "Conectado a tu agenda, Atende reserva el turno. Esa conexión se arma a pedido para tu negocio; sin ella, el asistente junta los datos y tu equipo confirma."
sources:
  - title: "Nombre de una fuente oficial consultada"
    url: "https://example.com/documentacion"
    checkedAt: "2026-09-10"
---
```

Use quoted ISO dates (`YYYY-MM-DD`), two to six tags, two to four distinct related published slugs, and two to five FAQs. Search titles may have up to 68 characters, descriptions 70–180, summaries 80–600. Use H2 (`##`) sections and H3 subsections; the page template supplies the sole H1. Tables, lists, links, blockquotes and code are supported. Raw HTML, executable frontmatter and MDX are not supported. Raw HTML and unsafe links are removed before rendering.

The validator rejects malformed metadata, invalid calendar dates, unknown categories, duplicate metadata, future review dates and broken related links. All files, including drafts, must have valid content with at least three H2 sections and 300 words. This is a publication sanity check, not a claim that word count determines quality. Write original operational detail: information required, decisions, a useful conversation, exceptions and measurements. Avoid publishing variants that only swap a sector name.

Sector guides (posts with `sector`, plus any `como-automatizar-whatsapp-*` slug, so the general company guide counts too) also pass an anti-template guard. An H2 may appear in at most three guides, the median guide may share at most 10% of its 5-word sequences with other guides, and no single guide more than 20%. Comparisons get a 30% ceiling because they share criteria by design. `npm run check:content` prints the median and the worst guide whether it passes or not.

`draft: true` and future publication dates exclude an article from routes, listing, related links, sitemap, RSS and `llms.txt`. Scheduling uses the Argentine calendar date, the same clock as the `-03:00` dates in structured data. Do not point a published article at a draft or scheduled article. In a running deployment containing the file, it becomes available without a new build, up to one hour after midnight on its publication date; see [ISR and deployment](#isr-and-deployment). Set `updatedAt` only when the content really changes, and update source dates only when you consult those sources again.

Topics live in `src/content/blog-topics.ts`. To introduce a new topic, add a slug, name and useful description there; it appears when it has a published article. An optional `intro` renders under the H1 and accepts `[label](/path)` links: say what that trade delegates, and keep the connection wording from the next section. `rubroByTopic` in the same file links a topic to its `/casos-de-uso` page, which the article template shows next to the demo button. The UI, topic routes, sitemap and RSS derive their entries from published Markdown. To add another sector inside an existing topic, only add its Markdown file.

## Content and attribution

Articles are attributed to Equipo Atende, with the organization and editorial policy at `/blog/editorial`. The policy states that guides are drafted with AI assistance and reviewed by the team before publishing, so keep that true. Examples are labeled "Ejemplo ilustrativo"; they are not customer records or measured outcomes. Comparisons include official sources with consultation dates, disclose that Atende publishes them and say when a rival fits better. Do not invent rankings, migration compatibility, prices, customer results or product capabilities. Prices are confirmed through the existing buying flow.

Lead with a finished action and write it as conditional: "conectado a tu agenda, Atende reserva el turno; esa conexión se arma a pedido para tu negocio". Every piece that shows the connected path also says that without a connection the assistant collects the request and the team confirms. `src/content/status.ts` is the canonical list of what is included on AI plans and what is built on request, reminders included. A post that explains how Atende connects states the customer's choice once: "Elegís cómo conectar tu número: con la API oficial de Meta o con un QR." Restriction appears only where it affects the decision (reminders, outbound, comparing routes), in one neutral sentence tied to the route, with no promise either way. Guides for professional sectors describe administrative workflows; they do not provide professional advice.

## ISR and deployment

The app uses Next.js `output: 'standalone'`; publishing the old `out/` directory will not serve the blog. `/blog`, `/blog/[slug]`, `/blog/tema/[slug]`, `/sitemap.xml`, `/blog/feed.xml` and `/llms.txt` are prerendered at build time and regenerated at most once an hour (`revalidate = 3600`). Rendering them on every request bought nothing, since Markdown only changes at a deploy or on a scheduled date, and static pages remove the slow first hit. No browser fetch is needed to load an article's content or metadata.

ISR keeps drafts and scheduling working with these limits:

- **Scheduled posts go live without a build.** `generateStaticParams` lists only published posts, and `dynamicParams` stays `true` so a post scheduled after the build can render on demand. Setting it to `false` would turn every scheduled post into a permanent 404.
- **Allow up to an hour.** Each route regenerates on the first request after its hour expires and serves the previous version meanwhile. A scheduled post can take that long to appear on `/blog`, in the sitemap and in RSS.
- **A 404 is cached too.** If someone opens a scheduled post before its date, that 404 is stored for up to an hour, so the post may appear up to an hour after its date arrives.
- **`getPosts` must not be memoized at module level.** React's `cache` lasts one render, so each regeneration reads the files and today's date again. A module-level cache would freeze scheduled posts until the next deploy.
- **Invalid content cannot break live pages.** If a regeneration fails, Next.js keeps serving the last good version.
- **Pages outside the blog are not revalidated.** The homepage teaser and rubro pages are built once per deploy.

```bash
npm ci
npm run verify
npm start
```

Use Node.js 22.14 or newer. The build validates all Markdown, creates the standalone Next runtime, and copies public assets and `.next/static` into it. File tracing explicitly includes `content/blog/**/*.md`. The deployable directory is `.next/standalone/`; start its `server.js` with Node. `PORT` and `HOSTNAME` are supported by the generated server. When using a host with native Next.js support, deploy this repository using its Next.js server adapter instead of a static-site preset.

Adding or editing a Markdown file in the repository requires deploying it to the running environment. Rebuild after changing code, taxonomy or homepage features. Do not leave a CDN configured to serve the previous static `out/` site.

### Current production publishing path

As checked on 2026-11-04, `www.atende.com.ar` is served by the existing Vercel project `atende`. Its Git integration deploys `main` from `LeonelAlcazar/atendee`; GitHub's Production deployment records and the Vercel commit status identify the deployed revision. After `npm run verify` and visual review, commit the intended changes and push `origin main`. Observe that commit's Vercel status and Production deployment, then verify the custom domain rather than assuming a successful push is a successful release. Preserve the Next.js server runtime and Markdown file tracing.

```bash
gh api repos/LeonelAlcazar/atendee/commits/<full-sha>/status
gh api 'repos/LeonelAlcazar/atendee/deployments?sha=<full-sha>'
```

Check changed pages, article bodies, canonical URLs, internal links, `/sitemap.xml`, `/blog/feed.xml` and `/llms.txt` on `https://www.atende.com.ar`, and that the three merged guides redirect. Search Console submission is separate from deployment and needs access to the verified property. Submit changed URLs to [IndexNow](seo-and-sales.md#indexnow) by hand.

## SEO and generative search

Article pages include the full body, a short answer, an index, visible labeled dates, FAQs, sources where applicable, a link to the matching rubro and related reading. Metadata includes canonical, article Open Graph, Twitter card and RSS discovery. BlogPosting, BreadcrumbList, FAQPage and topic collection data describe visible content and share the site's organization identity. Structured data and Open Graph write dates as `YYYY-MM-DDT09:00:00-03:00`, the time being a fixed convention. The sitemap uses editorial modification dates, not the time of a build.

This follows [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) and [Next.js metadata documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata): crawlable useful content, internal links and matching metadata. It does not promise ranking, FAQ rich results or AI citations. No special AI text file is required for these Google features; `/llms.txt` exists only as a cheap hedge.

## Verification

`npm run check:content` checks the Markdown catalog and the anti-template guard. `npm run check:claims` fails on banned product claims. `npm test` covers safe rendering, metadata, dates, drafts, scheduling, related links, RSS, `llms.txt`, IndexNow and both checkers alongside the existing contact/schema tests. `npm run check:seo` starts the built standalone server on an available local port, audits all sitemap pages over HTTP, and stops its server when finished. It requires an existing build.

The HTTP audit compares the sitemap against source files and routes, verifies complete article bodies and metadata without executing JavaScript, checks visible schema/FAQ/source data, all internal links and fragments, social assets, feed completeness, real noindex 404s and inclusion of Markdown in the deployed runtime. It also checks the rubro pages, `/llms.txt`, the IndexNow key file, that the merged guides return a permanent redirect to their target and stay out of the sitemap and RSS, that drafts and scheduled posts return 404, and, through the Next prerender manifest, that the blog is static with hourly revalidation.

### Banned claims

`npm run check:claims` reads the copy in `src/content`, `src/app`, `src/components` and `content/blog`, skipping legal pages and code comments. The rules live in `src/lib/claims.ts`, each with the wording to use instead. Text that explains a limit passes on its own: a negated phrase ("no responde al instante"), a buyer's question ("¿Entiende audios?") and a phrase in quotes ("Cliengo promete “24/7”").

For anything else, such as a sentence that names a banned claim without negating it, add a documented exception. It needs a reason, and it covers its own line and the next two:

```text
<!-- claims-allow: quotes a competitor's headline -->   Markdown body
# claims-allow: this page explains the search phrase    YAML frontmatter
// claims-allow: explains the limit                     TypeScript
{/* claims-allow: explains the limit */}                JSX
```

The checker warns about an exception that no longer matches anything, so remove it.

After deployment, verify live new routes and submit the updated sitemap in the site's verified Search Console property. Search Console credentials are not present in this workspace. Indexing and visibility must be measured after publication.

### Catalog on 2026-11-06

55 published posts and 1 draft, including 27 posts with `sector` and 11 comparisons. `check:seo` audits 89 pages. The verification records below and in `seo-and-sales.md` are dated snapshots, so their counts stay as they were.

### Verification recorded on 2026-09-10

- A clean `npm ci` succeeded. The final `npm run verify` passed all 14 unit tests, TypeScript, content validation, the production build and the 63-page HTTP audit.
- The 40 articles contain 471–604 body words each, plus summaries and FAQs. The catalog covers 30 distinct sectors, six comparisons and four general guides.
- Playwright verified all 53 blog pages without JavaScript at 320, 390, 820 and 1440 pixels (212 page renders), with no horizontal overflow. Native FAQ keyboard interaction and the sources index link passed.
- Desktop navigation from index to topic to article, and mobile navigation back to the blog, passed. Screenshots and browser check scripts are in ignored `output/playwright/blog/`.
- The Node runtime uses Next.js 15.5.25; patched PostCSS and Sharp dependencies are selected through package overrides. `npm audit --omit=dev` reported no production dependency advisories at verification time. Review those overrides when upgrading the framework.

These are local production-runtime checks. The changes have not been deployed or submitted to Search Console from this workspace.

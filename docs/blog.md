# Markdown blog: publishing and runtime

The blog contains 40 initial articles: 30 sector guides, six comparisons and four general guides. They are ordinary Markdown files in `content/blog/`. The file name is the public slug: `content/blog/como-automatizar-whatsapp-concesionaria.md` becomes `/blog/como-automatizar-whatsapp-concesionaria`.

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
    a: "Las acciones sobre agendas, stock o CRM requieren evaluar y confirmar la integración antes de ofrecerlas al cliente."
sources:
  - title: "Nombre de una fuente oficial consultada"
    url: "https://example.com/documentacion"
    checkedAt: "2026-09-10"
---
```

Use quoted ISO dates (`YYYY-MM-DD`), two to six tags, two to four distinct related published slugs, and two to five FAQs. Search titles may have up to 68 characters, descriptions 70–180, summaries 80–600. Use H2 (`##`) sections and H3 subsections; the page template supplies the sole H1. Tables, lists, links, blockquotes and code are supported. Raw HTML, executable frontmatter and MDX are not supported. Raw HTML and unsafe links are removed before rendering.

The validator rejects malformed metadata, invalid calendar dates, unknown categories, duplicate metadata, future review dates and broken related links. All files, including drafts, must have valid content with at least three H2 sections and 300 words. This is a publication sanity check, not a claim that word count determines quality. Write original operational detail: information required, decisions, a useful conversation, exceptions and measurements. Avoid publishing variants that only swap a sector name.

`draft: true` and future publication dates exclude an article from routes, listing, related links, sitemap and RSS. Scheduling uses the UTC calendar date. Do not point a published article at a draft or scheduled article. In a running deployment containing the file, it becomes available on its publication date without a scheduled build. Set `updatedAt` when the article changes, and update source dates only when you consult those sources again.

Topics live in `src/content/blog-topics.ts`. To introduce a new topic, add a slug, name and useful description there; it appears when it has a published article. The UI, topic routes, sitemap and RSS derive their entries from published Markdown. To add another sector inside an existing topic, only add its Markdown file.

## Content and attribution

Articles are attributed to Equipo Atende, with the organization and editorial explanation at `/blog/editorial`. Examples are illustrative, not customer records or measured outcomes. Comparisons include official sources with consultation dates and disclose that Atende publishes them. Do not invent rankings, migration compatibility, prices, customer results or product capabilities. Prices are confirmed through the existing buying flow.

Current Atende functionality supports configured responses, QR connection, a shared conversation history and human intervention. Reservations, stock queries, CRM operations, proactive follow-ups and reminders need separately confirmed integrations. Guides for professional sectors describe administrative workflows; they do not provide professional advice.

## SSR and deployment

The app now uses Next.js `output: 'standalone'`; publishing the old `out/` directory will not serve the blog. `/blog`, `/blog/[slug]`, `/blog/tema/[slug]`, `/sitemap.xml` and `/blog/feed.xml` use request-time server rendering. Marketing pages retain prerendering where possible. No browser fetch is needed to load an article's content or metadata.

```bash
npm ci
npm run verify
npm start
```

Use Node.js 22.14 or newer. The build validates all Markdown, creates the standalone Next runtime, and copies public assets and `.next/static` into it. File tracing explicitly includes `content/blog/**/*.md`. The deployable directory is `.next/standalone/`; start its `server.js` with Node. `PORT` and `HOSTNAME` are supported by the generated server. When using a host with native Next.js support, deploy this repository using its Next.js server adapter instead of a static-site preset.

Adding or editing a Markdown file in the repository requires deploying it to the running environment. Persistent Node runtimes read the deployed files per request; immutable/serverless deployments need a new deployment for file changes. Rebuild after changing code, taxonomy or homepage features. Do not leave a CDN configured to serve the previous static `out/` site.

## SEO and generative search

Article pages include the full body, a short answer, an index, visible author/date, FAQs, sources where applicable and related reading. Metadata includes canonical, article Open Graph, Twitter card and RSS discovery. BlogPosting, BreadcrumbList, FAQPage and topic collection data describe visible content and share the site's organization identity. The sitemap uses editorial modification dates, not the time of a build.

This follows [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) and [Next.js metadata documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata): crawlable useful content, internal links and matching metadata. It does not promise ranking, FAQ rich results or AI citations. No special AI text file is required for these Google features.

## Verification

`npm run check:content` checks the Markdown catalog. `npm test` covers safe rendering, metadata, dates, drafts, scheduling, related links and RSS alongside the existing contact/schema tests. `npm run check:seo` starts the built standalone server on an available local port, audits all sitemap pages over HTTP, and stops its server when finished. It requires an existing build.

The HTTP audit compares the sitemap against source files and routes, verifies complete article bodies and metadata without executing JavaScript, checks visible schema/FAQ/source data, all internal links and fragments, social assets, feed completeness, real noindex 404s and inclusion of Markdown in the deployed runtime. It also checks the Next prerender manifest to ensure the blog uses request-time SSR.

After deployment, verify live new routes and submit the updated sitemap in the site's verified Search Console property. Search Console credentials are not present in this workspace. Indexing and visibility must be measured after publication.

### Verification recorded on 2026-09-10

- A clean `npm ci` succeeded. The final `npm run verify` passed all 14 unit tests, TypeScript, content validation, the production build and the 63-page HTTP audit.
- The 40 articles contain 471–604 body words each, plus summaries and FAQs. The catalog covers 30 distinct sectors, six comparisons and four general guides.
- Playwright verified all 53 blog pages without JavaScript at 320, 390, 820 and 1440 pixels (212 page renders), with no horizontal overflow. Native FAQ keyboard interaction and the sources index link passed.
- Desktop navigation from index to topic to article, and mobile navigation back to the blog, passed. Screenshots and browser check scripts are in ignored `output/playwright/blog/`.
- The Node runtime uses Next.js 15.5.25; patched PostCSS and Sharp dependencies are selected through package overrides. `npm audit --omit=dev` reported no production dependency advisories at verification time. Review those overrides when upgrading the framework.

These are local production-runtime checks. The changes have not been deployed or submitted to Search Console from this workspace.

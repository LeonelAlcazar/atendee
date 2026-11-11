# SEO, AI search and B2B sales

## Content and scope

The public audience is Spanish-speaking businesses and PyMEs in Argentina. The main conversion is a qualified demo inquiry; self-service account creation remains available. The homepage links to the solution pages, the six rubro pages through the use-case hub, pricing guidance and the demo request.

## November 2026 rebuild

The evidence collected for this rebuild says on-page technique explains little and third-party mentions matter most, so the site does five things and no more:

1. Lead every page with a finished task: the assistant books, quotes or records the order.
2. Answer one real buyer question per page, in the title and an early paragraph, in the buyer's words.
3. Remove the template. Each sector guide is its own piece, and `check:content` measures it.
4. Publish what rivals hide: a public status of what works today, plus real limits (text only, no test mode, how to pause the assistant) and the customer's choice of connection, Meta's official API or QR, with its trade-offs.
5. Keep a clean technical base: one entity, ISR, a redirect map, truthful dates and regression guards.

Claims follow an owner decision of 2026-11-06. Connected actions and reminders are a real offer built on request for each business, never included, never generic and never with a date. Inbox attribution is planned, not shipped, so copy never says the team sees who replied. `src/content/status.ts` is the canonical public status, and `AGENTS.md` holds the rules behind it. Where an older section below says an integration is "separately confirmed", that wording is superseded.

A second owner decision of the same day: the customer chooses how to connect the number, Meta's official API or QR. Any page that explains the connection states the choice once. Copy claims no Meta status (partner, Tech Provider, BSP, verified, approved), invents no Atende-specific detail of the API route (who pays Meta's fees, the app on that number, setup steps, timelines, prices) and promises nothing about restriction on either route. Commercial pages carry no restriction warnings, and the home has no limits section. Blog posts mention restriction only where it affects the decision, in one neutral sentence tied to the route.

Do not add per-bot robots rules, `.md` mirrors, `Accept: text/markdown`, new schema types (DefinedTermSet, ItemList, HowTo), hreflang, a glossary, `aggregateRating`, fabricated authors or self-ranked "best" lists. They have no measured benefit, and several break Google policy or Rule 2.

Three guides merged into broader ones. `guideRedirects` in `next.config.ts` holds the permanent redirects, and `check:seo` reads the same list:

| From `/blog/...` | To `/blog/...` |
| --- | --- |
| `como-automatizar-whatsapp-institutos-de-idiomas` | `como-automatizar-whatsapp-academias-y-cursos` |
| `como-automatizar-whatsapp-proveedores-agro` | `como-automatizar-whatsapp-distribuidoras` |
| `como-automatizar-whatsapp-taller-mecanico` | `como-automatizar-whatsapp-servicios-tecnicos` |

The work that matters most happens off the site. See the [off-site and measurement plan](geo-offsite-plan.md).

Product claims were checked against the sibling repositories on 2026-09-10:

- `atende-dashboard/src/app/t/[slug]/conversations/conversations-workspace.tsx`: shared conversation history, manual responses and human-attention states.
- `atende-dashboard/src/app/t/[slug]/whatsapp/connection-manager.tsx`: QR connection.
- `atende-agent/src/infrastructure/features/faq/faq.feature.ts` and `lifecycle/lifecycle.feature.ts`: configured answers and human escalation.
- `atende-dashboard/src/lib/billing/plans.ts`: monthly agent-response limits and plans filtered by deployment configuration. Public pricing points to the actual enabled checkout plans rather than duplicating potentially unavailable prices.

Calendar reservations, reminders, live stock and CRM operations are built on request for each business. Examples are explicitly illustrative. Do not add invented customer counts, testimonials, ratings, conversion uplifts, guaranteed availability, implementation deadlines or free-trial terms.

The existing Plan CRM and WhatsApp MCP pricing statements were rechecked against the current sibling repositories on 2026-10-28:

- `atende-subscription-service/src/database/migrations/0005_add_crm_plan.ts` defines the manual-only CRM plan with no agent responses or automation; its price remains a commercial configuration.
- `atende-subscription-service/src/subscriptions/domain/plan-entitlements.ts` enforces the CRM automation restriction and normalizes `whatsappMcp` to true across plans.
- `atende-dashboard/src/lib/public-mcp/server.ts` exposes authorized tools for existing WhatsApp conversations and connection status. Its message-sending tool requires the appropriate consent and returns a queued result, not delivery confirmation.

WhatsApp MCP access does not imply that any external CRM, inventory, booking or proactive workflow is included or already configured. The published integration limits still apply.

## Search implementation

- Public pages serve complete HTML with descriptive titles, descriptions, canonical URLs and social previews. Solution and rubro routes use `generateStaticParams`; the Markdown blog is prerendered and revalidated hourly. See [blog publishing and runtime](blog.md#isr-and-deployment).
- Organization, WebSite and SoftwareApplication entities share stable IDs across pages. `entityGraph` in `src/lib/structured-data.ts` builds them from the catalogs. The name is `Atende`, and `alternateName` is `atende.com.ar`, the only other name in real use. `sameAs` appears only when `site.sameAs` holds owner-confirmed profiles. Legal name, tax ID and founding date stay out until the owner supplies them. `featureList` comes from the public status table, with connected actions first and each labeled "A pedido". There is no `offers`, because prices live in the app.
- Commercial pages include WebPage metadata with `dateModified` from the page's `updated` date, visible breadcrumbs where applicable and Service entities on solution details. All schema dates carry the `-03:00` timezone.
- FAQ markup and the accessible HTML disclosures use the same content objects. This improves consistency; it does not promise a FAQ rich result or an AI citation.
- `src/content/pages.ts`, the solution and rubro catalogs and published Markdown feed the sitemap. Change dates reflect content changes, not every build. Legal dates remain tied to their documents.
- `/llms.txt` is generated from the same catalogs, so it cannot drift. It follows the [llmstxt.org](https://llmstxt.org/) format and states what works today. It is a hedge: no major engine has confirmed using it and Google Search says it does not.
- Robots permits public crawling and the metadata permits search snippets and large image previews. Unknown URLs retain a real 404 and noindex.
- The SVG source and generated PNG social card describe the same product positioning as the homepage.

The implementation follows [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) and [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Google recommends crawlable, helpful content, internal links and structured data consistent with visible content. Special AI text files are not required for its AI search features. Search inclusion and ranking still depend on the search engines.

### IndexNow

IndexNow tells Bing, Copilot and the other participating engines that a URL changed. A submission reaches all participants. Google does not take part, and nothing suggests it helps ChatGPT. It is a manual step after a deploy, never part of the build:

```bash
# See what would be sent. This never contacts IndexNow.
npm run indexnow -- --dry-run --since 2026-11-06

# Submit, once the deploy is live and the dry run looks right.
npm run indexnow -- --since 2026-11-06
```

The script reads the live sitemap and sends one batch. `--since` keeps only URLs whose `lastmod` is on or after that date; use it every time, because the protocol asks for changed URLs only. Leave at least five minutes between updates to the same URL. `--sitemap <url-or-file>` reads another sitemap, which is useful with `--dry-run`.

The key is the file `public/<key>.txt`, which contains its own name and must be live before the first submission. To rotate it, replace the file and deploy; the script finds the key on its own. A 202 response means the key is still being validated; the script explains the other statuses.

## October 2026 Search Console iteration

The [full analysis and measurement plan](search-console-2026-10-28.md) covers all seven supplied CSVs. The daily series contains 10 clicks and 341 impressions from September 9 through October 26, 2026. Page rows sum to 433 impressions because they use URL aggregation. Visible queries account for only 2 clicks and 127 impressions; independent query and page exports cannot establish query-to-page attribution.

The changes target a clearer product definition on the homepage, commercial inquiry and quotation scope on `/servicios/ventas-whatsapp`, deeper distribution and Zenvia guides, focused updates to existing supporting articles, and two new guides for quotations and attention outside business hours. Existing article URLs stay stable. The home and sales service link to the relevant operational guides, and service modification dates follow actual content edits.

The editorial scope preserves the customer's connection choice (Meta's official API or QR), human review, and separately confirmed integrations. “24/7” describes an inquiry intent, not a service availability guarantee or round-the-clock human staffing. Search Console data provides prioritization hypotheses; it does not support invented traffic forecasts, sales attribution or a claim that zero-click pages have failed.

Before describing this iteration as live, record its deployed commit and verify the production routes, metadata, links and sitemap. Keep that evidence separate from local validation results. Sitemap submission and URL inspection also require access to the verified `atende.com.ar` Search Console property; checking a public sitemap is not the same as submitting it.

Google ended FAQ rich results on May 7, 2026, as recorded in its [documentation updates](https://developers.google.com/search/updates#may-2026). Visible FAQs remain useful, and any retained FAQ schema must match them. The empty search-appearance export does not establish a schema defect.

## Additional comparison guides

Three subsequent comparisons cover alternatives to Botmaker, Aivo and Callbell. They focus respectively on process execution, answer quality and shared team attention, with plural options, primary sources checked on October 28, 2026, and concrete evaluation scenarios. This is an editorial expansion; the supplied Search Console exports do not establish demand for those three brands. The original report remains a record of the earlier 42-article iteration.

The new articles link to related comparisons and operational guides, with contextual links from the existing Zenvia and respond.io articles. The footer links directly to `/blog/tema/alternativas` so visitors can find all eleven comparisons.

## November 2026: bot de WhatsApp

Four guides address distinct reader tasks rather than repeating the same query:

| Route | Reader task |
| --- | --- |
| `/blog/bot-de-whatsapp` | Understand bot types, scope and connection choices. |
| `/blog/como-crear-un-bot-de-whatsapp` | Prepare information, configure a first workflow and test exceptions. |
| `/blog/bot-de-whatsapp-gratis-o-pago` | Choose between basic app tools, a limited automation trial and paid usage. |
| `/blog/bot-de-whatsapp-con-ia-para-ventas` | Qualify sales inquiries and hand off with context and pending confirmations. |

The homepage targets the commercial product query, pricing addresses Atende's buying conditions, and the new `/blog/tema/bot-de-whatsapp` collection organizes the educational guides. Homepage features, contextual service/pricing links, the footer and existing implementation, cost, free-credits and human-handoff guides provide discovery paths. Existing article publication dates stay unchanged; their review dates reflect the added guidance and links.

Answer summaries, examples, comparison tables, FAQs, primary sources and clear product limits make each article useful to readers and interpretable by search and answer engines. The existing server-rendered content, canonical metadata, BlogPosting/collection data, RSS and sitemap derive from the same catalog. This is an implementation for discoverability; indexing, rankings and AI citations require observation after publication.

The free-versus-paid article complements `/blog/automatizar-whatsapp-gratis`: the former helps choose an approach, while the latter documents activation of the current welcome credits. Plan CRM remains manual-only. The QR route must not be described as WhatsApp Business Platform onboarding, and the API route gets no Atende-specific setup steps until they are confirmed. Features of the WhatsApp Business app and eligibility-dependent Meta offerings must be checked against current primary documentation before making comparisons.

Local release verification on 2026-11-04 passed `npm run verify`: 14 tests, TypeScript, 50-article validation, the standalone production build and the 74-page HTTP SEO audit. Browser review covered the homepage, pricing, service index, attention and sales solutions, blog index, new topic and four new articles at 320, 390 and 1440 pixels without document overflow. Article index navigation and native FAQ keyboard interaction passed. Ignored evidence is stored under `output/seo-bot-whatsapp/` and `output/playwright/`. Production confirmation is a separate check against the deployed commit and custom domain.

## Conversion flow and measurement

`/precios` server-renders the anonymous general catalog from the fixed app HTTPS gateway `/api/public/plans`, without credentials and with no caching. It accepts exactly the six public presentation fields, preserves the price label literally, and shows an honest empty/error state without static prices. Its “Continuar en la app” CTA keeps the fixed entry `https://app.atende.com.ar/planes`; that flow checks membership and shows the space's eligible catalog. The public link carries no tenant, plan, price or return URL, and viewing either catalog never starts checkout. Generic account links and service-owned welcome rewards are unchanged. Deploy and verify the public service and app gateway before publishing this page. The HTTP audit supplies a fake loopback catalog through the server-only `ATENDE_PUBLIC_PLANS_URL` override and verifies fresh SSR results, empty/error recovery, and absence of provider/tenant fields; no production API is used.

`/demo` asks only for the business name and priority task. System, approximate monthly inquiry volume and notes are optional under “Sumar contexto”. The visitor chooses WhatsApp or the quieter email fallback; valid details open a draft directly in that channel, where the visitor reviews and sends it. Preparing or opening a draft is **not** a submitted lead or a confirmed booking. No inquiry is stored or transmitted by the site. Direct contact links remain available without JavaScript, and a prepared-message fallback remains visible if the channel does not open.

One allowlisted source catalog preserves context into the demo form. The six rubro pages retain their `rubro` links; the three service pages use `desde` to preselect their existing task, which the visitor can change. Integrations and pricing pass only a known public page, leaving the task unanswered. The draft includes the catalogued page as a reference and keeps the visitor's chosen task. This is context supplied by a known link, not verified analytics attribution. Homepage demo links stay neutral, and the form adds no choices.

Unknown or inherited source keys and duplicate values are ignored. If `desde` is present, it takes precedence over legacy `rubro`; an invalid `desde` does not fall back to another source. Arbitrary task, company, notes, URLs and other query values never prefill the form or appear in the draft. Prefill is read in the browser so `/demo` stays statically rendered; analytics hooks receive neither the source query nor the form values. A prepared draft remains an inquiry to review and send, not a submitted lead or a confirmed appointment.

The site emits `atende:conversion` browser events and forwards them to `window.dataLayer` only if an analytics integration already supplies it:

| Event | Meaning | Fields |
| --- | --- | --- |
| `atende_cta_click` | Visitor chooses a demo, app, WhatsApp or email action | `page`, `destination`, `placement` |
| `atende_demo_prepared` | Valid form details produce a draft for review in WhatsApp or email | `page`, `placement` |

These hooks make no network requests and set no cookies or browser storage. They contain no company name, inquiry text, full outbound URL or query parameters. No analytics account or collector is configured in this repository. Wire a chosen collector to these events to measure visits-to-contact clicks; record actual qualified leads and sales in the sales system. Do not count a contact click as a sale.

## Verification and ongoing operation

Run `npm run verify` to execute unit tests, TypeScript, the claims check, the production build and the HTTP audit. `npm run check:seo` starts the built standalone server and checks every public page, including the Markdown catalog, for canonical and social metadata, sitemap completeness, visible schema content, internal links and fragments, crawl rules and sales CTAs. It also verifies ISR, RSS, `llms.txt`, redirects, the IndexNow key file and real 404 responses. `npm run check:claims` fails on claims the product cannot back; [blog publishing](blog.md#banned-claims) explains its rules and exceptions.

For browser checks, run the production server with `npm start` and verify desktop, mobile and tablet navigation; native required-field validation with only business and task completed; optional context disclosure; rubro task prefill and editing; both outbound drafts; the prepared-message fallback; FAQ disclosures; and the no-JavaScript contact fallback. Browser and Lighthouse artifacts belong in ignored `output/playwright/`.

After deployment, check the live sitemap and new routes, submit `https://www.atende.com.ar/sitemap.xml` in the site's verified Search Console property, and run [IndexNow](#indexnow). No Search Console credentials or analytics property are present in this repository. Monitor indexing, query relevance, demo inquiries and qualified opportunities over time, following the [measurement plan](geo-offsite-plan.md#medición). Keep catalog price labels and limits in Subscription Service; do not duplicate them in site content.

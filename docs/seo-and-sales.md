# SEO, AI search and B2B sales

## Content and scope

The public audience is Spanish-speaking businesses and PyMEs in Argentina. The main conversion is a qualified demo inquiry; self-service account creation remains available. The homepage links to three distinct solution pages, a use-case page, pricing guidance and the demo request.

Product claims were checked against the sibling repositories on 2026-09-10:

- `atende-dashboard/src/app/t/[slug]/conversations/conversations-workspace.tsx`: shared conversation history, manual responses and human-attention states.
- `atende-dashboard/src/app/t/[slug]/whatsapp/connection-manager.tsx`: QR connection.
- `atende-agent/src/infrastructure/features/faq/faq.feature.ts` and `lifecycle/lifecycle.feature.ts`: configured answers and human escalation.
- `atende-dashboard/src/lib/billing/plans.ts`: monthly agent-response limits and plans filtered by deployment configuration. Public pricing points to the actual enabled checkout plans rather than duplicating potentially unavailable prices.

Calendar reservations, proactive follow-ups, reminders, live stock and CRM operations require a separately confirmed integration. Examples are explicitly illustrative. Do not add invented customer counts, testimonials, ratings, conversion uplifts, guaranteed availability, implementation deadlines or free-trial terms.

The existing Plan CRM and WhatsApp MCP pricing statements were rechecked against the current sibling repositories on 2026-10-28:

- `atende-subscription-service/src/database/migrations/0005_add_crm_plan.ts` defines the manual-only CRM plan with no agent responses or automation; its price remains a commercial configuration.
- `atende-subscription-service/src/subscriptions/domain/plan-entitlements.ts` enforces the CRM automation restriction and normalizes `whatsappMcp` to true across plans.
- `atende-dashboard/src/lib/public-mcp/server.ts` exposes authorized tools for existing WhatsApp conversations and connection status. Its message-sending tool requires the appropriate consent and returns a queued result, not delivery confirmation.

WhatsApp MCP access does not imply that any external CRM, inventory, booking or proactive workflow is included or already configured. The published integration limits still apply.

## Search implementation

- Public pages serve complete HTML with descriptive titles, descriptions, canonical URLs and social previews. Solution routes use `generateStaticParams`; the Markdown blog uses request-time SSR. The catalog contains 50 articles, including nine comparisons, 12 topic pages, a blog index and editorial page. See [blog publishing and runtime](blog.md).
- Organization, WebSite and SoftwareApplication entities share stable IDs across pages. Commercial pages include WebPage metadata, visible breadcrumbs where applicable and Service entities on solution details.
- FAQ markup and the accessible HTML disclosures use the same content objects. This improves consistency; it does not promise a FAQ rich result or an AI citation.
- `src/content/pages.ts`, the solution catalog and published Markdown feed the sitemap. Change dates reflect content changes, not every build. Legal dates remain tied to their documents.
- Robots permits public crawling and the metadata permits search snippets and large image previews. Unknown URLs retain a real 404 and noindex.
- The SVG source and generated PNG social card describe the same product positioning as the homepage.

The implementation follows [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) and [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Google recommends crawlable, helpful content, internal links and structured data consistent with visible content. Special AI text files are not required for its AI search features. Search inclusion and ranking still depend on the search engines.

## October 2026 Search Console iteration

The [full analysis and measurement plan](search-console-2026-10-28.md) covers all seven supplied CSVs. The daily series contains 10 clicks and 341 impressions from September 9 through October 26, 2026. Page rows sum to 433 impressions because they use URL aggregation. Visible queries account for only 2 clicks and 127 impressions; independent query and page exports cannot establish query-to-page attribution.

The changes target a clearer product definition on the homepage, commercial inquiry and quotation scope on `/servicios/ventas-whatsapp`, deeper distribution and Zenvia guides, focused updates to existing supporting articles, and two new guides for quotations and attention outside business hours. Existing article URLs stay stable. The home and sales service link to the relevant operational guides, and service modification dates follow actual content edits.

The editorial scope preserves QR connection, human review, and separately confirmed integrations. “24/7” describes an inquiry intent, not a service availability guarantee or round-the-clock human staffing. Search Console data provides prioritization hypotheses; it does not support invented traffic forecasts, sales attribution or a claim that zero-click pages have failed.

Before describing this iteration as live, record its deployed commit and verify the production routes, metadata, links and sitemap. Keep that evidence separate from local validation results. Sitemap submission and URL inspection also require access to the verified `atende.com.ar` Search Console property; checking a public sitemap is not the same as submitting it.

Google ended FAQ rich results on May 7, 2026, as recorded in its [documentation updates](https://developers.google.com/search/updates#may-2026). Visible FAQs remain useful, and any retained FAQ schema must match them. The empty search-appearance export does not establish a schema defect.

## Additional comparison guides

Three subsequent comparisons cover alternatives to Botmaker, Aivo and Callbell. They focus respectively on process execution, answer quality and shared team attention, with plural options, primary sources checked on October 28, 2026, and concrete evaluation scenarios. This is an editorial expansion; the supplied Search Console exports do not establish demand for those three brands. The original report remains a record of the earlier 42-article iteration.

The new articles link to related comparisons and operational guides, with contextual links from the existing Zenvia and respond.io articles. The footer links directly to `/blog/tema/alternativas` so visitors can find all nine comparisons.

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

The free-versus-paid article complements `/blog/automatizar-whatsapp-gratis`: the former helps choose an approach, while the latter documents activation of the current welcome credits. Plan CRM remains manual-only. Atende's QR connection must not be described as WhatsApp Business Platform onboarding. Features of the WhatsApp Business app and eligibility-dependent Meta offerings must be checked against current primary documentation before making comparisons.

Local release verification on 2026-11-04 passed `npm run verify`: 14 tests, TypeScript, 50-article validation, the standalone production build and the 74-page HTTP SEO audit. Browser review covered the homepage, pricing, service index, attention and sales solutions, blog index, new topic and four new articles at 320, 390 and 1440 pixels without document overflow. Article index navigation and native FAQ keyboard interaction passed. Ignored evidence is stored under `output/seo-bot-whatsapp/` and `output/playwright/`. Production confirmation is a separate check against the deployed commit and custom domain.

## Conversion flow and measurement

`/demo` prepares a message containing the company, approximate monthly inquiry volume, priority and optional context. The visitor reviews it and chooses WhatsApp or email. Preparing a message is **not** a submitted lead or a confirmed booking. No inquiry is stored or transmitted by the site; sending takes place through the selected channel. Direct contact links remain available without JavaScript.

The site emits `atende:conversion` browser events and forwards them to `window.dataLayer` only if an analytics integration already supplies it:

| Event | Meaning | Fields |
| --- | --- | --- |
| `atende_cta_click` | Visitor clicks a demo, app, WhatsApp or email link | `page`, `destination`, `placement` |
| `atende_demo_prepared` | Visitor prepares a valid inquiry for review | `page`, `placement` |

These hooks make no network requests and set no cookies or browser storage. They contain no company name, inquiry text, full outbound URL or query parameters. No analytics account or collector is configured in this repository. Wire a chosen collector to these events to measure visits-to-contact clicks; record actual qualified leads and sales in the sales system. Do not count a contact click as a sale.

## Verification and ongoing operation

Run `npm run verify` to execute unit tests, TypeScript, the production build and the HTTP audit. `npm run check:seo` starts the built standalone server and checks every public page, including the Markdown catalog, for canonical and social metadata, sitemap completeness, visible schema content, internal links and fragments, crawl rules and sales CTAs. It also verifies SSR, RSS and real 404 responses.

For browser checks, run the production server with `npm start` and verify desktop, mobile and tablet navigation; native required-field validation; inquiry preview; both outbound URLs; FAQ disclosures; and the no-JavaScript contact fallback. Browser and Lighthouse artifacts belong in ignored `output/playwright/`.

After deployment, check the live sitemap and new routes, then submit `https://www.atende.com.ar/sitemap.xml` in the site's verified Search Console property. No Search Console credentials or analytics property are present in this repository. Monitor indexing, query relevance, demo inquiries and qualified opportunities over time. Keep prices in sync with checkout if public numeric pricing is introduced later.

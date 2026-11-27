import assert from 'node:assert/strict';
import { readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { createServer as createHttpServer } from 'node:http';
import { once } from 'node:events';
import { loadPosts, parsePost } from '../src/lib/blog-content.ts';
import { toSchemaDate } from '../src/lib/dates.ts';
import { pages, legalPages } from '../src/content/pages.ts';
import { rubros } from '../src/content/rubros.ts';
import { servicios } from '../src/content/servicios.ts';
import { actionStatus } from '../src/content/status.ts';
import { site } from '../src/content/site.ts';
import {
  blogTopics,
  editorialPage,
  rubroByTopic,
} from '../src/content/blog-topics.ts';
import { guideRedirects } from '../next.config.ts';
import { buildDemoLink } from '../src/lib/leads.ts';
import { nextStepPath } from '../src/lib/blog-closing.ts';
import { catalogSentence } from '../src/lib/pricing-copy.ts';
import {
  buildSignupLink,
  pageRef,
  refPattern,
  signupRef,
} from '../src/lib/signup.ts';
import { buildWaLink, waRef } from '../src/lib/wa.ts';
import { load } from 'cheerio';

// Start the actual production runtime on an available local port and audit HTTP HTML.
const reservation = createServer();
reservation.listen(0, '127.0.0.1');
await once(reservation, 'listening');
const port = reservation.address().port;
await new Promise((resolve, reject) =>
  reservation.close((error) => (error ? reject(error) : resolve())),
);
const root = new URL('../', import.meta.url);
const base = `http://127.0.0.1:${port}`;
let catalogStatus = 200;
let catalogData = [
  {
    name: 'Plan público de prueba',
    priceLabel: 'Importe de prueba no numérico',
    bestFor: 'Negocio de prueba',
    monthlyAgentResponseLimit: 1234,
    automationAllowed: true,
    recommended: true,
  },
  {
    name: 'Plan manual de prueba',
    priceLabel: 'Precio manual de prueba',
    bestFor: null,
    monthlyAgentResponseLimit: 0,
    automationAllowed: false,
    recommended: false,
  },
  {
    name: 'Plan sin cupo de prueba',
    priceLabel: 'Precio sin cupo de prueba',
    bestFor: null,
    monthlyAgentResponseLimit: 0,
    automationAllowed: true,
    recommended: false,
  },
];
const catalogRequests = [];
const catalog = createHttpServer((request, response) => {
  catalogRequests.push({ path: request.url, headers: request.headers });
  response.writeHead(catalogStatus, {
    'content-type': 'application/json',
    'cache-control': 'no-store',
  });
  response.end(JSON.stringify(catalogData));
});
catalog.listen(0, '127.0.0.1');
await once(catalog, 'listening');
// The /precios regenerations below write to the standalone runtime's cache.
// Keep the build's copy and put it back afterwards, so `npm start` serves the
// page the build produced.
const standaloneApp = new URL('.next/standalone/.next/server/app/', root);
const fetchCache = new URL('.next/standalone/.next/cache/fetch-cache/', root);
const pricingFiles = ['precios.html', 'precios.meta', 'precios.rsc'];
const pricingSnapshot = await Promise.all(
  pricingFiles.map((file) => readFile(new URL(file, standaloneApp)).catch(() => null)),
);
const fetchCacheBefore = new Map(
  await Promise.all(
    (await readdir(fetchCache).catch(() => [])).map(async (file) => [
      file,
      await readFile(new URL(file, fetchCache)).catch(() => null),
    ]),
  ),
);
const restoreRuntimeCache = async () => {
  await Promise.all(
    pricingFiles.map((file, index) =>
      pricingSnapshot[index]
        ? writeFile(new URL(file, standaloneApp), pricingSnapshot[index])
        : rm(new URL(file, standaloneApp), { force: true }),
    ),
  );
  for (const file of await readdir(fetchCache).catch(() => [])) {
    const saved = fetchCacheBefore.get(file);
    if (saved) await writeFile(new URL(file, fetchCache), saved);
    else await rm(new URL(file, fetchCache), { force: true, recursive: true });
  }
};
const child = spawn(process.execPath, ['.next/standalone/server.js'], {
  cwd: root,
  env: {
    ...process.env,
    PORT: String(port),
    HOSTNAME: '127.0.0.1',
    ATENDE_PUBLIC_PLANS_URL: `http://127.0.0.1:${catalog.address().port}/api/public/plans`,
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let serverOutput = '';
child.stdout.on('data', (chunk) => {
  serverOutput = (serverOutput + chunk).slice(-8000);
});
child.stderr.on('data', (chunk) => {
  serverOutput = (serverOutput + chunk).slice(-8000);
});
child.on('error', (error) => {
  serverOutput += error.message;
});
try {
  let ready = false;
  for (let attempt = 0; attempt < 200; attempt++) {
    if (child.exitCode !== null)
      throw new Error(`Production server exited: ${serverOutput}`);
    try {
      if ((await fetch(base + '/robots.txt')).ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, `Production server did not start: ${serverOutput}`);

  const origin = 'https://www.atende.com.ar';
  const prerender = JSON.parse(
    await readFile(new URL('.next/prerender-manifest.json', root), 'utf8'),
  );
  const read = async (path) => {
    const response = await fetch(`${base}/${path.replace(/^\//, '')}`);
    assert.equal(response.status, 200, `${path}: expected HTTP 200`);
    return response.text();
  };
  const posts = loadPosts();
  const rubroPaths = rubros.map((rubro) => `/casos-de-uso/${rubro.slug}`);
  assert.deepEqual(
    rubros.map((rubro) => rubro.slug).sort(),
    [
      'clinicas-y-consultorios',
      'comercios-y-distribuidoras',
      'concesionarias-e-inmobiliarias',
      'peluquerias-y-estetica',
      'restaurantes-y-hoteles',
      'servicios-profesionales',
    ],
    'The six rubros must be published',
  );
  const expectedPaths = [
    ...Object.values(pages).map((page) => page.path),
    ...servicios.map((service) => `/servicios/${service.slug}`),
    ...rubroPaths,
    ...legalPages.map((page) => page.path),
    '/blog',
    editorialPage.path,
    ...blogTopics
      .filter((topic) => posts.some((post) => post.category === topic.slug))
      .map((topic) => `/blog/tema/${topic.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`),
  ];
  const sitemap = load(await read('sitemap.xml'), { xml: true });
  const urls = sitemap('url > loc')
    .map((_, el) => sitemap(el).text())
    .get();
  assert.equal(
    new Set(urls).size,
    urls.length,
    'Sitemap contains duplicate URLs',
  );
  assert.deepEqual(
    [...urls].sort(),
    expectedPaths.map((path) => (path === '/' ? origin : origin + path)).sort(),
    'Sitemap must cover every public page and every published Markdown post',
  );
  for (const path of [
    '/que-es-atende',
    '/integraciones',
    '/preguntas-frecuentes',
    '/nosotros',
    ...rubroPaths,
  ])
    assert.ok(urls.includes(origin + path), `${path}: missing from sitemap`);
  const commercialDates = new Map([
    ...Object.values(pages).map((page) => [page.path, page.updated]),
    ...servicios.map((service) => [
      `/servicios/${service.slug}`,
      service.updated,
    ]),
    ...rubros.map((rubro) => [`/casos-de-uso/${rubro.slug}`, rubro.updated]),
  ]);
  for (const entry of sitemap('url').toArray()) {
    const path = new URL(sitemap(entry).find('loc').text()).pathname;
    if (!commercialDates.has(path)) continue;
    assert.equal(
      sitemap(entry).find('lastmod').text().slice(0, 10),
      commercialDates.get(path),
      `${path}: sitemap date must reflect this page's content update`,
    );
  }
  const appOrigin = 'https://app.atende.com.ar';
  const titles = new Set();
  const descriptions = new Set();
  const documents = new Map();
  const normalize = (text) => text.replace(/\s+/g, ' ').trim();

  for (const url of urls) {
    const parsed = new URL(url);
    assert.equal(parsed.origin, origin, `Wrong sitemap origin: ${url}`);
    assert.equal(
      parsed.search + parsed.hash,
      '',
      `Noncanonical sitemap URL: ${url}`,
    );
    const $ = load(await read(parsed.pathname));
    documents.set(parsed.pathname, $);
    assert.equal($('html').attr('lang'), 'es-AR', `${url}: language`);
    assert.equal($('main').length, 1, `${url}: main landmark`);
    assert.equal($('h1').length, 1, `${url}: must have exactly one H1`);
    assert.equal($('link[rel="canonical"]').length, 1, `${url}: one canonical`);
    assert.equal(
      $('link[rel="canonical"]').attr('href'),
      url,
      `${url}: canonical`,
    );
    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content');
    assert.ok(
      title.length > 15 && title.length < 80,
      `${url}: descriptive title`,
    );
    assert.ok(
      description?.length > 60 && description.length < 190,
      `${url}: description`,
    );
    assert.ok(!titles.has(title), `${url}: duplicate title`);
    assert.ok(!descriptions.has(description), `${url}: duplicate description`);
    titles.add(title);
    descriptions.add(description);
    assert.ok(
      !$('meta[name="robots"]')
        .toArray()
        .some((el) => /noindex|nosnippet/.test($(el).attr('content'))),
      `${url}: index/snippet blocked`,
    );
    assert.equal(
      $('meta[property="og:url"]').attr('content'),
      url,
      `${url}: OG URL`,
    );
    assert.equal(
      $('meta[property="og:title"]').attr('content'),
      title,
      `${url}: social title`,
    );
    assert.equal(
      $('meta[name="twitter:card"]').attr('content'),
      'summary_large_image',
    );
    const socialImage = $('meta[property="og:image"]').attr('content');
    assert.equal(new URL(socialImage).origin, origin);
    assert.ok(
      (await fetch(base + new URL(socialImage).pathname)).status === 200,
    );
    assert.ok(
      $('meta[property="og:image:alt"]').attr('content'),
      `${url}: OG image alt`,
    );
    const graphs = $('script[type="application/ld+json"]')
      .map((_, el) => JSON.parse($(el).text())['@graph'])
      .get();
    const nodes = [];
    const collectNodes = (value) => {
      if (Array.isArray(value)) value.forEach(collectNodes);
      else if (value && typeof value === 'object') {
        nodes.push(value);
        Object.values(value).forEach(collectNodes);
      }
    };
    collectNodes(graphs);
    const identified = nodes.filter((node) => node['@id']);
    const defined = identified.filter((node) => Object.keys(node).length > 1);
    for (const { '@id': id } of identified) {
      assert.ok(
        defined.some((node) => node['@id'] === id),
        `${url}: dangling ${id}`,
      );
      const urls = defined
        .filter((node) => node['@id'] === id && node.url)
        .map((node) => node.url);
      assert.ok(new Set(urls).size <= 1, `${url}: conflicting urls for ${id}`);
    }
    assert.ok(
      graphs.some((node) => node['@type'] === 'Organization'),
      `${url}: organization`,
    );
    assert.ok(
      graphs.some((node) => node['@type'] === 'WebSite'),
      `${url}: website`,
    );
    const organization = graphs.find((node) => node['@type'] === 'Organization');
    assert.equal(organization.name, 'Atende', `${url}: organization name`);
    for (const key of ['legalName', 'taxID', 'foundingDate'])
      assert.ok(!(key in organization), `${url}: unconfirmed ${key}`);
    assert.ok(
      !('sameAs' in organization) || organization.sameAs.length,
      `${url}: empty sameAs`,
    );
    const software = graphs.find(
      (node) => node['@type'] === 'SoftwareApplication',
    );
    assert.ok(software && !('offers' in software), `${url}: software offers`);
    const visible = $.root().clone();
    visible.find('script, style, noscript').remove();
    const visibleText = normalize(visible.text());
    for (const node of graphs) {
      assert.ok(
        !node.aggregateRating && !node.review,
        `${url}: unverified review markup`,
      );
      if (node['@type'] === 'FAQPage') {
        for (const item of node.mainEntity) {
          assert.ok(
            visibleText.includes(normalize(item.name)),
            `${url}: invisible FAQ question`,
          );
          assert.ok(
            visibleText.includes(normalize(item.acceptedAnswer.text)),
            `${url}: invisible FAQ answer`,
          );
        }
        assert.equal(
          $('details').length,
          node.mainEntity.length,
          `${url}: FAQ/schema drift`,
        );
      }
      if (node['@type'] === 'BreadcrumbList') {
        const visibleCrumbs = $('[aria-label="Ruta de navegación"]').text();
        for (const item of node.itemListElement)
          assert.ok(
            visibleCrumbs.includes(item.name),
            `${url}: breadcrumb mismatch`,
          );
      }
      if (node['@type'] === 'Service')
        assert.ok(
          visibleText.includes(normalize(node.description)),
          `${url}: invisible service description`,
        );
    }
    if (
      !parsed.pathname.includes('privacidad') &&
      !parsed.pathname.includes('terminos')
    ) {
      assert.ok(
        graphs.some((node) => node['@type'] === 'WebPage' && node.url === url),
        `${url}: page entity`,
      );
      const pageDate = commercialDates.get(parsed.pathname);
      if (pageDate)
        assert.equal(
          graphs.find((node) => node['@type'] === 'WebPage').dateModified,
          toSchemaDate(pageDate),
          `${url}: WebPage dateModified`,
        );
      assert.ok(
        $('a[href="/demo"], a[href^="https://wa.me/"]').length,
        `${url}: missing sales CTA`,
      );
    }
    const ids = $('[id]')
      .map((_, el) => $(el).attr('id'))
      .get();
    assert.equal(new Set(ids).size, ids.length, `${url}: duplicate element id`);
    // Every team WhatsApp prefill outside an article body names its source.
    for (const anchor of $(`a[href^="https://wa.me/${site.whatsapp.number}?text="]`).toArray()) {
      if ($(anchor).closest('.blog-prose').length) continue;
      const text = new URL($(anchor).attr('href')).searchParams.get('text');
      assert.match(text, /\(Ref: [^)]+\)$/, `${url}: WhatsApp prefill without a source reference`);
    }
    // Sign-up links open the app's sign-up door with a ref; "Entrar" stays
    // the bare app root.
    for (const anchor of $('a[href^="https://app.atende.com.ar"]').toArray()) {
      const href = $(anchor).attr('href');
      const label = normalize($(anchor).text());
      const target = new URL(href);
      if (/^Entrar\b/.test(label))
        assert.equal(href, appOrigin, `${url}: "${label}" must open the app root`);
      if (/^(Crear mi espacio|Empezá en la app)$/.test(label))
        assert.equal(target.pathname, '/empezar', `${url}: "${label}" must open the sign-up door`);
      if (target.pathname === '/empezar') {
        assert.deepEqual([...target.searchParams.keys()], ['ref'], `${url}: sign-up link query`);
        assert.match(target.searchParams.get('ref'), refPattern, `${url}: sign-up ref`);
      }
    }
    assert.equal(
      $('a[data-cta="footer-signup"]').attr('href'),
      buildSignupLink(signupRef(pageRef(parsed.pathname), 'footer')),
      `${url}: footer account creation must open the sign-up door with its page`,
    );
  }

  const linkedPages = new Set(['/']);
  for (const [path, $] of documents) {
    for (const anchor of $('a[href]').toArray()) {
      const href = $(anchor).attr('href');
      const target = new URL(href, `${origin}${path}`);
      if (target.origin !== origin) continue;
      assert.ok(
        !/\.html$/.test(target.pathname),
        `${path}: internal link uses .html`,
      );
      if (target.pathname === '/blog/feed.xml') continue;
      const destination = documents.get(target.pathname);
      assert.ok(destination, `${path}: broken internal link ${href}`);
      linkedPages.add(target.pathname);
      if (target.hash)
        assert.ok(
          destination('[id]')
            .toArray()
            .some(
              (el) =>
                destination(el).attr('id') ===
                decodeURIComponent(target.hash.slice(1)),
            ),
          `${path}: missing anchor ${href}`,
        );
    }
  }
  for (const path of documents.keys())
    assert.ok(linkedPages.has(path), `Orphan page: ${path}`);

  for (const rubro of rubros) {
    const path = `/casos-de-uso/${rubro.slug}`;
    const $ = documents.get(path);
    assert.ok(!/^c[oó]mo\b/i.test($('title').text()), `${path}: title is a guide`);
    assert.equal(
      $(`a[href="/demo?rubro=${encodeURIComponent(rubro.slug)}"]`, 'main').length,
      2,
      `${path}: both demo CTAs preserve the rubro context`,
    );
    assert.ok(
      $('a[href^="/blog/"]', 'main').length,
      `${path}: must link to its guides`,
    );
  }

  for (const { path, source, count } of [
    ...servicios.map((service) => ({
      path: `/servicios/${service.slug}`,
      source: service.slug,
      count: 2,
    })),
    { path: '/integraciones', source: 'integraciones', count: 3 },
    // The calm fallback (no catalog yet) adds one demo link of its own.
    {
      path: '/precios',
      source: 'precios',
      count: documents.get('/precios')('[data-plans-fallback]').length ? 3 : 2,
    },
  ]) {
    const $ = documents.get(path);
    assert.equal(
      $(`a[href="/demo?desde=${encodeURIComponent(source)}"]`, 'main').length,
      count,
      `${path}: demo CTAs preserve the known source`,
    );
  }
  const home = documents.get('/');
  const pricingPlansHref = (page) => page('a[data-cta="pricing-plans"]').attr('href');
  assert.equal(
    pricingPlansHref(documents.get('/precios')),
    `${appOrigin}/planes`,
    'Pricing must preserve the fixed app-owned plan entry without plan or return parameters',
  );

  // /precios is ISR: regenerated every 10 minutes from the last good catalog
  // (unstable_cache keeps the stale entry when a refresh fails). It never
  // renders an error. The build-time page holds the live catalog or, without
  // one, the calm fallback that sends people to the demo.
  assert.equal(
    prerender.routes['/precios']?.initialRevalidateSeconds,
    600,
    '/precios: must be static with a 10-minute revalidation',
  );
  const builtPricing = documents.get('/precios');
  assert.ok(
    !builtPricing('main').text().includes('No pudimos cargar los planes'),
    '/precios: no error state',
  );
  assert.ok(
    builtPricing('[data-public-plan]').length ||
      builtPricing('[data-plans-fallback] a[href="/demo?desde=precios"]').length,
    '/precios: plans or the calm fallback to the demo',
  );
  // An on-demand regeneration re-reads the fixture catalog right away.
  const regeneratePricing = async () => {
    const response = await fetch(base + '/precios', {
      headers: { 'x-prerender-revalidate': prerender.preview.previewModeId },
    });
    assert.equal(response.status, 200, '/precios: regeneration');
    assert.equal(response.headers.get('x-nextjs-cache'), 'REVALIDATED');
    await response.arrayBuffer();
    return load(await read('/precios'));
  };
  const pricingText = (page) => normalize(page('main').text());
  const pricing = await regeneratePricing();
  const cards = pricing('[data-public-plan]');
  assert.equal(
    cards.length,
    3,
    'Public plans must render in the initial HTTP HTML',
  );
  assert.deepEqual(
    cards.map((_, card) => pricing(card).find('h3').text()).get(),
    catalogData.map((plan) => plan.name),
  );
  for (const plan of catalogData)
    assert.ok(pricing('main').text().includes(plan.priceLabel));
  assert.equal(
    cards.find('a, button, form').length,
    0,
    'Public plan cards are read-only',
  );
  assert.ok(
    cards.text().includes('Hasta 1.234 respuestas del asistente por mes.'),
  );
  assert.ok(cards.text().includes('Atención manual, sin asistente.'));
  assert.ok(cards.text().includes('Sin respuestas mensuales incluidas.'));
  assert.equal(
    cards.filter((_, card) => pricing(card).text().includes('Recomendado'))
      .length,
    1,
  );
  assert.equal(
    pricing('a[data-cta="pricing-plans"]').text().trim(),
    'Continuar en la app →',
  );
  // The opening under the H1 comes from the catalog only.
  const opening = catalogSentence(catalogData, '2026-01-01').replace(
    / Precios publicados al .*$/,
    '',
  );
  assert.ok(
    normalize(pricing('h1').parent().text()).includes(opening),
    '/precios: opening sentence built from the catalog',
  );
  assert.match(
    normalize(pricing('h1').parent().text()),
    /Precios publicados al \d{1,2} de [a-z]+ de \d{4}\./,
    '/precios: catalog date',
  );
  // The page's own copy (the FAQ answers live in src/content/pricing.ts).
  const pricingOwnCopy = pricing('main').clone();
  pricingOwnCopy.find('#faq, script').remove();
  assert.ok(
    !/cr[eé]ditos de bienvenida/i.test(normalize(pricingOwnCopy.text())),
    '/precios: free credits are gone',
  );
  assert.ok(
    pricingText(pricing).includes('Probá tu asistente gratis antes de elegir un plan'),
    '/precios: the free path is the test chat',
  );

  catalogData = [
    {
      ...catalogData[0],
      name: 'Plan actualizado de prueba',
      priceLabel: 'Importe actualizado de prueba',
      monthlyAgentResponseLimit: 567,
    },
  ];
  const refreshedPricing = await regeneratePricing();
  assert.equal(refreshedPricing('[data-public-plan]').length, 1);
  assert.ok(
    refreshedPricing('[data-public-plan]')
      .text()
      .includes('Importe actualizado de prueba'),
  );
  assert.ok(
    refreshedPricing('[data-public-plan]')
      .text()
      .includes('Hasta 567 respuestas'),
  );
  assert.ok(
    !refreshedPricing('main').text().includes('Importe de prueba no numérico'),
  );
  // No plans published, catalog down, or an invalid catalog with no good
  // one before it (an on-demand regeneration skips the data cache): the
  // same calm fallback, with no upstream text.
  const fallbackStates = [
    { status: 200, data: [], label: 'empty catalog' },
    { status: 503, data: [{ name: 'UPSTREAM_PRIVATE_CANARY' }], label: 'unavailable catalog' },
    {
      status: 200,
      data: [
        {
          name: 'PRIVATE_PLAN_CANARY',
          priceLabel: 'PRIVATE_PRICE_CANARY',
          bestFor: null,
          monthlyAgentResponseLimit: 1,
          automationAllowed: true,
          recommended: false,
          tenantId: 'PRIVATE_TENANT_CANARY',
        },
      ],
      label: 'invalid catalog',
    },
  ];
  for (const state of fallbackStates) {
    catalogStatus = state.status;
    catalogData = state.data;
    const page = await regeneratePricing();
    const text = pricingText(page);
    assert.equal(page('[data-public-plan]').length, 0, `/precios ${state.label}: no cards`);
    assert.equal(
      page('[data-plans-fallback] a[href="/demo?desde=precios"]').length,
      1,
      `/precios ${state.label}: calm fallback to the demo`,
    );
    assert.ok(!text.includes('No pudimos cargar los planes'), `/precios ${state.label}: no error`);
    for (const canary of ['CANARY', 'Importe actualizado de prueba'])
      assert.ok(!text.includes(canary), `/precios ${state.label}: leaked ${canary}`);
    assert.equal(pricingPlansHref(page), `${appOrigin}/planes`);
  }
  catalogStatus = 200;
  assert.ok(
    catalogRequests.length >= 5,
    'Each regeneration must read the catalog again',
  );
  for (const request of catalogRequests) {
    assert.equal(request.path, '/api/public/plans');
    assert.equal(request.headers.authorization, undefined);
    assert.equal(request.headers.cookie, undefined);
    assert.equal(request.headers['x-tenant-id'], undefined);
  }

  // The home starts the funnel: an H1 that names the action, one field and
  // one button. A plain GET form, so it works without JavaScript (contract C1).
  assert.equal(
    normalize(home('h1').text()),
    'Tu WhatsApp reserva el turno. Vos seguís trabajando.',
    'Home H1 static reading names the action',
  );
  const heroForm = home('main form[data-consent-avoid]');
  assert.equal(heroForm.length, 1, 'Home hero form');
  assert.equal(heroForm.attr('action'), `${appOrigin}/empezar`, 'Hero form opens the sign-up door');
  assert.equal(heroForm.attr('method')?.toLowerCase(), 'get', 'Hero form is a plain GET');
  assert.deepEqual(
    heroForm
      .find('input, textarea, select')
      .map((_, el) => heroForm.find(el).attr('name'))
      .get(),
    ['ref', 'negocio'],
    'Hero form sends only ref and negocio without JavaScript',
  );
  assert.equal(heroForm.find('input[name="ref"]').attr('value'), 'home-hero');
  const negocioField = heroForm.find('textarea[name="negocio"]');
  assert.equal(negocioField.attr('maxlength'), '600');
  assert.ok(negocioField.attr('placeholder')?.startsWith('Contanos de tu negocio'), 'Hero field asks about the business');
  assert.ok(
    normalize(negocioField.closest('label').text()).startsWith('Contanos de tu negocio'),
    'Hero field label',
  );
  assert.equal(
    normalize(heroForm.find('button[type="submit"]').text()),
    'Armar mi asistente',
  );
  assert.equal(home('main a[href^="https://app.atende.com.ar"]').length, 0, 'Home body: no bare app links');
  for (const placement of ['hero-demo', 'final-demo']) {
    assert.equal(
      home(`a[data-cta="${placement}"]`).attr('href'),
      '/demo',
      'Homepage demo CTAs must leave the task choice open',
    );
  }
  // The body links where a buyer reads next (services, prices, integrations,
  // cornerstone guides), and the control list is a valid <dl>.
  const homeLinks = home('main a[href]')
    .map((_, el) => home(el).attr('href'))
    .get();
  for (const path of ['/servicios/turnos-whatsapp', '/servicios/ventas-whatsapp', '/precios', '/integraciones'])
    assert.ok(homeLinks.includes(path), `Home body must link ${path}`);
  assert.ok(
    homeLinks.filter((href) => /^\/blog\/[a-z0-9-]+$/.test(href)).length >= 2,
    'Home body must link cornerstone guides',
  );
  for (const list of home('dl').toArray())
    for (const child of home(list).children().toArray()) {
      assert.equal(child.tagName, 'div', 'Home <dl> holds dt/dd groups');
      assert.deepEqual(
        home(child).children().map((_, el) => el.tagName).get(),
        ['dt', 'dd'],
        'Home <dl> groups hold one dt and one dd',
      );
    }
  // Every FAQ answer can be linked on its own.
  for (const path of ['/', '/preguntas-frecuentes']) {
    const $ = documents.get(path);
    assert.ok($('details').length, `${path}: FAQ`);
    for (const details of $('details').toArray())
      assert.match($(details).attr('id') ?? '', /^pregunta-[a-z0-9-]+$/, `${path}: FAQ anchor`);
  }

  for (const path of [
    '/does-not-exist',
    '/servicios/does-not-exist',
    '/casos-de-uso/does-not-exist',
    '/blog/does-not-exist',
    '/blog/tema/does-not-exist',
  ]) {
    const response = await fetch(base + path);
    assert.equal(response.status, 404, `${path}: real HTTP 404`);
    const $ = load(await response.text());
    assert.deepEqual(
      $('meta[name="robots"]')
        .toArray()
        .map((el) => $(el).attr('content')),
      ['noindex'],
      `${path}: one robots directive`,
    );
    assert.equal($('meta[name="googlebot"]').length, 0, `${path}: googlebot`);
    assert.equal($('link[rel="canonical"]').length, 0, `${path}: canonical`);
    assert.equal($('meta[property="og:url"]').length, 0, `${path}: OG URL`);
    assert.ok(
      !$('title').text().includes(pages.home.title),
      `${path}: shows the home title`,
    );
  }
  for (const post of posts) {
    const path = `/blog/${post.slug}`;
    const $ = documents.get(path);
    const article = $('script[type="application/ld+json"]')
      .toArray()
      .flatMap((el) => JSON.parse($(el).text())['@graph'])
      .find((node) => node['@type'] === 'BlogPosting');
    assert.ok(article, `${path}: BlogPosting schema`);
    assert.equal(article.headline, post.title);
    assert.equal(article.datePublished, toSchemaDate(post.publishedAt));
    assert.equal(article.dateModified, toSchemaDate(post.updatedAt));
    assert.equal(article.wordCount, post.wordCount);
    assert.equal(article.abstract, post.summary);
    assert.ok(
      normalize($('article').text()).includes(normalize(post.summary)),
      `${path}: visible summary`,
    );
    assert.equal($('h1').text(), post.title);
    // A per-post rubro wins over the topic default; demo CTAs keep it.
    const rubroSlug =
      post.rubro === 'ninguno' ? undefined : (post.rubro ?? rubroByTopic[post.category]);
    const demoHref = buildDemoLink(rubroSlug);
    if (post.category === 'recordatorio-de-turnos') {
      assert.equal($('article header [data-sales-intro] p').length, 2, `${path}: two pitch lines`);
      assert.equal($('article [data-cta="blog-demo"]').length, 0, `${path}: no second pitch after the guide`);
    }
    if (post.salesIntro) {
      const intro = $('article header [data-sales-intro]');
      assert.deepEqual(
        intro.children('p').map((_, el) => $(el).text()).get(),
        post.salesIntro,
        `${path}: complete sales opening in initial HTML`,
      );
    }
    if (post.salesIntro || post.lead) {
      const opening = $('article header > [data-sales-intro], article header > p');
      const buttons = opening.next().children('a');
      const destinations = post.lead
        ? [buildWaLink(post.lead.message, waRef(path, 'guía')), demoHref]
        : [demoHref, buildSignupLink(signupRef(pageRef(path), 'sales'))];
      assert.deepEqual(
        buttons.map((_, el) => $(el).attr('href')).get(),
        destinations,
        `${path}: primary and secondary CTAs immediately after opening`,
      );
      const placements = post.lead ? ['lead-whatsapp', 'lead-demo'] : ['sales-demo', 'sales-app'];
      assert.deepEqual(
        buttons.map((_, el) => $(el).attr('data-cta')).get(),
        placements.map((placement) => `blog-${post.slug}-${placement}`),
        `${path}: CTA placements identify the article and destination`,
      );
      if (post.lead) {
        assert.equal(buttons.first().text().trim(), `${post.lead.label} →`);
      }
      assert.ok(
        opening.next().next().find('a[rel="author"]').length,
        `${path}: byline follows sales CTAs`,
      );
    }
    assert.equal($('meta[property="og:type"]').attr('content'), 'article');
    const dates = normalize($('article header').first().text());
    assert.ok(
      $('article header time[datetime="' + post.publishedAt + '"]').length &&
        dates.includes('Publicado el'),
      `${path}: visible publication date`,
    );
    if (post.updatedAt !== post.publishedAt)
      assert.ok(
        $('article header time[datetime="' + post.updatedAt + '"]').length &&
          dates.includes('Actualizado el'),
        `${path}: visible update date`,
      );
    if (rubroSlug)
      assert.ok(
        $('a[href="/casos-de-uso/' + rubroSlug + '"]').length,
        `${path}: link to its rubro`,
      );
    // Every guide ends on a next step: the closing panel (demo plus the
    // rubro or closest service) or, when the pitch is only in the header, a
    // closing link to that page, else to the demo.
    const closingPanel = $('article [data-cta="blog-demo"]');
    const closingLink = $('article [data-closing] a');
    const nextPath = nextStepPath(rubroSlug, post.category);
    assert.equal(
      closingPanel.length + (closingLink.length ? 1 : 0),
      1,
      `${path}: one closing CTA`,
    );
    if (closingPanel.length) {
      assert.equal(closingPanel.attr('href'), demoHref, `${path}: closing demo keeps the rubro`);
      if (nextPath)
        assert.equal(
          closingPanel.parent().find(`a[href="${nextPath}"]`).length,
          1,
          `${path}: closing panel links its next page`,
        );
    } else
      assert.equal(closingLink.attr('href'), nextPath ?? demoHref, `${path}: closing link`);
    const publisher = $('article header [data-publisher]');
    assert.ok(
      normalize(publisher.text()).startsWith(
        'Esta guía la publica Atende, un asistente de WhatsApp para PyMEs argentinas hecho en Córdoba.',
      ) && publisher.find('a[href="/que-es-atende"]').length,
      `${path}: publisher line`,
    );
    assert.equal($('a[rel="author"]').attr('href'), '/blog/editorial');
    assert.equal(
      $('.blog-prose h2').length,
      post.headings.filter((heading) => heading.depth === 2).length,
      `${path}: Markdown sections in initial HTML`,
    );
    assert.ok(
      normalize($('.blog-prose').text()).split(/\s+/).length >= 300,
      `${path}: substantial SSR body`,
    );
    for (const source of post.sources)
      assert.ok(
        $('a[href="' + source.url + '"]').length,
        `${path}: visible citation`,
      );
    for (const slug of post.related)
      assert.ok(
        $('a[href="/blog/' + slug + '"]').length,
        `${path}: related article`,
      );
  }
  const feedResponse = await fetch(base + '/blog/feed.xml');
  assert.equal(feedResponse.status, 200);
  assert.match(
    feedResponse.headers.get('content-type'),
    /application\/rss\+xml/,
  );
  const feed = load(await feedResponse.text(), { xml: true });
  assert.deepEqual(
    feed('item > link')
      .map((_, el) => feed(el).text())
      .get()
      .sort(),
    posts.map((post) => `${origin}/blog/${post.slug}`).sort(),
    'RSS must include exactly the published posts',
  );
  const feedLinks = feed('item > link')
    .map((_, el) => feed(el).text())
    .get();

  assert.equal(guideRedirects.length, 3, 'The three merged guides must redirect');
  for (const { source, destination } of guideRedirects) {
    const response = await fetch(base + source, { redirect: 'manual' });
    assert.equal(response.status, 308, `${source}: permanent redirect`);
    assert.equal(
      new URL(response.headers.get('location'), base).pathname,
      destination,
      `${source}: redirect target`,
    );
    assert.ok(documents.has(destination), `${destination}: redirect target page`);
    assert.ok(!urls.includes(origin + source), `${source}: still in sitemap`);
    assert.ok(!feedLinks.includes(origin + source), `${source}: still in RSS`);
  }

  const llmsResponse = await fetch(base + '/llms.txt');
  assert.equal(llmsResponse.status, 200, '/llms.txt: expected HTTP 200');
  assert.match(llmsResponse.headers.get('content-type'), /^text\/plain/);
  const llms = await llmsResponse.text();
  assert.match(llms, /^# Atende\n\n> .+\n/, '/llms.txt: H1 and summary');
  assert.ok(llms.includes('\n## Optional\n'), '/llms.txt: Optional section');
  for (const row of actionStatus)
    assert.ok(llms.includes(row.label), `/llms.txt: status of ${row.action}`);
  const llmsLinks = [...llms.matchAll(/^- \[[^\]]+\]\(([^)]+)\)/gm)].map(
    (match) => match[1],
  );
  assert.ok(llmsLinks.length, '/llms.txt: links');
  for (const link of llmsLinks)
    assert.ok(urls.includes(link), `/llms.txt: ${link} is not in the sitemap`);
  for (const { source } of guideRedirects)
    assert.ok(!llms.includes(source), `/llms.txt: merged guide ${source}`);

  const [indexNowFile, ...extraKeys] = (
    await readdir(new URL('public/', root))
  ).filter((file) => /^[a-f0-9]{32}\.txt$/.test(file));
  assert.ok(indexNowFile && !extraKeys.length, 'One IndexNow key file');
  assert.equal(
    (await read(indexNowFile)).trim(),
    indexNowFile.replace(/\.txt$/, ''),
    'IndexNow key file must contain its key',
  );

  const blogFiles = await readdir(new URL('content/blog/', root));
  const hiddenPosts = await Promise.all(
    blogFiles
      .filter((file) => file.endsWith('.md'))
      .filter((file) => !posts.some((post) => `${post.slug}.md` === file))
      .map(async (file) =>
        parsePost(
          await readFile(new URL(`content/blog/${file}`, root), 'utf8'),
          file,
        ),
      ),
  );
  for (const post of hiddenPosts) {
    const path = `/blog/${post.slug}`;
    assert.equal((await fetch(base + path)).status, 404, `${path}: not public`);
    assert.ok(!urls.includes(origin + path), `${path}: hidden post in sitemap`);
    assert.ok(!llms.includes(path), `${path}: hidden post in llms.txt`);
  }

  // ISR: prerendered at build, regenerated hourly so scheduled posts go live.
  for (const path of [
    '/blog',
    '/sitemap.xml',
    '/blog/feed.xml',
    '/llms.txt',
    ...blogTopics
      .filter((topic) => posts.some((post) => post.category === topic.slug))
      .map((topic) => `/blog/tema/${topic.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`),
  ])
    assert.equal(
      prerender.routes[path]?.initialRevalidateSeconds,
      3600,
      `${path}: must be static with hourly revalidation`,
    );
  for (const route of ['/blog/[slug]', '/blog/tema/[slug]'])
    assert.equal(
      prerender.dynamicRoutes[route]?.fallback,
      null,
      `${route}: must render scheduled posts on demand`,
    );
  for (const post of posts)
    assert.ok(
      (
        await stat(
          new URL(`.next/standalone/content/blog/${post.slug}.md`, root),
        )
      ).size,
      `${post.slug}: Markdown must ship in standalone runtime`,
    );
  const robots = await read('robots.txt');
  assert.match(robots, /User-Agent: \*\s+Allow: \//i);
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.ok(!/Disallow: \/\s*$/m.test(robots), 'Crawling blocked');
  console.log(
    `Verified ${documents.size} HTTP pages and ${posts.length} articles: metadata, canonicals, social cards, crawlability, visible structured data, sitemap, links, anchors, sales CTAs, redirects, llms.txt, IndexNow key and ISR.`,
  );
} finally {
  try {
    if (child.exitCode === null) {
      const stopped = once(child, 'exit');
      child.kill('SIGTERM');
      const killTimer = setTimeout(() => child.kill('SIGKILL'), 5000);
      await stopped;
      clearTimeout(killTimer);
    }
  } finally {
    await new Promise((resolve, reject) =>
      catalog.close((error) => (error ? reject(error) : resolve())),
    );
    await restoreRuntimeCache();
  }
}

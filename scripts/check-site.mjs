import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { once } from 'node:events';
import { loadPosts, parsePost } from '../src/lib/blog-content.ts';
import { toSchemaDate } from '../src/lib/dates.ts';
import { pages, legalPages } from '../src/content/pages.ts';
import { rubros } from '../src/content/rubros.ts';
import { servicios } from '../src/content/servicios.ts';
import { actionStatus } from '../src/content/status.ts';
import {
  blogTopics,
  editorialPage,
  rubroByTopic,
} from '../src/content/blog-topics.ts';
import { guideRedirects } from '../next.config.ts';
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
const child = spawn(process.execPath, ['.next/standalone/server.js'], {
  cwd: root,
  env: { ...process.env, PORT: String(port), HOSTNAME: '127.0.0.1' },
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
    assert.ok($('a[href="/demo"]', 'main').length, `${path}: demo is the next step`);
    assert.ok(
      normalize($('main').text()).includes('Ejemplo ilustrativo'),
      `${path}: unlabeled example`,
    );
    assert.ok(
      $('a[href^="/blog/"]', 'main').length,
      `${path}: must link to its guides`,
    );
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
    const rubro = rubroByTopic[post.category];
    if (rubro)
      assert.ok(
        $('a[href="/casos-de-uso/' + rubro + '"]').length,
        `${path}: link to its rubro`,
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
  const prerender = JSON.parse(
    await readFile(new URL('.next/prerender-manifest.json', root), 'utf8'),
  );
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
  if (child.exitCode === null) {
    const stopped = once(child, 'exit');
    child.kill('SIGTERM');
    const killTimer = setTimeout(() => child.kill('SIGKILL'), 5000);
    await stopped;
    clearTimeout(killTimer);
  }
}

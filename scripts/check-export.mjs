import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { load } from 'cheerio';

// Audit the actual deployable HTML; no client-side rendering is involved.
const root = new URL('../out/', import.meta.url);
const origin = 'https://www.atende.com.ar';
const read = (path) => readFile(new URL(path, root), 'utf8');
const sitemap = load(await read('sitemap.xml'), { xml: true });
const urls = sitemap('url > loc')
  .map((_, el) => sitemap(el).text())
  .get();
assert.equal(
  new Set(urls).size,
  urls.length,
  'Sitemap contains duplicate URLs',
);
assert.ok(urls.length >= 10, 'Missing expected marketing pages');
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
  const file =
    parsed.pathname === '/' ? 'index.html' : `${parsed.pathname.slice(1)}.html`;
  const $ = load(await read(file));
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
    (await stat(new URL(new URL(socialImage).pathname.slice(1), root))).size >
      0,
  );
  assert.ok(
    $('meta[property="og:image:alt"]').attr('content'),
    `${url}: OG image alt`,
  );
  const graphs = $('script[type="application/ld+json"]')
    .map((_, el) => JSON.parse($(el).text())['@graph'])
    .get();
  assert.ok(
    graphs.some((node) => node['@type'] === 'Organization'),
    `${url}: organization`,
  );
  assert.ok(
    graphs.some((node) => node['@type'] === 'WebSite'),
    `${url}: website`,
  );
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

async function htmlFiles(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === '_next') continue;
    const relative = join(prefix, entry.name);
    if (entry.isDirectory())
      files.push(
        ...(await htmlFiles(new URL(`${entry.name}/`, directory), relative)),
      );
    else if (entry.name.endsWith('.html')) files.push(relative);
  }
  return files;
}
for (const file of await htmlFiles(root)) {
  if (file === '404.html' || file === '_not-found.html') continue;
  const path = file === 'index.html' ? '/' : `/${file.slice(0, -5)}`;
  assert.ok(documents.has(path), `Exported page missing from sitemap: ${file}`);
}
const notFound = load(await read('404.html'));
assert.ok(
  notFound('meta[name="robots"]')
    .toArray()
    .some((el) => /noindex/.test(notFound(el).attr('content'))),
  '404 must be noindex',
);
const robots = await read('robots.txt');
assert.match(robots, /User-Agent: \*\s+Allow: \//i);
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(!/Disallow: \/\s*$/m.test(robots), 'Crawling blocked');
console.log(
  `Verified ${documents.size} exported pages: metadata, canonicals, social cards, crawlability, visible structured data, sitemap, links, anchors and sales CTAs.`,
);

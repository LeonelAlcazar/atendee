// Manual post-deploy step. See docs/seo-and-sales.md.
//   npm run indexnow -- --dry-run                     every URL in the live sitemap
//   npm run indexnow -- --since 2026-11-06            only URLs changed since a date
//   npm run indexnow -- --dry-run --sitemap <url|file>
import { readFile, readdir } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { site } from '../src/content/site.ts';
import {
  buildIndexNowPayload,
  describeIndexNowStatus,
  indexNowEndpoint,
  parseSitemap,
  selectUrls,
} from '../src/lib/indexnow.ts';

const { values: options } = parseArgs({
  options: {
    'dry-run': { type: 'boolean', default: false },
    since: { type: 'string' },
    sitemap: { type: 'string', default: `${site.url}/sitemap.xml` },
  },
});
if (options.since && !/^\d{4}-\d{2}-\d{2}$/.test(options.since))
  throw new Error('--since needs a YYYY-MM-DD date');

async function readKey() {
  const publicDir = new URL('../public/', import.meta.url);
  const files = (await readdir(publicDir)).filter((file) =>
    /^[a-f0-9]{32}\.txt$/.test(file),
  );
  if (files.length !== 1)
    throw new Error(`Expected one IndexNow key file in public/, got ${files.length}`);
  const key = files[0].replace(/\.txt$/, '');
  const content = (await readFile(new URL(files[0], publicDir), 'utf8')).trim();
  if (content !== key) throw new Error('The key file must contain its own name');
  return key;
}

async function readSitemap(source) {
  if (!/^https?:/.test(source)) return readFile(source, 'utf8');
  const response = await fetch(source);
  if (!response.ok) throw new Error(`${source}: HTTP ${response.status}`);
  return response.text();
}

const payload = buildIndexNowPayload({
  origin: site.url,
  key: await readKey(),
  urls: selectUrls(
    parseSitemap(await readSitemap(options.sitemap)),
    options.since,
  ),
});

if (options['dry-run']) {
  console.log(`Dry run: nothing was sent to ${indexNowEndpoint}`);
  console.log(`${payload.urlList.length} URLs from ${options.sitemap}`);
  console.log(JSON.stringify(payload, null, 2));
} else {
  const response = await fetch(indexNowEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  console.log(
    `IndexNow ${response.status}: ${describeIndexNowStatus(response.status)} (${payload.urlList.length} URLs)`,
  );
  if (!response.ok) process.exitCode = 1;
}

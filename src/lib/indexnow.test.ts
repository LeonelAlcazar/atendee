import { describe, expect, it } from 'vitest';
import {
  buildIndexNowPayload,
  describeIndexNowStatus,
  parseSitemap,
  selectUrls,
} from './indexnow';

const origin = 'https://www.atende.com.ar';
const key = 'a065a19d2e86ca0d629dd1f026db7a9a';
const sitemap = `<?xml version="1.0"?><urlset>
<url><loc>${origin}</loc><lastmod>2026-11-06</lastmod></url>
<url>
  <loc>${origin}/precios</loc>
  <lastmod>2026-09-10T00:00:00.000Z</lastmod>
</url>
<url><loc>${origin}/sin-fecha</loc></url>
</urlset>`;

describe('IndexNow submission', () => {
  it('reads URLs and dates from the sitemap', () => {
    expect(parseSitemap(sitemap)).toEqual([
      { url: origin, lastmod: '2026-11-06' },
      { url: `${origin}/precios`, lastmod: '2026-09-10T00:00:00.000Z' },
      { url: `${origin}/sin-fecha` },
    ]);
  });
  it('selects only URLs changed since a date, because the protocol asks for that', () => {
    const entries = parseSitemap(sitemap);
    expect(selectUrls(entries)).toHaveLength(3);
    expect(selectUrls(entries, '2026-11-01')).toEqual([origin]);
  });
  it('builds the documented batch payload', () => {
    expect(buildIndexNowPayload({ origin, key, urls: [origin] })).toEqual({
      host: 'www.atende.com.ar',
      key,
      keyLocation: `${origin}/${key}.txt`,
      urlList: [origin],
    });
  });
  it('refuses URLs from another host, invalid keys, empty and oversized batches', () => {
    const build = (urls: string[], value = key) =>
      buildIndexNowPayload({ origin, key: value, urls });
    expect(() => build(['https://atende.com.ar/precios'])).toThrow(/outside/);
    expect(() => build([origin], 'short')).toThrow(/key/);
    expect(() => build([])).toThrow(/No URLs/);
    expect(() => build(Array(10_001).fill(origin))).toThrow(/up to/);
  });
  it('explains each protocol status', () => {
    expect(describeIndexNowStatus(202)).toMatch(/validated/);
    expect(describeIndexNowStatus(403)).toMatch(/key/i);
    expect(describeIndexNowStatus(500)).toMatch(/Unexpected/);
  });
});

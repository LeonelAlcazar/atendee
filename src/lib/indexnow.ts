// IndexNow protocol: https://www.indexnow.org/documentation
const batchLimit = 10_000;
export const indexNowEndpoint = 'https://api.indexnow.org/indexnow';
export const indexNowKeyPattern = /^[a-zA-Z0-9-]{8,128}$/;

export type SitemapEntry = { url: string; lastmod?: string };

export function parseSitemap(xml: string): SitemapEntry[] {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].flatMap(([, entry]) => {
    const url = entry.match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1];
    const lastmod = entry.match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/)?.[1];
    return url ? [{ url, ...(lastmod ? { lastmod } : {}) }] : [];
  });
}

// IndexNow asks for changed URLs only. `since` compares calendar dates.
export function selectUrls(entries: SitemapEntry[], since?: string) {
  return entries
    .filter((entry) => !since || (entry.lastmod ?? '').slice(0, 10) >= since)
    .map((entry) => entry.url);
}

export function buildIndexNowPayload({
  origin,
  key,
  urls,
}: {
  origin: string;
  key: string;
  urls: string[];
}) {
  if (!indexNowKeyPattern.test(key)) throw new Error('Invalid IndexNow key');
  if (!urls.length) throw new Error('No URLs to submit');
  if (urls.length > batchLimit)
    throw new Error(`IndexNow accepts up to ${batchLimit} URLs per batch`);
  const { host } = new URL(origin);
  const foreign = urls.filter((url) => new URL(url).host !== host);
  if (foreign.length)
    throw new Error(`URLs outside ${host}: ${foreign.join(', ')}`);
  return {
    host,
    key,
    keyLocation: `${origin}/${key}.txt`,
    urlList: urls,
  };
}

const responses: Record<number, string> = {
  200: 'Received.',
  202: 'Received. The key is still being validated.',
  400: 'Invalid request.',
  403: 'Key not valid: check that the key file is live.',
  422: 'URLs do not belong to the host, or the key does not match.',
  429: 'Rate limited. Wait before submitting again.',
};

export function describeIndexNowStatus(status: number) {
  return responses[status] ?? `Unexpected status ${status}.`;
}

import { afterEach, describe, expect, it, vi } from 'vitest';
import { site } from '@/content/site';
import {
  createMetricTracker,
  linkMetric,
  metricEvent,
  metricPage,
  type MetricPage,
} from './metrics';

const matrix = {
  home: [
    'view',
    'to_pricing',
    'to_demo',
    'to_signup',
    'direct_whatsapp',
    'direct_email',
  ],
  pricing: [
    'view',
    'to_demo',
    'to_plans',
    'to_signup',
    'direct_whatsapp',
    'direct_email',
  ],
  demo: [
    'view',
    'to_pricing',
    'to_signup',
    'demo_started',
    'draft_whatsapp',
    'draft_email',
    'direct_whatsapp',
    'direct_email',
    'reopen_whatsapp',
    'reopen_email',
  ],
} as const;
const allMetrics = [...new Set(Object.values(matrix).flat())];
const wa = `https://wa.me/${site.whatsapp.number}?text=PRIVATE-CANARY`;

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.resetModules();
});

describe('bounded public metric contract', () => {
  it.each(Object.keys(matrix) as MetricPage[])(
    'allows exactly the approved matrix for %s',
    (page) => {
      for (const metric of allMetrics) {
        expect(metricEvent(page, metric)).toEqual(
          (matrix[page] as readonly string[]).includes(metric)
            ? { v: 1, page, metric }
            : null,
        );
      }
    },
  );
  it.each([
    undefined,
    null,
    'constructor',
    'toString',
    {},
    [],
    '/demo',
    'view?PRIVATE-CANARY',
  ])('rejects unknown page or metric values without copying them', (value) => {
    expect(metricEvent(value, 'view')).toBeNull();
    expect(metricEvent('home', value)).toBeNull();
  });
  it('maps only the three literal pathnames, without query, fragments or other routes', () => {
    expect(['/', '/precios', '/demo'].map(metricPage)).toEqual([
      'home',
      'pricing',
      'demo',
    ]);
    for (const path of [
      '/blog/a',
      '/demo?company=PRIVATE-CANARY',
      '/precios#plans',
      '/demo/',
      null,
    ]) {
      expect(metricPage(path)).toBeNull();
    }
  });
});

describe('known link intentions', () => {
  it('measures local pricing/demo navigation without carrying its query', () => {
    expect(linkMetric('home', '/precios')).toBe('to_pricing');
    expect(linkMetric('demo', '/precios#plans')).toBe('to_pricing');
    expect(linkMetric('home', '/demo?desde=PRIVATE-CANARY', 'hero-demo')).toBe(
      'to_demo',
    );
    expect(linkMetric('pricing', '/demo?desde=precios', 'pricing-demo')).toBe(
      'to_demo',
    );
    expect(linkMetric('demo', '/demo', 'header-demo')).toBeNull();
    expect(linkMetric('pricing', '/precios')).toBeNull();
  });
  it('distinguishes prospects from existing-account entry using fixed tags and destinations', () => {
    expect(linkMetric('home', site.appUrl, 'hero-signup')).toBe('to_signup');
    for (const page of ['home', 'pricing', 'demo'] as const) {
      expect(linkMetric(page, site.appUrl, 'footer-signup')).toBe('to_signup');
      expect(linkMetric(page, site.appUrl)).toBeNull();
      expect(linkMetric(page, site.appUrl, 'inline')).toBeNull();
    }
    expect(
      linkMetric('pricing', `${site.appUrl}/planes`, 'pricing-plans'),
    ).toBe('to_plans');
    expect(
      linkMetric('home', `${site.appUrl}/planes`, 'pricing-plans'),
    ).toBeNull();
    expect(linkMetric('pricing', site.appUrl, 'hero-signup')).toBeNull();
    expect(
      linkMetric(
        'pricing',
        `${site.appUrl}/planes?plan=PRIVATE-CANARY`,
        'pricing-plans',
      ),
    ).toBeNull();
    expect(
      linkMetric(
        'home',
        `${site.appUrl}/?returnTo=PRIVATE-CANARY`,
        'hero-signup',
      ),
    ).toBeNull();
  });
  it('keeps direct contact and prepared-draft reopenings separate', () => {
    for (const page of ['home', 'pricing', 'demo'] as const) {
      for (const placement of ['footer-whatsapp', 'mobile-whatsapp']) {
        expect(linkMetric(page, wa, placement)).toBe('direct_whatsapp');
      }
      expect(linkMetric(page, `mailto:${site.email}`, 'footer-email')).toBe(
        'direct_email',
      );
    }
    expect(linkMetric('home', wa, 'faq-whatsapp')).toBe('direct_whatsapp');
    expect(linkMetric('pricing', wa, 'final-whatsapp')).toBe('direct_whatsapp');
    expect(linkMetric('demo', wa, 'demo-direct-whatsapp')).toBe(
      'direct_whatsapp',
    );
    expect(
      linkMetric('demo', `mailto:${site.email}`, 'demo-direct-email'),
    ).toBe('direct_email');
    expect(linkMetric('demo', wa, 'demo-whatsapp')).toBe('reopen_whatsapp');
    expect(
      linkMetric(
        'demo',
        `mailto:${site.email}?body=PRIVATE-CANARY`,
        'demo-email',
      ),
    ).toBe('reopen_email');
    expect(linkMetric('home', wa, 'demo-whatsapp')).toBeNull();
    expect(linkMetric('demo', wa, 'final-whatsapp')).toBeNull();
    expect(
      linkMetric('home', `mailto:${site.email}`, 'demo-direct-email'),
    ).toBeNull();
  });
  it.each([
    ['https://another.test/demo', 'hero-demo'],
    ['https://app.atende.com.ar.evil.test/', 'hero-signup'],
    ['https://user:PRIVATE-CANARY@app.atende.com.ar/', 'hero-signup'],
    ['http://wa.me/543518764951', 'footer-whatsapp'],
    ['https://wa.me/12345', 'footer-whatsapp'],
    [wa, 'PRIVATE-CANARY'],
    ['mailto:another@example.test', 'footer-email'],
    [`mailto:${site.email}?body=PRIVATE-CANARY`, 'footer-email'],
    ['http://[', 'hero-demo'],
  ])('ignores unknown or mismatched link %s', (href, placement) => {
    expect(linkMetric('home', href, placement)).toBeNull();
  });
});

describe('visible page activations and form stages', () => {
  it('deduplicates repeated observer setups, visibility changes and notifications for the same page', () => {
    const emit = vi.fn();
    const tracker = createMetricTracker(emit);
    tracker.activate('home', false);
    tracker.activate('home', false);
    expect(emit).not.toHaveBeenCalled();
    tracker.activate('home', true);
    tracker.activate('home', true);
    tracker.activate('home', false);
    tracker.activate('home', true);
    expect(emit.mock.calls.map(([event]) => event)).toEqual([
      { v: 1, page: 'home', metric: 'view' },
    ]);
    tracker.activate('pricing', true);
    tracker.activate(null, true);
    tracker.activate('home', true);
    expect(emit.mock.calls.map(([event]) => event.page)).toEqual([
      'home',
      'pricing',
      'home',
    ]);
  });
  it('counts one visible activation after a persisted restore, without an extra ordinary pageshow', () => {
    const emit = vi.fn();
    const tracker = createMetricTracker(emit);
    tracker.activate('demo', true);
    tracker.activate('demo', true);
    tracker.activate('demo', false, true);
    expect(emit).toHaveBeenCalledTimes(1);
    tracker.activate('demo', true);
    tracker.activate('demo', true);
    expect(emit).toHaveBeenCalledTimes(2);
  });
  it('ensures started for autofill and emits one draft per valid submit, with no extra click or direct-contact event', () => {
    const emit = vi.fn();
    const tracker = createMetricTracker(emit);
    tracker.activate('demo', true);
    tracker.prepareDemo('whatsapp');
    tracker.startDemo();
    tracker.prepareDemo('email');
    tracker.click('reopen_email');
    expect(emit.mock.calls.map(([event]) => event.metric)).toEqual([
      'view',
      'demo_started',
      'draft_whatsapp',
      'draft_email',
      'reopen_email',
    ]);
  });
  it('starts once per activation and does not start on a page view/prefill alone or while hidden', () => {
    const emit = vi.fn();
    const tracker = createMetricTracker(emit);
    tracker.activate('home', true);
    tracker.startDemo();
    tracker.activate('demo', false);
    tracker.startDemo();
    tracker.prepareDemo('email');
    tracker.activate('demo', true);
    expect(emit.mock.calls.map(([event]) => event.metric)).toEqual([
      'view',
      'view',
    ]);
    tracker.startDemo();
    tracker.startDemo();
    tracker.activate('demo', false);
    tracker.activate('demo', true);
    tracker.startDemo();
    tracker.activate('demo', true, true);
    tracker.startDemo();
    expect(emit.mock.calls.map(([event]) => event.metric)).toEqual([
      'view',
      'view',
      'demo_started',
      'view',
      'demo_started',
    ]);
  });
  it('rejects invalid page/action combinations and never retries a throwing consumer', () => {
    const emit = vi.fn(() => {
      throw new Error('PRIVATE-CANARY');
    });
    const tracker = createMetricTracker(emit);
    expect(() => {
      tracker.activate('home', true);
      tracker.activate('home', true);
      tracker.click('to_plans');
      tracker.startDemo();
    }).not.toThrow();
    expect(emit).toHaveBeenCalledTimes(1);
  });
});

async function browser(origin = 'https://www.atende.com.ar') {
  vi.resetModules();
  const fetch = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
  const location = Object.defineProperties(
    { origin },
    {
      pathname: {
        get() {
          throw new Error('Raw pathname accessed');
        },
      },
      search: {
        get() {
          throw new Error('Query accessed');
        },
      },
      href: {
        get() {
          throw new Error('Full URL accessed');
        },
      },
    },
  );
  const window = Object.defineProperties(
    { location, dispatchEvent: vi.fn(), dataLayer: [] },
    {
      localStorage: {
        get() {
          throw new Error('Storage accessed');
        },
      },
      sessionStorage: {
        get() {
          throw new Error('Storage accessed');
        },
      },
    },
  );
  const document = Object.defineProperties(
    { visibilityState: 'visible' },
    {
      cookie: {
        get() {
          throw new Error('Cookie accessed');
        },
      },
      referrer: {
        get() {
          throw new Error('Referrer accessed');
        },
      },
    },
  );
  vi.stubGlobal('fetch', fetch);
  vi.stubGlobal('window', window);
  vi.stubGlobal('document', document);
  return { metrics: await import('./metrics'), fetch, window, document };
}

describe('isolated best-effort transport', () => {
  it.each([
    'http://localhost:3000',
    'https://preview.vercel.app',
    site.appUrl,
    'https://atende.com.ar',
  ])('sends nothing from %s', async (origin) => {
    const { metrics, fetch } = await browser(origin);
    metrics.observeMetricsPage('/');
    metrics.recordMetricLink('/', '/demo', 'hero-demo');
    metrics.recordDemoStarted();
    metrics.recordPreparedDemo('whatsapp');
    expect(fetch).not.toHaveBeenCalled();
  });
  it('does nothing during SSR', async () => {
    vi.stubGlobal('window', undefined);
    vi.stubGlobal('document', undefined);
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    const metrics = await import('./metrics');
    metrics.observeMetricsPage('/');
    metrics.recordPreparedDemo('email');
    expect(fetch).not.toHaveBeenCalled();
  });
  it('posts exactly the bounded payload and omits credentials/referrer, including when the outbound URL contains form text', async () => {
    const { metrics, fetch } = await browser();
    metrics.observeMetricsPage('/demo');
    metrics.recordPreparedDemo('whatsapp');
    metrics.recordMetricLink('/demo', wa, 'demo-whatsapp');
    expect(
      fetch.mock.calls.map(([, options]) => JSON.parse(options.body)),
    ).toEqual([
      { v: 1, page: 'demo', metric: 'view' },
      { v: 1, page: 'demo', metric: 'demo_started' },
      { v: 1, page: 'demo', metric: 'draft_whatsapp' },
      { v: 1, page: 'demo', metric: 'reopen_whatsapp' },
    ]);
    for (const [url, options] of fetch.mock.calls) {
      expect(url).toBe('https://app.atende.com.ar/api/public/metrics');
      expect(options).toEqual({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: expect.any(String),
        keepalive: true,
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        redirect: 'error',
        cache: 'no-store',
      });
      expect(options.body).not.toContain('PRIVATE-CANARY');
    }
  });
  it('does not wait for a pending request or prevent the next action', async () => {
    const { metrics, fetch } = await browser();
    fetch.mockImplementation(() => new Promise(() => {}));
    const navigate = vi.fn();
    expect(metrics.recordPreparedDemo('email')).toBeUndefined();
    navigate();
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(3);
  });
  it.each(['synchronous', 'rejected'] as const)(
    'swallows %s transport errors without retries',
    async (kind) => {
      const { metrics, fetch } = await browser();
      if (kind === 'synchronous')
        fetch.mockImplementation(() => {
          throw new Error('PRIVATE-CANARY');
        });
      else fetch.mockRejectedValue(new Error('PRIVATE-CANARY'));
      expect(() => metrics.recordPreparedDemo('email')).not.toThrow();
      await Promise.resolve();
      await Promise.resolve();
      expect(fetch).toHaveBeenCalledTimes(3);
    },
  );
  it('never consumes legacy CustomEvent or dataLayer hooks as new metrics', async () => {
    const { metrics, fetch, window } = await browser();
    metrics.recordPreparedDemo('whatsapp');
    const { trackConversion } = await import('./conversions');
    trackConversion({
      event: 'atende_demo_prepared',
      page: '/demo',
      placement: 'demo-form',
    });
    trackConversion({
      event: 'atende_cta_click',
      page: '/demo',
      destination: 'whatsapp',
      placement: 'demo-whatsapp',
    });
    expect(window.dispatchEvent).toHaveBeenCalledTimes(2);
    expect(window.dataLayer).toHaveLength(2);
    expect(fetch).toHaveBeenCalledTimes(3);
  });
});

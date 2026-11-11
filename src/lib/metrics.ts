import { site } from '@/content/site';

const sourceOrigin = 'https://www.atende.com.ar';
const endpoint = 'https://app.atende.com.ar/api/public/metrics';

const metricsByPage = {
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

export type MetricPage = keyof typeof metricsByPage;
export type Metric = (typeof metricsByPage)[MetricPage][number];
type LinkMetric = Exclude<
  Metric,
  'view' | 'demo_started' | 'draft_whatsapp' | 'draft_email'
>;
export type MetricEvent = { v: 1; page: MetricPage; metric: Metric };

export function metricPage(pathname: unknown): MetricPage | null {
  return pathname === '/'
    ? 'home'
    : pathname === '/precios'
      ? 'pricing'
      : pathname === '/demo'
        ? 'demo'
        : null;
}

export function metricEvent(
  page: unknown,
  metric: unknown,
): MetricEvent | null {
  if (
    (page !== 'home' && page !== 'pricing' && page !== 'demo') ||
    typeof metric !== 'string' ||
    !(metricsByPage[page] as readonly string[]).includes(metric)
  )
    return null;
  return { v: 1, page, metric: metric as Metric };
}

// Counts activations and actions, without visitors, sessions or stored identifiers.
export function createMetricTracker(emit: (event: MetricEvent) => void) {
  let page: MetricPage | null | undefined;
  let visible = false;
  let pendingView = false;
  let started = false;
  const record = (metric: Metric) => {
    const event = metricEvent(page, metric);
    if (!visible || pendingView || !event) return;
    try {
      emit(event);
    } catch {
      /* Measurement never interrupts a visitor's action. */
    }
  };
  const startDemo = () => {
    if (page !== 'demo' || !visible || pendingView || started) return;
    started = true;
    record('demo_started');
  };
  return {
    activate(
      nextPage: MetricPage | null,
      isVisible: boolean,
      restored = false,
    ) {
      if (page !== nextPage || restored) {
        page = nextPage;
        pendingView = nextPage !== null;
        started = false;
      }
      visible = isVisible;
      if (visible && pendingView) {
        pendingView = false;
        record('view');
      }
    },
    click(metric: LinkMetric) {
      record(metric);
    },
    startDemo,
    prepareDemo(channel: 'whatsapp' | 'email') {
      if (page !== 'demo' || !visible || pendingView) return;
      startDemo();
      record(channel === 'whatsapp' ? 'draft_whatsapp' : 'draft_email');
    },
  };
}

export function linkMetric(
  page: MetricPage | null,
  href: string,
  placement?: string,
): LinkMetric | null {
  let url: URL;
  try {
    url = new URL(href, sourceOrigin);
  } catch {
    return null;
  }
  if (!page || url.username || url.password) return null;
  let metric: LinkMetric | undefined;
  if (url.origin === sourceOrigin) {
    if (url.pathname === '/precios') metric = 'to_pricing';
    if (url.pathname === '/demo') metric = 'to_demo';
  } else if (url.origin === site.appUrl && !url.search && !url.hash) {
    if (url.pathname === '/planes' && placement === 'pricing-plans')
      metric = 'to_plans';
    if (
      url.pathname === '/' &&
      (placement === 'footer-signup' ||
        (page === 'home' && placement === 'hero-signup'))
    )
      metric = 'to_signup';
  } else if (
    url.origin === 'https://wa.me' &&
    url.pathname === `/${site.whatsapp.number}`
  ) {
    if (page === 'demo' && placement === 'demo-whatsapp')
      metric = 'reopen_whatsapp';
    if (
      placement === 'footer-whatsapp' ||
      placement === 'mobile-whatsapp' ||
      (page !== 'demo' &&
        (placement === 'faq-whatsapp' || placement === 'final-whatsapp')) ||
      (page === 'demo' && placement === 'demo-direct-whatsapp')
    )
      metric = 'direct_whatsapp';
  } else if (url.protocol === 'mailto:' && url.pathname === site.email) {
    if (page === 'demo' && placement === 'demo-email') metric = 'reopen_email';
    if (
      !url.search &&
      !url.hash &&
      (placement === 'footer-email' ||
        (page === 'demo' && placement === 'demo-direct-email'))
    )
      metric = 'direct_email';
  }
  return metric && metricEvent(page, metric) ? metric : null;
}

function active() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    window.location.origin === sourceOrigin
  );
}

const tracker = createMetricTracker((event) => {
  if (!active()) return;
  try {
    void fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(event),
      keepalive: true,
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      redirect: 'error',
      cache: 'no-store',
    }).catch(() => {});
  } catch {
    /* No retry or navigation dependency. */
  }
});

export function observeMetricsPage(pathname: string | null, restored = false) {
  if (!active()) return;
  tracker.activate(
    metricPage(pathname),
    document.visibilityState === 'visible',
    restored,
  );
}

export function recordMetricLink(
  pathname: string | null,
  href: string,
  placement?: string,
) {
  if (!active()) return;
  observeMetricsPage(pathname);
  const metric = linkMetric(metricPage(pathname), href, placement);
  if (metric) tracker.click(metric);
}

export function recordDemoStarted() {
  if (!active()) return;
  observeMetricsPage('/demo');
  tracker.startDemo();
}

export function recordPreparedDemo(channel: 'whatsapp' | 'email') {
  if (!active()) return;
  observeMetricsPage('/demo');
  tracker.prepareDemo(channel);
}

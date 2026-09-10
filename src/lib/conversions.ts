type Conversion = {
  event: 'atende_cta_click' | 'atende_demo_prepared';
  page: string;
  destination?: 'demo' | 'app' | 'whatsapp' | 'email';
  placement?: string;
};

// Integration hook only: no cookies, storage, network requests or form values.
export function trackConversion(detail: Conversion) {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new CustomEvent('atende:conversion', { detail }));
    const analyticsWindow = window as Window & {
      dataLayer?: Record<string, unknown>[];
    };
    analyticsWindow.dataLayer?.push({ ...detail });
  } catch {
    // An optional analytics consumer must never interrupt the contact flow.
  }
}

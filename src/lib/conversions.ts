export type ConversionDestination = 'demo' | 'pricing' | 'app' | 'whatsapp' | 'email';

export type Conversion = {
  // atende_signup_start: a visitor heads to the app's sign-up door, from the
  // home hero form or any "Crear mi espacio" link. No Meta event listens to it.
  event: 'atende_cta_click' | 'atende_demo_prepared' | 'atende_signup_start';
  page: string;
  destination?: ConversionDestination;
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

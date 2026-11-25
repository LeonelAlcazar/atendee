// Meta's browser library drains this queue once its async script has loaded.
type PixelQueue = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  disablePushState: boolean;
};

declare global {
  interface Window {
    fbq?: PixelQueue;
    _fbq?: PixelQueue;
  }
}

export function loadMetaPixel() {
  if (window.fbq) return window.fbq;

  function enqueue(...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }

  const fbq: PixelQueue = Object.assign(enqueue, {
    queue: [],
    push: enqueue,
    loaded: true,
    version: '2.0',
    // Next.js route changes are tracked explicitly by MetaPixelPreferences.
    disablePushState: true,
  });
  window.fbq = fbq;
  window._fbq ??= fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  return fbq;
}

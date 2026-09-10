'use client';

import { useEffect } from 'react';
import { site } from '@/content/site';
import { trackConversion } from '@/lib/conversions';

export function ConversionEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor =
        event.target instanceof Element
          ? event.target.closest('a[href]')
          : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href);
      const destination =
        url.origin === window.location.origin && url.pathname === '/demo'
          ? 'demo'
          : url.origin === site.appUrl
            ? 'app'
            : url.hostname === 'wa.me'
              ? 'whatsapp'
              : url.protocol === 'mailto:'
                ? 'email'
                : undefined;
      if (!destination) return;
      trackConversion({
        event: 'atende_cta_click',
        page: window.location.pathname,
        destination,
        placement: anchor.dataset.cta ?? 'inline',
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}

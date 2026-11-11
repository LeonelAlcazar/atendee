'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/content/site';
import { trackConversion } from '@/lib/conversions';
import { observeMetricsPage, recordMetricLink } from '@/lib/metrics';

export function ConversionEvents() {
  const pathname = usePathname();
  useEffect(() => {
    observeMetricsPage(pathname);
  }, [pathname]);
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor =
        event.target instanceof Element
          ? event.target.closest('a[href]')
          : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      recordMetricLink(pathname, anchor.href, anchor.dataset.cta);
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
    const onVisibility = () => observeMetricsPage(pathname);
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) observeMetricsPage(pathname, true);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [pathname]);
  return null;
}

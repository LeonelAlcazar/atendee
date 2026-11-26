'use client';

import { useEffect } from 'react';
import { browserFirstTouch, withFirstTouch } from '@/lib/attribution';
import { isSignupHref } from '@/lib/signup';

// Keeps the landing page's utm_* for the visit and adds them to sign-up links
// right before they are used (click, middle click, long press, keyboard).
export function SignupAttribution() {
  useEffect(() => {
    browserFirstTouch();
    const decorate = (event: Event) => {
      const anchor =
        event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(anchor instanceof HTMLAnchorElement) || !isSignupHref(anchor.href)) return;
      const href = withFirstTouch(anchor.href, browserFirstTouch());
      if (href !== anchor.href) anchor.href = href;
    };
    const events = ['pointerdown', 'focusin', 'click', 'auxclick'] as const;
    for (const name of events) document.addEventListener(name, decorate, true);
    return () => {
      for (const name of events) document.removeEventListener(name, decorate, true);
    };
  }, []);
  return null;
}

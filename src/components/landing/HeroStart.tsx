'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type * as React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { landing } from '@/content/landing';
import { browserFirstTouch } from '@/lib/attribution';
import { trackConversion } from '@/lib/conversions';
import { recordSignupStart } from '@/lib/metrics';
import {
  buildSignupStartUrl,
  negocioMaxLength,
  signupUrl,
  utmKeys,
  type Utm,
} from '@/lib/signup';

const ref = 'home-hero';

// The first step of the funnel: one field and one button. Without JavaScript
// it is a plain GET form to the app's sign-up door; with it, the field grows
// with the text, Enter submits, and the visit's first utm_* travel along.
// No Meta event: the app records the Lead when the account exists.
export function HeroStart() {
  const copy = landing.hero.start;
  const pathname = usePathname();
  const field = useRef<HTMLTextAreaElement>(null);
  const [utm, setUtm] = useState<Utm | null>(null);
  const [sending, setSending] = useState(false);

  // Grows with the text, and fits the placeholder while the field is empty.
  const resize = useCallback(() => {
    const element = field.current;
    if (!element) return;
    element.style.height = 'auto';
    let height = element.scrollHeight;
    if (!element.value) {
      element.value = element.placeholder;
      height = element.scrollHeight;
      element.value = '';
    }
    element.style.height = `${height}px`;
  }, []);

  useEffect(() => {
    setUtm(browserFirstTouch());
    resize();
    const onPageShow = () => setSending(false);
    window.addEventListener('resize', resize);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [resize]);

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const data = new FormData(event.currentTarget);
    const href = buildSignupStartUrl({
      negocio: String(data.get('negocio') ?? ''),
      ref,
      utm: browserFirstTouch(),
    });
    // The typed text stays out of analytics: only the placement is sent.
    trackConversion({
      event: 'atende_signup_start',
      page: pathname ?? '/',
      destination: 'app',
      placement: ref,
    });
    recordSignupStart(pathname);
    setSending(true);
    window.location.assign(href);
  }

  return (
    <form
      action={signupUrl}
      method="get"
      onSubmit={onSubmit}
      data-consent-avoid
      className="mx-auto mt-8 w-full max-w-xl md:mt-10"
    >
      <input type="hidden" name="ref" value={ref} />
      {utm &&
        utmKeys.map((key) =>
          utm[key] ? <input key={key} type="hidden" name={key} value={utm[key]} /> : null,
        )}
      {/* One familiar prompt box: on phones the button sits under the field,
          from sm up it lives inside it. Focus rings the whole box, never the
          bare textarea (the global :focus-visible rule needs the ! overrides). */}
      <div className="flex flex-col gap-3 text-left sm:flex-row sm:items-end sm:gap-2 sm:rounded-[1.75rem] sm:bg-surface sm:p-1.5 sm:pl-6 sm:shadow-card sm:ring-1 sm:ring-line sm:transition-shadow sm:duration-200 sm:focus-within:ring-2 sm:focus-within:ring-coral/40">
        <label className="block min-w-0 flex-1 cursor-text rounded-[1.5rem] bg-surface px-5 py-3.5 shadow-card ring-1 ring-line transition-shadow duration-200 focus-within:ring-2 focus-within:ring-coral/40 sm:rounded-none sm:bg-transparent sm:px-0 sm:py-2.5 sm:shadow-none sm:ring-0 sm:focus-within:ring-0">
          <span className="sr-only">{copy.label}</span>
          <textarea
            ref={field}
            name="negocio"
            rows={1}
            maxLength={negocioMaxLength}
            placeholder={copy.placeholder}
            autoComplete="off"
            enterKeyHint="go"
            onInput={resize}
            onKeyDown={onKeyDown}
            className="block max-h-48 w-full resize-none overflow-y-auto bg-transparent text-[1.0625rem] leading-6 text-ink placeholder:text-muted focus:outline-none focus-visible:shadow-none! focus-visible:outline-none!"
          />
        </label>
        <button
          type="submit"
          aria-busy={sending}
          className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-coral-fill px-6 text-[1rem] font-semibold text-white transition-colors duration-200 hover:bg-coral-strong sm:w-auto"
        >
          {copy.submit}
          <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
        </button>
      </div>
      <p className="mt-4 text-center text-[0.9375rem] text-muted">
        <span className="block sm:inline">{copy.note}</span>
        <span aria-hidden="true" className="hidden sm:inline">
          {' · '}
        </span>
        <span className="block whitespace-nowrap sm:inline">
          {copy.demoLead}{' '}
          <a
            href="/demo"
            data-cta="hero-demo"
            className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:decoration-ink"
          >
            {copy.demoLink}
          </a>
        </span>
      </p>
    </form>
  );
}

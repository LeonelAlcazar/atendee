'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type * as React from 'react';
import { usePathname } from 'next/navigation';
import { buttonClass } from '@/components/ui/Button';
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
      className="mx-auto mt-8 w-full max-w-2xl md:mt-10"
    >
      <input type="hidden" name="ref" value={ref} />
      {utm &&
        utmKeys.map((key) =>
          utm[key] ? <input key={key} type="hidden" name={key} value={utm[key]} /> : null,
        )}
      <div className="flex flex-col gap-2 rounded-[2rem] bg-surface p-2 text-left shadow-float ring-1 ring-line transition-shadow duration-200 focus-within:ring-2 focus-within:ring-ink/50 sm:flex-row sm:items-end">
        <label className="block min-w-0 flex-1 cursor-text px-4 pt-3 sm:pb-2">
          <span className="block text-sm font-semibold">{copy.label}</span>
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
            className="mt-1 block max-h-60 w-full resize-none overflow-y-auto bg-transparent pb-1 text-[1.0625rem] leading-normal text-ink placeholder:text-muted focus:outline-none max-sm:min-h-[3.25em]"
          />
        </label>
        <button
          type="submit"
          aria-busy={sending}
          className={`${buttonClass('primary', 'lg')} w-full shrink-0 sm:w-auto`}
        >
          {copy.submit}
        </button>
      </div>
      <p className="mt-3 flex flex-col items-center justify-center text-center text-[0.9375rem] text-muted sm:flex-row sm:gap-x-1.5">
        <span className="pt-2 sm:pt-0">{copy.note}</span>
        <span aria-hidden="true" className="hidden sm:inline">
          ·
        </span>
        <span>
          {copy.demoLead}{' '}
          <a
            href="/demo"
            data-cta="hero-demo"
            className="inline-flex min-h-11 items-center font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:decoration-ink"
          >
            {copy.demoLink}
          </a>
        </span>
      </p>
    </form>
  );
}

'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { site } from '@/content/site';
import { loadMetaPixel } from '@/lib/meta-pixel';
import type { Conversion } from '@/lib/conversions';

const storageKey = 'atende:meta-pixel-consent';
type Choice = 'granted' | 'denied';

function readChoice(): Choice | null {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'granted' || saved === 'denied') return saved;
  } catch {
    // Visitors can still choose for this page when storage is unavailable.
  }
  return null;
}

function shareRegistrationChoice(choice: Choice | null) {
  // The dashboard checks this first-party preference when WorkOS confirms a signup.
  try {
    document.cookie = `atende_meta_consent=${choice ?? ''}; Domain=${site.domain}; Path=/; Secure; SameSite=Lax; Max-Age=${choice === 'granted' ? 15552000 : 0}`;
  } catch {
    // With cookies blocked, the preference applies only on the marketing site.
  }
}

// A first-visit card is always shown, but never over the page's main form
// (the home hero marks it with data-consent-avoid): it sits at the bottom when
// the form is clear of it, otherwise at the top under the header. It only
// steps aside while the visitor is typing in that form.
type Place = 'bottom' | 'top' | 'aside';
const EDGE = 12;
const TOP_OFFSET = 72;

function overlapsVertically(top: number, bottom: number, target: Element) {
  const b = target.getBoundingClientRect();
  return top < b.bottom && bottom > b.top;
}

export function MetaPixelPreferences() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice | null>();
  const [editing, setEditing] = useState(false);
  // Starts out of sight until measured, so it never flashes over the form.
  const [place, setPlace] = useState<Place>('aside');
  const card = useRef<HTMLElement>(null);
  const initialized = useRef(false);
  const lastPage = useRef<string | null>(null);
  const asking = choice === null && !editing;

  useLayoutEffect(() => {
    if (!asking) {
      setPlace('bottom');
      return;
    }
    const target = document.querySelector('[data-consent-avoid]');
    if (!target) {
      setPlace('bottom');
      return;
    }
    let frame = 0;
    const check = () => {
      frame = 0;
      if (!card.current) return;
      if (target.contains(document.activeElement)) return setPlace('aside');
      const height = card.current.getBoundingClientRect().height;
      const viewport = window.visualViewport?.height ?? window.innerHeight;
      const bottomTop = viewport - EDGE - height;
      if (!overlapsVertically(bottomTop, viewport - EDGE, target)) return setPlace('bottom');
      setPlace(overlapsVertically(TOP_OFFSET, TOP_OFFSET + height, target) ? 'aside' : 'top');
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };
    check();
    // Fonts and late layout move the form: check again when anything resizes.
    const layout = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    layout?.observe(target);
    layout?.observe(document.body);
    document.fonts?.ready.then(schedule).catch(() => {});
    const viewport = window.visualViewport;
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    viewport?.addEventListener('resize', schedule);
    document.addEventListener('focusin', schedule);
    document.addEventListener('focusout', schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      layout?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      viewport?.removeEventListener('resize', schedule);
      document.removeEventListener('focusin', schedule);
      document.removeEventListener('focusout', schedule);
    };
  }, [asking, pathname]);

  useEffect(() => {
    if (window.location.origin !== site.url) return;
    setChoice(readChoice());
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) setChoice(readChoice());
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => {
    if (choice === undefined) return;
    if (choice !== 'granted') {
      if (initialized.current) window.fbq?.('consent', 'revoke');
      lastPage.current = null;
      return;
    }
    if (!pathname || lastPage.current === pathname) return;

    const fbq = loadMetaPixel();
    if (!lastPage.current) fbq('consent', 'grant');
    if (!initialized.current) {
      fbq('set', 'autoConfig', false, site.metaPixelId);
      fbq('init', site.metaPixelId);
      initialized.current = true;
    }
    fbq('trackSingle', site.metaPixelId, 'PageView');
    lastPage.current = pathname;
  }, [choice, pathname]);

  useEffect(() => {
    if (choice !== undefined) shareRegistrationChoice(choice);
    if (choice !== 'granted') return;
    const onConversion = (event: Event) => {
      const { detail } = event as CustomEvent<Conversion>;
      if (detail?.event === 'atende_cta_click' && detail.destination === 'whatsapp') {
        window.fbq?.('trackSingle', site.metaPixelId, 'Contact');
        window.fbq?.('trackSingle', site.metaPixelId, 'Lead');
      }
    };
    window.addEventListener('atende:conversion', onConversion);
    return () => window.removeEventListener('atende:conversion', onConversion);
  }, [choice]);

  function choose(value: Choice) {
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      // The in-memory choice still applies to this visit.
    }
    setChoice(value);
    setEditing(false);
  }

  if (choice === undefined) return null;
  return (
    <>
      <button
        type="button"
        className="inline-flex min-h-11 items-center hover:text-ink"
        onClick={() => setEditing(true)}
      >
        Cookies publicitarias
      </button>
      {(choice === null || editing) && (
        <section
          ref={card}
          aria-label="Preferencias de cookies publicitarias"
          data-place={place}
          className={`fixed inset-x-3 z-50 mx-auto max-w-lg rounded-2xl bg-surface p-5 text-base text-ink shadow-float ${
            place === 'top' ? 'top-[72px]' : 'bottom-3'
          } ${
            place === 'aside'
              ? 'invisible opacity-0'
              : 'visible opacity-100 transition-opacity duration-300 ease-smooth motion-reduce:transition-none'
          }`}
        >
          <p>
            ¿Aceptás que compartamos con Meta tus visitas, los clics en WhatsApp
            y el registro de tu cuenta para medir nuestros anuncios?{' '}
            <Link href="/politica-de-privacidad#cookies" className="underline">
              Ver política de privacidad
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              className="min-h-11 rounded-full px-5 font-semibold ring-1 ring-line-strong"
              onClick={() => choose('denied')}
            >
              Rechazar
            </button>
            <button
              type="button"
              className="min-h-11 rounded-full bg-ink px-5 font-semibold text-white"
              onClick={() => choose('granted')}
            >
              Aceptar
            </button>
          </div>
        </section>
      )}
    </>
  );
}

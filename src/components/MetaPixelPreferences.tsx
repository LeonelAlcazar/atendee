'use client';

import { useEffect, useRef, useState } from 'react';
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

export function MetaPixelPreferences() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice | null>();
  const [editing, setEditing] = useState(false);
  const initialized = useRef(false);
  const lastPage = useRef<string | null>(null);

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
          aria-label="Preferencias de cookies publicitarias"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-lg rounded-2xl bg-surface p-5 text-base text-ink shadow-float"
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

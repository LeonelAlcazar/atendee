'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { site } from '@/content/site';
import { buildWaLink } from '@/lib/wa';

type Nav = { href: string; label: string }[];

export function MobileMenu({ nav }: { nav: Nav }) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  const close = React.useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [close, open]);

  return (
    <div className="flex items-center gap-2 md:hidden">
      <a
        href={site.appUrl}
        className="inline-flex min-h-11 items-center rounded-md border border-ink bg-surface px-3 text-sm font-semibold"
      >
        Entrar
      </a>
      <button
        ref={triggerRef}
        type="button"
        className="grid size-11 place-items-center rounded-md border-2 border-ink bg-coral shadow-[var(--shadow-brut-xs)] active:translate-x-px active:translate-y-px active:shadow-none"
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(true)}
      >
        <Menu size={20} />
      </button>

      {open && (
        <div
          ref={dialogRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
          className="fixed inset-0 z-50 flex max-h-[100svh] flex-col overflow-y-auto bg-bg"
        >
          <div className="flex min-h-[4.75rem] items-center justify-between border-b-2 border-ink px-5">
            <Link href="/" onClick={close} className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-md border-2 border-ink bg-coral font-display text-base font-bold shadow-[var(--shadow-brut-xs)]">
                A
              </span>
              <span className="font-display text-2xl font-semibold">
                atende<span className="text-coral">.</span>
              </span>
            </Link>
            <button
              ref={closeRef}
              type="button"
              className="grid size-11 place-items-center rounded-md border-2 border-ink bg-surface shadow-[var(--shadow-brut-xs)]"
              aria-label="Cerrar menú"
              onClick={close}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col px-5 py-7" aria-label="Navegación móvil">
            {nav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="group flex items-center justify-between border-b border-ink/25 py-5 font-display text-3xl font-semibold tracking-[-0.035em]"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-coral-strong transition-transform group-hover:translate-x-1" aria-hidden="true">
                  0{index + 1} →
                </span>
              </Link>
            ))}
          </nav>

          <div className="border-t-2 border-ink bg-coral-soft p-5">
            <div className="grid gap-3">
              <Button href={site.appUrl} variant="primary" size="lg" className="w-full">
                Crear mi espacio <span aria-hidden="true">→</span>
              </Button>
              <a
                href={buildWaLink('Hola, vi atende.com.ar y quiero saber más')}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 text-center font-mono text-[10px] uppercase tracking-[0.08em] underline decoration-2 underline-offset-4"
              >
                O hablar con una persona
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

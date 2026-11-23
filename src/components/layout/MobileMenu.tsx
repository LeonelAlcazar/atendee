'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buildDemoLink } from '@/lib/leads';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Wordmark } from '@/components/ui/Wordmark';
import { site } from '@/content/site';
import { buildWaLink } from '@/lib/wa';

type Nav = { href: string; label: string }[];

const secondary = [
  { href: '/que-es-atende', label: 'Qué es Atende' },
  { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
];

const iconButton =
  'grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-200 hover:bg-ink/5 active:bg-ink/10';

export function MobileMenu({ nav }: { nav: Nav }) {
  const pathname = usePathname();
  const source = /^\/(?:servicios\/|casos-de-uso\/)?([^/]+)$/.exec(pathname)?.[1];
  const demoHref = buildDemoLink(source);
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
    <div className="-mr-2 flex shrink-0 items-center gap-1 lg:hidden">
      {pathname === '/demo' ? (
        <a
          href={site.appUrl}
          className="inline-flex min-h-11 items-center rounded-full px-3 text-[0.9375rem] font-medium md:hidden"
        >
          Entrar
        </a>
      ) : (
        <Link
          href={demoHref}
          data-cta="mobile-header-demo"
          className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-coral-fill px-4 text-sm font-semibold text-white transition-colors duration-200 active:bg-coral-strong md:hidden"
        >
          Pedí una demo
        </Link>
      )}
      <button
        ref={triggerRef}
        type="button"
        className={iconButton}
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} strokeWidth={1.75} />
      </button>

      {open && (
        <div
          ref={dialogRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
          className="menu-sheet fixed inset-0 z-50 flex max-h-[100svh] flex-col overflow-y-auto bg-bg"
        >
          <div className="flex min-h-14 items-center justify-between px-5 md:min-h-16 md:px-8">
            <Link href="/" onClick={close} className="flex min-h-11 items-center rounded-lg">
              <Wordmark className="text-[1.625rem] md:text-[1.75rem]" />
              <span className="sr-only">Inicio</span>
            </Link>
            <button
              ref={closeRef}
              type="button"
              className={`-mr-2 ${iconButton}`}
              aria-label="Cerrar menú"
              onClick={close}
            >
              <X size={22} strokeWidth={1.75} />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col px-5 pb-6 pt-6 md:px-8"
            aria-label="Navegación móvil"
          >
            {nav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                style={{ '--at': 40 + index * 45 } as React.CSSProperties}
                className="seq flex min-h-14 items-center text-[2rem] font-semibold tracking-[-0.04em]"
              >
                {item.label}
              </Link>
            ))}
            <div
              className="seq mt-6 flex flex-col border-t border-line pt-4 text-lg text-muted"
              style={{ '--at': 300 } as React.CSSProperties}
            >
              <a href={site.appUrl} className="inline-flex min-h-11 items-center">
                Entrar a mi espacio
              </a>
              {secondary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="inline-flex min-h-11 items-center"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="grid gap-1 px-5 pb-6 md:px-8">
            <Button
              href={demoHref}
              data-cta="mobile-demo"
              onClick={close}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Pedí una demo
            </Button>
            <a
              href={buildWaLink('Hola, vi atende.com.ar y quiero saber más')}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="mobile-whatsapp"
              className="inline-flex min-h-11 items-center justify-center text-center text-[0.9375rem] font-medium text-muted"
            >
              O escribinos por WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

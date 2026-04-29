'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { buildWaLink } from '@/lib/wa';

type Nav = { href: string; label: string }[];

export function MobileMenu({ nav }: { nav: Nav }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="md:hidden border-2 border-ink p-2 shadow-[var(--shadow-brut-sm)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        aria-label="Abrir menú"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu size={20} />
      </button>

      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-bg flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b-2 border-ink">
            <span className="font-display font-semibold text-2xl">
              atende<span className="text-coral">.</span>
            </span>
            <button
              type="button"
              className="border-2 border-ink p-2 shadow-[var(--shadow-brut-sm)]"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2 px-5 py-8 flex-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="font-display font-semibold text-4xl tracking-[-0.02em] py-3 border-b-2 border-ink"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="p-5 border-t-2 border-ink">
            <Button
              href={buildWaLink('Hola, vi atende.com.ar y quiero saber más')}
              variant="primary"
              size="lg"
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

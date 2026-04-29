'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { buildWaLink } from '@/lib/wa';

const nav = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/casos-de-uso', label: 'Casos de uso' },
  { href: '/#faq', label: 'FAQ' },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-bg border-b-2 border-ink transition-[padding] ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display font-semibold text-2xl md:text-3xl tracking-[-0.02em]"
          aria-label="atende — inicio"
        >
          atende<span className="text-coral">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-base">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hover:text-coral transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            href={buildWaLink('Hola, vi atende.com.ar y quiero saber más')}
            variant="primary"
            size="md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </Button>
        </div>

        <MobileMenu nav={nav} />
      </div>
    </header>
  );
}

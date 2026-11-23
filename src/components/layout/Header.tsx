import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Wordmark } from '@/components/ui/Wordmark';
import { MobileMenu } from './MobileMenu';
import { site } from '@/content/site';

const nav = [
  { href: '/servicios', label: 'Soluciones' },
  { href: '/casos-de-uso', label: 'Rubros' },
  { href: '/integraciones', label: 'Integraciones' },
  { href: '/precios', label: 'Precios' },
  { href: '/blog', label: 'Guías' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40">
      {/* The blur lives on its own layer. A filter on the header itself would
          trap the fixed mobile menu inside it. */}
      <div
        className="absolute inset-0 border-b border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-5 md:h-16 md:px-8">
        <Link href="/" className="flex min-h-11 items-center rounded-lg">
          <Wordmark className="text-[1.625rem] md:text-[1.75rem]" />
          <span className="sr-only">Inicio</span>
        </Link>

        <nav
          className="hidden items-center gap-1 text-[0.9375rem] lg:flex"
          aria-label="Navegación principal"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-full px-3.5 text-ink/75 transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={site.appUrl}
            className="inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-medium text-ink/75 transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
          >
            Entrar
          </a>
          <Button href="/demo" data-cta="header-demo" variant="primary" size="md">
            Pedí una demo
          </Button>
        </div>

        <MobileMenu nav={nav} />
      </div>
    </header>
  );
}

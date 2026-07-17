import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { site } from '@/content/site';

const nav = [
  { href: '/#producto', label: 'Producto' },
  { href: '/#como-funciona', label: 'Cómo funciona' },
  { href: '/#casos', label: 'Ejemplos' },
  { href: '/#faq', label: 'Preguntas' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-bg">
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-5 px-5 md:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-sm"
        >
          <span
            className="grid size-9 place-items-center rounded-md border-2 border-ink bg-coral font-display text-base font-bold shadow-[var(--shadow-brut-xs)] transition-transform group-hover:-rotate-3"
            aria-hidden="true"
          >
            A
          </span>
          <span className="font-display text-2xl font-semibold tracking-[-0.035em]">
            atende<span className="text-coral">.</span>
          </span>
          <span className="sr-only">Inicio</span>
        </Link>

        <nav className="hidden items-center gap-6 font-body text-sm lg:flex" aria-label="Navegación principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm py-2 font-medium transition-colors hover:text-coral"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={site.appUrl}
            className="rounded-sm px-2 py-2 text-sm font-semibold underline decoration-2 underline-offset-4 hover:text-coral"
          >
            Entrar
          </a>
          <Button href={site.appUrl} variant="primary" size="md">
            Crear mi espacio <span aria-hidden="true">→</span>
          </Button>
        </div>

        <MobileMenu nav={nav} />
      </div>
    </header>
  );
}

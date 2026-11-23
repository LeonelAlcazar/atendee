import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { site } from '@/content/site';

// Next adds its own noindex to every 404. The nulls clear what the root layout
// sets, so a 404 has one robots directive and none of the home's metadata.
export const metadata: Metadata = {
  title: { absolute: `Página no encontrada — ${site.name}` },
  description: null,
  robots: null,
  alternates: null,
  openGraph: null,
  twitter: null,
};

const links = [
  { href: '/casos-de-uso', label: 'Qué hace Atende en tu rubro' },
  { href: '/servicios', label: 'Soluciones' },
  { href: '/blog', label: 'Guías de WhatsApp' },
];

export default function NotFound() {
  return (
    <section className="grid min-h-[70svh] place-items-center px-5 py-20 md:px-8 md:py-28">
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        <p className="text-sm font-semibold text-coral-strong">Error 404</p>
        <h1 className="mt-4 text-balance text-headline">
          <span className="block">No atendemos</span>{' '}
          <span className="block text-faint">esto.</span>
        </h1>
        <p className="mt-5 max-w-md text-pretty text-lead text-muted md:mt-6">
          La página que buscás no existe o cambió de lugar. Volvé al inicio o
          seguí por acá.
        </p>
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button href="/" variant="primary" size="lg" className="w-full sm:w-auto">
            Volver al inicio
          </Button>
          <Button
            href="/demo"
            data-cta="404-demo"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            Pedí una demo
          </Button>
        </div>
        <ul className="mt-8 flex flex-col items-center gap-x-6 sm:flex-row sm:flex-wrap sm:justify-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center font-semibold underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:decoration-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

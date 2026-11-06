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
    <section className="grid min-h-[70vh] place-items-center px-5 py-20 md:px-8">
      <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
          Error 404
        </span>
        <h1 className="font-display text-[3.25rem] font-semibold leading-[0.9] tracking-[-0.025em] sm:text-7xl md:text-9xl">
          No <span className="text-coral">atendemos</span> esto.
        </h1>
        <p className="max-w-md font-body text-lg text-mute">
          La página que buscás no existe o cambió de lugar. Volvé al inicio o
          seguí por acá.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            Volver al inicio
          </Button>
          <Button href="/demo" data-cta="404-demo" variant="outline" size="md">
            Pedí una demo
          </Button>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-coral-strong"
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

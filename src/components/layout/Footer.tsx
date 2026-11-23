import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Wordmark } from '@/components/ui/Wordmark';
import { rubros } from '@/content/rubros';
import { servicios } from '@/content/servicios';
import { site } from '@/content/site';
import { buildWaLink } from '@/lib/wa';

type FooterLink = { href: string; label: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Soluciones',
    links: [
      { href: '/servicios', label: 'Todas las soluciones' },
      ...servicios.map((service) => ({
        href: `/servicios/${service.slug}`,
        label: service.title,
      })),
      { href: '/integraciones', label: 'Integraciones a pedido' },
      { href: '/precios', label: 'Precios y planes' },
    ],
  },
  {
    title: 'Rubros',
    links: [
      { href: '/casos-de-uso', label: 'Todos los rubros' },
      ...rubros.map((rubro) => ({
        href: `/casos-de-uso/${rubro.slug}`,
        label: rubro.name,
      })),
    ],
  },
  {
    title: 'Atende',
    links: [
      { href: '/que-es-atende', label: 'Qué es Atende' },
      { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
      { href: '/nosotros', label: 'Quiénes somos' },
      { href: '/blog', label: 'Guías de WhatsApp' },
      { href: '/blog/tema/bot-de-whatsapp', label: 'Guías de bot de WhatsApp' },
      { href: '/blog/tema/alternativas', label: 'Alternativas y comparativas' },
    ],
  },
];

// 44px rows for fingers, tighter rows where there is a pointer.
const linkClass =
  'inline-flex min-h-11 items-center py-1 leading-snug text-muted transition-colors duration-200 hover:text-ink lg:min-h-8';
const titleClass = 'mb-1 text-sm font-semibold text-ink lg:mb-2';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-14 md:px-8 md:pt-20">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/" className="inline-flex min-h-11 items-center rounded-lg">
              <Wordmark className="text-4xl" />
              <span className="sr-only">Inicio</span>
            </Link>
            <p className="mt-3 max-w-md leading-relaxed text-muted">
              El asistente de WhatsApp para negocios argentinos. Conectado a tu
              sistema, reserva, cotiza y toma pedidos, con tu equipo al tanto.
            </p>
          </div>
          <Button
            href="/demo"
            data-cta="footer-demo"
            variant="dark"
            size="md"
            className="self-start md:self-auto"
          >
            Pedí una demo
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 text-sm md:mt-16 lg:grid-cols-4">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className={titleClass}>{column.title}</p>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className={titleClass}>Contacto</p>
            <ul>
              <li>
                <a
                  href={buildWaLink('Hola, vi atende.com.ar y quiero hacer una consulta')}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="footer-whatsapp"
                  className={linkClass}
                >
                  WhatsApp {site.whatsapp.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  data-cta="footer-email"
                  className={`${linkClass} break-all`}
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.appUrl} className={linkClass}>
                  Entrar a la app
                </a>
              </li>
              <li>
                <a href={site.appUrl} data-cta="footer-signup" className={linkClass}>
                  Crear mi espacio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-x-6 gap-y-1 border-t border-line pt-4 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <span>
            {site.legalName} · {site.location} · 2026
          </span>
          <div className="flex flex-wrap gap-x-6">
            <Link
              href="/terminos-y-condiciones"
              className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-ink"
            >
              Términos
            </Link>
            <Link
              href="/politica-de-privacidad"
              className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-ink"
            >
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

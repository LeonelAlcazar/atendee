import Link from 'next/link';
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

const linkClass =
  'inline-flex min-h-11 items-center py-1 leading-snug hover:text-coral';

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-bg">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 px-5 py-14 sm:grid-cols-2 md:px-8 md:py-16 lg:grid-cols-[1.25fr_1fr_1fr_0.85fr_0.95fr]">
        <div className="flex flex-col items-start sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex min-h-11 items-center gap-2.5">
            <span
              className="grid size-10 place-items-center rounded-md border-2 border-bg bg-coral font-display text-lg font-bold text-ink shadow-[3px_3px_0_var(--color-bg)]"
              aria-hidden="true"
            >
              A
            </span>
            <span className="font-display text-3xl font-semibold tracking-[-0.04em]">
              atende<span className="text-coral">.</span>
            </span>
            <span className="sr-only">Inicio</span>
          </Link>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-bg/70">
            Bot de WhatsApp para empresas y PyMEs argentinas. Conectado a tu
            sistema, reserva, cotiza y registra pedidos, con tu equipo al tanto.
          </p>
          <a
            href="/demo"
            data-cta="footer-demo"
            className="mt-6 inline-flex min-h-11 items-center rounded-md border-2 border-bg bg-coral px-5 font-display text-sm font-semibold !text-ink shadow-[3px_3px_0_var(--color-bg)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Pedí una demo <span className="ml-2" aria-hidden="true">→</span>
          </a>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="text-sm">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-bg/65">
              {column.title}
            </p>
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

        <div className="text-sm">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-bg/65">
            Contacto
          </p>
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
              <a href={`mailto:${site.email}`} className={linkClass}>
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
            <li className="mt-1 py-1 leading-snug text-bg/65">{site.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bg/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.08em] text-bg/65 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span>{site.legalName} · {site.location} · 2026</span>
          <div className="flex flex-wrap gap-x-6">
            <Link href="/terminos-y-condiciones" className="inline-flex min-h-11 items-center hover:text-bg">Términos</Link>
            <Link href="/politica-de-privacidad" className="inline-flex min-h-11 items-center hover:text-bg">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

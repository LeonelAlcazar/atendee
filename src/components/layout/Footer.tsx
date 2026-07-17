import Link from 'next/link';
import { site } from '@/content/site';
import { buildWaLink } from '@/lib/wa';

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-bg">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] md:px-8 md:py-16">
        <div className="flex flex-col items-start">
          <Link href="/" className="flex items-center gap-2.5">
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
          <p className="mt-5 max-w-sm text-base leading-relaxed text-bg/65">
            Respuestas automáticas y una bandeja simple para atender mejor por WhatsApp.
          </p>
          <a
            href={site.appUrl}
            className="mt-6 inline-flex min-h-11 items-center rounded-md border-2 border-bg bg-coral px-5 font-display text-sm font-semibold !text-ink shadow-[3px_3px_0_var(--color-bg)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Abrir Atende <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.08em] text-bg/60">
            Producto
          </span>
          <Link href="/#producto" className="w-fit hover:text-coral">Qué hace</Link>
          <Link href="/#como-funciona" className="w-fit hover:text-coral">Cómo funciona</Link>
          <Link href="/#casos" className="w-fit hover:text-coral">Ejemplos</Link>
          <Link href="/#faq" className="w-fit hover:text-coral">Preguntas</Link>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.08em] text-bg/60">
            Cuenta
          </span>
          <a href={site.appUrl} className="w-fit hover:text-coral">Entrar</a>
          <a href={site.appUrl} className="w-fit hover:text-coral">Crear mi espacio</a>
          <Link href="/servicios" className="w-fit hover:text-coral">Servicios</Link>
          <Link href="/casos-de-uso" className="w-fit hover:text-coral">Casos de uso</Link>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.08em] text-bg/60">
            Contacto
          </span>
          <a
            href={buildWaLink('Hola, vi atende.com.ar y quiero hacer una consulta')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit hover:text-coral"
          >
            WhatsApp · {site.whatsapp.display}
          </a>
          <a href={`mailto:${site.email}`} className="w-fit hover:text-coral">
            {site.email}
          </a>
          <span className="text-bg/55">{site.location}</span>
        </div>
      </div>

      <div className="border-t border-bg/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 font-mono text-[9px] uppercase tracking-[0.08em] text-bg/60 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span>{site.legalName} · {site.location} · 2026</span>
          <div className="flex flex-wrap gap-5">
            <Link href="/terminos-y-condiciones" className="hover:text-bg">Términos</Link>
            <Link href="/politica-de-privacidad" className="hover:text-bg">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { site } from '@/content/site';
import { buildWaLink } from '@/lib/wa';

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-bg mt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <span className="font-display font-semibold text-3xl tracking-[-0.02em]">
            atende<span className="text-coral">.</span>
          </span>
          <p className="font-body text-base text-mute max-w-sm">
            Bots de atención, turnos y ventas por WhatsApp para PyMEs argentinas.
          </p>
          <Button
            href={buildWaLink('Hola, vi el footer de atende.com.ar')}
            variant="primary"
            size="md"
            className="self-start"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
            Navegación
          </span>
          <Link href="/" className="hover:text-coral">Inicio</Link>
          <Link href="/servicios" className="hover:text-coral">Servicios</Link>
          <Link href="/casos-de-uso" className="hover:text-coral">Casos de uso</Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
            Legal
          </span>
          <Link href="/terminos-y-condiciones" className="hover:text-coral">
            Términos y condiciones
          </Link>
          <Link href="/politica-de-privacidad" className="hover:text-coral">
            Política de privacidad
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
            Contacto
          </span>
          <a
            href={buildWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-coral"
          >
            WhatsApp · {site.whatsapp.display}
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-coral">
            {site.email}
          </a>
          <span className="text-mute text-sm">{site.location}</span>
        </div>
      </div>

      <div className="border-t-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 font-mono text-xs uppercase tracking-[0.08em] text-mute">
          {site.legalName} · {site.location} · 2026
        </div>
      </div>
    </footer>
  );
}

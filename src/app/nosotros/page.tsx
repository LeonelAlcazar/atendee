import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react';
import { pages } from '@/content/pages';
import { site } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { buildWaLink } from '@/lib/wa';
import { pageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { FactRows } from '@/components/servicios/FactRows';

export const metadata = createPageMetadata(pages.about);
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Nosotros', path: '/nosotros' },
];

const link =
  'font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:decoration-ink';
const contactIcon =
  'grid size-11 shrink-0 place-items-center rounded-full bg-surface shadow-card';
const contactLink =
  'inline-flex min-h-11 items-center text-lg font-semibold tracking-[-0.015em] underline-offset-4 hover:underline';

export default function NosotrosPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="pb-16 pt-8 md:pb-24 md:pt-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            level="h1"
            eyebrow="Nosotros"
            title={
              <>
                <span className="block">Hacemos Atende en Córdoba,</span>{' '}
                <span className="block text-faint">para que tu WhatsApp termine tareas.</span>
              </>
            }
            sub="Atende se hace en Córdoba, Argentina. Es un asistente para el WhatsApp de negocios argentinos: conectado a tu sistema, reserva el turno, registra el pedido o cotiza en la conversación, con tu equipo al tanto."
          />
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-balance text-headline">Cómo trabajamos</h2>
          <FactRows
            className="mt-8 md:mt-12"
            rows={[
              {
                label: 'Publicamos qué funciona hoy',
                text: (
                  <>
                    Una{' '}
                    <Link href="/que-es-atende#estado" className={link}>
                      tabla pública
                    </Link>{' '}
                    separa lo que viene con los planes con IA de lo que armamos
                    a pedido.
                  </>
                ),
              },
              {
                label: 'Armamos cada conexión',
                text: (
                  <>
                    No vendemos un armador de flujos. Armamos la{' '}
                    <Link href="/integraciones" className={link}>
                      conexión con tu sistema
                    </Link>
                    , para tu negocio. Sin conexión, el asistente junta el pedido y
                    tu equipo lo confirma.
                  </>
                ),
              },
              {
                label: 'No inventamos clientes',
                text: 'Las conversaciones del sitio muestran cómo trabaja Atende. No son clientes ni testimonios, y la demo se presenta como demo.',
              },
              {
                label: 'Decimos los límites',
                text: (
                  <>
                    Para tomar un pedido por audio, el asistente usa su transcripción.
                    Las fotos las revisa una persona. Podés consultar los detalles en{' '}
                    <Link href="/que-es-atende" className={link}>
                      qué es Atende
                    </Link>
                    .
                  </>
                ),
              },
              {
                label: 'Explicamos cómo escribimos',
                text: (
                  <>
                    Las guías del blog firman como Equipo Atende y nuestros{' '}
                    <Link href="/blog/editorial" className={link}>
                      criterios editoriales
                    </Link>{' '}
                    son públicos.
                  </>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-balance text-headline">Cómo contactarnos</h2>
          <ul className="mt-8 flex flex-col gap-4 md:mt-12 lg:flex-row lg:gap-12">
            <li className="flex items-center gap-4">
              <span className={contactIcon} aria-hidden="true">
                <MessageCircle size={20} strokeWidth={1.75} />
              </span>
              <a
                href={buildWaLink('Hola, quiero hablar con el equipo de Atende')}
                data-cta="about-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className={contactLink}
              >
                <span>
                  WhatsApp ·{' '}
                  {/* The number and its icon never break apart. */}
                  <span className="whitespace-nowrap">
                    {site.whatsapp.display}
                    <ArrowUpRight
                      size={18}
                      className="ml-1 inline-block align-[-0.15em] text-muted"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className={contactIcon} aria-hidden="true">
                <Mail size={20} strokeWidth={1.75} />
              </span>
              <a href={`mailto:${site.email}`} className={contactLink}>
                {site.email}
              </a>
            </li>
            <li className="flex min-h-11 items-center gap-4 text-lg text-muted">
              <span className={contactIcon} aria-hidden="true">
                <MapPin size={20} strokeWidth={1.75} className="text-ink" />
              </span>
              {site.location}
            </li>
          </ul>
        </div>
      </section>

      <CtaFinal context="Hola, quiero hablar con el equipo de Atende sobre mi negocio" />
      <JsonLd value={pageGraph({ ...pages.about, breadcrumbs })} />
    </>
  );
}

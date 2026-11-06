import Link from 'next/link';
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

const link = 'font-semibold text-ink underline underline-offset-4';

export default function NosotrosPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="border-b-2 border-ink py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            level="h1"
            eyebrow="Nosotros"
            title={
              <>
                Hacemos Atende en Córdoba,{' '}
                <span className="text-coral">para que tu WhatsApp termine tareas.</span>
              </>
            }
            sub="Atende se hace en Córdoba, Argentina. Es un asistente para el WhatsApp de negocios argentinos: conectado a tu sistema, reserva el turno, registra el pedido o cotiza en la conversación, con tu equipo al tanto."
          />
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
            Cómo trabajamos
          </h2>
          <FactRows
            className="mt-8"
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
                label: 'Marcamos los ejemplos',
                text: 'Las conversaciones del sitio dicen “Ejemplo ilustrativo”. No son clientes ni testimonios, y la demo se presenta como demo.',
              },
              {
                label: 'Decimos los límites',
                text: (
                  <>
                    Solo mensajes de texto, conexión por QR y no por la API
                    oficial de Meta, y el resto está en{' '}
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

      <section className="border-b-2 border-ink py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
            Cómo contactarnos
          </h2>
          <ul className="mt-6 flex flex-col text-lg">
            <li>
              <a
                href={buildWaLink('Hola, quiero hablar con el equipo de Atende')}
                data-cta="about-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
              >
                WhatsApp · {site.whatsapp.display} ↗
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
              >
                {site.email}
              </a>
            </li>
            <li className="flex min-h-11 items-center text-mute">
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

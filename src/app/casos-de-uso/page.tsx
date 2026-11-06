import Link from 'next/link';
import type { Metadata } from 'next';
import { RubroCard } from '@/components/casos/RubroCard';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { pages } from '@/content/pages';
import { rubros } from '@/content/rubros';
import { createPageMetadata } from '@/lib/metadata';
import { pageGraph } from '@/lib/structured-data';
import { buildWaLink } from '@/lib/wa';

export const metadata: Metadata = createPageMetadata(pages.cases);

const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Casos de uso', path: '/casos-de-uso' },
];

const otherTrades = [
  { slug: 'como-automatizar-whatsapp-academias-y-cursos', label: 'Academias y cursos' },
  { slug: 'como-automatizar-whatsapp-agencias-de-viajes', label: 'Agencias de viajes' },
  { slug: 'como-automatizar-whatsapp-servicios-tecnicos', label: 'Servicios técnicos' },
  { slug: 'como-automatizar-whatsapp-logistica', label: 'Logística' },
  { slug: 'como-automatizar-whatsapp-fabricantes', label: 'Fabricantes' },
];

export default function CasosDeUsoPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="border-b-2 border-ink py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Casos de uso"
            level="h1"
            title={
              <>
                Qué tarea termina Atende <span className="text-coral">en tu rubro.</span>
              </>
            }
            sub="En una clínica es reservar el turno, en un restaurante tomar la mesa y en una distribuidora registrar el pedido. Cada tarea se hace conectada a tu sistema, con una conexión que se arma a pedido para tu negocio. Sin conexión, el asistente junta el pedido y tu equipo lo confirma."
          />
        </div>
      </section>

      <section className="border-b-2 border-ink py-14 md:py-20" aria-label="Rubros">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 md:px-8 xl:grid-cols-3">
          {rubros.map((rubro) => (
            <RubroCard key={rubro.slug} rubro={rubro} />
          ))}
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-14 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="font-display text-3xl font-semibold leading-[1.02] tracking-[-0.03em] text-balance md:text-4xl">
            Cómo leer estos ejemplos
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-ink/80">
            <p>
              Los chats de cada página son ejemplos ilustrativos, no clientes. La única conexión de un rubro que ya
              funciona es nuestra{' '}
              <Link
                href="/casos-de-uso/concesionarias-e-inmobiliarias"
                className="font-semibold underline underline-offset-4 hover:text-coral-strong"
              >
                demo de concesionaria de motos
              </Link>
              : consulta stock y precios, calcula financiación y registra interesados en una planilla.
            </p>
            <p>
              Tu equipo sigue al tanto: ve toda la conversación en la bandeja y lo que necesita una persona queda
              marcado. Qué viene incluido y qué se arma a pedido está en{' '}
              <Link href="/integraciones" className="font-semibold underline underline-offset-4 hover:text-coral-strong">
                integraciones
              </Link>
              , y cada tarea explicada para todos los rubros, en{' '}
              <Link href="/servicios" className="font-semibold underline underline-offset-4 hover:text-coral-strong">
                servicios
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-balance md:text-6xl">
            ¿Tu rubro no está? <span className="text-coral">Contanos qué tarea querés sacarte de encima.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Si se resuelve con datos que ya tenés en algún sistema, vemos qué haría falta conectar. También hay guías
            para otros rubros:
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-1">
            {otherTrades.map((trade) => (
              <li key={trade.slug}>
                <Link href={`/blog/${trade.slug}`} className="inline-flex min-h-11 items-center underline underline-offset-4">
                  {trade.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/demo" data-cta="cases-other-demo" size="lg">
              Pedir una demo para mi rubro →
            </Button>
            <Button
              href={buildWaLink('Hola, mi rubro no está en los casos de uso y quiero saber qué tarea podría resolver Atende')}
              data-cta="cases-other-whatsapp"
              variant="outline"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </Button>
          </div>
        </div>
      </section>
      <JsonLd value={pageGraph({ ...pages.cases, breadcrumbs })} />
    </>
  );
}

import Link from 'next/link';
import type { Metadata } from 'next';
import { inlineLinkClass } from '@/components/casos/RichText';
import { RubroCard } from '@/components/casos/RubroCard';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { pages } from '@/content/pages';
import { rubros } from '@/content/rubros';
import { createPageMetadata } from '@/lib/metadata';
import { pageGraph } from '@/lib/structured-data';
import { buildWaLink, waRef } from '@/lib/wa';

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
      <section className="pb-12 pt-8 md:pb-16 md:pt-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Casos de uso"
            level="h1"
            title={
              <>
                <span className="block">Reservá, cotizá o registrá pedidos</span>{' '}
                <span className="block text-faint">según tu rubro.</span>
              </>
            }
            sub="Elegí tu negocio para ver qué puede terminar Atende por WhatsApp, dónde queda registrado y qué conviene probar en una demo. Tu equipo supervisa la conversación. Para guardar un turno, una reserva o un pedido, conectamos tu sistema a pedido."
          />
        </div>
      </section>

      <section className="pb-16 md:pb-24" aria-label="Rubros">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-2 md:gap-5 md:px-8 xl:grid-cols-3">
          {rubros.map((rubro) => (
            <RubroCard key={rubro.slug} rubro={rubro} />
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="max-w-4xl text-balance text-headline">¿Qué podés ver funcionando en una demo?</h2>
          <div className="mt-6 max-w-3xl space-y-4 text-pretty text-lead text-muted md:mt-8">
            <p>
              Nuestra{' '}
              <Link href="/casos-de-uso/concesionarias-e-inmobiliarias" className={inlineLinkClass}>
                demo de concesionaria de motos
              </Link>{' '}
              consulta stock y precios, calcula financiación y registra interesados en una planilla.
              Si trabajás con una planilla de Google Sheets, la conectás vos desde el panel: el
              asistente la consulta y, si lo permitís, anota filas. La conexión con tu agenda o tu
              CRM la armamos a pedido.
            </p>
            <p>
              Tu equipo sigue al tanto: ve toda la conversación en la bandeja y lo que necesita una
              persona queda marcado. Qué viene incluido y qué se arma a pedido está en{' '}
              <Link href="/integraciones" className={inlineLinkClass}>
                integraciones
              </Link>
              , y cada tarea explicada para todos los rubros, en{' '}
              <Link href="/servicios" className={inlineLinkClass}>
                servicios
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="p-3 md:p-6">
        <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-4xl bg-forest px-6 py-20 text-center text-white md:py-28 lg:py-32">
          <div
            className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgb(255_255_255/0.1),transparent_65%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(45%_100%_at_50%_100%,rgb(230_72_44/0.28),transparent_70%)]"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-4xl text-balance text-headline">
              <span className="block">¿Tu rubro no está?</span>{' '}
              <span className="block text-white/60">Contanos qué tarea querés sacarte de encima.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lead text-white/75">
              Si se resuelve con datos que ya tenés en algún sistema, vemos qué haría falta conectar.
              También hay guías para otros rubros:
            </p>
            <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
              {otherTrades.map((trade) => (
                <li key={trade.slug}>
                  <Link
                    href={`/blog/${trade.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 text-[0.9375rem] font-medium text-white ring-1 ring-inset ring-white/15 transition-colors duration-200 hover:bg-white/20"
                  >
                    {trade.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href="/demo"
                data-cta="cases-other-demo"
                size="lg"
                className="w-full sm:w-auto"
              >
                Pedir una demo para mi rubro
              </Button>
              <Button
                href={buildWaLink('Hola, mi rubro no está en los casos de uso y quiero saber qué tarea podría resolver Atende', waRef('/casos-de-uso', 'otro rubro'))}
                data-cta="cases-other-whatsapp"
                variant="glass"
                size="lg"
                className="w-full sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hablar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
      <JsonLd value={pageGraph({ ...pages.cases, breadcrumbs })} />
    </>
  );
}

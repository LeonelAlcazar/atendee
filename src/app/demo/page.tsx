import Link from 'next/link';
import { pages } from '@/content/pages';
import { site } from '@/content/site';
import { buildWaLink } from '@/lib/wa';
import { createPageMetadata } from '@/lib/metadata';
import { pageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DemoForm } from '@/components/demo/DemoForm';

export const metadata = createPageMetadata(pages.demo);
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Pedí una demo', path: '/demo' },
];

export default function DemoPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-x-12">
          <SectionHeader
            level="h1"
            eyebrow="Pedí una demo"
            title={
              <>
                ¿Qué querés reservar, cotizar o registrar{' '}
                <span className="text-coral">por WhatsApp?</span>
              </>
            }
            sub="Traé una consulta que se repita en tu negocio. Revisamos dónde tiene que quedar el turno, el pedido o el presupuesto, qué sistema habría que conectar y cómo supervisa la tarea tu equipo."
          />
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <DemoForm />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Qué miramos juntos
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-lg leading-relaxed text-mute">
              {[
                'La tarea, desde el primer mensaje hasta que queda hecha.',
                'El sistema donde la llevás hoy y cómo se conecta. Esa conexión se arma a pedido para tu negocio.',
                'Qué hace el asistente solo y qué queda para tu equipo.',
                'Qué plan te sirve y cómo se cotiza la conexión.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-2.5 size-2 shrink-0 bg-coral"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-lg border-2 border-ink bg-mint p-5 leading-relaxed">
              En nuestra demo de motos, Atende consulta stock, calcula cuotas y registra al interesado en Google Sheets. Ejemplo ilustrativo de lo que queda guardado al terminar el chat: el modelo que pidió, su nombre y su teléfono.{' '}
              <Link
                href="/integraciones"
                className="font-semibold underline underline-offset-4"
              >
                Cómo armamos cada conexión
              </Link>
              .
            </p>
            <div className="mt-6 rounded-lg border-2 border-ink bg-coral-soft p-6">
              <h2 className="font-display text-xl font-semibold">
                También podés escribirnos directo
              </h2>
              <a
                href={buildWaLink(
                  'Hola, quiero pedir una demo de Atende para mi negocio',
                )}
                data-cta="demo-direct-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex min-h-11 items-center font-semibold underline underline-offset-4"
              >
                WhatsApp · {site.whatsapp.display} ↗
              </a>
              <a
                href={`mailto:${site.email}`}
                data-cta="demo-direct-email"
                className="flex min-h-11 items-center font-semibold underline underline-offset-4"
              >
                {site.email}
              </a>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-mute">
              Después de que nos escribas, coordinamos la demo por el canal que elijas. Podés{' '}
              <Link href="/precios" className="font-semibold underline underline-offset-4">ver los planes y precios</Link>
              {' '}antes de hablar con el equipo.
            </p>
          </div>
        </div>
      </section>
      <JsonLd value={pageGraph({ ...pages.demo, breadcrumbs })} />
    </>
  );
}

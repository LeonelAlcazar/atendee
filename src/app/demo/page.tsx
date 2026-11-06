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
                ¿Qué tarea querés{' '}
                <span className="text-coral">sacarte de encima?</span>
              </>
            }
            sub="Reservar turnos, registrar pedidos, pasar presupuestos, contestar lo mismo todo el día. Contanos qué se repite en tu WhatsApp y vemos qué puede terminar Atende en la conversación y qué conexión necesita tu negocio."
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
              Como referencia, tenemos una demo para una concesionaria de motos:
              consulta stock y precios, calcula
              financiación y registra al interesado en Google Sheets. Sin
              conexión, el asistente junta el pedido y tu equipo lo confirma.{' '}
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
                className="flex min-h-11 items-center font-semibold underline underline-offset-4"
              >
                {site.email}
              </a>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-mute">
              Pedir una demo no te obliga a contratar y no reserva un horario:
              coordinamos los próximos pasos por el canal que elijas.
            </p>
          </div>
        </div>
      </section>
      <JsonLd value={pageGraph({ ...pages.demo, breadcrumbs })} />
    </>
  );
}

import Link from 'next/link';
import { Check, Mail, MessageCircle } from 'lucide-react';
import { pages } from '@/content/pages';
import { site } from '@/content/site';
import { buildWaLink, waRef } from '@/lib/wa';
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

const contactLink =
  'group inline-flex min-h-11 items-center gap-3 font-semibold text-ink';
const contactIcon =
  'grid size-11 shrink-0 place-items-center rounded-full bg-surface shadow-card transition-colors duration-200 group-hover:bg-ink group-hover:text-white';

// The most focused page of the site: the ask, then the form, with the direct
// channels right under it. What we look at together follows on phones and sits
// beside the form on wide screens.
export default function DemoPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="pb-16 pt-8 md:pb-24 md:pt-14">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
          <SectionHeader
            level="h1"
            eyebrow="Pedí una demo"
            title={
              <>
                <span className="block">¿Qué querés reservar, cotizar o registrar</span>{' '}
                <span className="block text-faint">por WhatsApp?</span>
              </>
            }
            sub="Traé una consulta que se repita en tu negocio. Revisamos dónde tiene que quedar el turno, el pedido o el presupuesto, qué sistema habría que conectar y cómo supervisa la tarea tu equipo."
          />
          <div className="flex flex-col gap-10 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <DemoForm />
            <div className="px-1 md:px-2">
              <h2 className="text-lg font-semibold tracking-[-0.015em]">
                También podés escribirnos directo
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={buildWaLink(
                    'Hola, quiero pedir una demo de Atende para mi negocio',
                    waRef('/demo', 'directo'),
                  )}
                  data-cta="demo-direct-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactLink}
                >
                  <span className={contactIcon} aria-hidden="true">
                    <MessageCircle size={20} strokeWidth={1.75} />
                  </span>
                  <span className="underline-offset-4 group-hover:underline">
                    WhatsApp · {site.whatsapp.display} ↗
                  </span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  data-cta="demo-direct-email"
                  className={contactLink}
                >
                  <span className={contactIcon} aria-hidden="true">
                    <Mail size={20} strokeWidth={1.75} />
                  </span>
                  <span className="underline-offset-4 group-hover:underline">
                    {site.email}
                  </span>
                </a>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Después de que nos escribas, coordinamos la demo por el canal que elijas. Podés{' '}
                <Link
                  href="/precios"
                  className="font-semibold text-ink underline underline-offset-4 hover:text-coral-strong"
                >
                  ver los planes y precios
                </Link>
                {' '}antes de hablar con el equipo.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-10 md:gap-12">
            <div>
              <h2 className="text-title">Qué miramos juntos</h2>
              <ul className="mt-5 flex flex-col gap-4">
                {[
                  'La tarea, desde el primer mensaje hasta que queda hecha.',
                  'El sistema donde la llevás hoy y cómo se conecta. Esa conexión se arma a pedido para tu negocio.',
                  'Qué hace el asistente solo y qué queda para tu equipo.',
                  'Qué plan te sirve y cómo se cotiza la conexión.',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3.5 leading-relaxed text-muted md:text-lg"
                  >
                    <span
                      className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-forest-tint text-forest md:mt-1"
                      aria-hidden="true"
                    >
                      <Check size={14} strokeWidth={2.75} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="rounded-3xl bg-surface p-6 leading-relaxed text-muted shadow-card md:p-7">
              En nuestra demo de motos, Atende consulta stock, calcula cuotas y registra al interesado en Google Sheets. Al terminar el chat queda guardado el modelo que pidió, su nombre y su teléfono.{' '}
              <Link
                href="/integraciones"
                className="font-semibold text-coral-strong underline-offset-4 hover:underline"
              >
                Cómo armamos cada conexión
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <JsonLd value={pageGraph({ ...pages.demo, breadcrumbs })} />
    </>
  );
}

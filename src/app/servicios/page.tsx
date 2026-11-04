import Link from 'next/link';
import type { Metadata } from 'next';
import { servicios } from '@/content/servicios';
import { ServiceBlock } from '@/components/servicios/ServiceBlock';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { createPageMetadata } from '@/lib/metadata';
import { pages } from '@/content/pages';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/jsonld';
import { pageGraph } from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata(pages.services);
const breadcrumbs = [{ name: 'Inicio', path: '/' }, { name: 'Soluciones', path: '/servicios' }];

export default function ServiciosPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="border-b-2 border-ink py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Servicios"
            level="h1"
            title={
              <>
                Automatización de WhatsApp <span className="text-coral">para tu empresa.</span>
              </>
            }
            sub="Atende automatiza consultas repetidas de atención, solicitudes de turnos y ventas con IA. El bot responde con la información que configurás; tu equipo supervisa y continúa la conversación desde una bandeja compartida."
          />
        </div>
      </section>

      {servicios.map((s, i) => (
        <ServiceBlock key={s.id} servicio={s} reverse={i % 2 === 1} />
      ))}

      <nav
        aria-label="Guías para preparar la automatización"
        className="border-b-2 border-ink bg-mint/35 py-10"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-semibold">
            Prepará el flujo antes de conectar
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-mute">
            Elegí una tarea, reuní la información vigente y probá los casos que
            debe resolver una persona. Las reservas, el stock y las acciones en
            un CRM externo requieren una integración confirmada.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            <li>
              <Link
                href="/blog/como-crear-un-bot-de-whatsapp"
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                Cómo crear y probar un bot de WhatsApp →
              </Link>
            </li>
            <li>
              <Link
                href="/precios"
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                Cómo elegir un plan y revisar su alcance →
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <CtaFinal context="Hola, vi la página de servicios y quiero saber más" />
      <JsonLd value={pageGraph({ ...pages.services, breadcrumbs })} />
    </>
  );
}

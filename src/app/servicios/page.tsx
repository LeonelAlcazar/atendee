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
            sub="Atención al cliente, solicitudes de turnos y consultas de venta con IA y una bandeja compartida. Conocé qué resuelve cada flujo y qué requiere una integración adicional."
          />
        </div>
      </section>

      {servicios.map((s, i) => (
        <ServiceBlock key={s.id} servicio={s} reverse={i % 2 === 1} />
      ))}

      <CtaFinal context="Hola, vi la página de servicios y quiero saber más" />
      <JsonLd value={pageGraph({ ...pages.services, breadcrumbs })} />
    </>
  );
}

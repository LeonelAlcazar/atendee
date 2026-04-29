import type { Metadata } from 'next';
import { servicios } from '@/content/servicios';
import { ServiceBlock } from '@/components/servicios/ServiceBlock';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CtaFinal } from '@/components/landing/CtaFinal';

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Atención automática, turnos por WhatsApp y ventas y seguimiento. Tres servicios diseñados para PyMEs argentinas que viven en WhatsApp.',
};

export default function ServiciosPage() {
  return (
    <>
      <section className="border-b-2 border-ink py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Servicios"
            title={
              <>
                Tres servicios. <span className="text-coral">Una sola conversación</span>.
              </>
            }
            sub="Cada uno funciona por separado o combinado. Todos viven dentro de tu WhatsApp."
          />
        </div>
      </section>

      {servicios.map((s, i) => (
        <ServiceBlock key={s.id} servicio={s} reverse={i % 2 === 1} />
      ))}

      <CtaFinal context="Hola, vi la página de servicios y quiero saber más" />
    </>
  );
}

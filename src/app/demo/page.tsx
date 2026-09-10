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
  { name: 'Solicitar demo', path: '/demo' },
];

export default function DemoPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <SectionHeader
              level="h1"
              eyebrow="HABLEMOS DE TU EMPRESA"
              title="Evaluá Atende con tu caso de uso."
              sub="Solicitá una demo de atención y ventas por WhatsApp con IA. Contanos cómo trabaja tu equipo para conversar sobre el flujo, los planes y la implementación."
            />
            <h2 className="mt-9 font-display text-2xl font-semibold">
              Qué podemos revisar juntos
            </h2>
            <ul className="mt-5 list-disc space-y-4 pl-5 text-lg leading-relaxed text-mute">
              <li>
                Las consultas que querés automatizar y las que debe tomar una
                persona.
              </li>
              <li>
                Cómo usar la bandeja compartida para supervisar respuestas y
                continuar conversaciones.
              </li>
              <li>
                El volumen de respuestas, las integraciones necesarias y las
                condiciones antes de contratar.
              </li>
            </ul>
            <div className="mt-9 rounded-lg border-2 border-ink bg-coral-soft p-6">
              <h2 className="font-display text-xl font-semibold">
                También podés escribirnos directamente
              </h2>
              <p className="mt-3 leading-relaxed">
                Atende · {site.location}. Atención comercial en español.
              </p>
              <a
                href={buildWaLink(
                  'Hola, quiero solicitar una demo de Atende para mi empresa',
                )}
                data-cta="demo-direct-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex min-h-11 items-center font-semibold underline underline-offset-4"
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
              La solicitud inicia una conversación comercial. Coordinamos los
              próximos pasos por el canal que elijas; no se reserva un horario
              automáticamente.
            </p>
          </div>
          <DemoForm />
        </div>
      </section>
      <JsonLd value={pageGraph({ ...pages.demo, breadcrumbs })} />
    </>
  );
}

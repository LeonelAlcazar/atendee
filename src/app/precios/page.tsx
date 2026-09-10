import Link from 'next/link';
import { pages } from '@/content/pages';
import { pricingFaq } from '@/content/pricing';
import { site } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { pageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Faq } from '@/components/landing/Faq';

export const metadata = createPageMetadata(pages.pricing);
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Precios', path: '/precios' },
];
const criteria = [
  [
    'Volumen de respuestas',
    'Estimá las consultas mensuales y cuántos intercambios suele necesitar cada una. Una conversación puede consumir varias respuestas de IA.',
  ],
  [
    'Equipo y operación',
    'Definí quién revisa la bandeja, quién responde derivaciones y qué horarios de atención humana necesitás cubrir.',
  ],
  [
    'Integraciones',
    'Identificá si necesitás consultar stock, crear reservas o usar datos de un CRM. Confirmamos compatibilidad y alcance antes de la implementación.',
  ],
];

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="border-b-2 border-ink py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            level="h1"
            eyebrow="PRECIOS Y CONTRATACIÓN"
            title="Un plan para tu forma de atender."
            sub="Los precios vigentes y los límites de respuestas de IA están en la app, antes de confirmar el pago. Si tu empresa necesita evaluar una integración o un flujo específico, conversemos sobre el alcance."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.appUrl} data-cta="pricing-plans" size="lg">
              Ver planes en la app →
            </Button>
            <Button
              href="/demo"
              data-cta="pricing-demo"
              variant="outline"
              size="lg"
            >
              Solicitar una propuesta
            </Button>
          </div>
          <p className="mt-4 text-sm text-mute">
            Para ver los planes en la app, primero creá tu espacio o ingresá a
            tu cuenta.
          </p>
        </div>
      </section>
      <section className="border-b-2 border-ink bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Cómo elegir un plan de WhatsApp con IA
          </h2>
          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {criteria.map(([title, text]) => (
              <article
                key={title}
                className="rounded-lg border-2 border-ink bg-bg p-6 shadow-[var(--shadow-brut-sm)]"
              >
                <h3 className="font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-4 leading-relaxed text-mute">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b-2 border-ink py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-semibold">
            Qué revisar en tu propuesta
          </h2>
          <div className="mt-8 overflow-x-auto rounded-lg border-2 border-ink">
            <table className="w-full text-left text-sm md:text-base">
              <caption className="border-b border-ink bg-mint p-4 text-left">
                Usá esta guía para comparar el alcance de tu contratación.
              </caption>
              <thead className="bg-forest text-bg">
                <tr>
                  <th scope="col" className="p-4">
                    Aspecto
                  </th>
                  <th scope="col" className="p-4">
                    Qué confirmar
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    'Suscripción',
                    'Precio, moneda, impuestos, período de facturación, renovación y condiciones de baja.',
                  ],
                  [
                    'Uso de IA',
                    'Respuestas mensuales incluidas y qué sucede si necesitás más capacidad.',
                  ],
                  [
                    'Configuración',
                    'Información que aporta tu negocio, pruebas de respuestas y responsables de supervisión.',
                  ],
                  [
                    'Integraciones y soporte',
                    'Sistemas a conectar, funciones acordadas, plazos y canales de asistencia.',
                  ],
                ].map(([label, text]) => (
                  <tr key={label} className="border-t border-ink/20">
                    <th scope="row" className="p-4 font-semibold">
                      {label}
                    </th>
                    <td className="p-4 leading-relaxed text-mute">{text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 leading-relaxed text-mute">
            Las condiciones aplicables se detallan en el checkout o la propuesta
            aceptada.{' '}
            <Link
              href="/terminos-y-condiciones"
              className="underline underline-offset-4"
            >
              Consultá los términos de contratación
            </Link>
            .
          </p>
        </div>
      </section>
      <Faq items={pricingFaq} />
      <JsonLd
        value={pageGraph({ ...pages.pricing, breadcrumbs, faq: pricingFaq })}
      />
    </>
  );
}

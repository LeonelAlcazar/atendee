import Link from 'next/link';
import { pages } from '@/content/pages';
import { pricingFaq } from '@/content/pricing';
import { site } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { buildDemoLink } from '@/lib/leads';
import { pageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Tag } from '@/components/ui/Tag';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { Faq } from '@/components/landing/Faq';
import { FactRows } from '@/components/servicios/FactRows';
import { StepCards } from '@/components/servicios/StepCards';

export const metadata = createPageMetadata(pages.pricing);
const appPlansUrl = new URL('/planes', site.appUrl).toString();
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Precios', path: '/precios' },
];

const heading =
  'font-display text-3xl font-semibold tracking-[-0.025em] md:text-4xl';

const options = [
  {
    name: 'Plan CRM',
    tag: 'Manual, sin asistente',
    text: 'Bandeja compartida, etiquetas, notas internas y WhatsApp MCP. Tu equipo contesta a mano. No tiene asistente, así que no responde solo aunque tengas créditos.',
  },
  {
    name: 'Planes con IA',
    tag: 'Starter, Pro y Business',
    text: 'Todo lo anterior más el asistente: responde mensajes de texto, deriva, cierra conversaciones, recuerda datos y manda fotos y videos. Cambia la cantidad de respuestas por mes.',
  },
  {
    name: 'Conexiones',
    tag: 'A pedido',
    text: 'Para que reserve turnos, registre pedidos o cotice en tu sistema. Se arman y se cotizan para cada negocio, y se usan sobre un plan con IA.',
  },
];

const comparison: [string, string, string][] = [
  ['Bandeja compartida, etiquetas y notas', 'Sí', 'Sí'],
  ['WhatsApp MCP', 'Sí', 'Sí'],
  ['Responder mensajes de texto', 'No', 'Sí'],
  ['Derivar, cerrar, mandar fotos y videos', 'No', 'Sí'],
  ['Reservar, registrar pedidos, cotizar', 'No', 'A pedido, con una conexión'],
  ['Recordatorios y seguimientos', 'No', 'A pedido'],
];

const credits = [
  {
    label: 'Respuesta del asistente',
    text: 'Cada vez que el asistente contesta. Si el contacto manda varios mensajes seguidos, se juntan y cuentan como una. Una conversación puede usar varias.',
  },
  {
    label: 'Límite del plan',
    text: 'Cada plan con IA trae una cantidad de respuestas por mes. La ves en la app antes de pagar.',
  },
  {
    label: 'Crédito',
    text: 'Un crédito es una respuesta del asistente. Se usan después de la cantidad del plan.',
  },
  {
    label: 'Créditos de bienvenida',
    text: 'Si tenés créditos de bienvenida disponibles, podés activarlos desde la app sin tarjeta. La cantidad y las condiciones se muestran en Suscripción.',
  },
];

const runningOut = [
  {
    title: 'Se acaba la cantidad del mes',
    text: 'Si tenés créditos, el asistente sigue respondiendo y los va usando.',
  },
  {
    title: 'Se acaban los créditos',
    text: 'El asistente deja de responder. Los mensajes siguen entrando a la bandeja, el contacto no recibe nada y nadie recibe un aviso.',
  },
  {
    title: 'Empieza el mes siguiente',
    text: 'Con un plan activo, la cantidad de respuestas vuelve a empezar cada mes calendario.',
  },
];

const checklist = [
  {
    label: 'Plan',
    text: 'Precio, moneda, impuestos, renovación y cantidad de respuestas por mes.',
  },
  {
    label: 'Conexión',
    text: 'Qué sistema se conecta, qué puede hacer el asistente y el presupuesto de ese trabajo.',
  },
  {
    label: 'Tu equipo',
    text: 'Quién mira la bandeja, quién toma las conversaciones marcadas y quién revisa la pantalla Suscripción.',
  },
];

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="border-b-2 border-ink py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <SectionHeader
              level="h1"
              eyebrow="Precios y planes"
              title={
                <>
                  ¿Cuánto cuesta un bot de WhatsApp{' '}
                  <span className="text-coral">que reserva, cotiza y toma pedidos?</span>
                </>
              }
              sub="Depende de dos cosas: el plan, que define cuántas respuestas da el asistente por mes, y las conexiones con tu sistema, que se cotizan para cada negocio. Los planes vigentes se ven en la app antes de pagar."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={appPlansUrl} data-cta="pricing-plans" size="lg">
                Ver planes en la app →
              </Button>
              <Button
                href={buildDemoLink('precios')}
                data-cta="pricing-demo"
                variant="outline"
                size="lg"
              >
                Pedí una demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-mute">
              Entrá a tu cuenta para ver los planes de tu espacio. Si todavía no
              tenés uno, crealo con el nombre de tu negocio.
            </p>
          </div>
          <ChatMockup
            caption="Ejemplo ilustrativo, con la agenda conectada"
            messages={[
              { from: 'them', text: 'Necesito turno para el sábado a la mañana' },
              { from: 'us', text: 'Tengo sábado 9:30 u 11:00. ¿Cuál preferís?' },
              { from: 'them', text: 'A las 9:30' },
              { from: 'us', text: 'Listo, te reservé el sábado a las 9:30.' },
            ]}
            result={{
              label: 'Turno reservado con 2 respuestas',
              detail: 'Se cuentan las respuestas del asistente. Reservar necesita la conexión con tu agenda.',
            }}
          />
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Tres opciones, y qué trae cada una</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {options.map((option) => (
              <article
                key={option.name}
                className="flex flex-col items-start rounded-lg border-2 border-ink bg-bg p-6 shadow-[var(--shadow-brut-sm)]"
              >
                <Tag>{option.tag}</Tag>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em]">
                  {option.name}
                </h3>
                <p className="mt-3 leading-relaxed text-mute">{option.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-lg border-2 border-ink bg-bg shadow-[var(--shadow-brut)]">
            <table className="w-full table-fixed border-collapse text-left text-sm md:text-base">
              <caption className="sr-only">
                Qué incluye Plan CRM y qué incluyen los planes con IA
              </caption>
              <thead className="bg-forest text-bg">
                <tr>
                  <th scope="col" className="w-[46%] p-3 font-semibold md:p-4">
                    Qué podés hacer
                  </th>
                  <th scope="col" className="p-3 font-semibold md:p-4">
                    Plan CRM
                  </th>
                  <th scope="col" className="p-3 font-semibold md:p-4">
                    Planes con IA
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([label, crm, ai]) => (
                  <tr key={label} className="border-t border-ink/20 align-top">
                    <th scope="row" className="p-3 font-semibold md:p-4">
                      {label}
                    </th>
                    <td className="p-3 text-mute md:p-4">{crm}</td>
                    <td className="p-3 text-mute md:p-4">{ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl leading-relaxed text-mute">
            Sin conexión, el asistente junta el pedido y tu equipo lo confirma.{' '}
            <Link
              href="/integraciones"
              className="font-semibold text-ink underline underline-offset-4"
            >
              Cómo armamos y cotizamos cada conexión
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b-2 border-ink py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Cómo se cuentan las respuestas</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-mute">
            Atende cuenta respuestas del asistente, no conversaciones.
          </p>
          <FactRows rows={credits} className="mt-8" />
        </div>
      </section>

      <section id="sin-respuestas" className="scroll-mt-24 border-b-2 border-ink bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Qué pasa cuando se terminan las respuestas</h2>
          <StepCards steps={runningOut} className="mt-8" />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border-2 border-ink bg-coral-soft p-6 shadow-[var(--shadow-brut-sm)]">
              <h3 className="font-display text-xl font-semibold">
                Nadie te avisa antes
              </h3>
              <p className="mt-3 leading-relaxed">
                Atende no manda una alerta cuando quedan pocas respuestas. Mirá
                la pantalla Suscripción de la app, donde ves tu plan, cuándo
                renueva y tus créditos disponibles.
              </p>
            </div>
            <div className="rounded-lg border-2 border-ink bg-bg p-6 shadow-[var(--shadow-brut-sm)]">
              <h3 className="font-display text-xl font-semibold">
                Sin plan y sin créditos
              </h3>
              <p className="mt-3 leading-relaxed text-mute">
                La bandeja queda bloqueada. Podés seguir entrando a Suscripción,
                Ajustes y Aplicaciones conectadas. Los mensajes nuevos dejan de
                entrar a Atende. Siguen llegando a tu WhatsApp, pero no quedan en
                la bandeja.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className={heading}>Antes de pagar, confirmá esto</h2>
            <FactRows rows={checklist} className="mt-6" />
            <p className="mt-5 leading-relaxed text-mute">
              Las condiciones que te aplican se ven en la pantalla de pago o en
              la propuesta que aceptes.{' '}
              <Link
                href="/terminos-y-condiciones"
                className="underline underline-offset-4"
              >
                Términos y condiciones
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className={heading}>WhatsApp MCP, en todos los planes</h2>
            <p className="mt-4 leading-relaxed text-mute">
              Deja que una aplicación de IA que vos autorizás lea tus
              conversaciones y mande mensajes de texto. Viene en todos los
              planes, incluido Plan CRM, y no suma acciones al asistente.
            </p>
            <Link
              href="/integraciones#whatsapp-mcp"
              className="mt-2 inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
            >
              La diferencia con Herramientas conectadas&nbsp;→
            </Link>
            <h2 className="mt-8 font-display text-2xl font-semibold tracking-[-0.02em]">
              Si todavía estás comparando
            </h2>
            <ul className="mt-2">
              <li>
                <Link
                  href="/blog/cuanto-cuesta-automatizar-whatsapp"
                  className="inline-flex min-h-11 items-center underline underline-offset-4"
                >
                  Cuánto cuesta automatizar WhatsApp →
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/bot-de-whatsapp-gratis-o-pago"
                  className="inline-flex min-h-11 items-center underline underline-offset-4"
                >
                  Cuándo elegir un bot gratis o pago →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Faq items={pricingFaq} />
      <CtaFinal
        context="Hola, quiero saber cuánto me saldría Atende para mi negocio"
        demoSource="precios"
      />
      <JsonLd
        value={pageGraph({ ...pages.pricing, breadcrumbs, faq: pricingFaq })}
      />
    </>
  );
}

import Link from 'next/link';
import {
  BellOff,
  Check,
  Link2,
  Lock,
  Minus,
} from 'lucide-react';
import { pages } from '@/content/pages';
import { pricingFaq } from '@/content/pricing';
import { site } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { buildDemoLink } from '@/lib/leads';
import { getCatalog } from '@/lib/pricing-catalog';
import { catalogSentence, responseLine } from '@/lib/pricing-copy';
import { pageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Tag } from '@/components/ui/Tag';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { Faq } from '@/components/landing/Faq';
import { ResponseEstimator } from '@/components/pricing/ResponseEstimator';
import { FactRows } from '@/components/servicios/FactRows';
import { StepCards } from '@/components/servicios/StepCards';

export const metadata = createPageMetadata(pages.pricing);
// ISR: regenerated every 10 minutes from the last good catalog. A catalog
// that fails to load never replaces the plans already on the page.
export const revalidate = 600;
const appPlansUrl = new URL('/planes', site.appUrl).toString();
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Precios', path: '/precios' },
];

const container = 'mx-auto max-w-7xl px-5 md:px-8';
const textLink =
  'inline-flex min-h-11 items-center gap-1.5 font-semibold text-coral-strong underline-offset-4 hover:underline';

const comparison: [string, string, string][] = [
  ['Bandeja compartida, etiquetas y notas', 'Sí', 'Sí'],
  ['WhatsApp MCP', 'Sí', 'Sí'],
  ['Responder consultas de texto y notas de voz', 'Atiende tu equipo', 'Con el asistente activo'],
  ['Derivar, cerrar, mandar fotos y videos', 'No', 'Sí'],
  ['Reservar, registrar pedidos, cotizar', 'No', 'A pedido, con una conexión'],
  ['Programar textos recurrentes desde Contactos', 'Sí', 'Sí'],
];

const credits = [
  {
    label: 'Respuesta del asistente',
    text: 'Cada vez que el asistente contesta. Si el contacto manda varios mensajes seguidos, se juntan y cuentan como una. Una conversación puede usar varias.',
  },
  {
    label: 'Límite del plan',
    text: 'Cada plan con IA trae una cantidad de respuestas por mes. La cantidad figura en su catálogo.',
  },
  {
    label: 'Crédito',
    text: 'Un crédito es una respuesta del asistente. Se usan después de la cantidad del plan.',
  },
  {
    label: 'Chat de prueba',
    text: 'Probá tu asistente gratis antes de elegir un plan, en el chat de prueba de tu espacio. No usa las respuestas del plan ni créditos.',
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

// The catalog decides how many plans there are: they share one row on wide
// screens, whatever the count.
function planGrid(count: number) {
  if (count === 1) return 'max-w-md';
  if (count === 2) return 'sm:grid-cols-2 lg:max-w-4xl';
  if (count === 3) return 'sm:grid-cols-2 lg:grid-cols-3';
  return 'sm:grid-cols-2 xl:grid-cols-4';
}

// "Sí" and "No" get a mark so the table reads at a glance; the word stays.
function Availability({ value }: { value: string }) {
  if (value === 'Sí')
    return (
      <span className="inline-flex items-center gap-2 font-medium text-ink">
        <span
          className="grid size-5 shrink-0 place-items-center rounded-full bg-forest text-white"
          aria-hidden="true"
        >
          <Check size={12} strokeWidth={3} />
        </span>
        {value}
      </span>
    );
  if (value === 'No')
    return (
      <span className="inline-flex items-center gap-2">
        <span
          className="grid size-5 shrink-0 place-items-center rounded-full bg-bg text-muted"
          aria-hidden="true"
        >
          <Minus size={12} strokeWidth={3} />
        </span>
        {value}
      </span>
    );
  return <>{value}</>;
}

const fallbackSub =
  'Para reservar turnos o registrar pedidos, sumá el plan con IA y la conexión con tu sistema, que se cotiza por separado. Compará los precios publicados y calculá cuántas respuestas usaría tu negocio.';

export default async function PricingPage() {
  const catalog = await getCatalog();
  const plans = catalog?.plans.length ? catalog.plans : null;
  const opening = catalog && plans ? catalogSentence(plans, catalog.checkedAt) : null;
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="pb-16 pt-8 md:pb-24 md:pt-14">
        <div
          className={`${container} grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16`}
        >
          <div>
            <SectionHeader
              level="h1"
              eyebrow="Precios y planes"
              title={
                <>
                  <span className="block">¿Cuánto cuesta un bot de WhatsApp</span>{' '}
                  <span className="block text-faint">que reserva, cotiza y toma pedidos?</span>
                </>
              }
              sub={opening ?? fallbackSub}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#planes" size="lg" className="w-full sm:w-auto">
                Ver planes y precios
              </Button>
              <Button
                href={buildDemoLink('precios')}
                data-cta="pricing-demo"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Cotizar mi conexión
              </Button>
            </div>
            <a href="#calculadora" className={`${textLink} mt-3`}>
              Calcular mis respuestas por mes ↓
            </a>
          </div>

          <div className="mx-auto w-full max-w-sm lg:mr-0">
            <p className="mb-3 flex items-center gap-2 px-1 text-sm font-medium text-muted">
              <Link2 size={16} aria-hidden="true" />
              Con la agenda conectada
            </p>
            <ChatMockup
              className="w-full"
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
        </div>
      </section>

      <section id="planes" className="scroll-mt-20 pb-16 md:pb-24">
        <div className={container}>
          <SectionHeader title="Planes generales" />
          {plans === null ? (
            // No catalog yet (or none published): a calm next step, never an error.
            <div
              data-plans-fallback
              className="mt-8 max-w-3xl rounded-3xl bg-surface p-7 shadow-card md:mt-12 md:p-9"
            >
              <p className="text-title">Te mostramos los planes en la demo.</p>
              <p className="mt-2 leading-relaxed text-muted">
                Contanos qué tarea querés sacarte de encima y te pasamos el plan
                que le sirve a tu negocio y lo que cuesta la conexión con tu
                sistema.
              </p>
              <Button
                href={buildDemoLink('precios')}
                data-cta="pricing-fallback-demo"
                size="lg"
                className="mt-6 w-full sm:w-auto"
              >
                Pedí una demo
              </Button>
            </div>
          ) : (
            <div className={`mt-8 grid gap-4 md:mt-12 md:gap-5 ${planGrid(plans.length)}`}>
              {plans.map((plan, index) => (
                <article
                  key={`${plan.name}-${index}`}
                  data-public-plan
                  className={`flex min-w-0 flex-col break-words rounded-3xl bg-surface p-6 md:p-7 ${
                    plan.recommended ? 'shadow-float ring-1 ring-coral' : 'shadow-card'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                      <h3 className="max-w-full text-title">{plan.name}</h3>
                      {plan.recommended && <Tag filled>Recomendado</Tag>}
                    </div>
                    <p className="mt-4 max-w-full text-[2rem] font-semibold leading-tight tracking-[-0.035em]">
                      {plan.priceLabel}
                    </p>
                    {plan.bestFor && (
                      <p className="mt-3 max-w-full leading-relaxed text-muted">
                        {plan.bestFor}
                      </p>
                    )}
                  </div>
                  <p className="mt-6 max-w-full border-t border-line pt-5 text-[0.9375rem] font-medium leading-snug">
                    {responseLine(plan)}
                  </p>
                </article>
              ))}
            </div>
          )}
          <div className="mt-8 flex flex-col gap-x-5 gap-y-3 sm:flex-row sm:items-center">
            <Button
              href={appPlansUrl}
              data-cta="pricing-plans"
              size="lg"
              className="w-full sm:w-auto"
            >
              Continuar en la app →
            </Button>
            <p className="text-sm text-muted">En tu espacio ves los planes disponibles para contratar.</p>
          </div>
          <p className="mt-10 flex max-w-3xl gap-4 leading-relaxed text-muted md:mt-12">
            <span
              className="grid size-11 shrink-0 place-items-center rounded-full bg-surface text-ink shadow-card"
              aria-hidden="true"
            >
              <Link2 size={20} strokeWidth={1.75} />
            </span>
            <span className="self-center">
              Las conexiones para reservar turnos, registrar pedidos o cotizar en
              tu sistema se arman y se cotizan para cada negocio. Se usan sobre un
              plan con IA.
            </span>
          </p>

          <div className="mt-12 overflow-x-auto rounded-3xl bg-surface shadow-card ring-1 ring-line md:mt-16">
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="border-b border-line px-3 py-5 text-left text-title sm:px-7 sm:py-6">
                Qué incluye Plan CRM y qué incluyen los planes con IA
              </caption>
              <thead className="bg-bg/60">
                <tr className="border-b border-line">
                  <th scope="col" className="w-[48%] px-3 py-3 text-sm font-semibold text-muted sm:w-[46%] sm:px-7">
                    Qué podés hacer
                  </th>
                  <th scope="col" className="px-2.5 py-3 text-sm font-semibold text-muted sm:px-7">
                    Plan CRM
                  </th>
                  <th scope="col" className="px-2.5 py-3 text-sm font-semibold text-muted sm:px-7">
                    Planes con IA
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([label, crm, ai]) => (
                  <tr key={label} className="border-b border-line align-top last:border-b-0">
                    <th
                      scope="row"
                      className="px-3 py-3.5 text-[0.9375rem] font-medium leading-snug sm:px-7 sm:text-base"
                    >
                      {label}
                    </th>
                    <td className="px-2.5 py-3.5 text-sm leading-snug text-muted sm:px-7 sm:text-[0.9375rem]">
                      <Availability value={crm} />
                    </td>
                    <td className="px-2.5 py-3.5 text-sm leading-snug text-muted sm:px-7 sm:text-[0.9375rem]">
                      <Availability value={ai} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted">
            Sin conexión, el asistente junta el pedido y tu equipo lo confirma.{' '}
            <Link
              href="/integraciones"
              className="font-semibold text-coral-strong underline-offset-4 hover:underline"
            >
              Cómo armamos y cotizamos cada conexión
            </Link>
            .
          </p>
        </div>
      </section>

      <ResponseEstimator plans={(plans ?? []).map(({ name, monthlyAgentResponseLimit, automationAllowed }) => ({ name, monthlyAgentResponseLimit, automationAllowed }))} />

      <section className="py-16 md:py-24">
        <div className={container}>
          <SectionHeader
            title="Cómo se cuentan las respuestas"
            sub="Atende cuenta respuestas del asistente, no conversaciones."
          />
          <FactRows rows={credits} className="mt-8 md:mt-12" />
        </div>
      </section>

      <section id="sin-respuestas" className="scroll-mt-20 pb-16 md:pb-24">
        <div className={container}>
          <SectionHeader
            title={
              <>
                <span className="block">Qué pasa cuando</span>{' '}
                <span className="block text-faint">se terminan las respuestas</span>
              </>
            }
          />
          <StepCards steps={runningOut} className="mt-8 md:mt-12" />
          <div className="mt-10 grid gap-4 md:mt-14 md:gap-5 lg:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-3xl bg-surface p-6 shadow-card sm:flex-row sm:gap-5 md:p-9">
              <span
                className="grid size-11 shrink-0 place-items-center rounded-full bg-coral-tint text-coral-strong"
                aria-hidden="true"
              >
                <BellOff size={20} strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <h3 className="text-title">Nadie te avisa antes</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  Atende no manda una alerta cuando quedan pocas respuestas. Mirá
                  la pantalla Suscripción de la app, donde ves tu plan, cuándo
                  renueva y tus créditos disponibles.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-3xl bg-surface p-6 shadow-card sm:flex-row sm:gap-5 md:p-9">
              <span
                className="grid size-11 shrink-0 place-items-center rounded-full bg-bg text-ink"
                aria-hidden="true"
              >
                <Lock size={20} strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <h3 className="text-title">Sin plan y sin créditos</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  La bandeja queda bloqueada. Podés seguir entrando a Suscripción,
                  Ajustes y Aplicaciones conectadas. Los mensajes nuevos dejan de
                  entrar a Atende. Siguen llegando a tu WhatsApp, pero no quedan en
                  la bandeja.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The FAQ that follows brings its own top padding. */}
      <section>
        <div
          className={`${container} grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16`}
        >
          <div>
            <h2 className="text-balance text-headline">
              <span className="block">Antes de pagar,</span>{' '}
              <span className="block text-faint">confirmá esto</span>
            </h2>
            <FactRows rows={checklist} className="mt-8 md:mt-12" />
            <p className="mt-5 leading-relaxed text-muted">
              Las condiciones que te aplican se ven en la pantalla de pago o en
              la propuesta que aceptes.{' '}
              <Link
                href="/terminos-y-condiciones"
                className="font-semibold text-ink underline underline-offset-4 hover:text-coral-strong"
              >
                Términos y condiciones
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col gap-4 md:gap-5 lg:justify-end">
            <div className="rounded-3xl bg-surface p-7 shadow-card md:p-9">
              <h2 className="text-balance text-title">WhatsApp MCP, en todos los planes</h2>
              <p className="mt-3 leading-relaxed text-muted">
                Deja que una aplicación de IA que vos autorizás lea tus
                conversaciones y mande mensajes de texto. Viene en todos los
                planes, incluido Plan CRM, y no suma acciones al asistente.
              </p>
              <Link href="/integraciones#whatsapp-mcp" className={`${textLink} mt-2`}>
                La diferencia con Herramientas conectadas&nbsp;→
              </Link>
            </div>
            <div className="rounded-3xl bg-surface px-7 pb-3 pt-7 shadow-card md:px-9 md:pt-9">
              <h2 className="text-balance text-title">Si todavía estás comparando</h2>
              <ul className="mt-3 divide-y divide-line">
                <li>
                  <Link
                    href="/blog/cuanto-cuesta-automatizar-whatsapp"
                    className="group flex min-h-14 items-center justify-between gap-4 font-semibold transition-colors hover:text-coral-strong"
                  >
                    Cuánto cuesta automatizar WhatsApp{' '}
                    <span className="shrink-0 text-lg text-muted transition-[transform,color] duration-200 ease-smooth group-hover:translate-x-0.5 group-hover:text-coral-strong">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/bot-de-whatsapp-gratis-o-pago"
                    className="group flex min-h-14 items-center justify-between gap-4 font-semibold transition-colors hover:text-coral-strong"
                  >
                    Cuándo elegir un bot gratis o pago{' '}
                    <span className="shrink-0 text-lg text-muted transition-[transform,color] duration-200 ease-smooth group-hover:translate-x-0.5 group-hover:text-coral-strong">
                      →
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
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

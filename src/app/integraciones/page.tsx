import Link from 'next/link';
import { Database, KeyRound, ListChecks, ShieldCheck, Unplug } from 'lucide-react';
import { pages } from '@/content/pages';
import {
  compareRows,
  connectionRows,
  demoChat,
  needs,
  rescheduleChat,
  serverTips,
  steps,
} from '@/content/integraciones';
import { createPageMetadata } from '@/lib/metadata';
import { buildDemoLink } from '@/lib/leads';
import { pageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusTable } from '@/components/ui/StatusTable';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { FactRows } from '@/components/servicios/FactRows';
import { StepCards } from '@/components/servicios/StepCards';
import { ChatScene } from '@/components/servicios/ServiceBlock';

export const metadata = createPageMetadata(pages.integrations);
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Integraciones', path: '/integraciones' },
];

const heading = 'max-w-4xl text-balance text-headline';
const lead = 'mt-5 max-w-2xl text-pretty text-lead text-muted';
const card = 'rounded-3xl bg-surface p-7 shadow-card md:p-9';
const icon = 'grid size-11 shrink-0 place-items-center rounded-full';
const code =
  'rounded-md bg-white/10 px-1.5 py-0.5 text-[0.9em] ring-1 ring-inset ring-white/15';
const inlineLink = 'font-semibold text-ink underline underline-offset-4';
const needIcons = [Database, KeyRound, ListChecks];

export default function IntegracionesPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="pb-12 pt-8 md:pb-18 md:pt-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <SectionHeader
              level="h1"
              eyebrow="Integraciones a pedido"
              title={
                <>
                  <span className="block">Reservá turnos y registrá pedidos</span>{' '}
                  <span className="block text-faint">en tu sistema desde WhatsApp.</span>
                </>
              }
              sub="Conectamos Atende a tu agenda, stock o CRM a pedido. El asistente consulta disponibilidad, registra lo que pidió tu cliente y le confirma el resultado que devuelve tu sistema. Tu equipo sigue el chat desde la bandeja."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={buildDemoLink('integraciones')}
                data-cta="integrations-demo"
                size="lg"
                className="w-full sm:w-auto"
              >
                Contanos qué sistema usás
              </Button>
              <Button
                href="#servidor-mcp"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Tengo un servidor MCP
              </Button>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
              Hoy no hay conexiones listas para activar. Cada una se arma y se
              cotiza para un negocio.
            </p>
          </div>
          <ChatScene
            messages={rescheduleChat}
            connection="Con la agenda conectada"
            result={{
              label: 'Turno reprogramado',
              detail: 'Tu agenda confirmó el cambio y recién ahí el asistente lo informó.',
            }}
          />
        </div>
      </section>

      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Qué cambia con una conexión</h2>
          <p className={lead}>
            Sin conexión, el asistente junta el pedido y tu equipo lo confirma.
            Con conexión, la tarea queda hecha en el chat, en el sistema donde
            tu negocio ya la lleva.
          </p>
          <FactRows rows={connectionRows} className="mt-8 md:mt-12" />
        </div>
      </section>

      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Qué necesitamos de tu negocio</h2>
          <div className="mt-8 grid gap-4 md:mt-12 md:gap-5 lg:grid-cols-3">
            {needs.map((need, index) => {
              const Icon = needIcons[index % needIcons.length];
              return (
                <article key={need.title} className={card}>
                  <span className={`${icon} bg-bg`} aria-hidden="true">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-balance text-title">
                    {need.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{need.text}</p>
                </article>
              );
            })}
          </div>
          <p className="mt-8 max-w-3xl leading-relaxed text-muted">
            Vincular tu número desde el panel con un QR habilita
            el canal de WhatsApp.
            Para registrar un pedido también hace falta conectar tu sistema.{' '}
            <Link
              href="/que-es-atende#conexion"
              className={inlineLink}
            >
              Cómo se vincula el número
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Cómo se arma, paso a paso</h2>
          <StepCards steps={steps} columns={5} className="mt-8 md:mt-14" />
        </div>
      </section>

      <section className="py-12 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 md:gap-5 md:px-8 lg:grid-cols-2">
          <article className={card}>
            <span className={`${icon} bg-forest text-white`} aria-hidden="true">
              <ShieldCheck size={20} strokeWidth={1.75} />
            </span>
            <h2 className="mt-6 text-balance text-title">
              El asistente informa lo que tu sistema confirmó
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Cuando reserva o registra algo, la conexión le devuelve un
              resultado. El asistente está armado para informar solo eso: el
              turno que tu agenda aceptó, el número de pedido que tu sistema
              devolvió. Si el sistema da error, la instrucción es no decir
              “listo”. Es un diseño, no una garantía.
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              Tu equipo puede cotejar la confirmación del chat con el registro que quedó en tu sistema.
            </p>
          </article>
          <article className={card}>
            <span className={`${icon} bg-bg`} aria-hidden="true">
              <Unplug size={20} strokeWidth={1.75} />
            </span>
            <h2 className="mt-6 text-balance text-title">
              Si la conexión falla
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              La conversación sigue sin esa herramienta. El asistente responde,
              pero no puede reservar ni registrar, y nadie recibe un aviso. En
              el panel, “Activa” significa que la conexión está encendida, no
              que esté funcionando.
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              Por eso tu equipo tiene que estar atento. Acordamos con vos quién
              revisa, por ejemplo, que los turnos del día estén en la agenda y
              que las conversaciones marcadas se atiendan.
            </p>
          </article>
        </div>
      </section>

      <section id="demo" className="scroll-mt-24 py-12 md:py-18">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <h2 className={heading}>La demo que ya funciona</h2>
            <p className={lead}>
              Tenemos una demo para una concesionaria de motos, conectada de
              verdad. Consulta stock y precios, calcula la financiación con
              patente y administración, y registra al interesado en Google
              Sheets para que lo tome un vendedor.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              Es una demo, no un cliente. Y tiene límites a la vista: si la misma
              acción se ejecuta dos veces, hoy puede sumar dos filas a la
              planilla. En una conexión para tu negocio eso se resuelve evitando
              duplicados.
            </p>
            <Button
              href={buildDemoLink('integraciones')}
              size="lg"
              className="mt-8 w-full sm:w-auto"
            >
              Contanos qué querés conectar
            </Button>
          </div>
          <ChatScene
            messages={demoChat}
            connection="La demo para una concesionaria"
            result={{
              label: 'Interesado registrado',
              detail: 'Queda en la planilla de Google Sheets de la demo.',
            }}
          />
        </div>
      </section>

      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Qué viene incluido y qué se arma para vos</h2>
          <StatusTable className="mt-8 max-w-4xl md:mt-12" />
        </div>
      </section>

      <section id="servidor-mcp" className="scroll-mt-24 px-3 py-6 md:px-6 md:py-12">
        <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-4xl bg-forest text-white">
          <div
            className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgb(255_255_255/0.1),transparent_65%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <SectionHeader
              inverse
              eyebrow="Para equipos técnicos"
              title="Si tu equipo ya tiene un servidor MCP"
              sub="Esta sección es para empresas con desarrollo propio. Si ya tenés un servidor MCP con tus herramientas, lo conectás vos desde el panel, con un plan con IA."
            />
            <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="text-title">
                  Cómo se carga
                </h3>
                <ol className="mt-5 border-t border-white/15 leading-relaxed text-white/75">
                  <li className="flex gap-3 border-b border-white/15 py-4">
                    <span className="w-5 shrink-0 font-semibold tabular-nums text-white">1.</span>{' '}
                    <span>Entrá a Asistente, buscá Herramientas conectadas y tocá Agregar herramienta.</span>
                  </li>
                  <li className="flex gap-3 border-b border-white/15 py-4">
                    <span className="w-5 shrink-0 font-semibold tabular-nums text-white">2.</span>{' '}
                    <span>Completá la clave, el nombre visible y la descripción.</span>
                  </li>
                  <li className="flex gap-3 border-b border-white/15 py-4">
                    <span className="w-5 shrink-0 font-semibold tabular-nums text-white">3.</span>{' '}
                    <span>Pegá la dirección HTTP de tu servidor.</span>
                  </li>
                  <li className="flex gap-3 border-b border-white/15 py-4">
                    <span className="w-5 shrink-0 font-semibold tabular-nums text-white">4.</span>{' '}
                    <span>
                      Sumá los encabezados, uno por línea, con el formato{' '}
                      <code className={code}>Nombre=valor</code>. Ahí va la credencial
                      de tu servidor.
                    </span>
                  </li>
                </ol>
                <p className="mt-5 leading-relaxed text-white/75">
                  Los encabezados son fijos: no hay OAuth ni botón de prueba. Para
                  ver si funciona, escribile al asistente desde otro número. Si tu
                  servidor no carga, la conversación sigue sin esas herramientas.
                </p>
              </div>
              <div>
                <h3 className="text-title">
                  Para que el asistente la use bien
                </h3>
                <dl className="mt-5 border-t border-white/15">
                  {serverTips.map((tip) => (
                    <div key={tip.title} className="border-b border-white/15 py-4">
                      <dt className="font-semibold">{tip.title}</dt>
                      <dd className="m-0 mt-1 leading-relaxed text-white/75">{tip.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="whatsapp-mcp" className="scroll-mt-24 py-12 md:py-18">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Herramientas conectadas y WhatsApp MCP no son lo mismo</h2>
          <p className={lead}>
            Las dos usan MCP y van en sentidos opuestos. Herramientas conectadas
            le da acciones al asistente. WhatsApp MCP deja que una aplicación de
            IA que vos autorizás use tu WhatsApp desde afuera.
          </p>
          <div className="mt-8 max-w-4xl overflow-x-auto rounded-3xl bg-surface shadow-card ring-1 ring-line md:mt-12">
            {/* One group per aspect: its name, then both answers side by side,
                so the two columns stay readable on a phone. */}
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="sr-only">
                Diferencias entre Herramientas conectadas y WhatsApp MCP
              </caption>
              <thead className="bg-bg/60">
                <tr className="border-b border-line">
                  <th scope="col" className="w-1/2 px-4 py-3.5 text-sm font-semibold text-muted sm:px-7">
                    Herramientas conectadas
                  </th>
                  <th scope="col" className="w-1/2 px-4 py-3.5 text-sm font-semibold text-muted sm:px-7">
                    WhatsApp MCP
                  </th>
                </tr>
              </thead>
              {compareRows.map(([label, tools, whatsapp]) => (
                <tbody key={label} className="border-b border-line last:border-b-0">
                  <tr>
                    <th
                      scope="rowgroup"
                      colSpan={2}
                      className="px-4 pb-1 pt-4 text-left text-base font-semibold tracking-[-0.01em] sm:px-7 sm:pt-5"
                    >
                      {label}
                    </th>
                  </tr>
                  <tr className="align-top text-[0.9375rem] leading-snug text-muted">
                    <td className="px-4 pb-4 sm:px-7 sm:pb-5">{tools}</td>
                    <td className="px-4 pb-4 sm:px-7 sm:pb-5">{whatsapp}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted">
            WhatsApp MCP está en todos los planes. La compatibilidad con cada
            aplicación de IA todavía no está confirmada, y por sí solo no suma
            acciones al asistente.{' '}
            <Link
              href="/blog/conectar-whatsapp-con-claude-chatgpt-mcp"
              className={inlineLink}
            >
              Cómo funciona WhatsApp MCP
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaFinal
        context="Hola, quiero que armen la conexión de Atende con mi sistema"
        demoSource="integraciones"
      />
      <JsonLd value={pageGraph({ ...pages.integrations, breadcrumbs })} />
    </>
  );
}

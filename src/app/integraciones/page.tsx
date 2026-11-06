import Link from 'next/link';
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
import { pageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusTable } from '@/components/ui/StatusTable';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { FactRows } from '@/components/servicios/FactRows';
import { StepCards } from '@/components/servicios/StepCards';

export const metadata = createPageMetadata(pages.integrations);
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Integraciones', path: '/integraciones' },
];

const heading =
  'font-display text-3xl font-semibold tracking-[-0.025em] md:text-4xl';
const code =
  'rounded border border-bg/30 bg-bg/10 px-1.5 py-0.5 font-mono text-[0.85em]';

export default function IntegracionesPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="border-b-2 border-ink py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <SectionHeader
              level="h1"
              eyebrow="Integraciones a pedido"
              title={
                <>
                  Armamos la conexión de WhatsApp{' '}
                  <span className="text-coral">con tu sistema, a pedido.</span>
                </>
              }
              sub="Conectado a tu agenda, tu stock o tu CRM, Atende reserva el turno, consulta si hay y registra el pedido en la conversación. No te damos un armador de flujos: armamos la conexión con tu sistema, para tu negocio y con tus reglas."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/demo" data-cta="integrations-demo" size="lg">
                Contanos qué sistema usás →
              </Button>
              <Button href="#servidor-mcp" variant="outline" size="lg">
                Tengo un servidor MCP
              </Button>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-mute">
              Hoy no hay conexiones listas para activar. Cada una se arma y se
              cotiza para un negocio.
            </p>
          </div>
          <ChatMockup
            messages={rescheduleChat}
            caption="Ejemplo ilustrativo, con la agenda conectada"
            result={{
              label: 'Turno reprogramado',
              detail: 'Tu agenda confirmó el cambio y recién ahí el asistente lo informó.',
            }}
          />
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Qué cambia con una conexión</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-mute">
            Sin conexión, el asistente junta el pedido y tu equipo lo confirma.
            Con conexión, la tarea queda hecha en el chat, en el sistema donde
            tu negocio ya la lleva.
          </p>
          <FactRows rows={connectionRows} className="mt-8" />
        </div>
      </section>

      <section className="border-b-2 border-ink py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Qué necesitamos de tu negocio</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {needs.map((need) => (
              <article
                key={need.title}
                className="rounded-lg border-2 border-ink bg-surface p-6 shadow-[var(--shadow-brut-sm)]"
              >
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">
                  {need.title}
                </h3>
                <p className="mt-3 leading-relaxed text-mute">{need.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl leading-relaxed text-mute">
            Tu WhatsApp va por separado de esta conexión. Elegís cómo conectar tu
            número: con la API oficial de Meta o con un QR.{' '}
            <Link
              href="/que-es-atende#conexion"
              className="font-semibold text-ink underline underline-offset-4"
            >
              Qué cambia entre una ruta y la otra
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Cómo se arma, paso a paso</h2>
          <StepCards steps={steps} columns={5} className="mt-8" />
        </div>
      </section>

      <section className="border-b-2 border-ink py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-2">
          <article className="rounded-lg border-2 border-ink bg-mint p-6 shadow-[var(--shadow-brut-sm)] md:p-8">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.025em]">
              El asistente informa lo que tu sistema confirmó
            </h2>
            <p className="mt-4 leading-relaxed">
              Cuando reserva o registra algo, la conexión le devuelve un
              resultado. El asistente está armado para informar solo eso: el
              turno que tu agenda aceptó, el número de pedido que tu sistema
              devolvió. Si el sistema da error, la instrucción es no decir
              “listo”. Es un diseño, no una garantía.
            </p>
            <p className="mt-3 leading-relaxed">
              En la bandeja ves toda la conversación. Ver ahí mismo qué acción
              corrió llega próximamente.
            </p>
          </article>
          <article className="rounded-lg border-2 border-ink bg-coral-soft p-6 shadow-[var(--shadow-brut-sm)] md:p-8">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.025em]">
              Si la conexión falla
            </h2>
            <p className="mt-4 leading-relaxed">
              La conversación sigue sin esa herramienta. El asistente responde,
              pero no puede reservar ni registrar, y nadie recibe un aviso. En
              el panel, “Activa” significa que la conexión está encendida, no
              que esté funcionando.
            </p>
            <p className="mt-3 leading-relaxed">
              Por eso tu equipo tiene que estar atento. Acordamos con vos quién
              revisa, por ejemplo, que los turnos del día estén en la agenda y
              que las conversaciones marcadas se atiendan.
            </p>
          </article>
        </div>
      </section>

      <section id="demo" className="scroll-mt-24 border-b-2 border-ink bg-surface py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className={heading}>La demo que ya funciona</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">
              Tenemos una demo para una concesionaria de motos, conectada de
              verdad. Consulta stock y precios, calcula la financiación con
              patente y administración, y registra al interesado en Google
              Sheets para que lo tome un vendedor.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-mute">
              Es una demo, no un cliente. Y tiene límites a la vista: si la misma
              acción se ejecuta dos veces, hoy puede sumar dos filas a la
              planilla. En una conexión para tu negocio eso se resuelve evitando
              duplicados.
            </p>
            <Link
              href="/demo"
              className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
            >
              Contanos qué querés conectar →
            </Link>
          </div>
          <ChatMockup
            messages={demoChat}
            caption="Ejemplo ilustrativo de la demo para una concesionaria"
            result={{
              label: 'Interesado registrado',
              detail: 'Queda en la planilla de Google Sheets de la demo.',
            }}
          />
        </div>
      </section>

      <section className="border-b-2 border-ink py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <h2 className={heading}>Qué viene incluido y qué se arma para vos</h2>
          <StatusTable className="mt-6" />
        </div>
      </section>

      <section
        id="servidor-mcp"
        className="scroll-mt-24 border-b-2 border-ink bg-forest py-14 text-bg md:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            inverse
            eyebrow="Para equipos técnicos"
            title="Si tu equipo ya tiene un servidor MCP"
            sub="Esta sección es para empresas con desarrollo propio. Si ya tenés un servidor MCP con tus herramientas, lo conectás vos desde el panel, con un plan con IA."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                Cómo se carga
              </h3>
              <ol className="mt-4 flex flex-col gap-3 leading-relaxed text-bg/85">
                <li>1. Entrá a Asistente, buscá Herramientas conectadas y tocá Agregar herramienta.</li>
                <li>2. Completá la clave, el nombre visible y la descripción.</li>
                <li>3. Pegá la dirección HTTP de tu servidor.</li>
                <li>
                  4. Sumá los encabezados, uno por línea, con el formato{' '}
                  <code className={code}>Nombre=valor</code>. Ahí va la credencial
                  de tu servidor.
                </li>
              </ol>
              <p className="mt-4 leading-relaxed text-bg/85">
                Los encabezados son fijos: no hay OAuth ni botón de prueba. Para
                ver si funciona, escribile al asistente desde otro número. Si tu
                servidor no carga, la conversación sigue sin esas herramientas.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                Para que el asistente la use bien
              </h3>
              <dl className="mt-4 flex flex-col gap-3">
                {serverTips.map((tip) => (
                  <div key={tip.title}>
                    <dt className="font-semibold">{tip.title}</dt>
                    <dd className="m-0 leading-relaxed text-bg/80">{tip.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section id="whatsapp-mcp" className="scroll-mt-24 border-b-2 border-ink bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <h2 className={heading}>Herramientas conectadas y WhatsApp MCP no son lo mismo</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-mute">
            Las dos usan MCP y van en sentidos opuestos. Herramientas conectadas
            le da acciones al asistente. WhatsApp MCP deja que una aplicación de
            IA que vos autorizás use tu WhatsApp desde afuera.
          </p>
          <div className="mt-8 overflow-hidden rounded-lg border-2 border-ink bg-bg shadow-[var(--shadow-brut)]">
            <table className="w-full table-fixed border-collapse text-left text-sm md:text-base">
              <caption className="sr-only">
                Diferencias entre Herramientas conectadas y WhatsApp MCP
              </caption>
              <thead className="bg-forest text-bg">
                <tr>
                  <th scope="col" className="w-[26%] p-2.5 font-semibold md:p-4">
                    <span className="sr-only">Aspecto</span>
                  </th>
                  <th scope="col" className="p-2.5 font-semibold md:p-4">
                    Herramientas conectadas
                  </th>
                  <th scope="col" className="p-2.5 font-semibold md:p-4">
                    WhatsApp MCP
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map(([label, tools, whatsapp]) => (
                  <tr key={label} className="border-t border-ink/20 align-top">
                    <th scope="row" className="p-2.5 font-semibold md:p-4">
                      {label}
                    </th>
                    <td className="p-2.5 leading-snug text-mute md:p-4">{tools}</td>
                    <td className="p-2.5 leading-snug text-mute md:p-4">{whatsapp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-3xl leading-relaxed text-mute">
            WhatsApp MCP está en todos los planes. La compatibilidad con cada
            aplicación de IA todavía no está confirmada, y por sí solo no suma
            acciones al asistente.{' '}
            <Link
              href="/blog/conectar-whatsapp-con-claude-chatgpt-mcp"
              className="font-semibold text-ink underline underline-offset-4"
            >
              Cómo funciona WhatsApp MCP
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaFinal context="Hola, quiero que armen la conexión de Atende con mi sistema" />
      <JsonLd value={pageGraph({ ...pages.integrations, breadcrumbs })} />
    </>
  );
}

import Link from 'next/link';
import { site } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { pages } from '@/content/pages';
import {
  audiences,
  connected,
  definition,
  facts,
  inbox,
  included,
  nextLinks,
  notDone,
  positioning,
} from '@/content/que-es-atende';
import { createPageMetadata } from '@/lib/metadata';
import { pageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusTable } from '@/components/ui/StatusTable';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { FactRows } from '@/components/servicios/FactRows';

export const metadata = createPageMetadata(pages.what);
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Qué es Atende', path: '/que-es-atende' },
];

const heading =
  'font-display text-3xl font-semibold tracking-[-0.025em] md:text-4xl';
const sourceLink = 'font-semibold text-ink underline underline-offset-4';

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-2.5 leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 size-2 shrink-0 bg-ink" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function QueEsAtendePage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="border-b-2 border-ink py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 md:px-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <SectionHeader eyebrow="Ficha de producto" level="h1" title="¿Qué es Atende?" />
            <p className="mt-6 max-w-3xl border-l-4 border-coral pl-5 font-display text-2xl font-medium leading-snug tracking-[-0.015em] md:text-3xl">
              {definition}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button href="/demo" data-cta="product-demo">Ver cómo funcionaría en mi negocio</Button>
              <Link href="/precios" className={sourceLink + ' inline-flex min-h-11 items-center'}>
                Consultar planes
              </Link>
            </div>
          </div>
          <ChatMockup
            caption="Ejemplo ilustrativo, con la agenda conectada"
            messages={[
              { from: 'them', text: 'Quiero un turno para corte el jueves a la tarde' },
              { from: 'us', text: 'Tengo jueves 16:00 o 17:30. ¿Cuál te queda mejor?' },
              { from: 'them', text: 'A las 16' },
              { from: 'us', text: 'Listo, te reservé el jueves a las 16:00.' },
            ]}
            result={{
              label: 'Turno reservado',
              detail: 'Conectado a tu agenda. Esa conexión se arma a pedido para tu negocio.',
            }}
          />
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Atende en pocas líneas</h2>
          <FactRows rows={facts} className="mt-6" />
        </div>
      </section>

      <section className="border-b-2 border-ink py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className={heading}>Qué hace con un plan con IA</h2>
            <p className="mt-4 leading-relaxed text-mute">
              Sin conectar nada más, responde a cualquier hora, mientras el
              servicio y tu WhatsApp estén conectados.
            </p>
            <Bullets items={included} />
            <h3 className="mt-7 font-display text-xl font-semibold">
              La bandeja de tu equipo
            </h3>
            <p className="mt-2 leading-relaxed text-mute">{inbox}</p>
          </div>
          <div>
            <h2 className={heading}>Qué termina con una conexión</h2>
            <p className="mt-4 leading-relaxed text-mute">{positioning}</p>
            <Bullets items={connected} />
            <p className="mt-5 leading-relaxed">
              Sin conexión, el asistente junta el pedido y tu equipo lo
              confirma.
            </p>
            <p className="mt-3 leading-relaxed text-mute">
              Hoy funciona una demo para una concesionaria de motos: consulta
              stock y precios, calcula financiación y registra al interesado en
              Google Sheets. Es una demo, no un cliente.{' '}
              <Link
                href="/integraciones#demo"
                className="font-semibold text-ink underline underline-offset-4"
              >
                Ver cómo se registra el interesado
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-coral-soft/45 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Qué no hace</h2>
          <ul className="mt-5 grid gap-x-10 gap-y-3 leading-relaxed md:grid-cols-2">
            {notDone.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-2 size-2 shrink-0 bg-coral-strong"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="conexion" className="scroll-mt-24 border-b-2 border-ink py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className={heading}>Cómo se conecta</h2>
            <p className="mt-4 font-display text-xl font-semibold leading-snug">
              Desde el panel, vinculás el WhatsApp que ya usa tu negocio.
            </p>
            <p className="mt-3 leading-relaxed text-mute">
              Abrí el QR del panel en otra pantalla. En tu teléfono, entrá a
              Dispositivos vinculados y escanealo. Tus clientes siguen
              escribiendo al mismo número.
            </p>
            <p className="mt-3 leading-relaxed text-mute">
              Si necesitás la API oficial de Meta, consultá el alta y las
              condiciones de esa ruta en la demo. Vincular un dispositivo por QR
              es una conexión distinta.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
              Cómo se empieza
            </h2>
            <ol className="mt-4 flex flex-col gap-2.5 leading-relaxed">
              {[
                'Creás tu espacio.',
                'Le contás qué hace tu negocio.',
                'Invitás a tu equipo.',
                'Activás créditos o un plan.',
                'Vinculás tu número de WhatsApp.',
              ].map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="font-mono text-sm text-coral-strong">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <a
              href={`https://wa.me/${site.onboardingWhatsApp}?text=Quiero%20crear%20mi%20espacio%20en%20Atende`}
              data-cta="product-whatsapp-onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className={sourceLink + ' mt-4 inline-flex min-h-11 items-center'}
            >
              Crear mi espacio por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className={heading}>Para quién es</h2>
          <FactRows
            className="mt-6"
            rows={audiences.map(({ slug, name, action }) => ({
              label: (
                <Link
                  href={`/casos-de-uso/${slug}`}
                  className="inline-flex min-h-11 items-center underline underline-offset-4"
                >
                  {name}
                </Link>
              ),
              text: action,
            }))}
          />
          <p className="mt-6 max-w-3xl leading-relaxed text-mute">
            No conviene si necesitás campañas de difusión masivas, interpretar el contenido de
            imágenes o documentos sin intervención de tu equipo o varios canales además de WhatsApp.
          </p>
          <p className="mt-4 max-w-3xl rounded-md border-2 border-ink bg-bg p-4 leading-relaxed">
            <strong className="font-semibold">No confundir:</strong> Atende
            (atende.com.ar) no tiene relación con AtiendeApp, Atendium ni otros
            productos de nombres parecidos.
          </p>
        </div>
      </section>

      <section id="estado" className="scroll-mt-24 border-b-2 border-ink py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <h2 className={heading}>Qué funciona hoy</h2>
          <p className="mt-4 leading-relaxed text-mute">
            Esta tabla es pública a propósito: separa lo que viene con los
            planes con IA de lo que armamos a pedido.
          </p>
          <StatusTable className="mt-6" />
        </div>
      </section>

      <nav aria-label="Seguí leyendo" className="border-b-2 border-ink bg-mint/35 py-12">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-semibold">Seguí leyendo</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nextLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex h-full flex-col rounded-lg border-2 border-ink bg-bg p-5 shadow-[var(--shadow-brut-xs)] transition-colors hover:bg-coral-soft/50"
                >
                  <span className="font-display text-lg font-semibold">
                    {link.title} →
                  </span>
                  <span className="mt-1 text-mute">{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <CtaFinal context="Hola, leí qué es Atende y quiero ver qué tarea puede terminar en mi negocio" />
      <JsonLd value={pageGraph({ ...pages.what, breadcrumbs })} />
    </>
  );
}

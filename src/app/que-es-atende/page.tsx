import Link from 'next/link';
import { ArrowRight, Check, Minus } from 'lucide-react';
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

const section = 'py-16 md:py-24';
const container = 'mx-auto max-w-7xl px-5 md:px-8';
const sheet = 'rounded-4xl bg-surface p-7 shadow-card md:p-10';
const textLink =
  'font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:decoration-ink';

// Included jobs get the forest check, the jobs a connection finishes get the
// coral one: the same two markers as the status table.
function CheckList({
  items,
  tone,
}: {
  items: string[];
  tone: 'forest' | 'coral';
}) {
  return (
    <ul className="mt-6 flex flex-col gap-3.5 leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
              tone === 'coral' ? 'bg-coral text-white' : 'bg-forest-tint text-forest'
            }`}
            aria-hidden="true"
          >
            <Check size={14} strokeWidth={3} />
          </span>
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
      <section className="pt-8 md:pt-14">
        <div className={container}>
          <SectionHeader
            eyebrow="Ficha de producto"
            level="h1"
            title="¿Qué es Atende?"
            sub={definition}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href="/demo"
              data-cta="product-demo"
              size="lg"
              className="w-full sm:w-auto"
            >
              Ver cómo funcionaría en mi negocio
            </Button>
            <Button
              href="/precios"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Consultar planes
            </Button>
          </div>
        </div>

        {/* The finished task, on the same stage as the home. */}
        <div className="px-3 pt-12 md:px-6 md:pt-16">
          <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-4xl bg-forest px-4 py-10 text-white sm:py-14 md:py-20">
            <div
              className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgb(255_255_255/0.1),transparent_65%)]"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(50%_100%_at_50%_100%,rgb(230_72_44/0.28),transparent_70%)]"
              aria-hidden="true"
            />
            {/* The card keeps ink text; only the caption takes the white. */}
            <ChatMockup
              className="relative mx-auto [&>div]:text-ink"
              caption="Con la agenda conectada"
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
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <h2 className="text-balance text-headline">Atende en pocas líneas</h2>
          <FactRows rows={facts} className="mt-8 md:mt-12" />
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className={`${container} grid gap-4 lg:grid-cols-2 lg:gap-5`}>
          <div className={sheet}>
            <h2 className="text-balance text-title">Qué hace con un plan con IA</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Sin conectar nada más, responde a cualquier hora, mientras el
              servicio y tu WhatsApp estén conectados.
            </p>
            <CheckList items={included} tone="forest" />
            <div className="mt-8 border-t border-line pt-7">
              <h3 className="text-lg font-semibold tracking-[-0.015em]">
                La bandeja de tu equipo
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{inbox}</p>
            </div>
          </div>
          <div className={sheet}>
            <h2 className="text-balance text-title">Qué termina con una conexión</h2>
            <p className="mt-3 leading-relaxed text-muted">{positioning}</p>
            <CheckList items={connected} tone="coral" />
            <div className="mt-8 border-t border-line pt-7">
              <p className="font-semibold leading-relaxed tracking-[-0.01em]">
                Sin conexión, el asistente junta el pedido y tu equipo lo
                confirma.
              </p>
              <p className="mt-2 leading-relaxed text-muted">
                Hoy funciona una demo para una concesionaria de motos: consulta
                stock y precios, calcula financiación y registra al interesado en
                Google Sheets. Es una demo, no un cliente.{' '}
                <Link href="/integraciones#demo" className={textLink}>
                  Ver cómo se registra el interesado
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <h2 className="text-balance text-headline">Qué no hace</h2>
          <ul className="mt-8 grid gap-x-12 md:mt-12 md:grid-cols-2">
            {notDone.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 border-t border-line-strong py-5 leading-relaxed"
              >
                <span
                  className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-surface text-muted shadow-card"
                  aria-hidden="true"
                >
                  <Minus size={14} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="conexion" className={`scroll-mt-24 ${section}`}>
        <div className={`${container} grid items-start gap-10 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <h2 className="text-balance text-headline">Cómo se conecta</h2>
            <p className="mt-5 text-pretty text-lead font-medium">
              Desde el panel, vinculás el WhatsApp que ya usa tu negocio.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Abrí el QR del panel en otra pantalla. En tu teléfono, entrá a
              Dispositivos vinculados y escanealo. Tus clientes siguen
              escribiendo al mismo número.
            </p>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">
              Si necesitás la API oficial de Meta, consultá el alta y las
              condiciones de esa ruta en la demo. Vincular un dispositivo por QR
              es una conexión distinta.
            </p>
          </div>
          <div className={sheet}>
            <h2 className="text-balance text-title">Cómo se empieza</h2>
            <ol className="mt-5 flex flex-col">
              {[
                'Creás tu espacio.',
                'Le contás qué hace tu negocio.',
                'Invitás a tu equipo.',
                'Activás créditos o un plan.',
                'Vinculás tu número de WhatsApp.',
              ].map((step, index) => (
                <li
                  key={step}
                  className="flex items-center gap-4 border-t border-line py-3 leading-snug first:border-t-0"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-bg text-[0.9375rem] font-semibold tabular-nums">
                    {index + 1}
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
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-4 py-2 text-center sm:px-5 text-[0.9375rem] font-semibold leading-tight text-white transition-[transform,background-color] duration-200 ease-smooth hover:bg-black active:scale-[0.97] sm:w-auto"
            >
              Crear mi espacio por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <h2 className="text-balance text-headline">Para quién es</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-4">
            {audiences.map(({ slug, name, action }) => (
              <li
                key={slug}
                className="group relative flex flex-col rounded-3xl bg-surface p-6 shadow-card transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-float md:p-7"
              >
                <span className="flex items-start justify-between gap-4">
                  {/* The name is the link; its overlay makes the whole tile clickable. */}
                  <Link
                    href={`/casos-de-uso/${slug}`}
                    className="text-lg font-semibold leading-snug tracking-[-0.015em] after:absolute after:inset-0 after:rounded-3xl"
                  >
                    {name}
                  </Link>
                  <ArrowRight
                    size={18}
                    className="mt-1 shrink-0 text-muted transition-[transform,color] duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:text-ink"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-2 leading-relaxed text-muted">{action}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl leading-relaxed text-muted">
            No conviene si necesitás campañas de difusión masivas, interpretar el contenido de
            imágenes o documentos sin intervención de tu equipo o varios canales además de WhatsApp.
          </p>
          <p className="mt-4 max-w-3xl rounded-2xl bg-surface/60 px-5 py-4 leading-relaxed ring-1 ring-inset ring-line">
            <strong className="font-semibold">No confundir:</strong> Atende
            (atende.com.ar) no tiene relación con AtiendeApp, Atendium ni otros
            productos de nombres parecidos.
          </p>
        </div>
      </section>

      <section id="estado" className={`scroll-mt-24 ${section}`}>
        <div className={container}>
          <h2 className="text-balance text-headline">Qué funciona hoy</h2>
          <p className="mt-5 max-w-2xl text-pretty text-lead text-muted">
            Esta tabla es pública a propósito: separa lo que viene con los
            planes con IA de lo que armamos a pedido.
          </p>
          <StatusTable className="mt-8 md:mt-12" />
        </div>
      </section>

      <nav aria-label="Seguí leyendo" className="pb-16 md:pb-24">
        <div className={container}>
          <h2 className="text-title">Seguí leyendo</h2>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {nextLinks.map((link) => (
              <li key={link.href} className="border-t border-line-strong">
                <Link
                  href={link.href}
                  className="group flex h-full flex-col py-5"
                >
                  <span className="flex items-center gap-2 text-lg font-semibold tracking-[-0.015em]">
                    {link.title}
                    <ArrowRight
                      size={17}
                      className="shrink-0 text-muted transition-[transform,color] duration-300 ease-smooth group-hover:translate-x-1 group-hover:text-ink"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 leading-relaxed text-muted">{link.text}</span>
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

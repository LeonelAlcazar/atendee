import Link from 'next/link';
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
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Soluciones', path: '/servicios' },
];

const rubros = [
  ['clinicas-y-consultorios', 'Clínicas y consultorios', 'Reservar o reprogramar el turno'],
  ['peluquerias-y-estetica', 'Peluquerías y estética', 'Reservar el lugar en la agenda'],
  ['restaurantes-y-hoteles', 'Restaurantes y hoteles', 'Tomar la reserva'],
  ['comercios-y-distribuidoras', 'Comercios y distribuidoras', 'Consultar stock y registrar el pedido'],
  ['concesionarias-e-inmobiliarias', 'Concesionarias e inmobiliarias', 'Cotizar y registrar al interesado'],
  ['servicios-profesionales', 'Servicios profesionales', 'Calificar la consulta y registrarla'],
] as const;

export default function ServiciosPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="border-b-2 border-ink py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Soluciones"
            level="h1"
            title={
              <>
                Automatizá WhatsApp por tarea:{' '}
                <span className="text-coral">turnos, pedidos y atención.</span>
              </>
            }
            sub="Automatizar el WhatsApp de tu empresa rinde cuando el chat termina en algo hecho: el turno reservado, el pedido registrado, la consulta resuelta. Elegí la tarea que más te ocupa. Atende la termina en el número que ya usás, con tu equipo al tanto."
          />
          <nav aria-label="Tareas" className="mt-8">
            <ul className="flex flex-wrap gap-3">
              {servicios.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex min-h-11 items-center rounded-md border-2 border-ink bg-surface px-4 font-display text-sm font-semibold shadow-[var(--shadow-brut-xs)] hover:bg-coral-soft"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {servicios.map((s, i) => (
        <ServiceBlock key={s.id} servicio={s} reverse={i % 2 === 1} />
      ))}

      <section className="border-b-2 border-ink bg-forest py-16 text-bg md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.035em] text-balance md:text-5xl">
              No te damos un armador de flujos: armamos la conexión con tu
              sistema.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4">
            <p className="text-lg leading-relaxed text-bg/80">
              Conectado a tu agenda o a tu sistema, Atende termina la tarea. Esa
              conexión se arma a pedido para tu negocio. Sin conexión, el
              asistente junta el pedido y tu equipo lo confirma.
            </p>
            <Link
              href="/integraciones"
              className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
            >
              Cómo armamos cada conexión →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
            La misma tarea cambia según tu rubro
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-mute">
            Un turno en un consultorio pide otras cosas que una mesa en un
            restaurante. Mirá qué termina Atende en tu negocio.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rubros.map(([slug, name, action]) => (
              <li key={slug}>
                <Link
                  href={`/casos-de-uso/${slug}`}
                  className="flex h-full min-h-11 flex-col rounded-lg border-2 border-ink bg-bg p-5 shadow-[var(--shadow-brut-xs)] transition-colors hover:bg-coral-soft/50"
                >
                  <span className="font-display text-lg font-semibold">
                    {name} →
                  </span>
                  <span className="mt-1 text-mute">{action}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <nav
        aria-label="Guías para preparar la automatización"
        className="border-b-2 border-ink bg-mint/35 py-10"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-semibold">
            Antes de conectar
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            <li>
              <Link
                href="/blog/como-automatizar-whatsapp-empresa"
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                Cómo automatizar el WhatsApp de una empresa →
              </Link>
            </li>
            <li>
              <Link
                href="/blog/como-crear-un-bot-de-whatsapp"
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                Cómo preparar el asistente y probarlo →
              </Link>
            </li>
            <li>
              <Link
                href="/precios"
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                Cómo se cobra Atende →
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <CtaFinal context="Hola, quiero que Atende termine una tarea por WhatsApp en mi negocio" />
      <JsonLd value={pageGraph({ ...pages.services, breadcrumbs })} />
    </>
  );
}

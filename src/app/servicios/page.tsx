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
                Reservá turnos, tomá pedidos y{' '}
                <span className="text-coral">resolvé consultas por WhatsApp.</span>
              </>
            }
            sub="Elegí la tarea que más tiempo le lleva a tu equipo. Para reservar un turno o cargar un pedido en tu sistema, armamos una conexión a pedido. Las respuestas a preguntas frecuentes y la derivación a una persona vienen con los planes con IA."
          />
          <nav aria-label="Tareas" className="mt-8">
            <ul className="grid gap-3 md:grid-cols-3">
              {servicios.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="flex h-full flex-col gap-2 rounded-md border-2 border-ink bg-surface p-4 shadow-[var(--shadow-brut-xs)] transition-colors hover:bg-mint/60"
                  >
                    <span className="font-display text-lg font-semibold">{s.title} →</span>
                    <span className="leading-snug text-mute">{s.buyingQuestion}</span>
                  </Link>
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
              ¿Qué sistema hace falta conectar?
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4">
            <p className="text-lg leading-relaxed text-bg/80">
              Para reservar, tu agenda tiene que permitir consultar horarios libres
              y guardar el turno. Para vender, importa de dónde sale el precio y
              dónde tiene que quedar el pedido. Podemos revisar esos dos puntos
              con el sistema o la planilla que ya usás.
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

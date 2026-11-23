import type { Metadata } from 'next';
import { servicios } from '@/content/servicios';
import {
  ArrowLink,
  LinkRows,
  ServiceBlock,
  TileLink,
} from '@/components/servicios/ServiceBlock';
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
      <section className="pb-12 pt-8 md:pb-18 md:pt-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Soluciones"
            level="h1"
            title={
              <>
                <span className="block">Reservá turnos, tomá pedidos y</span>{' '}
                <span className="block text-faint">resolvé consultas por WhatsApp.</span>
              </>
            }
            sub="Elegí la tarea que más tiempo le lleva a tu equipo. Para reservar un turno o cargar un pedido en tu sistema, armamos una conexión a pedido. Las respuestas a preguntas frecuentes y la derivación a una persona vienen con los planes con IA."
          />
          <nav aria-label="Tareas" className="mt-10 md:mt-14">
            <ul className="grid gap-3 md:gap-4 lg:grid-cols-3">
              {servicios.map((s) => (
                <li key={s.id}>
                  <TileLink
                    href={`/servicios/${s.slug}`}
                    title={s.title}
                    text={s.buyingQuestion}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {servicios.map((s, i) => (
        <ServiceBlock key={s.id} servicio={s} reverse={i % 2 === 1} />
      ))}

      <section className="px-3 py-6 md:px-6 md:py-12">
        <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-4xl bg-forest text-white">
          <div
            className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgb(255_255_255/0.1),transparent_65%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
            <h2 className="max-w-2xl text-balance text-headline">
              ¿Qué sistema hace falta conectar?
            </h2>
            <div className="flex flex-col items-start gap-5">
              <p className="text-pretty text-lead text-white/75">
                Para reservar, tu agenda tiene que permitir consultar horarios libres
                y guardar el turno. Para vender, importa de dónde sale el precio y
                dónde tiene que quedar el pedido. Podemos revisar esos dos puntos
                con el sistema o la planilla que ya usás.
              </p>
              <ArrowLink href="/integraciones" tone="white">
                Cómo armamos cada conexión
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="max-w-4xl text-balance text-headline">
            La misma tarea cambia según tu rubro
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lead text-muted">
            Un turno en un consultorio pide otras cosas que una mesa en un
            restaurante. Mirá qué termina Atende en tu negocio.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 md:gap-4 lg:grid-cols-3">
            {rubros.map(([slug, name, action]) => (
              <li key={slug}>
                <TileLink href={`/casos-de-uso/${slug}`} title={name} text={action} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <nav
        aria-label="Guías para preparar la automatización"
        className="pb-12 pt-6 md:pb-18 md:pt-12"
      >
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <h2 className="text-title">
            Antes de conectar
          </h2>
          <LinkRows
            links={[
              {
                href: '/blog/como-automatizar-whatsapp-empresa',
                label: 'Cómo automatizar el WhatsApp de una empresa',
              },
              {
                href: '/blog/como-crear-un-bot-de-whatsapp',
                label: 'Cómo preparar el asistente y probarlo',
              },
              { href: '/precios', label: 'Cómo se cobra Atende' },
            ]}
          />
        </div>
      </nav>

      <CtaFinal context="Hola, quiero que Atende termine una tarea por WhatsApp en mi negocio" />
      <JsonLd value={pageGraph({ ...pages.services, breadcrumbs })} />
    </>
  );
}

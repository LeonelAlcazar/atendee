import Link from 'next/link';
import { servicios } from '@/content/servicios';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function BuyerFit() {
  return (
    <section className="border-b-2 border-ink bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="ELEGÍ POR DÓNDE EMPEZAR"
          title="¿Qué necesita resolver tu empresa?"
          sub="Empezá por una consulta frecuente: qué puede responder el bot, qué información necesita y cuándo debe intervenir tu equipo. Cada solución combina IA y una bandeja compartida."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {servicios.map((service) => (
            <article
              key={service.id}
              className="flex flex-col rounded-lg border-2 border-ink bg-bg p-6 shadow-[var(--shadow-brut-sm)]"
            >
              <h3 className="font-display text-2xl font-semibold leading-tight">
                {service.title}
              </h3>
              <p className="mt-4 flex-1 leading-relaxed text-mute">
                {service.short}
              </p>
              <Link
                href={`/servicios/${service.slug}`}
                className="mt-6 inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
              >
                Ver{' '}
                {service.id === 'atencion'
                  ? 'atención automática'
                  : service.id === 'turnos'
                    ? 'solicitudes de turnos'
                    : 'atención comercial'}{' '}
                <span aria-hidden="true"> →</span>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-6 border-t border-ink/20 pt-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-semibold">
              Es una buena opción si…
            </h3>
            <p className="mt-3 leading-relaxed text-mute">
              Recibís consultas repetidas, varias personas atienden el mismo
              número o las oportunidades quedan esperando mientras el equipo
              trabaja. Necesitás información actualizada y una persona que
              supervise las conversaciones.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold">
              Definí el alcance antes de contratar
            </h3>
            <p className="mt-3 leading-relaxed text-mute">
              Si necesitás consultar stock, reservar en una agenda o conectar un
              CRM, evaluamos esa integración con vos.{' '}
              <Link
                className="font-semibold underline underline-offset-4"
                href="/precios"
              >
                Revisá cómo elegir un plan
              </Link>{' '}
              o{' '}
              <Link
                className="font-semibold underline underline-offset-4"
                href="/demo"
              >
                contanos tu caso
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

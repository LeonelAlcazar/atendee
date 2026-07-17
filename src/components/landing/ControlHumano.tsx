import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { landing } from '@/content/landing';
import { site } from '@/content/site';

export function ControlHumano() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-forest py-20 text-bg md:py-28">
      <div className="absolute -right-20 -top-20 size-64 rounded-full border-[30px] border-coral opacity-30" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="flex flex-col items-start">
          <Tag inverse>{landing.control.eyebrow}</Tag>
          <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.04em] text-balance md:text-6xl">
            {landing.control.titleBefore}{' '}
            <span className="text-coral">{landing.control.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-bg/70">
            {landing.control.description}
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {landing.control.points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm font-medium md:text-base">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-bg/50 bg-bg/10 font-mono text-[10px] text-coral-soft" aria-hidden="true">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>

          <Button href={site.appUrl} variant="primary" size="md" className="mt-9">
            Empezar ahora <span aria-hidden="true">→</span>
          </Button>
        </div>

        <div className="relative">
          <div className="rounded-lg border-2 border-ink bg-surface p-4 text-ink shadow-[10px_10px_0_var(--color-coral)] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/20 pb-4">
              <div>
                <p className="font-display text-lg font-semibold">Conversación con Lucas</p>
                <p className="mt-1 font-mono text-[9px] uppercase text-mute">Hoy · WhatsApp</p>
              </div>
              <span className="flex items-center gap-2 rounded-full border border-mint-strong/30 bg-mint px-3 py-1.5 font-mono text-[9px] uppercase text-mint-strong">
                <span className="size-1.5 rounded-full bg-mint-strong" aria-hidden="true" />
                Atende respondiendo
              </span>
            </div>

            <div className="grid gap-5 py-6 sm:grid-cols-[1fr_10.5rem]">
              <div className="flex min-h-56 flex-col justify-end gap-3 rounded-md border border-ink/15 bg-bg p-4">
                <div className="max-w-[78%] rounded-md rounded-bl-none border border-ink bg-surface px-3 py-2 text-sm shadow-[2px_2px_0_var(--color-ink)]">
                  Necesito hacer un cambio en mi pedido
                </div>
                <div className="max-w-[86%] self-end rounded-md rounded-br-none border border-ink bg-forest px-3 py-2 text-sm leading-relaxed text-bg shadow-[2px_2px_0_var(--color-coral)]">
                  Claro. Para cuidar tus datos, te paso con una persona del equipo.
                </div>
                <div className="flex items-center gap-2 self-center rounded-full bg-sun/55 px-3 py-1.5 font-mono text-[8px] uppercase">
                  <span className="size-1.5 rounded-full bg-ink" aria-hidden="true" />
                  Requiere a tu equipo
                </div>
              </div>

              <aside className="flex flex-col justify-between rounded-md border border-ink bg-coral-soft p-4">
                <div>
                  <p className="font-mono text-[9px] uppercase text-mute">Siguiente paso</p>
                  <p className="mt-2 font-display text-lg font-semibold leading-tight">
                    Una persona toma la conversación.
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-mute">
                    Ve el historial completo y sigue desde donde quedó Atende.
                  </p>
                </div>
                <span className="mt-5 border-2 border-ink bg-coral px-3 py-2 text-center font-display text-xs font-semibold shadow-[var(--shadow-brut-xs)]">
                  Responder como equipo
                </span>
              </aside>
            </div>

            <div className="grid gap-2 border-t border-ink/20 pt-4 text-xs sm:grid-cols-3">
              <span className="rounded bg-bg px-3 py-2"><strong>10:41</strong> · Consulta recibida</span>
              <span className="rounded bg-mint px-3 py-2"><strong>10:41</strong> · Atende respondió</span>
              <span className="rounded bg-sun/55 px-3 py-2"><strong>10:42</strong> · Equipo avisado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

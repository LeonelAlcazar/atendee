import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { landing } from '@/content/landing';
import { site } from '@/content/site';

const qrPattern = [
  1, 1, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 1, 0,
  1, 1, 1, 0, 0, 1, 1,
  0, 0, 0, 1, 1, 0, 0,
  1, 1, 0, 1, 0, 1, 1,
  0, 1, 1, 0, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0,
] as const;

export function ServiciosTeaser() {
  const [inbox, qr, control] = landing.product.features;

  return (
    <section id="producto" className="border-b-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-end gap-7 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col items-start gap-4">
            <Tag>{landing.product.eyebrow}</Tag>
            <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.04em] text-balance md:text-6xl">
              {landing.product.titleBefore}{' '}
              <span className="text-coral">{landing.product.titleAccent}</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-mute md:text-xl">
            {landing.product.description}
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <article className="group overflow-hidden rounded-lg border-2 border-ink bg-surface shadow-[var(--shadow-brut)] lg:col-span-7 lg:row-span-2">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-coral-strong">{inbox.number}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-mute">
                    {inbox.label}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-[1] tracking-[-0.035em] md:text-4xl">
                  {inbox.title}
                </h3>
                <p className="mt-4 leading-relaxed text-mute">{inbox.text}</p>
              </div>

              <div className="self-end overflow-hidden rounded-md border-2 border-ink bg-bg shadow-[var(--shadow-brut-sm)]">
                <div className="flex items-center justify-between border-b border-ink/20 px-3 py-3">
                  <span className="font-display text-sm font-semibold">Hoy</span>
                  <span className="rounded-full bg-coral-soft px-2 py-1 font-mono text-[8px] uppercase">
                    3 nuevas
                  </span>
                </div>
                {[
                  ['MC', 'María C.', '¿Tienen turno mañana?', 'Ahora', 'bg-sky'],
                  ['JL', 'Juan L.', 'Necesito hablar con alguien', '10:31', 'bg-mint'],
                  ['SP', 'Sofía P.', 'Gracias por la información', '09:58', 'bg-sun'],
                ].map(([initials, name, message, time, tone], index) => (
                  <div
                    key={name}
                    className={`grid grid-cols-[2.25rem_1fr_auto] items-center gap-2 border-b border-ink/15 px-3 py-3 last:border-b-0 ${
                      index === 0 ? 'bg-coral-soft/55' : ''
                    }`}
                  >
                    <span className={`grid size-9 place-items-center rounded-full border border-ink font-mono text-[8px] ${tone}`}>
                      {initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-display text-xs font-semibold">{name}</p>
                      <p className="mt-0.5 truncate text-[10px] text-mute">{message}</p>
                    </div>
                    <span className="font-mono text-[7px] text-mute">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-lg border-2 border-ink bg-mint p-6 shadow-[var(--shadow-brut)] sm:p-8 lg:col-span-5">
            <div className="grid items-center gap-7 sm:grid-cols-[1fr_auto]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-mint-strong">{qr.number}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-mint-strong">
                    {qr.label}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-[1] tracking-[-0.03em] md:text-3xl">
                  {qr.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{qr.text}</p>
              </div>

              <div className="grid size-28 shrink-0 grid-cols-7 gap-1 rounded-md border-2 border-ink bg-surface p-3 shadow-[var(--shadow-brut-sm)]" aria-hidden="true">
                {qrPattern.map((filled, index) => (
                  <span
                    key={index}
                    className={filled ? 'rounded-[1px] bg-ink' : 'rounded-[1px] bg-transparent'}
                  />
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-lg border-2 border-ink bg-forest p-6 text-bg shadow-[var(--shadow-brut-coral)] sm:p-8 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-coral-soft">{control.number}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-bg/65">
                {control.label}
              </span>
            </div>
            <h3 className="mt-4 max-w-md font-display text-2xl font-semibold leading-[1] tracking-[-0.03em] md:text-3xl">
              {control.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-bg/65">{control.text}</p>

            <div className="mt-6 flex items-center justify-between rounded-md border border-bg/35 bg-bg/10 px-4 py-3">
              <div>
                <p className="font-display text-sm font-semibold">Atención automática</p>
                <p className="mt-0.5 text-[10px] text-bg/80">Tu equipo puede intervenir</p>
              </div>
              <span
                role="img"
                className="flex h-7 w-12 items-center justify-end rounded-full border border-bg bg-mint p-1"
                aria-label="Atención automática activada"
              >
                <span className="size-4 rounded-full bg-forest" />
              </span>
            </div>
          </article>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-ink/20 pt-7 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-mute">
            El panel está listo para usar desde el navegador. Tus clientes no cambian nada: siguen escribiendo por WhatsApp.
          </p>
          <Button href={site.appUrl} variant="outline" size="md">
            Conocer la app <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

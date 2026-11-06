import { landing } from '@/content/landing';
import { TaskTicket } from './TaskTicket';

const nav = ['Bandeja', 'Assets', 'Equipo', 'WhatsApp', 'Asistente', 'Plan'];

export function ProductPreview() {
  const { preview } = landing;
  const lastStep = preview.messages.length;

  return (
    <figure className="relative mx-auto w-full max-w-xl lg:mx-0">
      <div className="overflow-hidden rounded-lg border-2 border-ink bg-surface shadow-[10px_10px_0_var(--color-coral)]">
        <div
          className="flex items-center gap-4 overflow-hidden border-b-2 border-ink bg-bg px-3 py-2.5"
          aria-hidden="true"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded border-2 border-ink bg-coral font-display text-xs font-bold">
            A
          </span>
          <span className="flex gap-3.5 whitespace-nowrap text-[13px] font-medium">
            {nav.map((item, index) => (
              <span
                key={item}
                className={
                  index === 0
                    ? 'border-b-2 border-coral font-semibold'
                    : 'text-mute'
                }
              >
                {item}
              </span>
            ))}
          </span>
        </div>

        <div className="grid sm:grid-cols-[10rem_minmax(0,1fr)]">
          <div
            className="hidden border-r-2 border-ink bg-bg sm:block"
            aria-hidden="true"
          >
            <p className="border-b border-ink/20 px-3 py-2.5 text-[11px] leading-tight text-mute">
              Buscar contacto o teléfono
            </p>
            {preview.inbox.map((row) => (
              <div
                key={row.name}
                className={`border-b border-ink/15 px-3 py-2.5 ${
                  row.active ? 'bg-coral-soft' : ''
                }`}
              >
                <p className="truncate font-display text-[13px] font-semibold">
                  {row.name}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-mute">{row.line}</p>
              </div>
            ))}
          </div>

          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3 border-b border-ink/20 px-3 py-2.5 sm:px-4">
              <span className="font-display text-sm font-semibold">
                {preview.contact}
              </span>
              <span className="rounded-full border border-ink/25 bg-mint px-2 py-0.5 text-[11px] font-medium">
                {preview.status}
              </span>
            </div>
            <div className="flex flex-col gap-2.5 px-3 pb-11 pt-4 sm:px-4">
              {preview.messages.map((message, index) => (
                <p
                  key={message.text}
                  style={{ '--step': index } as React.CSSProperties}
                  className={`chat-step max-w-[86%] rounded-md border-2 border-ink px-3 py-2 text-sm leading-snug ${
                    message.from === 'us'
                      ? 'self-end rounded-br-none bg-forest text-bg'
                      : 'self-start rounded-bl-none bg-bg'
                  }`}
                >
                  {message.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TaskTicket
        label={preview.result.label}
        detail={preview.result.detail}
        size="lg"
        style={{ '--step': lastStep } as React.CSSProperties}
        className="ticket-land relative z-10 -mt-8 ml-auto w-fit max-w-[92%] -rotate-[1.5deg] sm:mr-6"
      />

      <figcaption className="mt-6 max-w-md text-sm leading-snug text-bg/80">
        {preview.caption}
      </figcaption>
    </figure>
  );
}

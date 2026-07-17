const conversations = [
  {
    initials: 'MC',
    name: 'María C.',
    preview: '¿Tienen turno mañana?',
    time: '10:42',
    active: true,
  },
  {
    initials: 'JL',
    name: 'Juan L.',
    preview: 'Gracias por la info',
    time: '10:31',
    active: false,
  },
  {
    initials: 'SP',
    name: 'Sofía P.',
    preview: 'Quiero conocer los precios',
    time: '09:58',
    active: false,
  },
] as const;

export function ProductPreview() {
  return (
    <figure
      className="relative overflow-hidden rounded-lg border-2 border-ink bg-surface shadow-[10px_10px_0_var(--color-ink)]"
      aria-label="Vista previa de la bandeja de conversaciones de Atende"
    >
      <div className="flex items-center justify-between border-b-2 border-ink bg-bg px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-coral" />
          <span className="size-2.5 rounded-full bg-sun" />
          <span className="size-2.5 rounded-full bg-mint-strong" />
        </div>
        <span className="rounded border border-ink/15 bg-surface px-3 py-1 font-mono text-[9px] text-mute">
          app.atende.com.ar
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase text-forest">
          <span className="size-1.5 rounded-full bg-mint-strong" aria-hidden="true" />
          En vivo
        </div>
      </div>

      <div className="grid min-h-[25rem] grid-cols-[4.25rem_1fr] sm:grid-cols-[8.5rem_1fr]">
        <aside className="border-r-2 border-ink bg-forest p-2.5 text-bg sm:p-3" aria-label="Navegación del panel">
          <div className="flex items-center gap-2 border-b border-bg/20 pb-4">
            <span className="grid size-8 shrink-0 place-items-center rounded border border-bg/70 bg-coral font-display text-sm font-bold text-ink shadow-[2px_2px_0_#f8f5ef]">
              A
            </span>
            <span className="hidden font-display text-sm font-semibold sm:inline">atende</span>
          </div>

          <nav className="mt-4 flex flex-col gap-2 font-body text-[11px]">
            <span className="hidden rounded px-2 py-2 text-bg/55 sm:block">Resumen</span>
            <span className="flex items-center justify-center gap-2 rounded bg-bg px-2 py-2.5 font-semibold text-ink sm:justify-start">
              <span className="size-2 border border-ink bg-coral" aria-hidden="true" />
              <span className="hidden sm:inline">Conversaciones</span>
              <span className="ml-auto hidden rounded-full bg-coral px-1.5 font-mono text-[8px] sm:inline">
                3
              </span>
            </span>
            <span className="hidden rounded px-2 py-2 text-bg/55 sm:block">WhatsApp</span>
            <span className="hidden rounded px-2 py-2 text-bg/55 sm:block">Tu equipo</span>
          </nav>

          <div className="mt-28 hidden border-t border-bg/20 pt-3 font-mono text-[8px] uppercase text-bg/60 sm:block">
            WhatsApp
            <span className="mt-1 flex items-center gap-1.5 text-mint">
              <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
              Conectado
            </span>
          </div>
        </aside>

        <div className="grid min-w-0 sm:grid-cols-[11.5rem_1fr]">
          <section className="hidden border-r border-ink/20 bg-bg sm:block" aria-label="Lista de conversaciones">
            <div className="border-b border-ink/20 px-3 py-4">
              <p className="font-display text-sm font-semibold">Conversaciones</p>
              <div className="mt-3 rounded border border-ink/20 bg-surface px-2 py-1.5 font-body text-[10px] text-mute">
                Buscar…
              </div>
            </div>
            <div>
              {conversations.map((conversation) => (
                <div
                  key={conversation.name}
                  className={`grid grid-cols-[2rem_1fr] gap-2 border-b border-ink/15 px-2.5 py-3 ${
                    conversation.active ? 'bg-coral-soft' : 'bg-surface'
                  }`}
                >
                  <span className="grid size-8 place-items-center rounded-full border border-ink bg-sky font-mono text-[8px] font-medium">
                    {conversation.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate font-display text-[10px] font-semibold">
                        {conversation.name}
                      </span>
                      <span className="font-mono text-[7px] text-mute">{conversation.time}</span>
                    </div>
                    <p className="mt-1 truncate text-[9px] text-mute">{conversation.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex min-w-0 flex-col bg-surface" aria-label="Conversación activa">
            <header className="flex items-center justify-between border-b border-ink/20 px-3 py-3 sm:px-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-xs font-semibold sm:text-sm">María C.</span>
                  <span className="rounded-full bg-mint px-2 py-0.5 font-mono text-[7px] uppercase text-mint-strong">
                    Atende activo
                  </span>
                </div>
                <p className="mt-1 font-mono text-[8px] text-mute">WhatsApp · En línea</p>
              </div>
              <span className="border border-ink bg-bg px-2 py-1.5 font-mono text-[8px] uppercase shadow-[2px_2px_0_var(--color-ink)]">
                Tomar chat
              </span>
            </header>

            <div className="flex flex-1 flex-col justify-end gap-3 bg-[linear-gradient(rgba(20,20,20,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.025)_1px,transparent_1px)] bg-[size:24px_24px] p-3 sm:p-4">
              <div className="max-w-[82%] self-start rounded-md rounded-bl-none border border-ink bg-bg px-3 py-2 text-xs shadow-[2px_2px_0_var(--color-ink)]">
                Hola, ¿tienen turno mañana a la tarde?
                <span className="mt-1 block font-mono text-[7px] text-mute">10:42</span>
              </div>

              <div className="max-w-[88%] self-end rounded-md rounded-br-none border border-ink bg-forest px-3 py-2 text-xs leading-relaxed text-bg shadow-[2px_2px_0_var(--color-coral)]">
                ¡Hola, María! Mañana tenemos 16:30 o 18:00. ¿Cuál te queda mejor?
                <span className="mt-1 flex items-center justify-end gap-1 font-mono text-[7px] text-bg/65">
                  Atende · 10:42 ✓✓
                </span>
              </div>

              <div className="self-center rounded-full border border-mint-strong/25 bg-mint px-3 py-1 font-mono text-[7px] uppercase tracking-[0.06em] text-mint-strong">
                Respondido automáticamente
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-ink/20 bg-bg p-3">
              <span className="flex-1 rounded border border-ink/20 bg-surface px-3 py-2 text-[10px] text-mute">
                Escribí una respuesta…
              </span>
              <span className="grid size-8 place-items-center rounded bg-coral font-display text-sm font-semibold text-ink">
                ↑
              </span>
            </div>
          </section>
        </div>
      </div>
    </figure>
  );
}

import { ChevronDown } from 'lucide-react';
import { landing } from '@/content/landing';

// The shared inbox, as the team sees it: the list of conversations and one
// chat that a person took over. Statuses are the real ones in the app.
export function ProductPreview({ className = '' }: { className?: string }) {
  const { preview } = landing;

  return (
    <figure
      className={`mx-auto w-full max-w-xl overflow-hidden rounded-4xl bg-surface shadow-float lg:mx-0 lg:max-w-none ${className}`}
    >
      <figcaption className="sr-only">{preview.label}</figcaption>

      <div
        className="flex items-center gap-5 overflow-hidden border-b border-line px-5 py-3.5"
        aria-hidden="true"
      >
        <span className="size-2.5 shrink-0 rounded-full bg-coral" />
        <span className="flex gap-4 whitespace-nowrap text-[0.8125rem] font-medium">
          {preview.nav.map((item, index) => (
            <span key={item} className={index === 0 ? 'text-ink' : 'text-muted'}>
              {item}
            </span>
          ))}
        </span>
      </div>

      <div className="grid sm:grid-cols-[11.5rem_minmax(0,1fr)]">
        <div className="hidden border-r border-line bg-bg/50 p-2 sm:block" aria-hidden="true">
          <p className="mb-1.5 rounded-xl bg-surface px-3 py-2 text-xs text-muted ring-1 ring-inset ring-line">
            {preview.search}
          </p>
          {preview.inbox.map((row) => (
            <div
              key={row.name}
              className={`rounded-xl px-3 py-2.5 ${row.active ? 'bg-surface shadow-card' : ''}`}
            >
              <p className="truncate text-sm font-semibold">{row.name}</p>
              <p
                className={`mt-0.5 truncate text-xs ${
                  row.active ? 'font-medium text-coral-strong' : 'text-muted'
                }`}
              >
                {row.line}
              </p>
            </div>
          ))}
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
            <span className="font-semibold tracking-[-0.01em]">{preview.contact}</span>
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-coral-tint pl-3 pr-2 text-[0.8125rem] font-semibold text-coral-strong">
              {preview.status}
              <ChevronDown size={14} aria-hidden="true" />
            </span>
          </div>
          <div className="flex flex-col gap-2.5 px-4 py-5 text-[0.9375rem] leading-snug sm:px-5">
            {preview.messages.map((message) =>
              message.from === 'team' ? (
                <div key={message.text} className="mt-1 flex flex-col items-end gap-1.5">
                  <p className="flex items-center gap-2 text-xs text-muted">
                    <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                    {preview.statusNote}
                  </p>
                  <p className="max-w-[86%] rounded-[1.25rem] rounded-br-md bg-ink px-4 py-2.5 text-white">
                    {message.text}
                  </p>
                  <p className="text-xs font-medium text-muted">{preview.teamLabel}</p>
                </div>
              ) : (
                <p
                  key={message.text}
                  className={`max-w-[86%] rounded-[1.25rem] px-4 py-2.5 ${
                    message.from === 'us'
                      ? 'self-end rounded-br-md bg-forest text-white'
                      : 'self-start rounded-bl-md bg-bg'
                  }`}
                >
                  {message.text}
                </p>
              ),
            )}
          </div>
        </div>
      </div>
    </figure>
  );
}

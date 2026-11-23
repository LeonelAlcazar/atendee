import * as React from 'react';
import type { ChatMessage } from '@/content/servicios';
import { TaskTicket } from './TaskTicket';

type ChatResult = {
  label: string;
  detail: string;
};

type ChatMockupProps = {
  messages: ChatMessage[];
  /** Optional line under the chat. There is no default. It takes the parent's
   * text color, so it stays readable on forest. */
  caption?: string;
  result?: ChatResult;
  className?: string;
};

// A WhatsApp-style conversation that ends with the finished task. The customer
// writes on the left, the business answers on the right.
export function ChatMockup({
  messages,
  caption,
  result,
  className = '',
}: ChatMockupProps) {
  return (
    <figure className={`max-w-sm ${className}`}>
      <div className="overflow-hidden rounded-3xl bg-surface text-ink shadow-card ring-1 ring-line">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span
            className="grid size-9 shrink-0 place-items-center rounded-full bg-forest text-xs font-semibold text-white"
            aria-hidden="true"
          >
            TN
          </span>
          <p className="flex flex-col leading-tight">
            <span className="text-[0.9375rem] font-semibold">Tu negocio</span>
            <span className="text-xs text-muted">en línea</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 bg-bg/60 px-3.5 py-4">
          {messages.map((m, i) => (
            <p
              key={i}
              className={`max-w-[84%] px-3.5 py-2 text-[0.9375rem] leading-snug ${
                m.from === 'us'
                  ? 'self-end rounded-2xl rounded-br-md bg-forest text-white'
                  : 'self-start rounded-2xl rounded-bl-md bg-surface text-ink shadow-[0_1px_1px_rgb(32_32_32/0.06)]'
              }`}
            >
              {m.text}
            </p>
          ))}
        </div>
        {result && (
          <div className="border-t border-line p-3">
            <TaskTicket
              label={result.label}
              detail={result.detail}
              className="shadow-none ring-0"
            />
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 px-1 text-[0.8125rem] leading-snug opacity-70">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

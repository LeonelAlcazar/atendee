import * as React from 'react';
import type { ChatMessage } from '@/content/servicios';
import { TaskTicket } from './TaskTicket';

type ChatResult = {
  label: string;
  detail: string;
};

type ChatMockupProps = {
  messages: ChatMessage[];
  caption?: string;
  result?: ChatResult;
  className?: string;
};

export function ChatMockup({
  messages,
  caption = 'Ejemplo ilustrativo de conversación de WhatsApp',
  result,
  className = '',
}: ChatMockupProps) {
  return (
    <figure
      className={`max-w-sm rounded-lg border-2 border-ink bg-surface p-4 shadow-[var(--shadow-brut)] md:p-5 ${className}`}
    >
      <figcaption className="mb-3 text-xs text-mute">{caption}</figcaption>
      <div className="mb-4 flex items-center gap-2 border-b-2 border-ink pb-3">
        <div className="grid size-8 place-items-center rounded border-2 border-ink bg-coral font-display text-sm font-bold">
          TN
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-xs uppercase">tu negocio</span>
          <span className="font-mono text-[10px] text-mute">en línea</span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === 'us' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] border-2 border-ink px-3 py-2 text-sm shadow-[var(--shadow-brut-sm)] ${
                m.from === 'us'
                  ? 'rounded-md rounded-br-none bg-forest text-bg'
                  : 'rounded-md rounded-bl-none bg-bg text-ink'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      {result && (
        <TaskTicket label={result.label} detail={result.detail} className="mt-4" />
      )}
    </figure>
  );
}

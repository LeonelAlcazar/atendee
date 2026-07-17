import * as React from 'react';
import type { ChatMessage } from '@/content/servicios';

type ChatMockupProps = {
  messages: ChatMessage[];
  className?: string;
};

export function ChatMockup({ messages, className = '' }: ChatMockupProps) {
  return (
    <figure
      className={`max-w-sm rounded-lg border-2 border-ink bg-surface p-4 shadow-[var(--shadow-brut)] md:p-5 ${className}`}
    >
      <figcaption className="sr-only">Ejemplo de conversación de WhatsApp</figcaption>
      <div className="flex items-center gap-2 pb-3 border-b-2 border-ink mb-4">
        <div className="grid size-8 place-items-center rounded border-2 border-ink bg-coral font-display text-sm font-bold">
          A
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-xs uppercase">atende</span>
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
              className={`max-w-[80%] border-2 border-ink shadow-[var(--shadow-brut-sm)] px-3 py-2 text-sm ${
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
    </figure>
  );
}

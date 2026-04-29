import * as React from 'react';
import type { ChatMessage } from '@/content/servicios';

type ChatMockupProps = {
  messages: ChatMessage[];
  className?: string;
};

export function ChatMockup({ messages, className = '' }: ChatMockupProps) {
  return (
    <div
      className={`bg-bg border-2 border-ink shadow-[var(--shadow-brut)] p-4 md:p-5 max-w-sm ${className}`}
      role="img"
      aria-label="Ejemplo de conversación de WhatsApp"
    >
      <div className="flex items-center gap-2 pb-3 border-b-2 border-ink mb-4">
        <div className="size-8 border-2 border-ink bg-forest" />
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
                m.from === 'us' ? 'bg-forest text-bg' : 'bg-bg text-ink'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

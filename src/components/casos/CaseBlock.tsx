import type { Caso } from '@/content/casos';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { Tag } from '@/components/ui/Tag';

export function CaseBlock({
  caso,
  reverse = false,
}: {
  caso: Caso;
  reverse?: boolean;
}) {
  return (
    <section className="border-b-2 border-ink py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          className={`grid gap-10 md:grid-cols-[1.3fr_1fr] items-start ${
            reverse ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div className="flex flex-col gap-5">
            <Tag filled>Caso</Tag>
            <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-[-0.025em] leading-[0.95]">
              {caso.industry}
            </h2>

            <div className="grid gap-4 md:grid-cols-2 mt-2">
              <div className="border-2 border-ink p-5 bg-bg">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
                  Problema
                </span>
                <p className="font-body text-base mt-2">{caso.problem}</p>
              </div>
              <div className="border-2 border-ink p-5 bg-forest text-bg shadow-[var(--shadow-brut-coral)]">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-bg/70">
                  Cómo lo resolvemos
                </span>
                <p className="font-body text-base mt-2">{caso.solution}</p>
              </div>
            </div>
          </div>

          <div className="md:justify-self-end">
            <ChatMockup messages={caso.conversation} />
          </div>
        </div>
      </div>
    </section>
  );
}

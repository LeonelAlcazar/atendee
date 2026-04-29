import type { Servicio } from '@/content/servicios';
import { Button } from '@/components/ui/Button';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { Tag } from '@/components/ui/Tag';
import { buildWaLink } from '@/lib/wa';

export function ServiceBlock({
  servicio,
  reverse = false,
}: {
  servicio: Servicio;
  reverse?: boolean;
}) {
  return (
    <section
      id={servicio.id}
      className="border-b-2 border-ink py-20 md:py-28 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          className={`grid gap-12 md:grid-cols-2 items-start ${
            reverse ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="font-display font-semibold text-7xl text-coral leading-none">
                {servicio.number}
              </span>
              <Tag>Servicio</Tag>
            </div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-[-0.025em] leading-[0.95]">
              {servicio.title}
            </h2>
            <p className="font-body text-lg text-mute max-w-xl">{servicio.description}</p>

            <div className="mt-2">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
                Qué te llevás
              </span>
              <ul className="mt-3 flex flex-col gap-2">
                {servicio.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 font-body text-base">
                    <span className="mt-2 size-2 bg-ink shrink-0" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <Button
                href={buildWaLink(servicio.ctaContext)}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir este servicio
              </Button>
            </div>
          </div>

          <div className="md:justify-self-end">
            <ChatMockup messages={servicio.conversation} />
          </div>
        </div>
      </div>
    </section>
  );
}

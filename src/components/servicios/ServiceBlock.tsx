import type { Servicio } from '@/content/servicios';
import { Button } from '@/components/ui/Button';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { Tag } from '@/components/ui/Tag';
import { buildWaLink } from '@/lib/wa';
import Link from 'next/link';

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
      className="scroll-mt-24 border-b-2 border-ink py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          className={`grid items-start gap-12 md:grid-cols-2 ${
            reverse ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="font-display text-7xl font-semibold leading-none text-coral">
                {servicio.number}
              </span>
              <Tag>{servicio.title}</Tag>
            </div>
            <h2 className="font-display text-4xl font-semibold leading-[0.95] tracking-[-0.025em] md:text-5xl">
              {servicio.headline}
            </h2>
            <p className="max-w-xl font-body text-lg leading-relaxed text-mute">
              {servicio.short}
            </p>

            <ul className="flex flex-col gap-2">
              {servicio.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 font-body text-base">
                  <span className="mt-2 size-2 shrink-0 bg-ink" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>

            <Link
              href={`/servicios/${servicio.slug}`}
              className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
            >
              Ver cómo funciona y qué necesita
              <span className="sr-only"> {servicio.title}</span>
              <span aria-hidden="true">&nbsp;→</span>
            </Link>
            <div>
              <Button
                href={buildWaLink(servicio.ctaContext)}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar por WhatsApp
              </Button>
            </div>
          </div>

          <div className="md:justify-self-end">
            <ChatMockup
              messages={servicio.conversation}
              caption={servicio.caption}
              result={servicio.result}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { Plus } from 'lucide-react';
import { faq } from '@/content/faq';
import { site } from '@/content/site';
import { buildWaLink } from '@/lib/wa';
import { Tag } from '@/components/ui/Tag';

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-b-2 border-ink bg-surface py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div className="flex flex-col items-start lg:sticky lg:top-28 lg:self-start">
          <Tag>Preguntas frecuentes</Tag>
          <h2 className="mt-5 max-w-lg font-display text-4xl font-semibold leading-[0.94] tracking-[-0.04em] text-balance md:text-6xl">
            Antes de conectar, <span className="text-coral">preguntá todo.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">
            Si tu pregunta no está acá, te responde una persona. También usamos WhatsApp para eso.
          </p>
          <a
            href={buildWaLink('Hola, tengo una pregunta sobre Atende')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] underline decoration-2 underline-offset-4 hover:text-coral"
          >
            Escribir al {site.whatsapp.display} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="flex flex-col gap-3">
          {faq.map((item, index) => (
            <details
              key={item.q}
              className="group rounded-lg border-2 border-ink bg-bg shadow-[var(--shadow-brut-xs)] open:bg-coral-soft/45"
            >
              <summary className="flex min-h-16 items-center justify-between gap-5 px-5 py-5 md:px-6">
                <span className="flex items-start gap-4">
                  <span className="mt-1 font-mono text-[9px] text-coral-strong">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg font-semibold leading-snug tracking-[-0.02em] md:text-xl">
                    {item.q}
                  </span>
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink bg-surface transition-colors group-open:bg-coral">
                  <Plus
                    size={18}
                    strokeWidth={2.2}
                    className="transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </span>
              </summary>
              <div className="border-t border-ink/20 px-5 py-5 pl-12 text-base leading-relaxed text-mute md:px-6 md:pl-16 md:text-lg">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

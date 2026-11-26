import Link from 'next/link';
import { Plus } from 'lucide-react';
import { faq, type FaqItem } from '@/content/faq';
import { landing } from '@/content/landing';
import { faqAnchors } from '@/lib/faq-anchors';
import { WaLink } from '@/components/links/WaLink';

// Shared with the secondary pages, so it pads itself above and below. One
// native <details> per item and no other <details> here: the site audit counts
// them against the FAQ schema.
export function Faq({ items = faq }: { items?: readonly FaqItem[] }) {
  const copy = landing.faq;
  const ids = faqAnchors(items.map((item) => item.q));

  return (
    <section id="faq" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <h2 className="text-center text-headline">{copy.title}</h2>

        <div className="mt-8 rounded-4xl bg-surface px-5 shadow-card sm:px-8 md:mt-12">
          {items.map((item, index) => (
            <details
              key={item.q}
              id={ids[index]}
              className="group scroll-mt-24 border-b border-line last:border-b-0"
            >
              <summary className="flex min-h-16 items-center justify-between gap-5 rounded-xl py-5">
                <span className="text-lg font-semibold leading-snug tracking-[-0.015em] md:text-xl">
                  {item.q}
                </span>
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-bg transition-colors duration-200 group-open:bg-ink group-open:text-white"
                  aria-hidden="true"
                >
                  <Plus
                    size={18}
                    strokeWidth={2}
                    className="transition-transform duration-300 ease-smooth group-open:rotate-45"
                  />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-muted md:text-lg">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-6 flex flex-col items-center justify-center gap-x-2 text-center text-muted sm:flex-row">
          {copy.whatsappLead}
          <WaLink
            context="Hola, tengo una pregunta sobre Atende"
            placement="preguntas"
            data-cta="faq-whatsapp"
            className="inline-flex min-h-11 items-center font-semibold text-coral-strong underline-offset-4 hover:underline"
          >
            {copy.whatsappLink}
          </WaLink>
          <span className="hidden sm:inline" aria-hidden="true">
            ·
          </span>
          <Link
            href="/preguntas-frecuentes"
            className="inline-flex min-h-11 items-center font-semibold text-ink underline-offset-4 hover:underline"
          >
            {copy.allLink}
          </Link>
        </p>
      </div>
    </section>
  );
}

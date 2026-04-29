import { faq } from '@/content/faq';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Plus } from 'lucide-react';

export function Faq() {
  return (
    <section id="faq" className="border-b-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Lo que más nos preguntan."
        />

        <ul className="mt-12 flex flex-col">
          {faq.map((f, i) => (
            <li key={i} className={i === 0 ? 'border-y-2 border-ink' : 'border-b-2 border-ink'}>
              <details className="group">
                <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer">
                  <span className="font-display font-semibold text-xl md:text-2xl tracking-[-0.02em]">
                    {f.q}
                  </span>
                  <Plus
                    size={24}
                    className="shrink-0 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <div className="pb-6 font-body text-base md:text-lg text-mute">
                  {f.a}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

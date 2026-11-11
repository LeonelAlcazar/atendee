import { Button } from '@/components/ui/Button';
import type { Rubro } from '@/content/rubros';
import { buildWaLink } from '@/lib/wa';
import { buildDemoLink } from '@/lib/leads';

export function RubroCta({ rubro }: { rubro: Rubro }) {
  return (
    <section className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl rounded-xl border-2 border-ink bg-coral px-6 py-12 shadow-[var(--shadow-brut-lg)] sm:px-10 md:py-16 lg:px-16">
        <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-balance md:text-6xl">
          {rubro.cta.title}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink">{rubro.cta.text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={buildDemoLink(rubro.slug)}
            data-cta={`rubro-${rubro.slug}-demo`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-2 border-ink bg-forest px-6 py-3.5 text-center font-display text-base font-semibold !text-bg shadow-[var(--shadow-brut-sm)] transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-brut-lg)]"
          >
            {rubro.cta.demoLabel} <span aria-hidden="true">→</span>
          </a>
          <Button
            href={buildWaLink(rubro.cta.context)}
            data-cta={`rubro-${rubro.slug}-whatsapp`}
            variant="outline"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}

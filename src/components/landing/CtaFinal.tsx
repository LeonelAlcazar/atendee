import { Button } from '@/components/ui/Button';
import { landing } from '@/content/landing';
import { site } from '@/content/site';
import { buildWaLink } from '@/lib/wa';

type Props = {
  context: string;
  reassurance?: string;
};

export function CtaFinal({
  context,
  reassurance = landing.finalCta.reassurance,
}: Props) {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-xl border-2 border-ink bg-coral px-6 py-14 shadow-[var(--shadow-brut-lg)] sm:px-10 md:py-20 lg:px-16">
        <div className="absolute -right-16 -top-20 size-64 rounded-full border-[28px] border-ink/10 md:size-80" aria-hidden="true" />
        <div className="absolute bottom-8 right-8 hidden grid-cols-5 gap-2 md:grid" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, index) => (
            <span key={index} className={`size-2 ${index % 3 === 0 ? 'bg-forest' : 'bg-ink/20'}`} />
          ))}
        </div>

        <div className="relative max-w-4xl">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink">
            {landing.finalCta.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.05em] text-balance md:text-7xl lg:text-[5.5rem]">
            {landing.finalCta.titleBefore}{' '}
            <span className="text-surface">{landing.finalCta.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink md:text-xl">
            {landing.finalCta.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={site.appUrl}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-2 border-ink bg-forest px-6 py-3.5 font-display text-base font-semibold !text-bg shadow-[var(--shadow-brut-sm)] transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-brut-lg)]"
            >
              {landing.finalCta.primaryCta} <span aria-hidden="true">→</span>
            </a>
            <Button
              href={buildWaLink(context)}
              variant="outline"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {landing.finalCta.secondaryCta}
            </Button>
          </div>
          <p className="mt-5 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-ink">
            {reassurance}
          </p>
        </div>
      </div>
    </section>
  );
}

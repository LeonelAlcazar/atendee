import { Button } from '@/components/ui/Button';
import { landing } from '@/content/landing';
import { buildWaLink } from '@/lib/wa';
import { buildDemoLink } from '@/lib/leads';

type Props = {
  context: string;
  reassurance?: string;
  demoSource?: string;
};

export function CtaFinal({
  context,
  reassurance = landing.finalCta.reassurance,
  demoSource,
}: Props) {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-xl border-2 border-ink bg-coral px-6 py-14 shadow-[var(--shadow-brut-lg)] sm:px-10 md:py-20 lg:px-16">
        <div className="relative max-w-4xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink">
            {landing.finalCta.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-[2.75rem] font-semibold leading-[0.96] tracking-[-0.045em] text-balance sm:text-6xl md:text-7xl lg:text-[5rem]">
            {landing.finalCta.titleBefore}{' '}
            <span className="text-surface sm:block">{landing.finalCta.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink md:text-xl">
            {landing.finalCta.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={buildDemoLink(demoSource)}
              data-cta="final-demo"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-2 border-ink bg-forest px-6 py-3.5 font-display text-base font-semibold !text-bg shadow-[var(--shadow-brut-sm)] transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-brut-lg)]"
            >
              {landing.finalCta.primaryCta} <span aria-hidden="true">→</span>
            </a>
            <Button
              href={buildWaLink(context)}
              data-cta="final-whatsapp"
              variant="outline"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {landing.finalCta.secondaryCta}
            </Button>
          </div>
          <p className="mt-5 text-sm font-medium text-ink">{reassurance}</p>
        </div>
      </div>
    </section>
  );
}

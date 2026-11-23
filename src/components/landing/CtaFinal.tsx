import { Button } from '@/components/ui/Button';
import { landing } from '@/content/landing';
import { buildWaLink } from '@/lib/wa';
import { buildDemoLink } from '@/lib/leads';

type Props = {
  context: string;
  reassurance?: string;
  demoSource?: string;
};

// The closing band of every page. It renders exactly one demo link and one
// WhatsApp link: the site audit counts the demo links of each page.
export function CtaFinal({
  context,
  reassurance = landing.finalCta.reassurance,
  demoSource,
}: Props) {
  const copy = landing.finalCta;

  return (
    <section className="p-3 md:p-6">
      <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-4xl bg-forest px-6 py-20 text-center text-white md:py-28 lg:py-32">
        <div
          className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgb(255_255_255/0.1),transparent_65%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(45%_100%_at_50%_100%,rgb(230_72_44/0.28),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-4xl text-balance text-headline">{copy.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lead text-white/75">
            {copy.description}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={buildDemoLink(demoSource)}
              data-cta="final-demo"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {copy.primaryCta}
            </Button>
            <Button
              href={buildWaLink(context)}
              data-cta="final-whatsapp"
              variant="glass"
              size="lg"
              className="w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.secondaryCta}
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/70">{reassurance}</p>
        </div>
      </div>
    </section>
  );
}

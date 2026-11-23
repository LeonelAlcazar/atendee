import { Button } from '@/components/ui/Button';
import { landing } from '@/content/landing';
import { site } from '@/content/site';
import { HeroScene } from './HeroScene';

export function Hero() {
  const { hero } = landing;

  return (
    <section>
      <div className="mx-auto max-w-7xl px-5 pt-10 text-center md:px-8 md:pt-14">
        {/* The H1 is the LCP: it paints at once, with no entrance. */}
        <h1 className="text-balance text-display">
          <span className="block">{hero.titleLead}</span>{' '}
          <span className="block text-faint">{hero.titleRest}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-balance text-lead text-muted md:mt-6">
          {hero.description}
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-8">
          <Button
            href="/demo"
            data-cta="hero-demo"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {hero.primaryCta}
          </Button>
          <Button
            href={site.appUrl}
            data-cta="hero-signup"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            {hero.secondaryCta}
          </Button>
        </div>
      </div>
      <HeroScene />
    </section>
  );
}

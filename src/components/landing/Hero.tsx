import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ProductPreview } from '@/components/ui/ProductPreview';
import { Tag } from '@/components/ui/Tag';
import { landing } from '@/content/landing';
import { site } from '@/content/site';

export function Hero() {
  const { hero } = landing;

  return (
    <section className="border-b-2 border-ink">
      <div className="grid grid-cols-[minmax(0,1fr)] lg:min-h-[calc(100svh-7.875rem)] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <div className="relative flex flex-col justify-center px-5 py-12 md:px-8 md:py-16 lg:py-12 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12">
          <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative flex flex-col items-start gap-6">
            <Tag filled>{hero.eyebrow}</Tag>

            <h1 className="font-display text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[clamp(3rem,4.5vw,4rem)] lg:leading-[0.98]">
              <span className="lg:block">{hero.titleBefore}</span>{' '}
              <span className="text-coral lg:block lg:text-balance">
                {hero.titleAccent}
              </span>{' '}
              <span className="lg:block">{hero.titleAfter}</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-mute xl:text-xl">
              {hero.description}
            </p>

            <div className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row">
              <Button
                href="/demo"
                data-cta="hero-demo"
                variant="primary"
                size="lg"
                className="group"
              >
                {hero.primaryCta}
                <span
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Button>
              <Button
                href={site.appUrl}
                data-cta="hero-signup"
                variant="outline"
                size="lg"
              >
                {hero.secondaryCta}
              </Button>
            </div>

            <p className="text-sm leading-snug text-mute">
              {hero.reassurance}{' '}
              <Link
                href="/que-es-atende"
                className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4 hover:text-coral-strong"
              >
                {hero.aboutLink}
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-center border-t-2 border-ink bg-forest px-5 py-12 md:px-8 md:py-16 lg:border-l-2 lg:border-t-0 lg:py-10 lg:pl-10 lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))] xl:pl-14">
          <ProductPreview />
        </div>
      </div>

      <div className="border-t-2 border-ink bg-ink text-bg">
        <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-2 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.06em] sm:grid-cols-2 md:px-8 lg:flex lg:justify-between">
          {site.trustStrip.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="size-1.5 shrink-0 bg-coral" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

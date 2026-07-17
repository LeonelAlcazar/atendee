import { Button } from '@/components/ui/Button';
import { ProductPreview } from '@/components/ui/ProductPreview';
import { Tag } from '@/components/ui/Tag';
import { landing } from '@/content/landing';
import { site } from '@/content/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink">
      <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-28 top-20 hidden size-[28rem] rounded-full border-[28px] border-coral opacity-[0.14] md:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-14 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div className="hero-copy flex flex-col items-start gap-6">
          <Tag filled>{landing.hero.eyebrow}</Tag>

          <h1 className="max-w-3xl font-display text-[3.6rem] font-semibold leading-[0.88] tracking-[-0.055em] sm:text-7xl lg:text-[5.65rem]">
            <span className="block">{landing.hero.titleBefore}</span>
            <span className="block text-coral">{landing.hero.titleAccent}</span>
            <span className="mt-1 block">{landing.hero.titleAfter}</span>
          </h1>

          <p className="max-w-xl font-body text-lg leading-relaxed text-mute md:text-xl">
            {landing.hero.description}
          </p>

          <div className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row">
            <Button
              href={site.appUrl}
              variant="primary"
              size="lg"
              className="group"
            >
              {landing.hero.primaryCta}
              <span
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Button>
            <Button href="#como-funciona" variant="outline" size="lg">
              {landing.hero.secondaryCta}
            </Button>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-mute">
            {landing.hero.reassurance}
          </p>

          <ul className="grid gap-x-5 gap-y-2 border-t border-ink/20 pt-5 font-mono text-[10px] uppercase tracking-[0.08em] text-mute sm:grid-cols-2">
            {site.trustStrip.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 bg-coral" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-preview relative mx-auto w-full max-w-2xl lg:mx-0 lg:justify-self-end">
          <div
            className="absolute -left-4 -top-4 size-16 bg-sun md:-left-7 md:-top-7 md:size-24"
            aria-hidden="true"
          />
          <ProductPreview />
          <div className="absolute -bottom-5 -left-2 border-2 border-ink bg-mint px-4 py-3 shadow-[var(--shadow-brut-sm)] sm:-left-5 md:px-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-mint-strong">
              Tu equipo decide
            </p>
            <p className="mt-1 font-display text-sm font-semibold md:text-base">
              Automático o humano, en un clic.
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t-2 border-ink bg-ink text-bg">
        <ol className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {landing.facts.map((fact) => (
            <li
              key={fact.number}
              className="grid grid-cols-[auto_1fr] gap-4 border-b border-bg/20 px-5 py-6 last:border-b-0 sm:border-r sm:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2)]:border-r lg:last:border-r-0 md:px-7"
            >
              <span className="font-mono text-xs text-coral">{fact.number}</span>
              <div>
                <h2 className="font-display text-lg font-semibold">{fact.title}</h2>
                <p className="mt-1 text-sm leading-snug text-bg/65">{fact.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

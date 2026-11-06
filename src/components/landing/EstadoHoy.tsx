import Link from 'next/link';
import { Tag } from '@/components/ui/Tag';
import { StatusTable } from '@/components/ui/StatusTable';
import { landing } from '@/content/landing';

export function EstadoHoy() {
  const { status } = landing;

  return (
    <section id="que-funciona-hoy" className="scroll-mt-20 border-b-2 border-ink bg-forest py-20 text-bg md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="flex flex-col items-start lg:sticky lg:top-28 lg:self-start">
          <Tag inverse>{status.eyebrow}</Tag>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-balance md:text-[3.25rem]">
            {status.title}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-bg/80">
            {status.description}
          </p>
          <Link
            href="/integraciones"
            className="mt-3 inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-coral-soft"
          >
            {status.link} <span className="ml-1.5" aria-hidden="true">→</span>
          </Link>

          <div className="mt-8 w-full max-w-lg border-l-4 border-coral pl-4">
            <p className="font-display text-lg font-semibold tracking-[-0.015em]">
              {status.demoLabel}
            </p>
            <p className="mt-1.5 leading-relaxed text-bg/80">{status.demoText}</p>
          </div>
        </div>

        <StatusTable className="text-ink" />
      </div>
    </section>
  );
}

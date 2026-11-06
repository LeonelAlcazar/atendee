import Link from 'next/link';
import { Tag } from '@/components/ui/Tag';
import { landing } from '@/content/landing';

export function Limites() {
  const { limits } = landing;

  return (
    <section id="limites" className="scroll-mt-20 border-b-2 border-ink bg-ink py-20 text-bg md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start gap-4">
          <Tag inverse>{limits.eyebrow}</Tag>
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
            {limits.titleBefore}{' '}
            <span className="text-coral">{limits.titleAccent}</span>
          </h2>
        </div>

        <ul className="mt-8 border-b border-bg/25 md:mt-10">
          {limits.items.map((item) => (
            <li
              key={item.title}
              className="grid gap-3 border-t border-bg/25 py-7 md:py-9 lg:grid-cols-[1.45fr_0.55fr] lg:items-end lg:gap-14"
            >
              <h3 className="font-display text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-balance md:text-5xl lg:text-[3.5rem]">
                {item.title}
              </h3>
              <p className="max-w-md leading-relaxed text-bg/75">{item.text}</p>
            </li>
          ))}
        </ul>

        <Link
          href="/preguntas-frecuentes"
          className="mt-6 inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-coral"
        >
          {limits.link} <span className="ml-1.5" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

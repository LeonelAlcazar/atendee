import Link from 'next/link';
import type { Rubro } from '@/content/rubros';

export function RubroCard({ rubro }: { rubro: Rubro }) {
  const { hub } = rubro;
  return (
    <article
      className={`flex flex-col rounded-lg border-2 border-ink p-6 shadow-[var(--shadow-brut)] ${hub.tone}`}
    >
      <span className="w-fit rounded-full border border-ink bg-surface/75 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em]">
        {hub.tag}
      </span>
      <h2 className="mt-6 font-display text-3xl font-semibold leading-[1] tracking-[-0.035em] text-balance">
        {rubro.name}
      </h2>
      <p className="mt-4 font-display text-lg font-semibold leading-snug">{hub.task}</p>
      <p className="mt-2 leading-relaxed text-ink/80">{hub.scene}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink/80">
        <span className="font-semibold text-ink">Se conecta a:</span> {hub.needs}.
      </p>
      <Link
        href={`/casos-de-uso/${rubro.slug}`}
        className="mt-auto inline-flex min-h-11 items-center pt-4 font-semibold underline underline-offset-4 hover:text-coral-strong"
      >
        Ver {rubro.name.toLowerCase()} <span className="ml-1" aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

import Link from 'next/link';
import { casos } from '@/content/casos';
import { landing } from '@/content/landing';
import { SectionHeader } from '@/components/ui/SectionHeader';

const caseMeta = [
  { task: 'Turnos', tone: 'bg-sky' },
  { task: 'Agenda', tone: 'bg-coral-soft' },
  { task: 'Consultas', tone: 'bg-mint' },
  { task: 'Pedidos', tone: 'bg-sun/65' },
] as const;

export function CasosTeaser() {
  return (
    <section id="casos" className="scroll-mt-20 border-b-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow={landing.cases.eyebrow}
          title={
            <>
              {landing.cases.titleBefore}{' '}
              <span className="text-coral">{landing.cases.titleAccent}</span>
            </>
          }
          sub={landing.cases.description}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {casos.map((caso, index) => {
            const meta = caseMeta[index];
            const wide = index === 0 || index === 3;

            return (
              <Link
                key={caso.id}
                href={`/casos-de-uso#${caso.id}`}
                className={`group flex min-h-72 flex-col rounded-lg border-2 border-ink p-6 shadow-[var(--shadow-brut)] transition-[transform,box-shadow] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[var(--shadow-brut-lg)] ${
                  wide ? 'lg:col-span-4' : 'lg:col-span-2'
                } ${meta.tone}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-ink bg-surface/75 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.08em]">
                    {meta.task}
                  </span>
                  <span className="font-mono text-xs transition-transform group-hover:translate-x-1" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <h3 className={`mt-8 font-display font-semibold leading-[0.98] tracking-[-0.035em] ${wide ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                  {caso.industry}
                </h3>
                <div className="mt-auto pt-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-mute">
                    Atende puede
                  </p>
                  <p className={`mt-2 leading-relaxed text-ink/75 ${wide ? 'max-w-2xl text-base' : 'text-sm'}`}>
                    {caso.solution}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/casos-de-uso"
          className="mt-9 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] underline decoration-2 underline-offset-4 hover:text-coral focus-visible:rounded-sm"
        >
          Ver todos los ejemplos <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

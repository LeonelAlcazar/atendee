import type { ReactNode } from 'react';

type Step = { title: string; text: ReactNode };

const grids = {
  3: 'md:grid-cols-3',
  5: 'md:grid-cols-2 xl:grid-cols-5',
} as const;

export function StepCards({
  steps,
  columns = 3,
  className = '',
}: {
  steps: Step[];
  columns?: keyof typeof grids;
  className?: string;
}) {
  return (
    <ol className={`grid gap-5 ${grids[columns]} ${className}`}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="rounded-lg border-2 border-ink bg-mint p-6 shadow-[var(--shadow-brut-sm)]"
        >
          <span className="font-mono text-sm">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">
            {step.title}
          </h3>
          <p className="mt-3 leading-relaxed">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

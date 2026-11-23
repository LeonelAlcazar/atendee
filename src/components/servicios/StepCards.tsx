import type { ReactNode } from 'react';

type Step = { title: string; text: ReactNode };

// In five narrow columns most titles take two lines: every title keeps room
// for two, so the descriptions start on the same line.
const grids = {
  3: 'md:grid-cols-3',
  5: 'md:grid-cols-2 xl:grid-cols-5 xl:gap-x-8 xl:[&_h3]:min-h-[2lh]',
} as const;

// Numbered steps in the style of the home's "Empezás con el número": a
// hairline, a big quiet number, the title and a line or two. /precios renders
// it too, so the props stay as they are.
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
    <ol className={`grid gap-x-10 md:gap-y-12 ${grids[columns]} ${className}`}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-2 border-t border-line-strong py-6 md:block md:py-0 md:pt-7"
        >
          <span
            className="text-4xl font-semibold leading-none tracking-[-0.04em] text-faint md:text-6xl"
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <div>
            <h3 className="text-balance text-title md:mt-6">{step.title}</h3>
            <p className="mt-2 max-w-sm leading-relaxed text-muted">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

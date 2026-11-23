import { landing } from '@/content/landing';

// How it starts: three steps, no clock. The FAQ that follows brings its own
// top padding.
export function Start() {
  const { start } = landing;

  return (
    <section id="como-empezar" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="text-balance text-headline">
          <span className="block">{start.titleLead}</span>{' '}
          <span className="block text-faint">{start.titleRest}</span>
        </h2>

        <ol className="mt-8 grid gap-x-10 md:mt-14 md:grid-cols-3">
          {start.steps.map((step, index) => (
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
                <h3 className="text-title md:mt-6">{step.title}</h3>
                <p className="mt-2 max-w-sm leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

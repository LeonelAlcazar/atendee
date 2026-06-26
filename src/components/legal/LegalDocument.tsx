import type { ReactNode } from 'react';

type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
  points?: ReactNode[];
};

type LegalReference = {
  label: string;
  href: string;
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  references: LegalReference[];
};

export function LegalDocument({
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
  references,
}: LegalDocumentProps) {
  return (
    <>
      <section className="border-b-2 border-ink py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-4xl">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
              {eyebrow}
            </span>
            <h1 className="mt-5 font-display font-semibold text-5xl md:text-7xl tracking-[-0.02em] leading-[0.95]">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl font-body text-lg md:text-xl text-mute">
              {description}
            </p>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.08em] text-mute">
              Última actualización: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="border-2 border-ink bg-bg shadow-[var(--shadow-brut)]">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="border-b-2 border-ink p-6 last:border-b-0 md:p-10 scroll-mt-28"
              >
                <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.01em] leading-tight">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-base md:text-lg leading-7 text-mute">
                  {section.body}
                  {section.points && (
                    <ul className="space-y-3">
                      {section.points.map((point, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="mt-3 h-2 w-2 shrink-0 bg-coral" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </article>

          <aside className="h-fit border-2 border-ink bg-bg p-6 shadow-[var(--shadow-brut)] lg:sticky lg:top-28">
            <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
              En esta página
            </h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm">
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className="hover:text-coral">
                  {section.title}
                </a>
              ))}
            </nav>

            <div className="mt-8 border-t-2 border-ink pt-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
                Normativa de referencia
              </h2>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                {references.map((reference) => (
                  <a
                    key={reference.href}
                    href={reference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-coral"
                  >
                    {reference.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

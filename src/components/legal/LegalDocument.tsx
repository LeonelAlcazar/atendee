import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

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

// Keeps a trailing icon on the line of the label's last word, so a wrapped
// label never leaves the icon alone. The text itself is unchanged.
function WithTrailingIcon({ text, children }: { text: string; children: ReactNode }) {
  const cut = text.lastIndexOf(' ') + 1;
  return (
    <>
      {text.slice(0, cut)}
      <span className="whitespace-nowrap">
        {text.slice(cut)}
        {children}
      </span>
    </>
  );
}

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  references: LegalReference[];
};

// Long-form reading: the text sits on one white sheet at a comfortable measure.
// The index stays in view on large screens and comes first on phones; the
// references close the document.
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
      <section className="pb-10 pt-10 md:pb-16 md:pt-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-sm font-semibold text-coral-strong">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-balance text-headline">{title}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-lead text-muted">
            {description}
          </p>
          <p className="mt-6 text-sm text-muted">Última actualización: {lastUpdated}</p>
        </div>
      </section>

      <div className="pb-24 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-8 px-5 md:px-8 lg:grid-cols-[15rem_minmax(0,48rem)] xl:gap-x-16">
          <aside className="lg:sticky lg:top-24 lg:row-span-2 lg:self-start">
            <nav aria-labelledby="en-esta-pagina">
              <h2 id="en-esta-pagina" className="text-sm font-semibold">
                En esta página
              </h2>
              <ul className="mt-2 flex flex-col border-t border-line lg:border-t-0">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex min-h-11 items-center border-b border-line py-2 text-[0.9375rem] leading-snug text-muted transition-colors duration-200 hover:text-ink lg:border-b-0 lg:py-1.5"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="rounded-4xl bg-surface px-6 py-9 shadow-card sm:px-10 sm:py-12 md:px-14 md:py-14">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="mt-12 scroll-mt-24 first:mt-0 md:mt-14"
              >
                <h2 className="text-balance text-title">{section.title}</h2>
                <div className="mt-4 space-y-4 leading-relaxed text-ink/80 md:text-lg">
                  {section.body}
                  {section.points && (
                    <ul className="space-y-3">
                      {section.points.map((point, index) => (
                        <li key={index} className="flex gap-3.5">
                          <span
                            className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-ink/40"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </article>

          {/* Lined up with the text of the sheet above. */}
          <div className="px-6 sm:px-10 md:px-14 md:pt-2 lg:col-start-2">
            <h2 className="text-sm font-semibold">Normativa de referencia</h2>
            <ul className="mt-2 flex flex-col">
              {references.map((reference) => (
                <li key={reference.href}>
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center py-1 text-[0.9375rem] font-medium leading-snug underline-offset-4 hover:underline"
                  >
                    <span>
                      <WithTrailingIcon text={reference.label}>
                        <ArrowUpRight
                          size={15}
                          className="ml-1 inline-block align-[-0.15em] text-muted"
                          aria-hidden="true"
                        />
                      </WithTrailingIcon>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

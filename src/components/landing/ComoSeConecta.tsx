import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { landing } from '@/content/landing';

export function ComoSeConecta() {
  const { connect } = landing;

  return (
    <section id="como-funciona" className="scroll-mt-20 border-b-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader eyebrow={connect.eyebrow} title={connect.title} />

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div>
            <p className="border-b-2 border-ink pb-2.5 font-mono text-xs uppercase tracking-[0.08em]">
              {connect.selfLabel}
            </p>
            <ol>
              {connect.steps.map((step) => (
                <li
                  key={step.number}
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 border-b border-ink/30 py-5 sm:grid-cols-[3.5rem_minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-x-5"
                >
                  <span className="font-mono text-sm text-coral-strong sm:pt-1">
                    {step.number}
                  </span>
                  <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.025em]">
                    {step.title}
                  </h3>
                  <p className="col-start-2 mt-1.5 leading-snug text-mute sm:col-start-3 sm:mt-0">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-2xl leading-relaxed">{connect.note}</p>
          </div>

          <div className="flex flex-col self-start rounded-lg border-2 border-ink bg-sun shadow-[var(--shadow-brut)]">
            <div className="border-b-2 border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.08em]">
              {connect.requestLabel}
            </div>
            <div className="p-5 sm:p-7">
              <h3 className="font-display text-3xl font-semibold leading-[1.02] tracking-[-0.035em]">
                {connect.requestTitle}
              </h3>
              <p className="mt-4 leading-relaxed">{connect.requestText}</p>

              <ol className="mt-6">
                {connect.nodes.map((node, index) => (
                  <li key={node.name}>
                    {node.link && (
                      <span
                        className={`ml-6 flex h-8 items-center border-l-2 pl-3 font-mono text-[11px] uppercase tracking-[0.08em] ${
                          index === 2 ? 'border-dashed' : ''
                        }`}
                      >
                        {node.link}
                      </span>
                    )}
                    <div
                      className={`rounded-md border-2 border-ink px-3 py-2.5 ${
                        index === 1 ? 'bg-forest text-bg' : 'bg-surface'
                      }`}
                    >
                      <p className="font-display font-semibold leading-tight">
                        {node.name}
                      </p>
                      <p
                        className={`mt-0.5 text-sm leading-snug ${
                          index === 1 ? 'text-bg/80' : 'text-mute'
                        }`}
                      >
                        {node.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Button href="/demo" data-cta="connect-demo" variant="primary" size="md">
                  {connect.requestCta} <span aria-hidden="true">→</span>
                </Button>
                <Link
                  href="/integraciones"
                  className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
                >
                  {connect.integrationsLink}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

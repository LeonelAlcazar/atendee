import { Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import type { Rubro } from '@/content/rubros';
import { buildWaLink, waRef } from '@/lib/wa';
import { buildDemoLink } from '@/lib/leads';

// The rubro page's closing band, built like CtaFinal: what to try in the demo
// and the two ways to ask for it. It carries the page's second demo link, which
// the site audit counts.
export function RubroCta({ rubro }: { rubro: Rubro }) {
  return (
    <section id="prueba" className="scroll-mt-20 p-3 md:p-6">
      <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-4xl bg-forest px-6 py-16 text-white sm:px-10 md:py-24 lg:px-16 lg:py-28">
        <div
          className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgb(255_255_255/0.1),transparent_65%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(45%_100%_at_30%_100%,rgb(230_72_44/0.28),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-x-16 lg:gap-y-12">
          <div>
            <p className="text-sm font-semibold text-white/70">Qué probar en la demo</p>
            <h2 className="mt-4 max-w-2xl text-balance text-headline">{rubro.cta.title}</h2>
            <p className="mt-5 max-w-xl text-pretty text-lead text-white/75">{rubro.cta.text}</p>
          </div>

          <div className="rounded-3xl bg-white/[0.07] p-6 ring-1 ring-inset ring-white/15 sm:p-8">
            <h3 className="text-balance text-title">Qué revisar en el sistema conectado</h3>
            <ul className="mt-5 space-y-4">
              {rubro.cta.checks.map((check) => (
                <li key={check} className="flex items-start gap-3 leading-relaxed text-white/80">
                  <span
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/15 text-white"
                    aria-hidden="true"
                  >
                    <Check size={14} strokeWidth={2.75} />
                  </span>
                  <span className="min-w-0">{check}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:col-span-2">
            <Button
              href={buildDemoLink(rubro.slug)}
              data-cta={`rubro-${rubro.slug}-demo`}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {rubro.cta.demoLabel}
            </Button>
            <Button
              href={buildWaLink(rubro.cta.context, waRef(`/casos-de-uso/${rubro.slug}`, 'prueba'))}
              data-cta={`rubro-${rubro.slug}-whatsapp`}
              variant="glass"
              size="lg"
              className="w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por este caso en WhatsApp
            </Button>
            <Link
              href="/precios"
              className="inline-flex min-h-11 items-center self-start px-1 text-[0.9375rem] font-semibold text-white/80 underline decoration-white/40 decoration-1 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white sm:self-center sm:px-3"
            >
              Ver precios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

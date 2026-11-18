import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import type { Rubro } from '@/content/rubros';
import { buildWaLink } from '@/lib/wa';
import { buildDemoLink } from '@/lib/leads';

export function RubroCta({ rubro }: { rubro: Rubro }) {
  return (
    <section id="prueba" className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-xl border-2 border-ink bg-mint/50 p-6 shadow-[var(--shadow-brut-lg)] sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-wide">Qué probar en la demo</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-balance md:text-5xl">
            {rubro.cta.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink">{rubro.cta.text}</p>
        </div>
        <div className="rounded-md border-2 border-ink bg-surface p-5 md:p-6">
          <h3 className="font-display text-xl font-semibold">Qué revisar en el sistema conectado</h3>
          <ul className="mt-3 list-disc space-y-3 ps-5 leading-relaxed">
            {rubro.cta.checks.map((check) => <li key={check}>{check}</li>)}
          </ul>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 lg:col-span-2">
          <Button
            href={buildWaLink(rubro.cta.context)}
            data-cta={`rubro-${rubro.slug}-whatsapp`}
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por este caso en WhatsApp
          </Button>
          <Link href={buildDemoLink(rubro.slug)} data-cta={`rubro-${rubro.slug}-demo`} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
            {rubro.cta.demoLabel} →
          </Link>
          <Link href="/precios" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
            Ver precios
          </Link>
        </div>
      </div>
    </section>
  );
}

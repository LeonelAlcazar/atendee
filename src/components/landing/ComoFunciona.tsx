import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { landing } from '@/content/landing';
import { site } from '@/content/site';

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="scroll-mt-20 border-b-2 border-ink bg-coral-soft/35 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeader
            eyebrow="Cómo funciona"
            title={
              <>
                De cero a tu WhatsApp <span className="text-coral">bien atendido.</span>
              </>
            }
            sub="No hace falta saber de automatizaciones. La app te lleva por un camino claro y siempre podés pedir ayuda."
          />
          <Button href={site.appUrl} variant="outline" size="md" className="w-fit">
            Abrir Atende <span aria-hidden="true">↗</span>
          </Button>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t-2 border-dashed border-ink/25 md:block" aria-hidden="true" />
          {landing.steps.map((step) => (
            <li key={step.number} className="relative">
              <span className="relative z-10 grid size-14 place-items-center rounded-full border-2 border-ink bg-surface font-mono text-xs text-coral-strong shadow-[var(--shadow-brut-sm)]">
                {step.number}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.025em]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs leading-relaxed text-mute">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

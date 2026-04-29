import { Button } from '@/components/ui/Button';
import { buildWaLink } from '@/lib/wa';

type Props = {
  context: string;
  reassurance?: string;
};

export function CtaFinal({
  context,
  reassurance = 'Te respondemos en minutos, en horario comercial.',
}: Props) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8 text-center flex flex-col items-center gap-8">
        <h2 className="font-display font-semibold tracking-[-0.025em] text-6xl md:text-8xl leading-[0.9]">
          Empezá <span className="text-coral">hoy</span>.
        </h2>
        <p className="font-body text-lg md:text-xl text-mute max-w-xl">
          Charlamos por WhatsApp, vemos qué necesitás y te pasamos un presupuesto a medida en el día.
        </p>
        <Button
          href={buildWaLink(context)}
          variant="primary"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hablar por WhatsApp
        </Button>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
          {reassurance}
        </p>
      </div>
    </section>
  );
}

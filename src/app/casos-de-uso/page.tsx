import type { Metadata } from 'next';
import { casos } from '@/content/casos';
import { CaseBlock } from '@/components/casos/CaseBlock';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { buildWaLink } from '@/lib/wa';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Casos de uso',
  description:
    'Ejemplos de cómo atende puede automatizar WhatsApp en clínicas, peluquerías, inmobiliarias y comercios.',
  path: '/casos-de-uso',
});

export default function CasosDeUsoPage() {
  return (
    <>
      <section className="border-b-2 border-ink py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Casos de uso"
            level="h1"
            title={
              <>
                Distintos rubros, <span className="text-coral">la misma idea</span>:
                que tu WhatsApp trabaje sin vos.
              </>
            }
            sub="Cuatro ejemplos de cómo se ve atende en negocios reales. Si tu rubro no está, lo armamos a medida."
          />
        </div>
      </section>

      {casos.map((c, i) => (
        <CaseBlock key={c.id} caso={c} reverse={i % 2 === 1} />
      ))}

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-[-0.025em] leading-[0.95]">
            ¿No ves tu rubro? <span className="text-coral">Lo armamos a medida.</span>
          </h2>
          <Button
            href={buildWaLink('Hola, mi rubro no está en los casos pero quiero saber si me sirve')}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </Button>
        </div>
      </section>
    </>
  );
}

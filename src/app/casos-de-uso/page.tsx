import Link from 'next/link';
import type { Metadata } from 'next';
import { casos } from '@/content/casos';
import { CaseBlock } from '@/components/casos/CaseBlock';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { buildWaLink } from '@/lib/wa';
import { createPageMetadata } from '@/lib/metadata';
import { pages } from '@/content/pages';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/jsonld';
import { pageGraph } from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata(pages.cases);
const breadcrumbs = [{ name: 'Inicio', path: '/' }, { name: 'Casos de uso', path: '/casos-de-uso' }];

export default function CasosDeUsoPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="border-b-2 border-ink py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Casos de uso"
            level="h1"
            title={
              <>
                WhatsApp con IA <span className="text-coral">para distintos rubros.</span>
              </>
            }
            sub="Ejemplos ilustrativos de atención con Atende, no testimonios de clientes. Las respuestas dependen de la información configurada; las reservas y consultas a otros sistemas requieren una integración acordada."
          />
        </div>
      </section>

      {casos.map((c, i) => (
        <CaseBlock key={c.id} caso={c} reverse={i % 2 === 1} />
      ))}

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-[-0.025em] leading-[0.95]">
            ¿No ves tu rubro? <span className="text-coral">Evaluemos tu caso.</span>
          </h2>
          <Link href="/blog" className="py-2 font-semibold underline underline-offset-4">Explorá las guías de WhatsApp para más rubros →</Link>
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
      <JsonLd value={pageGraph({ ...pages.cases, breadcrumbs })} />
    </>
  );
}

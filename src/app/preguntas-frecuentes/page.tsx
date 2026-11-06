import Link from 'next/link';
import { Plus } from 'lucide-react';
import { faqGroups, faqPageItems } from '@/content/faq-page';
import { pages } from '@/content/pages';
import { createPageMetadata } from '@/lib/metadata';
import { pageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CtaFinal } from '@/components/landing/CtaFinal';

export const metadata = createPageMetadata(pages.faq);
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Preguntas frecuentes', path: '/preguntas-frecuentes' },
];

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="border-b-2 border-ink py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            level="h1"
            eyebrow="Preguntas frecuentes"
            title={
              <>
                Lo que preguntan antes de que Atende{' '}
                <span className="text-coral">reserve su primer turno.</span>
              </>
            }
            sub="Conectado a tu sistema, Atende reserva turnos y registra pedidos por WhatsApp. Acá están las respuestas operativas: qué pasa con tu número, qué mensajes entiende, cómo frenás al asistente y qué no hace."
          />
          <nav aria-label="Temas" className="mt-8">
            <ul className="flex flex-wrap gap-2.5">
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="inline-flex min-h-11 items-center rounded-md border-2 border-ink bg-surface px-3.5 font-display text-sm font-semibold shadow-[var(--shadow-brut-xs)] hover:bg-coral-soft"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {faqGroups.map((group, groupIndex) => (
        <section
          key={group.id}
          id={group.id}
          className={`scroll-mt-20 border-b-2 border-ink py-12 md:py-16 ${
            groupIndex % 2 === 0 ? 'bg-surface' : ''
          }`}
        >
          <div className="mx-auto grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.025em] text-balance md:text-4xl lg:sticky lg:top-28 lg:self-start">
              {group.title}
            </h2>
            <div className="flex flex-col gap-3">
              {group.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-lg border-2 border-ink bg-bg shadow-[var(--shadow-brut-xs)] open:bg-coral-soft/45"
                >
                  <summary className="flex min-h-14 items-center justify-between gap-4 px-4 py-4 md:px-5">
                    <span className="font-display text-lg font-semibold leading-snug tracking-[-0.015em]">
                      {item.q}
                    </span>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink bg-surface transition-colors group-open:bg-coral">
                      <Plus
                        size={18}
                        strokeWidth={2.2}
                        className="transition-transform duration-200 group-open:rotate-45"
                        aria-hidden="true"
                      />
                    </span>
                  </summary>
                  <p className="border-t border-ink/20 px-4 py-4 leading-relaxed text-mute md:px-5">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <nav aria-label="Más información" className="border-b-2 border-ink bg-mint/35 py-10">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="font-display text-2xl font-semibold">
            Si querés leer más
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-8">
            <li>
              <Link
                href="/que-es-atende"
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                Qué es Atende y qué funciona hoy →
              </Link>
            </li>
            <li>
              <Link
                href="/integraciones"
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                Cómo armamos cada conexión →
              </Link>
            </li>
            <li>
              <Link
                href="/precios"
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                Precios y créditos →
              </Link>
            </li>
            <li>
              <Link
                href="/politica-de-privacidad"
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                Política de privacidad →
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <CtaFinal context="Hola, tengo una pregunta sobre Atende para mi negocio" />
      <JsonLd
        value={pageGraph({ ...pages.faq, breadcrumbs, faq: faqPageItems })}
      />
    </>
  );
}

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
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

const moreLink =
  'inline-flex min-h-11 items-center font-semibold text-ink underline-offset-4 hover:underline';
// A trailing arrow that stays with the last word when a label wraps.
const inlineIcon = 'ml-1.5 inline-block align-[-0.15em]';

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

// The FAQ rows copy the shared Faq component. One native <details> per entry
// and no other <details> on the page: the site audit counts them against the
// FAQ schema, which reads the same objects.
export default function PreguntasFrecuentesPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="pb-8 pt-8 md:pb-12 md:pt-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            level="h1"
            eyebrow="Preguntas frecuentes"
            title={
              <>
                <span className="block">Lo que preguntan antes de que Atende</span>{' '}
                <span className="block text-faint">reserve su primer turno.</span>
              </>
            }
            sub="Conectado a tu sistema, Atende reserva turnos y registra pedidos por WhatsApp. Acá están las respuestas operativas: cómo conectás tu número, qué mensajes entiende, cómo frenás al asistente y qué no hace."
          />
          {/* On phones the topics scroll sideways in one row, like the rubro
              tabs on the home; from md up they wrap. */}
          <nav aria-label="Temas" className="mt-8 md:mt-10">
            <ul className="-mx-5 -my-2 flex gap-2 overflow-x-auto px-5 py-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
              {faqGroups.map((group) => (
                <li key={group.id} className="shrink-0">
                  <a
                    href={`#${group.id}`}
                    className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-surface px-4 text-[0.9375rem] font-medium ring-1 ring-inset ring-line-strong transition-[box-shadow,background-color,color] duration-200 ease-smooth hover:bg-ink hover:text-white hover:ring-ink"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {faqGroups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-20 py-8 md:py-12">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 md:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start lg:pt-5">
              <h2 className="text-balance text-title">{group.title}</h2>
              {group.next && (
                <Link
                  href={group.next.href}
                  className="mt-2 inline-flex min-h-11 items-center font-semibold text-coral-strong underline-offset-4 hover:underline"
                >
                  <span>
                    <WithTrailingIcon text={group.next.label}>
                      <ArrowRight size={16} className={inlineIcon} aria-hidden="true" />
                    </WithTrailingIcon>
                  </span>
                </Link>
              )}
            </div>
            <div className="rounded-4xl bg-surface px-5 shadow-card sm:px-8">
              {group.items.map((item) => (
                <details key={item.q} className="group border-b border-line last:border-b-0">
                  <summary className="flex min-h-16 items-center justify-between gap-5 rounded-xl py-5">
                    <span className="text-lg font-semibold leading-snug tracking-[-0.015em]">
                      {item.q}
                    </span>
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-full bg-bg transition-colors duration-200 group-open:bg-ink group-open:text-white"
                      aria-hidden="true"
                    >
                      <Plus
                        size={18}
                        strokeWidth={2}
                        className="transition-transform duration-300 ease-smooth group-open:rotate-45"
                      />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <nav aria-label="Más información" className="pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-title">Si querés leer más</p>
          <ul className="mt-4 flex flex-col gap-x-8 sm:flex-row sm:flex-wrap">
            <li>
              <Link href="/que-es-atende" className={moreLink}>
                <span>
                  <WithTrailingIcon text="Qué es Atende y qué funciona hoy">
                    <ArrowRight size={16} className={inlineIcon} aria-hidden="true" />
                  </WithTrailingIcon>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/integraciones" className={moreLink}>
                <span>
                  <WithTrailingIcon text="Cómo armamos cada conexión">
                    <ArrowRight size={16} className={inlineIcon} aria-hidden="true" />
                  </WithTrailingIcon>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/precios" className={moreLink}>
                <span>
                  <WithTrailingIcon text="Precios y créditos">
                    <ArrowRight size={16} className={inlineIcon} aria-hidden="true" />
                  </WithTrailingIcon>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/politica-de-privacidad" className={moreLink}>
                <span>
                  <WithTrailingIcon text="Política de privacidad">
                    <ArrowRight size={16} className={inlineIcon} aria-hidden="true" />
                  </WithTrailingIcon>
                </span>
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

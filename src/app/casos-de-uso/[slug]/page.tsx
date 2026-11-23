import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, UsersRound } from 'lucide-react';
import { RichText } from '@/components/casos/RichText';
import { RubroBlocks, RubroScene } from '@/components/casos/RubroBlocks';
import { RubroCta } from '@/components/casos/RubroCta';
import { JsonLd } from '@/components/jsonld';
import { Faq } from '@/components/landing/Faq';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { rubros } from '@/content/rubros';
import { createPageMetadata } from '@/lib/metadata';
import { buildDemoLink } from '@/lib/leads';
import { pageGraph } from '@/lib/structured-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return rubros.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const rubro = rubros.find((item) => item.slug === slug);
  if (!rubro) notFound();
  return createPageMetadata({
    title: rubro.title,
    description: rubro.description,
    path: `/casos-de-uso/${slug}`,
  });
}

// The page has exactly two demo links that keep the rubro: the hero button and
// the closing band. The site audit counts them.
export default async function RubroPage({ params }: Props) {
  const { slug } = await params;
  const rubro = rubros.find((item) => item.slug === slug);
  if (!rubro) notFound();
  const path = `/casos-de-uso/${slug}`;
  const breadcrumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Casos de uso', path: '/casos-de-uso' },
    { name: rubro.name, path },
  ];
  const related = [
    ...rubro.guides.map((guide) => ({ href: `/blog/${guide.slug}`, label: guide.label })),
    rubro.service,
    { href: '/integraciones', label: 'Qué se puede conectar y qué hace falta' },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="pt-8 md:pt-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            level="h1"
            eyebrow={rubro.name}
            title={
              <>
                {/* The action is the point of the page, so it gets the ink tone. */}
                <span className="block text-faint">{rubro.h1.before}</span>{' '}
                <span className="block">{rubro.h1.accent}</span>
              </>
            }
            sub={rubro.lede}
          />
          <p className="mt-5 flex max-w-2xl items-start gap-3 leading-relaxed text-muted">
            <span
              className="grid size-8 shrink-0 place-items-center rounded-full bg-surface text-ink shadow-card"
              aria-hidden="true"
            >
              <UsersRound size={16} strokeWidth={1.75} />
            </span>
            <span className="min-w-0 pt-0.5">
              <RichText text={rubro.supervision} />
            </span>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={buildDemoLink(rubro.slug)}
              data-cta={`rubro-${rubro.slug}-hero-demo`}
              size="lg"
              className="w-full sm:w-auto"
            >
              {rubro.cta.demoLabel}
            </Button>
            <Button href="#prueba" variant="outline" size="lg" className="w-full sm:w-auto">
              Qué probar en la demo
            </Button>
          </div>
        </div>
        <RubroScene chat={rubro.chat} fallback={rubro.fallback} />
      </section>

      <RubroBlocks blocks={rubro.blocks} />

      <Faq items={rubro.faq} />

      <nav aria-label="Guías y páginas relacionadas" className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-title">Para seguir mirando</h2>
          <ul className="mt-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((link) => (
              <li key={link.href} className="border-t border-line-strong">
                <Link
                  href={link.href}
                  className="group flex min-h-14 items-center justify-between gap-4 py-3 font-medium transition-colors duration-200 hover:text-coral-strong"
                >
                  {link.label}
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-muted transition-[transform,color] duration-200 ease-smooth group-hover:translate-x-0.5 group-hover:text-coral-strong"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <RubroCta rubro={rubro} />

      <JsonLd
        value={pageGraph({
          path,
          title: rubro.title,
          description: rubro.description,
          updated: rubro.updated,
          breadcrumbs,
          faq: rubro.faq,
        })}
      />
    </>
  );
}

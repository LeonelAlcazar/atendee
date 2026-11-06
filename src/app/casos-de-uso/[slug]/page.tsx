import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/casos/RichText';
import { RubroBlocks } from '@/components/casos/RubroBlocks';
import { RubroCta } from '@/components/casos/RubroCta';
import { JsonLd } from '@/components/jsonld';
import { Faq } from '@/components/landing/Faq';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { rubros } from '@/content/rubros';
import { createPageMetadata } from '@/lib/metadata';
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
      <section className="border-b-2 border-ink py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <SectionHeader
              level="h1"
              eyebrow={rubro.name}
              title={
                <>
                  {rubro.h1.before} <span className="text-coral">{rubro.h1.accent}</span>
                </>
              }
              sub={rubro.lede}
            />
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink">
              <RichText text={rubro.supervision} />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/demo" data-cta={`rubro-${rubro.slug}-hero-demo`} size="lg">
                {rubro.cta.demoLabel}{'\u00a0'}→
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-5 lg:justify-self-end">
            <ChatMockup
              messages={rubro.chat.messages}
              caption={rubro.chat.caption}
              result={rubro.chat.result}
              className="w-full"
            />
            <p className="max-w-sm rounded-md border-2 border-ink bg-sun/45 px-4 py-3 leading-relaxed">
              {rubro.fallback}
            </p>
          </div>
        </div>
      </section>

      <RubroBlocks blocks={rubro.blocks} />

      <Faq items={rubro.faq} />

      <nav aria-label="Guías y páginas relacionadas" className="border-b-2 border-ink bg-mint/35 py-10">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-semibold">Para seguir mirando</h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-1">
            {related.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-center underline underline-offset-4">
                  {link.label} →
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

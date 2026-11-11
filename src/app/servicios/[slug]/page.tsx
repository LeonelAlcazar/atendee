import { notFound } from 'next/navigation';
import Link from 'next/link';
import { servicios } from '@/content/servicios';
import { site } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { buildDemoLink } from '@/lib/leads';
import { organizationId, pageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { FactRows } from '@/components/servicios/FactRows';
import { StepCards } from '@/components/servicios/StepCards';

export const dynamicParams = false;
export function generateStaticParams() {
  return servicios.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = servicios.find((item) => item.slug === slug);
  if (!service) notFound();
  return createPageMetadata({
    title: service.seoTitle,
    description: service.short,
    path: `/servicios/${slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicios.find((item) => item.slug === slug);
  if (!service) notFound();
  const path = `/servicios/${slug}`;
  const breadcrumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Soluciones', path: '/servicios' },
    { name: service.title, path },
  ];
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="border-b-2 border-ink py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <SectionHeader
              level="h1"
              eyebrow={service.title}
              title={service.headline}
              sub={service.description}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={buildDemoLink(service.slug)}
                data-cta={`solution-${service.id}-demo`}
                size="lg"
              >
                Pedí una demo →
              </Button>
              <Button href="/precios" variant="outline" size="lg">
                Ver cómo se cobra
              </Button>
            </div>
          </div>
          <ChatMockup
            messages={service.conversation}
            caption={service.caption}
            result={service.result}
          />
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.025em]">
              {service.doneTitle}
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-lg">
              {service.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-2.5 size-2 shrink-0 bg-coral"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.025em]">
              Para quién es
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-mute">
              {service.fit}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="max-w-4xl font-display text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
            {service.detail.title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-mute">
            {service.detail.intro}
          </p>
          <FactRows rows={service.detail.rows} className="mt-8" />
        </div>
      </section>

      <section className="border-b-2 border-ink bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
            {service.workflowTitle}
          </h2>
          <StepCards steps={service.workflow} className="mt-8" />
        </div>
      </section>

      <section className="border-b-2 border-ink py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
              {service.human.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-mute">
              {service.human.text}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {service.human.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-2 size-2 shrink-0 bg-ink"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                Qué necesitamos de tu negocio
              </h2>
              <ul className="mt-4 flex flex-col gap-3 leading-relaxed text-mute">
                {service.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 size-2 shrink-0 bg-ink"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border-2 border-ink bg-coral-soft p-6 shadow-[var(--shadow-brut-sm)]">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                Si todavía no hay conexión
              </h2>
              <p className="mt-3 leading-relaxed">{service.scope}</p>
              <Link
                href="/integraciones"
                className="mt-3 inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
              >
                Cómo se arma la conexión →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {service.notes.length > 0 && (
        <section className="border-b-2 border-ink bg-surface py-14 md:py-20">
          <div
            className={`mx-auto grid max-w-7xl gap-5 px-5 md:px-8 ${
              service.notes.length > 1 ? 'lg:grid-cols-3' : ''
            }`}
          >
            {service.notes.map((note) => (
              <article
                key={note.title}
                className="flex flex-col items-start rounded-lg border-2 border-ink bg-bg p-6 shadow-[var(--shadow-brut-sm)]"
              >
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">
                  {note.title}
                </h2>
                <p className="mt-3 max-w-3xl leading-relaxed text-mute">
                  {note.text}
                </p>
                {note.link && (
                  <Link
                    href={note.link.href}
                    className="mt-3 inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
                  >
                    {note.link.label}&nbsp;→
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      <nav
        aria-label="Rubros y guías de esta solución"
        className="border-b-2 border-ink bg-mint/35 py-12"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Por rubro
            </h2>
            <ul className="mt-3 flex flex-col gap-1">
              {service.rubros.map((rubro) => (
                <li key={rubro.slug}>
                  <Link
                    href={`/casos-de-uso/${rubro.slug}`}
                    className="inline-flex min-h-11 items-center underline underline-offset-4"
                  >
                    {rubro.label}&nbsp;→
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">Guías</h2>
            <ul className="mt-3 flex flex-col gap-1">
              {service.guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/blog/${guide.slug}`}
                    className="inline-flex min-h-11 items-center underline underline-offset-4"
                  >
                    {guide.label}&nbsp;→
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <Faq items={service.faq} />

      <nav
        aria-label="Otras soluciones"
        className="mx-auto max-w-7xl px-5 pt-10 md:px-8"
      >
        <p className="font-display text-xl font-semibold">
          También podés resolver
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-6">
          {servicios
            .filter((item) => item.id !== service.id)
            .map((item) => (
              <li key={item.id}>
                <Link
                  href={`/servicios/${item.slug}`}
                  className="inline-flex min-h-11 items-center underline underline-offset-4"
                >
                  {item.title}&nbsp;→
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <CtaFinal context={service.ctaContext} demoSource={service.slug} />
      <JsonLd
        value={pageGraph({
          path,
          title: service.seoTitle,
          description: service.short,
          updated: service.updated,
          breadcrumbs,
          faq: service.faq,
          extra: [
            {
              '@type': 'Service',
              '@id': `${site.url}${path}#service`,
              name: service.title,
              description: service.description,
              url: `${site.url}${path}`,
              serviceType: service.title,
              provider: { '@id': organizationId },
              areaServed: { '@type': 'Country', name: 'Argentina' },
              mainEntityOfPage: { '@id': `${site.url}${path}#webpage` },
            },
          ],
        })}
      />
    </>
  );
}

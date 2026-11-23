import { notFound } from 'next/navigation';
import { servicios } from '@/content/servicios';
import { site } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { buildDemoLink } from '@/lib/leads';
import { organizationId, pageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { FactRows } from '@/components/servicios/FactRows';
import { StepCards } from '@/components/servicios/StepCards';
import {
  ArrowLink,
  ChatScene,
  DoneList,
  LinkRows,
  TileLink,
} from '@/components/servicios/ServiceBlock';

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
      <section className="pb-12 pt-8 md:pb-18 md:pt-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <SectionHeader
              level="h1"
              eyebrow={service.title}
              title={service.headline}
              sub={service.description}
            />
            {/* On phones the longest label ("Consultar por mi atención al
                cliente") needs a little less padding to stay on one line. */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={buildDemoLink(service.slug)}
                data-cta={`solution-${service.id}-demo`}
                size="lg"
                className="w-full max-sm:px-5! max-sm:text-[1rem]! sm:w-auto"
              >
                {service.demoLabel}
              </Button>
              <Button
                href="/precios"
                variant="outline"
                size="lg"
                className="w-full max-sm:px-5! max-sm:text-[1rem]! sm:w-auto"
              >
                Ver cómo se cobra
              </Button>
            </div>
          </div>
          <ChatScene
            messages={service.conversation}
            result={service.result}
            connection={service.caption}
          />
        </div>
      </section>

      <section className="py-12 md:py-18">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <h2 className="max-w-2xl text-balance text-headline">
              {service.doneTitle}
            </h2>
            <DoneList items={service.bullets} className="mt-8 md:mt-10" />
          </div>
          <div className="rounded-3xl bg-surface p-7 shadow-card md:p-9">
            <h2 className="text-title">
              Para quién es
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              {service.fit}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="max-w-4xl text-balance text-headline">
            {service.detail.title}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lead text-muted">
            {service.detail.intro}
          </p>
          <FactRows rows={service.detail.rows} className="mt-8 md:mt-12" />
        </div>
      </section>

      <section className="py-12 md:py-18">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="max-w-4xl text-balance text-headline">
            {service.workflowTitle}
          </h2>
          <StepCards steps={service.workflow} className="mt-8 md:mt-14" />
        </div>
      </section>

      <section className="py-12 md:py-18">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-balance text-headline">
              {service.human.title}
            </h2>
            <p className="mt-5 text-pretty text-lead text-muted">
              {service.human.text}
            </p>
            <ul className="mt-8 border-t border-line-strong">
              {service.human.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-line py-4 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="rounded-3xl bg-surface p-7 shadow-card md:p-9">
              <h2 className="text-title">
                Qué necesitamos de tu negocio
              </h2>
              <ul className="mt-5 flex flex-col gap-3 leading-relaxed text-muted">
                {service.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-ink/40"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-surface p-7 shadow-card md:p-9">
              <h2 className="text-title">
                Si todavía no hay conexión
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{service.scope}</p>
              <ArrowLink href="/integraciones" className="mt-2">
                Cómo se arma la conexión
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {service.notes.length > 0 && (
        <section className="py-12 md:py-18">
          <div
            className={`mx-auto grid max-w-7xl gap-4 px-5 md:gap-5 md:px-8 ${
              service.notes.length > 1 ? 'lg:grid-cols-3' : ''
            }`}
          >
            {service.notes.map((note) => (
              <article
                key={note.title}
                className={`flex flex-col items-start rounded-3xl bg-surface p-7 shadow-card md:p-9 ${
                  service.notes.length > 1 ? '' : 'max-w-4xl'
                }`}
              >
                <h2 className="text-balance text-title">
                  {note.title}
                </h2>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted">
                  {note.text}
                </p>
                {note.link && (
                  <ArrowLink href={note.link.href} className="mt-auto">
                    {note.link.label}
                  </ArrowLink>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      <nav
        aria-label="Rubros y guías de esta solución"
        className="pt-12 md:pt-18"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-title">
              Por rubro
            </h2>
            <LinkRows
              className="mt-5"
              links={service.rubros.map((rubro) => ({
                href: `/casos-de-uso/${rubro.slug}`,
                label: rubro.label,
              }))}
            />
          </div>
          <div>
            <h2 className="text-title">Guías</h2>
            <LinkRows
              className="mt-5"
              links={service.guides.map((guide) => ({
                href: `/blog/${guide.slug}`,
                label: guide.label,
              }))}
            />
          </div>
        </div>
      </nav>

      <nav
        aria-label="Otras soluciones"
        className="mx-auto max-w-7xl px-5 pt-12 md:px-8 md:pt-18"
      >
        <p className="text-title">
          También podés resolver
        </p>
        <ul className="mt-5 grid gap-3 md:grid-cols-2 md:gap-4">
          {servicios
            .filter((item) => item.id !== service.id)
            .map((item) => (
              <li key={item.id}>
                <TileLink href={`/servicios/${item.slug}`} title={item.title} />
              </li>
            ))}
        </ul>
      </nav>

      <Faq items={service.faq} />
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

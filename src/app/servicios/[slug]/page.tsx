import { notFound } from 'next/navigation';
import Link from 'next/link';
import { servicios } from '@/content/servicios';
import { site } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { organizationId, pageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ChatMockup } from '@/components/ui/ChatMockup';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';

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
      <section className="border-b-2 border-ink py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <SectionHeader
              level="h1"
              eyebrow="SOLUCIONES PARA EMPRESAS"
              title={service.title}
              sub={service.description}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="/demo"
                data-cta={`solution-${service.id}-demo`}
                size="lg"
              >
                Solicitar una demo →
              </Button>
              <Button href="/precios" variant="outline" size="lg">
                Ver planes y alcance
              </Button>
            </div>
          </div>
          <ChatMockup messages={service.conversation} />
        </div>
      </section>
      <section className="border-b-2 border-ink bg-surface py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-display text-3xl font-semibold">
              ¿Para quién sirve?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-mute">
              {service.fit}
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold">
              Qué podés resolver
            </h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-lg">
              {service.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="border-b-2 border-ink py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Cómo funciona en tu operación
          </h2>
          <ol className="mt-9 grid gap-6 md:grid-cols-3">
            {service.workflow.map((step, index) => (
              <li
                key={step.title}
                className="rounded-lg border-2 border-ink bg-mint p-6 shadow-[var(--shadow-brut-sm)]"
              >
                <span className="font-mono text-sm">0{index + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-4 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Qué necesitamos de tu empresa
              </h2>
              <ul className="mt-5 list-disc space-y-3 pl-5 leading-relaxed text-mute">
                {service.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border-2 border-ink bg-coral-soft p-6">
              <h2 className="font-display text-2xl font-semibold">
                Alcance e integraciones
              </h2>
              <p className="mt-4 leading-relaxed">{service.scope}</p>
              <Link
                href="/demo"
                className="mt-5 inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
              >
                Consultar mi implementación →
              </Link>
            </div>
          </div>
        </div>
      </section>
      {service.guides?.length ? (
        <nav
          aria-label="Guías para aplicar esta solución"
          className="border-b-2 border-ink bg-mint/35 py-10"
        >
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="font-display text-2xl font-semibold">
              Prepará tu proceso comercial
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              {service.guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/blog/${guide.slug}`}
                    className="inline-flex min-h-11 items-center underline underline-offset-4"
                  >
                    {guide.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : null}
      <Faq items={service.faq} />
      <nav
        aria-label="Otras soluciones"
        className="mx-auto max-w-7xl px-5 py-10 md:px-8"
      >
        <p className="font-display text-xl font-semibold">
          También podés resolver
        </p>
        <ul className="mt-4 flex flex-wrap gap-5">
          {servicios
            .filter((item) => item.id !== service.id)
            .map((item) => (
              <li key={item.id}>
                <Link
                  href={`/servicios/${item.slug}`}
                  className="inline-flex min-h-11 items-center underline underline-offset-4"
                >
                  {item.title} →
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <CtaFinal context={service.ctaContext} />
      <JsonLd
        value={pageGraph({
          path,
          title: service.seoTitle,
          description: service.short,
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

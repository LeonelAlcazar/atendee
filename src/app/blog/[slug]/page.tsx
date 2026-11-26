import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Plus } from 'lucide-react';
import { getPost, getPosts } from '@/lib/blog';
import { formatBlogDate } from '@/lib/blog-content';
import { postBreadcrumbs, postGraph, postMetadata } from '@/lib/blog-seo';
import { getBlogTopic, rubroByTopic } from '@/content/blog-topics';
import { rubros } from '@/content/rubros';
import { servicios } from '@/content/servicios';
import { buildDemoLink } from '@/lib/leads';
import { closingServiceByTopic } from '@/lib/blog-closing';
import { faqAnchors } from '@/lib/faq-anchors';
import { buildSignupLink, pageRef, signupRef } from '@/lib/signup';
import { buildWaLink, waRef } from '@/lib/wa';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/jsonld';
import { Button } from '@/components/ui/Button';
import { PostCard } from '@/components/blog/PostCard';

export const revalidate = 3600;
// A post scheduled after the build has no static param yet. It must render on
// demand once its date arrives, so this has to stay true.
export const dynamicParams = true;
export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}
// A quiet rail on desktop; full-size rows on a phone.
const tocLinkClass =
  '-ml-px flex min-h-11 items-center border-l border-transparent py-1.5 pl-4 transition-colors duration-200 hover:border-current hover:text-ink lg:min-h-0';
// Related guides fill the row they have: two, three or a two-by-two grid.
const relatedGrid: Record<number, string> = {
  3: 'md:grid-cols-2 lg:grid-cols-3',
};
// The arrow stays on the last word when a long label wraps.
function withArrow(label: string) {
  const split = label.lastIndexOf(' ') + 1;
  return (
    <>
      {label.slice(0, split)}
      <span className="whitespace-nowrap">
        {label.slice(split)}
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="ml-1.5 inline-block align-[-0.125em] transition-transform duration-200 ease-smooth group-hover:translate-x-0.5"
        />
      </span>
    </>
  );
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return postMetadata(post);
}
// The site audit reads the header as a contract: one opening (the sales intro
// or the description <p>, the only direct <p>), then the CTA row with its two
// links as direct children, then the byline block. Keep that order.
export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = post.related.map(
    (slug) => getPosts().find((item) => item.slug === slug)!,
  );
  const path = `/blog/${post.slug}`;
  // A per-post rubro (front matter) wins over the topic's default.
  const rubroSlug = post.rubro ?? rubroByTopic[post.category];
  const rubro = rubros.find((item) => item.slug === rubroSlug);
  // /demo?rubro=… when the rubro is known, so the form opens on that trade.
  const demoHref = buildDemoLink(rubro?.slug);
  // Without a rubro page, the next step is the closest service page.
  const closingService = rubro
    ? undefined
    : servicios.find((item) => item.slug === closingServiceByTopic[post.category]);
  const faqIds = faqAnchors(post.faq.map((item) => item.q));
  const pitchOnlyInHeader = post.salesIntro && (post.lead || post.category === 'recordatorio-de-turnos');
  // The next page after the guide: its rubro, else the closest service.
  const nextStep = rubro
    ? { href: `/casos-de-uso/${rubro.slug}`, label: rubro.title, cta: 'closing-rubro' }
    : closingService
      ? { href: `/servicios/${closingService.slug}`, label: closingService.title, cta: 'closing-service' }
      : null;
  // White on the forest panel, coral text on the canvas.
  const nextStepLink = (inverse: boolean) =>
    nextStep && (
      <p className="mt-6">
        <Link
          href={nextStep.href}
          data-cta={`blog-${post.slug}-${nextStep.cta}`}
          className={`group inline-block min-h-11 py-2.5 font-semibold underline-offset-4 hover:underline ${
            inverse ? 'text-white' : 'text-coral-strong'
          }`}
        >
          {withArrow(nextStep.label)}
        </Link>
      </p>
    );
  // The closing step when the pitch lives only in the header: the next
  // page, or the demo when there is none.
  const closingLink = () => (
    <div data-closing>
      {nextStepLink(false) ?? (
        <p className="mt-6">
          <Link
            href={demoHref}
            data-cta={`blog-${post.slug}-closing-demo`}
            className="group inline-block min-h-11 py-2.5 font-semibold text-coral-strong underline-offset-4 hover:underline"
          >
            {withArrow('Pedí una demo para tu negocio')}
          </Link>
        </p>
      )}
    </div>
  );
  return (
    <>
      <Breadcrumbs items={postBreadcrumbs(post)} />
      <article className="mx-auto max-w-7xl px-5 pb-20 pt-8 md:px-8 md:pb-28 md:pt-14">
        <header className="max-w-4xl">
          <Link
            href={`/blog/tema/${post.category}`}
            className="inline-flex min-h-11 items-center text-[0.9375rem] font-semibold text-coral-strong underline-offset-4 hover:underline"
          >
            {getBlogTopic(post.category)!.name}
          </Link>
          <h1 className="mt-1 text-balance text-headline">{post.title}</h1>
          {post.salesIntro ? (
            <div
              className="mt-6 max-w-3xl space-y-1 text-pretty text-lead text-muted"
              data-sales-intro
            >
              {post.salesIntro.map((line) => <p key={line}>{line}</p>)}
            </div>
          ) : (
            <p className="mt-6 max-w-3xl text-pretty text-lead text-muted">
              {post.description}
            </p>
          )}
          {post.lead ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={buildWaLink(post.lead.message, waRef(path, 'guía'))}
                data-cta={`blog-${post.slug}-lead-whatsapp`}
                aria-label={`${post.lead.label} (abre WhatsApp)`}
                size="lg"
                className="w-full sm:w-auto"
              >
                {post.lead.label} →
              </Button>
              <Button
                href={demoHref}
                data-cta={`blog-${post.slug}-lead-demo`}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Pedí una demo
              </Button>
            </div>
          ) : post.salesIntro && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={demoHref}
                data-cta={`blog-${post.slug}-sales-demo`}
                size="lg"
                className="w-full sm:w-auto"
              >
                Pedí una demo
              </Button>
              <Button
                href={buildSignupLink(signupRef(pageRef(path), 'sales'))}
                data-cta={`blog-${post.slug}-sales-app`}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Empezá en la app
              </Button>
            </div>
          )}
          <div className="mt-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
            <Link
              href="/blog/editorial"
              rel="author"
              className="inline-flex min-h-11 items-center font-semibold text-ink underline-offset-4 hover:underline"
            >
              Equipo Atende
            </Link>
            <span>
              Publicado el{' '}
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt)}
              </time>
            </span>
            {post.updatedAt !== post.publishedAt && (
              <span>
                Actualizado el{' '}
                <time dateTime={post.updatedAt}>
                  {formatBlogDate(post.updatedAt)}
                </time>
              </span>
            )}
            <span>{post.readingMinutes} min de lectura</span>
          </div>
          {/* Who publishes, in one line, so a quoted chunk names the entity. */}
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted" data-publisher>
            Esta guía la publica Atende, un asistente de WhatsApp para PyMEs
            argentinas hecho en Córdoba.{' '}
            <Link
              href="/que-es-atende"
              className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              Qué es Atende
            </Link>
            .
          </p>
          </div>
        </header>
        <div className="mt-10 grid max-w-3xl gap-10 md:mt-14 lg:max-w-none lg:grid-cols-[minmax(0,48rem)_13rem] lg:gap-x-12 xl:grid-cols-[minmax(0,48rem)_15rem] xl:gap-x-24">
          {/* First in the DOM: on a phone the answer comes before the index. */}
          <section
            aria-labelledby="respuesta-breve"
            className="min-w-0 max-w-xl rounded-3xl bg-surface p-6 shadow-card sm:p-8 lg:col-start-1 lg:row-start-1"
          >
            <h2 id="respuesta-breve" className="text-sm font-semibold">
              Respuesta breve
            </h2>
            <p className="mt-3 text-pretty text-lead">{post.summary}</p>
          </section>
          <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            {/* Capped at the viewport, so a long index stays reachable on a
                short laptop screen; the padding keeps focus rings unclipped. */}
            <nav
              aria-label="Índice del artículo"
              className="lg:sticky lg:top-24 lg:-mx-2 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto lg:overscroll-contain lg:px-2 lg:py-1"
            >
              <p className="text-sm font-semibold">En esta guía</p>
              <ol className="mt-3 border-l border-line-strong text-[0.9375rem] leading-snug text-muted lg:text-sm">
                <li>
                  <a href="#respuesta-breve" className={tocLinkClass}>
                    Respuesta breve
                  </a>
                </li>
                {post.headings
                  .filter((heading) => heading.depth === 2)
                  .map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} className={tocLinkClass}>
                        {heading.text}
                      </a>
                    </li>
                  ))}
                <li>
                  <a href="#preguntas-frecuentes" className={tocLinkClass}>
                    Preguntas frecuentes
                  </a>
                </li>
                {post.sources.length > 0 && (
                  <li>
                    <a href="#fuentes" className={tocLinkClass}>
                      Fuentes
                    </a>
                  </li>
                )}
              </ol>
            </nav>
          </aside>
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            {/* The only <details> on the page: the audit matches them to the
                FAQ schema. */}
            <section id="preguntas-frecuentes" className="mt-16 max-w-xl md:mt-20">
              <h2 className="blog-heading">Preguntas frecuentes</h2>
              <div className="mt-6 rounded-3xl bg-surface px-5 shadow-card sm:px-8">
                {post.faq.map((item, index) => (
                  <details
                    key={item.q}
                    id={faqIds[index]}
                    className="group scroll-mt-24 border-b border-line last:border-b-0"
                  >
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
                    <p className="pb-6 pr-10 leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
            {post.sources.length > 0 && (
              <section id="fuentes" className="mt-16 max-w-xl md:mt-20">
                <h2 className="blog-heading">Fuentes y fecha de consulta</h2>
                <ul className="mt-6 space-y-3">
                  {post.sources.map((source) => (
                    <li
                      key={source.url}
                      className="text-[0.9375rem] leading-relaxed [overflow-wrap:anywhere]"
                    >
                      <a
                        className="underline decoration-coral decoration-[1.5px] underline-offset-4 transition-colors duration-200 hover:text-coral-strong"
                        href={source.url}
                      >
                        {source.title}
                      </a>
                      <span className="text-muted">
                        {' '}
                        · Consultado el{' '}
                        <time dateTime={source.checkedAt}>
                          {formatBlogDate(source.checkedAt)}
                        </time>
                      </span>
                    </li>
                  ))}
                </ul>
                {post.category === 'alternativas' && (
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    Comparativa publicada por Atende. Las funciones y
                    condiciones de cada proveedor pueden cambiar; confirmá el
                    alcance durante la evaluación.
                  </p>
                )}
              </section>
            )}
            {pitchOnlyInHeader ? closingLink() : (
              <section className="relative mt-16 max-w-xl overflow-hidden rounded-4xl bg-forest px-6 py-10 text-white sm:px-10 sm:py-12 md:mt-20">
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_100%_at_30%_100%,rgb(230_72_44/0.22),transparent_70%)]"
                  aria-hidden="true"
                />
                <div className="relative">
                  <h2 className="blog-heading">
                    Dejá que Atende termine esa tarea en tu WhatsApp.
                  </h2>
                  <p className="mt-4 leading-relaxed text-white/75">
                    Contanos qué tarea se repite y qué sistema usás. Conectado a tu
                    agenda o a tu sistema, Atende reserva, cotiza o registra el
                    pedido en la conversación, con tu equipo al tanto. Esa conexión
                    se arma a pedido para tu negocio; sin ella, el asistente junta
                    los datos y tu equipo confirma.
                  </p>
                  <Button
                    href={demoHref}
                    data-cta="blog-demo"
                    size="lg"
                    className="mt-8 w-full sm:w-auto"
                  >
                    Pedí una demo
                  </Button>
                  {nextStepLink(true)}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="blog-heading">Seguí explorando</h2>
          <div
            className={`mt-8 grid gap-4 md:gap-5 ${relatedGrid[related.length] ?? 'md:grid-cols-2'}`}
          >
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
          <Link
            href="/blog"
            className="group mt-6 inline-block min-h-11 py-2.5 font-semibold text-coral-strong underline-offset-4 hover:underline"
          >
            {withArrow('Volver a todas las guías')}
          </Link>
        </div>
      </section>
      <JsonLd value={postGraph(post)} />
    </>
  );
}

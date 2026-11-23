import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPage, blogTopics } from '@/content/blog-topics';
import { site } from '@/content/site';
import { getPosts } from '@/lib/blog';
import { latestUpdate } from '@/lib/blog-content';
import { createPageMetadata } from '@/lib/metadata';
import { blogNode } from '@/lib/blog-seo';
import { pageGraph, organizationId } from '@/lib/structured-data';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PostCard } from '@/components/blog/PostCard';

export const revalidate = 3600;
export const metadata = {
  ...createPageMetadata(blogPage),
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/blog/feed.xml' },
  },
};
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Blog', path: '/blog' },
];
const buyerQuestions = [
  { label: '¿Qué hace un bot de WhatsApp?', href: '/blog/bot-de-whatsapp' },
  { label: '¿Puede tomar pedidos por audio?', href: '/blog/pedidos-por-audio-whatsapp-distribuidores' },
  { label: '¿Cómo reprograma un turno?', href: '/servicios/turnos-whatsapp' },
  { label: '¿Cuántas respuestas necesito por mes?', href: '/precios#calculadora' },
];
const textLink =
  'group inline-block min-h-11 py-2.5 text-[0.9375rem] font-semibold text-coral-strong underline-offset-4 hover:underline';
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
export default function BlogPage() {
  const posts = getPosts();
  const topics = blogTopics.filter((topic) =>
    posts.some((post) => post.category === topic.slug),
  );
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <header className="pb-16 pt-8 md:pb-24 md:pt-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-coral-strong">
              El blog de Atende · {posts.length} guías y comparativas
            </p>
            <h1 className="mt-4 text-balance text-headline md:mt-5">
              <span className="block">Reservá turnos y tomá pedidos</span>{' '}
              <span className="block text-faint">por WhatsApp.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lead text-muted">
              Guías para negocios argentinos. Mirá qué hace falta para que un
              turno quede en la agenda o un pedido en tu sistema, qué revisa tu
              equipo y cómo calcular el costo.
            </p>
            <Link
              href="/blog/editorial"
              className="mt-4 inline-flex min-h-11 items-center text-[0.9375rem] underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:decoration-ink"
            >
              Quién publica y cómo elaboramos las guías
            </Link>
          </div>
          <aside className="rounded-3xl bg-surface p-6 shadow-card sm:p-8">
            <h2 className="text-title">¿Qué querés resolver?</h2>
            <ul className="mt-3">
              {buyerQuestions.map(({ label, href }) => (
                <li key={href} className="border-b border-line last:border-b-0">
                  <Link
                    href={href}
                    className="group flex min-h-14 items-center justify-between gap-4 py-3 font-semibold tracking-[-0.01em]"
                  >
                    {label}
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-muted transition-[transform,color] duration-200 ease-smooth group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <nav aria-label="Explorar el blog por tema">
          <h2 className="blog-heading">Encontrá tu rubro o tema</h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/blog/tema/${topic.slug}`}
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-surface px-4 py-2 text-[0.9375rem] font-medium ring-1 ring-inset ring-line-strong transition-[box-shadow] duration-200 ease-smooth hover:ring-ink/40"
                >
                  {topic.name}
                  <span className="text-sm tabular-nums text-muted">
                    {
                      posts.filter((post) => post.category === topic.slug)
                        .length
                    }
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/casos-de-uso" className={`mt-3 ${textLink}`}>
            {withArrow('Ver qué tarea termina Atende en cada rubro')}
          </Link>
        </nav>
        {topics.map((topic) => (
          <section
            key={topic.slug}
            className="pt-20 md:pt-28"
            aria-labelledby={`tema-${topic.slug}`}
          >
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
              <h2 id={`tema-${topic.slug}`} className="blog-heading">
                {topic.name}
              </h2>
              <Link href={`/blog/tema/${topic.slug}`} className={textLink}>
                {withArrow('Ver tema')}
              </Link>
            </div>
            <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-muted">
              {topic.description}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {posts
                .filter((post) => post.category === topic.slug)
                .map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
            </div>
          </section>
        ))}
        <a
          href="/blog/feed.xml"
          className="mt-16 inline-flex min-h-11 items-center text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-ink"
        >
          Seguir el blog por RSS
        </a>
      </div>
      <JsonLd
        value={pageGraph({
          ...blogPage,
          updated: latestUpdate(posts),
          breadcrumbs,
          extra: [
            {
              ...blogNode,
              inLanguage: 'es-AR',
              publisher: { '@id': organizationId },
              blogPost: posts.map((post) => ({
                '@type': 'BlogPosting',
                '@id': `${site.url}/blog/${post.slug}#article`,
                url: `${site.url}/blog/${post.slug}`,
                headline: post.title,
              })),
            },
          ],
        })}
      />
    </>
  );
}

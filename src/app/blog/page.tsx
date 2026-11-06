import Link from 'next/link';
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
export default function BlogPage() {
  const posts = getPosts();
  const topics = blogTopics.filter((topic) =>
    posts.some((post) => post.category === topic.slug),
  );
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <header className="border-b-2 border-ink py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-wider text-coral-strong">
              El blog de Atende · {posts.length} guías y comparativas
            </p>
            <h1 className="mt-5 break-words font-display text-[clamp(2.25rem,10.5vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em] md:text-7xl">
              Turnos, pedidos y presupuestos,
              <br />
              <span className="text-coral">resueltos por WhatsApp.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-mute">
              Guías para que un bot de WhatsApp reserve, cotice o registre el
              pedido en tu negocio: qué hay que conectar, qué hace tu equipo
              mientras tanto, cuánto cuesta y con qué compararlo.
            </p>
            <Link
              href="/blog/editorial"
              className="mt-5 inline-flex min-h-11 items-center text-sm underline underline-offset-4"
            >
              Quién publica y cómo elaboramos las guías
            </Link>
          </div>
          <aside className="self-center rounded-lg border-2 border-ink bg-sun/70 p-7 shadow-[var(--shadow-brut)]">
            <p className="font-mono text-xs uppercase tracking-wide">
              Para empezar
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
              ¿Qué es un bot de WhatsApp?
            </h2>
            <p className="mt-4 leading-relaxed">
              Es un programa que contesta mensajes por vos. Si además lo
              conectás a tu agenda o a tu sistema, puede reservar el turno o
              registrar el pedido en la misma conversación, con tu equipo al
              tanto.
            </p>
            <Link
              href="/blog/bot-de-whatsapp"
              className="mt-5 inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
            >
              Entender los tipos de bot y cómo elegir →
            </Link>
          </aside>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <nav
          aria-label="Explorar el blog por tema"
          className="rounded-lg border-2 border-ink bg-surface p-6"
        >
          <h2 className="font-display text-2xl font-semibold">
            Encontrá tu rubro o tema
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/blog/tema/${topic.slug}`}
                  className="inline-flex min-h-11 items-center gap-3 rounded-full border border-ink px-4 py-2 text-sm hover:bg-mint"
                >
                  {topic.name}
                  <span className="font-mono text-xs text-mute">
                    {
                      posts.filter((post) => post.category === topic.slug)
                        .length
                    }
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/casos-de-uso"
            className="mt-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4"
          >
            Ver qué tarea termina Atende en cada rubro →
          </Link>
        </nav>
        {topics.map((topic) => (
          <section
            key={topic.slug}
            className="pt-14"
            aria-labelledby={`tema-${topic.slug}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2
                id={`tema-${topic.slug}`}
                className="font-display text-3xl font-semibold tracking-tight"
              >
                {topic.name}
              </h2>
              <Link
                href={`/blog/tema/${topic.slug}`}
                className="inline-flex min-h-11 items-center text-sm underline underline-offset-4"
              >
                Ver tema →
              </Link>
            </div>
            <p className="mt-3 max-w-3xl leading-relaxed text-mute">
              {topic.description}
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
          className="mt-12 inline-flex min-h-11 items-center text-sm underline underline-offset-4"
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

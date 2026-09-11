import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/blog';
import { formatBlogDate } from '@/lib/blog-content';
import { postBreadcrumbs, postGraph, postMetadata } from '@/lib/blog-seo';
import { getBlogTopic } from '@/content/blog-topics';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/jsonld';
import { Button } from '@/components/ui/Button';
import { PostCard } from '@/components/blog/PostCard';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return postMetadata(post);
}
export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = post.related.map(
    (slug) => getPosts().find((item) => item.slug === slug)!,
  );
  return (
    <>
      <Breadcrumbs items={postBreadcrumbs(post)} />
      <article className="mx-auto max-w-7xl px-5 pb-14 pt-10 md:px-8 md:pt-16">
        <header className="max-w-5xl">
          <Link
            href={`/blog/tema/${post.category}`}
            className="inline-block rounded-full border border-ink bg-mint px-4 py-2 font-mono text-xs"
          >
            {getBlogTopic(post.category)!.name}
          </Link>
          <h1 className="mt-6 break-words font-display text-4xl font-semibold leading-[1.07] tracking-[-0.035em] md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-mute">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mute">
            <Link
              href="/blog/editorial"
              rel="author"
              className="underline underline-offset-4"
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
        </header>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div className="min-w-0">
            <section
              aria-labelledby="respuesta-breve"
              className="rounded-lg border-2 border-ink bg-mint/60 p-6 shadow-[var(--shadow-brut-sm)] md:p-8"
            >
              <h2
                id="respuesta-breve"
                className="font-mono text-xs uppercase tracking-wider"
              >
                Respuesta breve
              </h2>
              <p className="mt-4 text-lg leading-relaxed">{post.summary}</p>
            </section>
            <div
              className="blog-prose mt-10"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <section
              id="preguntas-frecuentes"
              className="mt-12 border-t-2 border-ink pt-8"
            >
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Preguntas frecuentes
              </h2>
              <div className="mt-6 space-y-3">
                {post.faq.map((item) => (
                  <details
                    key={item.q}
                    className="rounded-lg border border-ink bg-surface p-5 open:bg-mint/25"
                  >
                    <summary className="flex min-h-8 items-center justify-between gap-4 font-display text-lg font-semibold">
                      {item.q}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p className="mt-4 leading-relaxed text-mute">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
            {post.sources.length > 0 && (
              <section
                id="fuentes"
                className="mt-10 border-t border-ink/25 pt-8"
              >
                <h2 className="break-words font-display text-2xl font-semibold">
                  Fuentes y fecha de consulta
                </h2>
                <ul className="mt-4 space-y-3">
                  {post.sources.map((source) => (
                    <li key={source.url} className="text-sm leading-relaxed">
                      <a
                        className="underline underline-offset-4"
                        href={source.url}
                      >
                        {source.title}
                      </a>
                      <span className="text-mute">
                        {' '}
                        · Consultado el{' '}
                        <time dateTime={source.checkedAt}>
                          {formatBlogDate(source.checkedAt)}
                        </time>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-mute">
                  Comparativa publicada por Atende. Las funciones y condiciones
                  de cada proveedor pueden cambiar; confirmá el alcance durante
                  la evaluación.
                </p>
              </section>
            )}
            <section className="mt-12 rounded-lg border-2 border-ink bg-sun/60 p-7">
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Probalo con las consultas de tu negocio.
              </h2>
              <p className="mt-4 leading-relaxed">
                Traé ejemplos sin datos personales y contanos qué sistema usás.
                Revisamos qué puede responder Atende y qué necesita tu equipo o
                una integración.
              </p>
              <Button href="/demo" data-cta="blog-demo" className="mt-6">
                Solicitar una demo →
              </Button>
            </section>
          </div>
          <aside className="order-first lg:order-last">
            <nav
              aria-label="Índice del artículo"
              className="rounded-lg border border-ink bg-surface p-6 lg:sticky lg:top-24"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-mute">
                En esta guía
              </p>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed">
                <li>
                  <a
                    href="#respuesta-breve"
                    className="underline-offset-4 hover:underline"
                  >
                    Respuesta breve
                  </a>
                </li>
                {post.headings
                  .filter((heading) => heading.depth === 2)
                  .map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                <li>
                  <a
                    href="#preguntas-frecuentes"
                    className="underline-offset-4 hover:underline"
                  >
                    Preguntas frecuentes
                  </a>
                </li>
                {post.sources.length > 0 && (
                  <li>
                    <a
                      href="#fuentes"
                      className="underline-offset-4 hover:underline"
                    >
                      Fuentes
                    </a>
                  </li>
                )}
              </ol>
            </nav>
          </aside>
        </div>
      </article>
      <section className="border-t-2 border-ink bg-mint/25 py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-semibold">
            Seguí explorando
          </h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
          <Link
            href="/blog"
            className="mt-8 inline-block py-2 underline underline-offset-4"
          >
            Volver a todas las guías →
          </Link>
        </div>
      </section>
      <JsonLd value={postGraph(post)} />
    </>
  );
}

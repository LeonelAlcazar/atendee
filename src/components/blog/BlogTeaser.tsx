import Link from 'next/link';
import { getPosts } from '@/lib/blog';
import { PostCard } from './PostCard';
export function BlogTeaser() {
  const featured = [
    'como-automatizar-whatsapp-distribuidoras',
    'cotizaciones-por-whatsapp-automaticas',
    'mejor-alternativa-a-zenvia',
  ];
  const posts = getPosts();
  return (
    <section className="border-b-2 border-ink bg-mint/35 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="font-mono text-xs uppercase tracking-wider text-mute">
          Guías para tu negocio
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Una mejor atención empieza con un proceso claro.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-mute">
          Cómo preparar solicitudes de cotización, responder consultas y elegir
          una herramienta para tu negocio.
        </p>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {featured
            .map((slug) => posts.find((post) => post.slug === slug))
            .filter((post) => post !== undefined)
            .map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
        </div>
        <Link
          className="mt-8 inline-block py-3 font-semibold underline underline-offset-4"
          href="/blog"
        >
          Explorar todas las guías y comparativas →
        </Link>
      </div>
    </section>
  );
}

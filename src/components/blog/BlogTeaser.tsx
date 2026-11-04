import Link from 'next/link';
import { getPosts } from '@/lib/blog';
import { PostCard } from './PostCard';
export function BlogTeaser() {
  const featured = [
    'bot-de-whatsapp',
    'como-crear-un-bot-de-whatsapp',
    'bot-de-whatsapp-gratis-o-pago',
  ];
  const posts = getPosts();
  return (
    <section className="border-b-2 border-ink bg-mint/35 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="font-mono text-xs uppercase tracking-wider text-mute">
          Guías de bot de WhatsApp
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Elegí, configurá y probá tu bot de WhatsApp.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-mute">
          Qué puede responder un bot, cómo empezar y qué revisar antes de pagar.
          Con ejemplos para tu negocio y pruebas para el pase a una persona.
        </p>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {featured
            .map((slug) => posts.find((post) => post.slug === slug))
            .filter((post) => post !== undefined)
            .map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          <Link
            className="inline-block py-3 font-semibold underline underline-offset-4"
            href="/blog/bot-de-whatsapp-con-ia-para-ventas"
          >
            Cómo usar un bot con IA para ventas →
          </Link>
          <Link
            className="inline-block py-3 underline underline-offset-4"
            href="/blog"
          >
            Todas las guías y comparativas →
          </Link>
        </div>
      </div>
    </section>
  );
}

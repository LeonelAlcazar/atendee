import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatBlogDate, type BlogPost } from '@/lib/blog-content';
import { getBlogTopic } from '@/content/blog-topics';

// A white tile that opens the guide anywhere you tap: the title link stretches
// over the card. No <header> in here: the post audit reads the first
// `article header` on the page, and this card is an <article> too.
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex h-full flex-col rounded-3xl bg-surface p-6 shadow-card transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-float sm:p-7">
      <p className="text-sm text-muted">
        {post.sector || getBlogTopic(post.category)!.name} ·{' '}
        {post.readingMinutes} min
      </p>
      <h3 className="mt-3 text-balance text-xl font-semibold leading-snug tracking-[-0.02em]">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 after:rounded-3xl"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
        {post.description}
      </p>
      <p className="mt-5 text-[0.8125rem] text-muted">
        Actualizado el{' '}
        <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time>
      </p>
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Leer: ${post.title}`}
        className="relative mt-2 inline-flex min-h-11 w-fit items-center gap-1.5 text-[0.9375rem] font-semibold text-coral-strong underline-offset-4 hover:underline"
      >
        Leer guía
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-200 ease-smooth group-hover:translate-x-0.5"
        />
      </Link>
    </article>
  );
}

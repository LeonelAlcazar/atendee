import Link from 'next/link';
import type { BlogPost } from '@/lib/blog-content';
import { getBlogTopic } from '@/content/blog-topics';

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex h-full flex-col rounded-lg border-2 border-ink bg-surface p-6 shadow-[var(--shadow-brut-sm)]">
      <p className="font-mono text-[11px] uppercase tracking-wider text-mute">
        {post.sector || getBlogTopic(post.category)!.name} ·{' '}
        {post.readingMinutes} min
      </p>
      <h3 className="mt-5 break-words font-display text-2xl font-semibold leading-tight tracking-tight">
        <Link
          href={`/blog/${post.slug}`}
          className="decoration-coral decoration-2 underline-offset-4 hover:underline"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-4 flex-1 leading-relaxed text-mute">
        {post.description}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Leer: ${post.title}`}
        className="mt-6 w-fit py-2 text-sm font-semibold underline underline-offset-4"
      >
        Leer guía <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

import { getPosts } from '@/lib/blog';
import { createBlogFeed } from '@/lib/blog-feed';
export const dynamic = 'force-dynamic';
export function GET() {
  return new Response(createBlogFeed(getPosts()), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

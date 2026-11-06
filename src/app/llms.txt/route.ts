import { getPosts } from '@/lib/blog';
import { createLlmsTxt } from '@/lib/llms';
export const revalidate = 3600;
export function GET() {
  return new Response(createLlmsTxt(getPosts()), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

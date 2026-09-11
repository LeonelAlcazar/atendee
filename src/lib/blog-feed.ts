import type { BlogPost } from './blog-content';
import { site } from '../content/site';
const escapeXml = (text: string) =>
  text.replace(
    /[<>&"']/g,
    (char) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      })[char]!,
  );
export function createBlogFeed(posts: BlogPost[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>Atende · Guías de WhatsApp para negocios</title><link>${site.url}/blog</link>
<description>Guías por rubro y comparativas para atender por WhatsApp.</description><language>es-ar</language>
<atom:link href="${site.url}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>${site.url}/blog/${post.slug}</link><guid isPermaLink="true">${site.url}/blog/${post.slug}</guid><description>${escapeXml(post.description)}</description><pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate><category>${escapeXml(post.category)}</category></item>`).join('\n')}
</channel></rss>`;
}

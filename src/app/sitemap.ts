import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blog';
import { blogPage, blogTopics, editorialPage } from '@/content/blog-topics';
import { site } from '@/content/site';
import { legalPages, pages } from '@/content/pages';
import { servicios } from '@/content/servicios';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const latest = (dates: string[]) =>
    dates.sort().at(-1) || editorialPage.updated;
  return [
    ...Object.values(pages),
    ...servicios.map((service) => ({
      path: `/servicios/${service.slug}`,
      updated: pages.services.updated,
    })),
    ...legalPages,
    {
      path: blogPage.path,
      updated: latest(posts.map((post) => post.updatedAt)),
    },
    editorialPage,
    ...blogTopics
      .filter((topic) => posts.some((post) => post.category === topic.slug))
      .map((topic) => ({
        path: `/blog/tema/${topic.slug}`,
        updated: latest(
          posts
            .filter((post) => post.category === topic.slug)
            .map((post) => post.updatedAt),
        ),
      })),
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      updated: post.updatedAt,
    })),
  ].map(({ path, updated }) => ({
    url: path === '/' ? site.url : new URL(path, site.url).href,
    lastModified: updated,
  }));
}

import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blog';
import { latestUpdate } from '@/lib/blog-content';
import { blogPage, blogTopics, editorialPage } from '@/content/blog-topics';
import { site } from '@/content/site';
import { legalPages, pages } from '@/content/pages';
import { rubros } from '@/content/rubros';
import { servicios } from '@/content/servicios';

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  return [
    ...Object.values(pages),
    ...servicios.map((service) => ({
      path: `/servicios/${service.slug}`,
      updated: service.updated,
    })),
    ...rubros.map((rubro) => ({
      path: `/casos-de-uso/${rubro.slug}`,
      updated: rubro.updated,
    })),
    ...legalPages,
    {
      path: blogPage.path,
      updated: latestUpdate(posts) ?? editorialPage.updated,
    },
    editorialPage,
    ...blogTopics
      .filter((topic) => posts.some((post) => post.category === topic.slug))
      .map((topic) => ({
        path: `/blog/tema/${topic.slug}`,
        updated:
          latestUpdate(posts.filter((post) => post.category === topic.slug)) ??
          editorialPage.updated,
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

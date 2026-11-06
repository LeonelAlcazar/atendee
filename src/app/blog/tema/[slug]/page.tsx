import { notFound } from 'next/navigation';
import { blogTopics, getBlogTopic } from '@/content/blog-topics';
import { getPosts } from '@/lib/blog';
import { latestUpdate } from '@/lib/blog-content';
import { createPageMetadata } from '@/lib/metadata';
import { pageGraph } from '@/lib/structured-data';
import { site } from '@/content/site';
import { JsonLd } from '@/components/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RichText } from '@/components/casos/RichText';
import { PostCard } from '@/components/blog/PostCard';

export const revalidate = 3600;
// A topic whose first post is scheduled after the build has no static param yet.
export const dynamicParams = true;
export function generateStaticParams() {
  const posts = getPosts();
  return blogTopics
    .filter((topic) => posts.some((post) => post.category === topic.slug))
    .map((topic) => ({ slug: topic.slug }));
}
type Props = { params: Promise<{ slug: string }> };
function topicPage(slug: string) {
  const topic = getBlogTopic(slug);
  if (!topic || !getPosts().some((post) => post.category === slug)) notFound();
  return {
    ...topic,
    path: `/blog/tema/${slug}` as const,
    title:
      'seoTitle' in topic
        ? topic.seoTitle
        : /gu[ií]as/i.test(topic.name)
          ? `${topic.name} para negocios`
          : `${topic.name}: guías de WhatsApp para negocios`,
  };
}
export async function generateMetadata({ params }: Props) {
  return createPageMetadata(topicPage((await params).slug));
}
export default async function TopicPage({ params }: Props) {
  const topic = topicPage((await params).slug);
  const posts = getPosts().filter((post) => post.category === topic.slug);
  const breadcrumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: topic.name, path: topic.path },
  ];
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
        <p className="font-mono text-xs uppercase tracking-wider text-coral-strong">
          {posts.length} artículos · Blog de Atende
        </p>
        <h1 className="mt-5 max-w-4xl break-words font-display text-5xl font-semibold tracking-tight md:text-6xl">
          {topic.name}
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-mute">
          {topic.description}
        </p>
        {'intro' in topic && (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-mute">
            <RichText text={topic.intro} />
          </p>
        )}
        <h2 className="sr-only">Guías y comparativas de {topic.name}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <JsonLd
        value={pageGraph({
          ...topic,
          updated: latestUpdate(posts),
          breadcrumbs,
          extra: [
            {
              '@type': 'CollectionPage',
              '@id': `${site.url}${topic.path}#collection`,
              url: `${site.url}${topic.path}`,
              name: topic.name,
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: posts.map((post, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  url: `${site.url}/blog/${post.slug}`,
                  name: post.title,
                })),
              },
            },
          ],
        })}
      />
    </>
  );
}

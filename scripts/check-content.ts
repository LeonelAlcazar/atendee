import assert from 'node:assert/strict';
import { loadPosts } from '../src/lib/blog-content';
import { blogTopics } from '../src/content/blog-topics';
const posts = loadPosts();
assert.ok(posts.length, 'The blog must contain published articles');
for (const field of ['title', 'seoTitle', 'description'] as const) {
  assert.equal(
    new Set(posts.map((post) => post[field])).size,
    posts.length,
    `Duplicate ${field}`,
  );
}
for (const post of posts) {
  assert.ok(
    post.headings.every((heading) => heading.text.trim()),
    `${post.slug}: empty heading`,
  );
  assert.ok(
    post.faq.every(
      (item, index) =>
        post.faq.findIndex((other) => other.q === item.q) === index,
    ),
    `${post.slug}: duplicate FAQ`,
  );
  assert.ok(
    post.seoTitle.length + ' — atende'.length < 80,
    `${post.slug}: long search title`,
  );
}
console.log(
  `Validated ${posts.length} published Markdown posts, ${posts.filter((post) => post.sector).length} sectors and ${blogTopics.filter((topic) => posts.some((post) => post.category === topic.slug)).length} topics.`,
);

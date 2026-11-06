import assert from 'node:assert/strict';
import { loadPosts, readAllPosts } from '../src/lib/blog-content';
import { argentinaToday } from '../src/lib/dates';
import {
  isSectorGuide,
  maxGuidesPerHeading,
  maxMedianSharedShare,
  maxWorstComparisonShare,
  maxWorstSharedShare,
  repeatedHeadings,
  sharedSequenceReport,
} from '../src/lib/template-metrics';
import { blogTopics, rubroByTopic } from '../src/content/blog-topics';
import { rubros } from '../src/content/rubros';
const posts = loadPosts();
assert.ok(posts.length, 'The blog must contain published articles');
// A scheduled post goes live with no build behind it, so check the catalog now
// as it will stand on each publication date. Otherwise a bad `related` or date
// passes today and only surfaces in production.
const today = argentinaToday();
const scheduledDays = new Set(
  readAllPosts()
    .filter((post) => !post.draft && post.publishedAt > today)
    .map((post) => post.publishedAt),
);
for (const day of scheduledDays)
  loadPosts(undefined, new Date(`${day}T12:00:00-03:00`));
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
    post.seoTitle.length + ' — Atende'.length < 80,
    `${post.slug}: long search title`,
  );
}
for (const slug of Object.values(rubroByTopic))
  assert.ok(
    rubros.some((rubro) => rubro.slug === slug),
    `rubroByTopic points to a missing rubro: ${slug}`,
  );

const guides = posts.filter(isSectorGuide);
const percent = (share: number) => `${(share * 100).toFixed(1)}%`;
const repeated = repeatedHeadings(guides);
const { median, worst } = sharedSequenceReport(guides);
console.log(
  `Sector guides: ${guides.length}. Shared 5-word sequences: median ${percent(median)}, worst ${percent(worst?.share ?? 0)} (${worst?.slug ?? 'none'}).`,
);
console.log(
  `H2s in more than ${maxGuidesPerHeading} guides: ${repeated.length}${repeated.length ? `\n${repeated.map((item) => `  ${item.guides}x ${item.heading}`).join('\n')}` : ''}`,
);
assert.equal(
  repeated.length,
  0,
  `An H2 may appear in at most ${maxGuidesPerHeading} sector guides`,
);
assert.ok(
  median <= maxMedianSharedShare,
  `Median shared 5-word sequences ${percent(median)} is over ${percent(maxMedianSharedShare)}`,
);
assert.ok(
  (worst?.share ?? 0) <= maxWorstSharedShare,
  `${worst?.slug} shares ${percent(worst?.share ?? 0)} of its 5-word sequences with other guides; the limit is ${percent(maxWorstSharedShare)}`,
);
const comparisons = sharedSequenceReport(
  posts.filter((post) => post.category === 'alternativas'),
);
console.log(
  `Comparisons: worst shared 5-word sequences ${percent(comparisons.worst?.share ?? 0)} (${comparisons.worst?.slug ?? 'none'}).`,
);
assert.ok(
  (comparisons.worst?.share ?? 0) <= maxWorstComparisonShare,
  `${comparisons.worst?.slug} is too close to the other comparisons; the limit is ${percent(maxWorstComparisonShare)}`,
);
console.log(
  `Validated ${posts.length} published Markdown posts, ${posts.filter((post) => post.sector).length} sectors and ${blogTopics.filter((topic) => posts.some((post) => post.category === topic.slug)).length} topics.`,
);

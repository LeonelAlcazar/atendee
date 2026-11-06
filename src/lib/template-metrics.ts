import sanitizeHtml from 'sanitize-html';
import { decodeHTML } from 'entities';
import type { BlogPost } from './blog-content';

// Guards against guides that only swap the sector name (rebuild spec, section 6).
export const maxGuidesPerHeading = 3;
export const maxMedianSharedShare = 0.1;
// The median cannot see one cloned page, so each page has its own ceiling.
export const maxWorstSharedShare = 0.2;
// Comparisons share criteria and limits by design, so they get more room.
export const maxWorstComparisonShare = 0.3;
const shingleSize = 5;

// By slug too: dropping `sector` must not hide a guide from these checks.
export const isSectorGuide = (post: Pick<BlogPost, 'slug' | 'sector'>) =>
  Boolean(post.sector) || post.slug.startsWith('como-automatizar-whatsapp-');

const normalizeHeading = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

export function repeatedHeadings(guides: BlogPost[]) {
  const usedBy = new Map<string, Set<string>>();
  for (const guide of guides)
    for (const heading of guide.headings) {
      if (heading.depth !== 2) continue;
      const key = normalizeHeading(heading.text);
      usedBy.set(key, (usedBy.get(key) ?? new Set()).add(guide.slug));
    }
  return [...usedBy]
    .map(([heading, slugs]) => ({ heading, guides: slugs.size }))
    .filter((item) => item.guides > maxGuidesPerHeading)
    .sort((a, b) => b.guides - a.guides);
}

function shingles(html: string) {
  const text = decodeHTML(
    sanitizeHtml(html.replace(/</g, ' <'), {
      allowedTags: [],
      allowedAttributes: {},
    }),
  );
  const words = text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
  const sequences = new Set<string>();
  for (let index = 0; index + shingleSize <= words.length; index++)
    sequences.add(words.slice(index, index + shingleSize).join(' '));
  return sequences;
}

// Share of each guide's distinct 5-word sequences that another guide also uses.
export function sharedSequenceReport(guides: BlogPost[]) {
  const perGuide = guides.map((guide) => ({
    slug: guide.slug,
    sequences: shingles(guide.html),
  }));
  const usage = new Map<string, number>();
  for (const { sequences } of perGuide)
    for (const sequence of sequences)
      usage.set(sequence, (usage.get(sequence) ?? 0) + 1);
  const shares = perGuide
    .map(({ slug, sequences }) => ({
      slug,
      share: sequences.size
        ? [...sequences].filter((sequence) => usage.get(sequence)! > 1).length /
          sequences.size
        : 0,
    }))
    .sort((a, b) => a.share - b.share);
  const middle = Math.floor(shares.length / 2);
  const median = shares.length
    ? shares.length % 2
      ? shares[middle].share
      : (shares[middle - 1].share + shares[middle].share) / 2
    : 0;
  return { median, worst: shares.at(-1), shares };
}

import 'server-only';
import { cache } from 'react';
import { loadPosts, loadPostsForRuntime } from './blog-content';

// `cache` lasts one render, so each ISR regeneration reads the files and the
// date again. A module-level memo would freeze scheduled posts until a deploy.
// A bad post fails the build. After that it can only cost itself, not the blog.
export const getPosts = cache(() =>
  process.env.NEXT_PHASE === 'phase-production-build'
    ? loadPosts()
    : loadPostsForRuntime(),
);
export const getPost = cache((slug: string) =>
  getPosts().find((post) => post.slug === slug),
);

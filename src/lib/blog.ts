import 'server-only';
import { cache } from 'react';
import { loadPosts } from './blog-content';
export const getPosts = cache(() => loadPosts());
export const getPost = cache((slug: string) =>
  getPosts().find((post) => post.slug === slug),
);

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getPosts } from './blog';
import { loadPosts, loadPostsForRuntime } from './blog-content';

vi.mock('server-only', () => ({}));
vi.mock('./blog-content', () => ({
  loadPosts: vi.fn(() => []),
  loadPostsForRuntime: vi.fn(() => []),
}));

describe('post loading under ISR', () => {
  beforeEach(() => {
    vi.mocked(loadPosts).mockClear();
    vi.mocked(loadPostsForRuntime).mockClear();
  });
  afterEach(() => vi.unstubAllEnvs());

  it('reads the catalog again on each regeneration instead of freezing it in the module', () => {
    getPosts();
    getPosts();
    expect(loadPostsForRuntime).toHaveBeenCalledTimes(2);
    expect(loadPosts).not.toHaveBeenCalled();
  });
  it('stays strict during the build, so a bad post cannot ship', () => {
    vi.stubEnv('NEXT_PHASE', 'phase-production-build');
    getPosts();
    expect(loadPosts).toHaveBeenCalledTimes(1);
    expect(loadPostsForRuntime).not.toHaveBeenCalled();
  });
});

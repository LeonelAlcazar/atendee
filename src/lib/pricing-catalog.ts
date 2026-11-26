import 'server-only';
import { unstable_cache } from 'next/cache';
import { argentinaToday } from './dates';
import { getPublicPlans, type PublicPlan } from './public-plans';

export type Catalog = { plans: PublicPlan[]; checkedAt: string };

// A failed read throws instead of returning a value, so nothing caches it.
// On a refresh, Next's data cache then keeps serving the last good catalog
// (unstable_cache returns the stale entry when its revalidation fails).
export async function loadCatalog(
  load: () => Promise<PublicPlan[] | null> = getPublicPlans,
  now = new Date(),
): Promise<Catalog> {
  const plans = await load();
  if (plans === null) throw new Error('Public plan catalog unavailable');
  return { plans, checkedAt: argentinaToday(now) };
}

// Same period as the page: a shorter one would lower the route's revalidate.
const cachedCatalog = unstable_cache(() => loadCatalog(), ['atende-public-plans-v1'], {
  revalidate: 600,
});

// /precios regenerates every 10 minutes (ISR). It gets the last good catalog,
// or null when none was ever read, and then shows the calm fallback.
export async function getCatalog(
  read: () => Promise<Catalog> = cachedCatalog,
): Promise<Catalog | null> {
  try {
    return await read();
  } catch {
    return null;
  }
}

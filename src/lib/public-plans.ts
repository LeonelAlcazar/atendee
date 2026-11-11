import 'server-only';
import { z } from 'zod';
import { site } from '@/content/site';

const plan = z
  .object({
    name: z
      .string()
      .max(120)
      .refine((value) => value.trim().length > 0),
    priceLabel: z
      .string()
      .max(120)
      .refine((value) => value.trim().length > 0),
    bestFor: z.string().max(500).nullable(),
    monthlyAgentResponseLimit: z.number().int().min(0).max(2_147_483_647),
    automationAllowed: z.boolean(),
    recommended: z.boolean(),
  })
  .strict();

export type PublicPlan = z.infer<typeof plan>;

const publicPath = '/api/public/plans';
const publicUrl = new URL(publicPath, site.appUrl).href;

export async function getPublicPlans(
  fetchImpl: typeof fetch = fetch,
): Promise<PublicPlan[] | null> {
  try {
    const url = new URL(process.env.ATENDE_PUBLIC_PLANS_URL ?? publicUrl);
    // The HTTP audit supplies its own loopback fixture; visitors cannot select a source.
    const loopback = url.protocol === 'http:' && url.hostname === '127.0.0.1';
    if (
      (url.href !== publicUrl && !loopback) ||
      url.pathname !== publicPath ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      return null;
    }
    const response = await fetchImpl(url.href, {
      method: 'GET',
      headers: { accept: 'application/json' },
      credentials: 'omit',
      redirect: 'error',
      cache: 'no-store',
      signal: AbortSignal.timeout(3_000),
    });
    if (response.status !== 200) return null;
    return z.array(plan).parse(await response.json());
  } catch {
    return null;
  }
}

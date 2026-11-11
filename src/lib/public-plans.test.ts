import { afterEach, describe, expect, it, vi } from 'vitest';
import { getPublicPlans } from './public-plans';

vi.mock('server-only', () => ({}));

const plan = {
  name: 'Public catalog name',
  priceLabel: 'Literal catalog price',
  bestFor: 'Catalog audience',
  monthlyAgentResponseLimit: 1234,
  automationAllowed: true,
  recommended: false,
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe('public plan server loader', () => {
  it('reads the fixed app HTTPS gateway without cookies or administrative authority', async () => {
    vi.stubEnv('ATENDE_PUBLIC_PLANS_URL', undefined);
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json([plan]));

    await expect(getPublicPlans(fetchImpl)).resolves.toEqual([plan]);
    expect(fetchImpl).toHaveBeenCalledWith(
      'https://app.atende.com.ar/api/public/plans',
      {
        method: 'GET',
        headers: { accept: 'application/json' },
        credentials: 'omit',
        redirect: 'error',
        cache: 'no-store',
        signal: expect.any(AbortSignal),
      },
    );
  });

  it('uses only a server-configured loopback override for the HTTP audit', async () => {
    vi.stubEnv(
      'ATENDE_PUBLIC_PLANS_URL',
      'http://127.0.0.1:43123/api/public/plans',
    );
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json([]));

    await expect(getPublicPlans(fetchImpl)).resolves.toEqual([]);
    expect(fetchImpl.mock.calls[0][0]).toBe(
      'http://127.0.0.1:43123/api/public/plans',
    );
  });

  it.each([
    'https://attacker.test/api/public/plans',
    'http://attacker.test/api/public/plans',
    'http://127.0.0.1:43123/api/v1/admin/plans',
    'http://user:password@127.0.0.1:43123/api/public/plans',
    'http://127.0.0.1:43123/api/public/plans?tenant=private',
    'http://127.0.0.1:43123/api/public/plans#private',
    'not a URL',
  ])('rejects an invalid configured override (%s)', async (url) => {
    vi.stubEnv('ATENDE_PUBLIC_PLANS_URL', url);
    const fetchImpl = vi.fn<typeof fetch>();

    await expect(getPublicPlans(fetchImpl)).resolves.toBeNull();
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('keeps literal text and distinguishes an empty catalog from unavailable data', async () => {
    vi.stubEnv('ATENDE_PUBLIC_PLANS_URL', undefined);
    const manual = {
      ...plan,
      bestFor: null,
      monthlyAgentResponseLimit: 0,
      automationAllowed: false,
    };
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(Response.json([manual]))
      .mockResolvedValueOnce(Response.json([]));

    await expect(getPublicPlans(fetchImpl)).resolves.toEqual([manual]);
    await expect(getPublicPlans(fetchImpl)).resolves.toEqual([]);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it.each([
    { value: null },
    { value: {} },
    { value: [null] },
    { value: [{ ...plan, id: 'PRIVATE_ID_CANARY' }] },
    { value: [{ ...plan, tenantId: 'PRIVATE_TENANT_CANARY' }] },
    { value: [{ ...plan, rebillPlanId: 'PROVIDER_CANARY' }] },
    { value: [{ ...plan, flags: { internal: true } }] },
    { value: [{ ...plan, name: ' ' }] },
    { value: [{ ...plan, name: 'a'.repeat(121) }] },
    { value: [{ ...plan, priceLabel: 42 }] },
    { value: [{ ...plan, priceLabel: 'a'.repeat(121) }] },
    { value: [{ ...plan, bestFor: undefined }] },
    { value: [{ ...plan, bestFor: 'a'.repeat(501) }] },
    { value: [{ ...plan, monthlyAgentResponseLimit: -1 }] },
    { value: [{ ...plan, monthlyAgentResponseLimit: 1.5 }] },
    { value: [{ ...plan, monthlyAgentResponseLimit: '1234' }] },
    { value: [{ ...plan, monthlyAgentResponseLimit: 2_147_483_648 }] },
    { value: [{ ...plan, automationAllowed: undefined }] },
    { value: [{ ...plan, recommended: 'yes' }] },
    { value: [plan, { ...plan, tenantId: 'PRIVATE_CANARY' }] },
  ])(
    'rejects the whole response when the public DTO is invalid: $value',
    async ({ value }) => {
      vi.stubEnv('ATENDE_PUBLIC_PLANS_URL', undefined);
      const fetchImpl = vi
        .fn<typeof fetch>()
        .mockResolvedValue(Response.json(value));

      await expect(getPublicPlans(fetchImpl)).resolves.toBeNull();
    },
  );

  it('does not read an upstream failure body or reuse a previous result', async () => {
    vi.stubEnv('ATENDE_PUBLIC_PLANS_URL', undefined);
    const unavailable = new Response('PRIVATE_BODY_CANARY', { status: 503 });
    const read = vi.spyOn(unavailable, 'json');
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(Response.json([plan]))
      .mockResolvedValueOnce(unavailable);

    await expect(getPublicPlans(fetchImpl)).resolves.toEqual([plan]);
    await expect(getPublicPlans(fetchImpl)).resolves.toBeNull();
    expect(read).not.toHaveBeenCalled();
  });

  it('fails quietly for malformed JSON and network errors', async () => {
    vi.stubEnv('ATENDE_PUBLIC_PLANS_URL', undefined);
    const log = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response('INVALID_JSON_CANARY'))
      .mockRejectedValueOnce(new Error('PRIVATE_URL_TOKEN_CANARY'));

    await expect(getPublicPlans(fetchImpl)).resolves.toBeNull();
    await expect(getPublicPlans(fetchImpl)).resolves.toBeNull();
    expect(log).not.toHaveBeenCalled();
  });

  it('bounds request and body reading with the same three-second signal', async () => {
    vi.stubEnv('ATENDE_PUBLIC_PLANS_URL', undefined);
    const controller = new AbortController();
    const timeout = vi
      .spyOn(AbortSignal, 'timeout')
      .mockReturnValue(controller.signal);
    const fetchImpl = vi.fn<typeof fetch>().mockImplementation(
      async (_url, options) =>
        ({
          status: 200,
          json: () =>
            new Promise((_resolve, reject) => {
              options?.signal?.addEventListener('abort', () =>
                reject(new Error('TIMEOUT_CANARY')),
              );
            }),
        }) as Response,
    );
    const pending = getPublicPlans(fetchImpl);
    await Promise.resolve();
    expect(timeout).toHaveBeenCalledWith(3_000);
    controller.abort();

    await expect(pending).resolves.toBeNull();
    expect(fetchImpl).toHaveBeenCalledOnce();
  });
});

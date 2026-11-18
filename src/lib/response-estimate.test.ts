import { describe, expect, it } from 'vitest';
import { estimateResponses } from './response-estimate';

const plans = [
  { name: 'Manual', monthlyAgentResponseLimit: 200, automationAllowed: false },
  { name: 'Amplio', monthlyAgentResponseLimit: 800, automationAllowed: true },
  { name: 'Inicial', monthlyAgentResponseLimit: 240, automationAllowed: true },
];

describe('monthly assistant response estimate', () => {
  it('matches the smallest sufficient AI allowance, including the boundary', () => {
    expect(estimateResponses(80, 3, plans)).toEqual({ total: 240, match: plans[2] });
    expect(estimateResponses(10, 2, plans)?.match).toBe(plans[2]);
    expect(estimateResponses(81, 3, plans)?.match).toBe(plans[1]);
  });

  it('keeps the volume estimate when the catalog is unavailable or too small', () => {
    expect(estimateResponses(100, 9, plans)).toEqual({ total: 900, match: undefined });
    expect(estimateResponses(100, 9, [])).toEqual({ total: 900, match: undefined });
  });

  it.each([[0, 1], [1, -1], [1.2, 2], [1, NaN], [Number.MAX_SAFE_INTEGER, 2]])(
    'rejects invalid chat or reply counts (%s × %s)',
    (chats, replies) => expect(estimateResponses(chats, replies, plans)).toBeNull(),
  );
});

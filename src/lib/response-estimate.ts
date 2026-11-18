import type { PublicPlan } from './public-plans';

export type EstimatePlan = Pick<PublicPlan, 'name' | 'monthlyAgentResponseLimit' | 'automationAllowed'>;

export function estimateResponses(chats: number, replies: number, plans: EstimatePlan[]) {
  const total = chats * replies;
  if (
    !Number.isSafeInteger(chats) || chats < 1 ||
    !Number.isSafeInteger(replies) || replies < 1 ||
    !Number.isSafeInteger(total)
  ) return null;

  let match: EstimatePlan | undefined;
  for (const plan of plans) {
    if (!plan.automationAllowed || plan.monthlyAgentResponseLimit < total) continue;
    if (!match || plan.monthlyAgentResponseLimit < match.monthlyAgentResponseLimit) {
      match = plan;
    }
  }
  return { total, match };
}

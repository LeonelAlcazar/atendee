import type { PublicPlan } from './public-plans';

const day = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

function list(items: string[]) {
  return items.length < 2
    ? (items[0] ?? '')
    : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;
}

const item = (plan: PublicPlan) => `${plan.name} (${plan.priceLabel})`;

// The paragraph under the /precios H1, built only from the catalog: plan
// names and their literal price labels, in catalog order, plus the date the
// catalog was read. No price is written in the code.
export function catalogSentence(plans: readonly PublicPlan[], checkedAt: string): string | null {
  if (!plans.length) return null;
  const ai = plans.filter((plan) => plan.automationAllowed);
  const manual = plans.filter((plan) => !plan.automationAllowed);
  const parts: string[] = [];
  if (ai.length)
    parts.push(
      `${ai.length === 1 ? 'El plan con IA es' : 'Los planes con IA son'} ${list(ai.map(item))}.`,
    );
  if (manual.length)
    parts.push(
      `${list(manual.map(item))} ${manual.length === 1 ? 'es manual' : 'son manuales'}, sin asistente.`,
    );
  parts.push('La conexión con tu sistema se cotiza aparte, a pedido.');
  const date = new Date(`${checkedAt}T00:00:00Z`);
  if (!Number.isNaN(date.getTime())) parts.push(`Precios publicados al ${day.format(date)}.`);
  return parts.join(' ');
}

export function responseLine(plan: PublicPlan): string {
  if (!plan.automationAllowed) return 'Atención manual, sin asistente.';
  if (plan.monthlyAgentResponseLimit === 0) return 'Sin respuestas mensuales incluidas.';
  return `Hasta ${plan.monthlyAgentResponseLimit.toLocaleString('es-AR')} respuestas del asistente por mes.`;
}

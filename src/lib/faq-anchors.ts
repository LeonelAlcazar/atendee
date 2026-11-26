// Stable anchors for FAQ answers, so a single answer can be linked:
// "¿Qué es Atende?" → "pregunta-que-es-atende". The prefix keeps them apart
// from section ids on the same page; repeats get -2, -3.
export function faqAnchor(question: string): string {
  const slug = question
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const cut = slug.length > 72 ? slug.slice(0, 72).replace(/-[^-]*$/, '') : slug;
  return `pregunta-${cut || 'sin-titulo'}`;
}

export function faqAnchors(questions: readonly string[]): string[] {
  const seen = new Map<string, number>();
  return questions.map((question) => {
    const base = faqAnchor(question);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  });
}

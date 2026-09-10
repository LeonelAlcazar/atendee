export type LeadDetails = {
  company: string;
  volume: string;
  need: string;
  notes: string;
};

export function buildLeadMessage({
  company,
  volume,
  need,
  notes,
}: LeadDetails): string {
  return [
    'Hola, quiero solicitar una demo de Atende para mi empresa.',
    `Empresa: ${company.trim().slice(0, 100)}`,
    `Consultas por WhatsApp al mes: ${volume}`,
    `Quiero resolver: ${need}`,
    ...(notes.trim() ? [`Contexto: ${notes.trim().slice(0, 600)}`] : []),
    'Origen: atende.com.ar/demo',
  ].join('\n');
}

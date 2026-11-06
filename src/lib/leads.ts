export const demoTasks = [
  'Reservar, reprogramar o cancelar turnos',
  'Tomar reservas',
  'Consultar stock y registrar pedidos',
  'Cotizar o calcular financiación',
  'Registrar interesados en mi CRM o planilla',
  'Responder consultas y derivar a mi equipo',
  'Recordatorios y seguimientos',
  'Todavía no lo sé',
] as const;

export const demoSystems = [
  'Una agenda o sistema de turnos',
  'Un sistema de gestión o de stock',
  'Un CRM',
  'Una planilla',
  'Papel o de memoria',
  'Otro',
] as const;

export const demoVolumes = [
  'Menos de 100',
  'Entre 100 y 500',
  'Entre 501 y 2.000',
  'Más de 2.000',
  'Todavía no lo sé',
] as const;

export type LeadDetails = {
  company: string;
  task: string;
  system: string;
  volume: string;
  notes: string;
};

export function buildLeadMessage({
  company,
  task,
  system,
  volume,
  notes,
}: LeadDetails): string {
  return [
    'Hola, quiero pedir una demo de Atende para mi negocio.',
    `Negocio: ${company.trim().slice(0, 100)}`,
    `Tarea que quiero sacarme de encima: ${task}`,
    `Hoy la llevo en: ${system}`,
    `Consultas por WhatsApp al mes: ${volume}`,
    ...(notes.trim() ? [`Contexto: ${notes.trim().slice(0, 600)}`] : []),
    'Origen: atende.com.ar/demo',
  ].join('\n');
}

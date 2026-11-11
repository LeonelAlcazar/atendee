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

const demoTasksByRubro: Record<string, (typeof demoTasks)[number]> = {
  'clinicas-y-consultorios': demoTasks[0],
  'peluquerias-y-estetica': demoTasks[0],
  'restaurantes-y-hoteles': demoTasks[1],
  'comercios-y-distribuidoras': demoTasks[2],
  'concesionarias-e-inmobiliarias': demoTasks[3],
  'servicios-profesionales': demoTasks[4],
};

export function demoTaskForRubro(rubro: string | null): string | undefined {
  return rubro && Object.hasOwn(demoTasksByRubro, rubro)
    ? demoTasksByRubro[rubro]
    : undefined;
}

export function buildDemoLink(rubro: string): string {
  return demoTaskForRubro(rubro)
    ? `/demo?rubro=${encodeURIComponent(rubro)}`
    : '/demo';
}

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
  system?: string;
  volume?: string;
  notes?: string;
  rubro?: string;
};

export function buildLeadMessage({
  company,
  task,
  system,
  volume,
  notes,
  rubro,
}: LeadDetails): string {
  return [
    'Hola, quiero pedir una demo de Atende para mi negocio.',
    `Negocio: ${company.trim().slice(0, 100)}`,
    `Tarea que quiero sacarme de encima: ${task}`,
    ...(system?.trim() ? [`Hoy la llevo en: ${system.trim()}`] : []),
    ...(volume?.trim()
      ? [`Consultas por WhatsApp al mes: ${volume.trim()}`]
      : []),
    ...(notes?.trim() ? [`Contexto: ${notes.trim().slice(0, 600)}`] : []),
    ...(rubro && demoTaskForRubro(rubro)
      ? [`Caso de uso: atende.com.ar/casos-de-uso/${rubro}`]
      : []),
    'Origen: atende.com.ar/demo',
  ].join('\n');
}

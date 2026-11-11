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

type DemoSource = {
  path: string;
  task?: (typeof demoTasks)[number];
};

const demoSources: Record<string, DemoSource> = {
  'clinicas-y-consultorios': {
    path: '/casos-de-uso/clinicas-y-consultorios',
    task: demoTasks[0],
  },
  'peluquerias-y-estetica': {
    path: '/casos-de-uso/peluquerias-y-estetica',
    task: demoTasks[0],
  },
  'restaurantes-y-hoteles': {
    path: '/casos-de-uso/restaurantes-y-hoteles',
    task: demoTasks[1],
  },
  'comercios-y-distribuidoras': {
    path: '/casos-de-uso/comercios-y-distribuidoras',
    task: demoTasks[2],
  },
  'concesionarias-e-inmobiliarias': {
    path: '/casos-de-uso/concesionarias-e-inmobiliarias',
    task: demoTasks[3],
  },
  'servicios-profesionales': {
    path: '/casos-de-uso/servicios-profesionales',
    task: demoTasks[4],
  },
  'turnos-whatsapp': {
    path: '/servicios/turnos-whatsapp',
    task: demoTasks[0],
  },
  'ventas-whatsapp': {
    path: '/servicios/ventas-whatsapp',
    task: demoTasks[2],
  },
  'atencion-automatica-whatsapp': {
    path: '/servicios/atencion-automatica-whatsapp',
    task: demoTasks[5],
  },
  integraciones: { path: '/integraciones' },
  precios: { path: '/precios' },
};

function knownDemoSource(source?: string | null): DemoSource | undefined {
  return source && Object.hasOwn(demoSources, source)
    ? demoSources[source]
    : undefined;
}

export function getDemoContext(
  search: URLSearchParams,
): (DemoSource & { source: string }) | undefined {
  const parameter = search.has('desde') ? 'desde' : 'rubro';
  if (search.getAll(parameter).length !== 1) return undefined;
  const source = search.get(parameter);
  const context = knownDemoSource(source);
  if (!source || !context) return undefined;
  if (parameter === 'rubro' && !context.path.startsWith('/casos-de-uso/')) {
    return undefined;
  }
  return { source, ...context };
}

export function buildDemoLink(source?: string): string {
  const context = knownDemoSource(source);
  if (!source || !context) return '/demo';
  const parameter = context.path.startsWith('/casos-de-uso/') ? 'rubro' : 'desde';
  return `/demo?${parameter}=${encodeURIComponent(source)}`;
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
  source?: string;
};

export function buildLeadMessage({
  company,
  task,
  system,
  volume,
  notes,
  source,
}: LeadDetails): string {
  const context = knownDemoSource(source);
  return [
    'Hola, quiero pedir una demo de Atende para mi negocio.',
    `Negocio: ${company.trim().slice(0, 100)}`,
    `Tarea que quiero sacarme de encima: ${task}`,
    ...(system?.trim() ? [`Hoy la llevo en: ${system.trim()}`] : []),
    ...(volume?.trim()
      ? [`Consultas por WhatsApp al mes: ${volume.trim()}`]
      : []),
    ...(notes?.trim() ? [`Contexto: ${notes.trim().slice(0, 600)}`] : []),
    ...(context
      ? [`Referencia: atende.com.ar${context.path}`]
      : []),
    'Origen: atende.com.ar/demo',
  ].join('\n');
}

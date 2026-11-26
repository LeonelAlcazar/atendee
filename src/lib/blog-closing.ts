// Where a guide sends the reader after the article when it has no rubro page:
// the closest service. Topics missing here (bot de WhatsApp, guías,
// alternativas) close on the demo.
export const closingServiceByTopic: Record<string, string> = {
  'recordatorio-de-turnos': 'turnos-whatsapp',
  'industria-y-logistica': 'ventas-whatsapp',
  comercio: 'ventas-whatsapp',
  automotor: 'ventas-whatsapp',
  salud: 'turnos-whatsapp',
  'belleza-y-bienestar': 'turnos-whatsapp',
  'gastronomia-y-turismo': 'turnos-whatsapp',
  'inmuebles-y-hogar': 'turnos-whatsapp',
  educacion: 'atencion-automatica-whatsapp',
  'servicios-profesionales': 'atencion-automatica-whatsapp',
};

// The next page after a guide: its rubro, else the closest service, else none.
export function nextStepPath(
  rubro: string | undefined,
  category: string,
): string | null {
  if (rubro) return `/casos-de-uso/${rubro}`;
  const service = closingServiceByTopic[category];
  return service ? `/servicios/${service}` : null;
}

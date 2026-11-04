// Shared by metadata, structured data and the sitemap. Dates reflect content edits.
export const pages = {
  home: {
    path: '/',
    title: 'Bot de WhatsApp con IA para empresas en Argentina',
    description:
      'Atende es un bot de WhatsApp con IA para empresas y PyMEs argentinas. Respuestas configuradas, conexión por QR, bandeja compartida y atención humana.',
    updated: '2026-11-04',
  },
  services: {
    path: '/servicios',
    title: 'Automatización de WhatsApp para empresas',
    description:
      'Automatizá consultas de atención, turnos y ventas por WhatsApp con Atende. Conocé los flujos, la intervención humana y las integraciones a evaluar.',
    updated: '2026-11-04',
  },
  cases: {
    path: '/casos-de-uso',
    title: 'WhatsApp con IA: casos de uso para negocios',
    description:
      'Ejemplos de Atende para consultorios, peluquerías, inmobiliarias y comercios. Qué automatizar por WhatsApp y cuándo interviene tu equipo.',
    updated: '2026-09-10',
  },
  pricing: {
    path: '/precios',
    title: 'Precios y planes de un bot de WhatsApp',
    description:
      'Evaluá el costo de Atende según respuestas de IA e integraciones. Compará la atención manual del Plan CRM y la automatización; precios vigentes en la app.',
    updated: '2026-11-04',
  },
  demo: {
    path: '/demo',
    title: 'Solicitá una demo de Atende para tu empresa',
    description:
      'Contanos cómo atendés por WhatsApp y qué querés automatizar. Solicitá una demo para evaluar la bandeja compartida, la IA y el alcance para tu empresa.',
    updated: '2026-09-10',
  },
} as const;

export const legalPages = [
  { path: '/terminos-y-condiciones', updated: '2026-06-26' },
  { path: '/politica-de-privacidad', updated: '2026-06-26' },
] as const;

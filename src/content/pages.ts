// Shared by metadata, structured data and the sitemap. Dates reflect content edits.
export const pages = {
  home: {
    path: '/',
    title: 'WhatsApp con IA para empresas y PyMEs en Argentina',
    description:
      'Atende es un software de atención y ventas por WhatsApp con IA para empresas argentinas. Respuestas automáticas, bandeja compartida y control humano.',
    updated: '2026-10-28',
  },
  services: {
    path: '/servicios',
    title: 'Automatización de WhatsApp para empresas',
    description:
      'Conocé las soluciones de Atende para atención al cliente, solicitudes de turnos y consultas de venta por WhatsApp. Alcance, ejemplos e integraciones.',
    updated: '2026-10-28',
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
    title: 'Precios y planes de WhatsApp con IA para empresas',
    description:
      'Evaluá los planes de Atende según respuestas de IA, equipo e integraciones. Consultá precios vigentes en la app o pedí una propuesta para tu empresa.',
    updated: '2026-09-10',
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

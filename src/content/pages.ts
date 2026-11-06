// Shared by metadata, structured data and the sitemap. Dates reflect content edits.
export const pages = {
  home: {
    path: '/',
    title: 'Bot de WhatsApp para empresas que reserva, cotiza y toma pedidos',
    description:
      'Conectado a tu agenda o a tu sistema, Atende reserva turnos, registra pedidos y cotiza por WhatsApp. La conexión se arma a pedido y tu equipo supervisa.',
    updated: '2026-11-06',
  },
  what: {
    path: '/que-es-atende',
    title: '¿Qué es Atende? El asistente de WhatsApp que termina la tarea',
    description:
      'Conectado a tu sistema, Atende reserva, cotiza y registra pedidos por WhatsApp, y responde mensajes de texto a cualquier hora. Qué hace y qué no, en una ficha.',
    updated: '2026-11-06',
  },
  services: {
    path: '/servicios',
    title: 'Automatizar WhatsApp en tu empresa: turnos, pedidos y ventas',
    description:
      'Elegí qué tarea querés que Atende termine en WhatsApp: reservar turnos, tomar pedidos o calificar consultas. Conectado a tu sistema y con tu equipo al tanto.',
    updated: '2026-11-06',
  },
  integrations: {
    path: '/integraciones',
    title: 'Integraciones de WhatsApp a pedido: agenda, stock y CRM',
    description:
      'Conectamos Atende con la agenda, el stock o el CRM de tu negocio, a pedido. Mirá qué viene incluido, qué se arma para vos y qué hace falta para empezar.',
    updated: '2026-11-06',
  },
  cases: {
    path: '/casos-de-uso',
    title: 'WhatsApp por rubro: qué puede resolver Atende en tu negocio',
    description:
      'Clínicas, peluquerías, restaurantes, comercios, concesionarias y estudios: qué tarea termina Atende por WhatsApp en cada rubro y qué conexión necesita.',
    updated: '2026-11-06',
  },
  pricing: {
    path: '/precios',
    title: 'Precios y planes del bot de WhatsApp con IA',
    description:
      'Cómo se cobra Atende: respuestas del asistente por plan, Plan CRM manual y conexiones a pedido. Los precios vigentes se ven en la app antes de pagar.',
    updated: '2026-11-06',
  },
  faq: {
    path: '/preguntas-frecuentes',
    title: 'Preguntas frecuentes sobre Atende: número, QR, planes y límites',
    description:
      'Qué pasa con tu número, si es la API oficial de Meta, qué mensajes entiende, cómo pausás el asistente y cómo se conecta con tus sistemas. Respuestas directas.',
    updated: '2026-11-06',
  },
  about: {
    path: '/nosotros',
    title: 'Quiénes somos: Atende, automatización de WhatsApp desde Córdoba',
    description:
      'Atende se hace en Córdoba, Argentina, para que los negocios terminen tareas por WhatsApp. Qué hacemos, cómo trabajamos, qué publicamos y cómo contactarnos.',
    updated: '2026-11-06',
  },
  demo: {
    path: '/demo',
    title: 'Pedí una demo de Atende para tu negocio',
    description:
      'Contanos qué tarea querés sacarte de encima en WhatsApp, como turnos, pedidos o presupuestos, y vemos qué conexión necesita tu negocio antes de contratar.',
    updated: '2026-11-06',
  },
} as const;

export const legalPages = [
  { path: '/terminos-y-condiciones', updated: '2026-06-26' },
  { path: '/politica-de-privacidad', updated: '2026-06-26' },
] as const;

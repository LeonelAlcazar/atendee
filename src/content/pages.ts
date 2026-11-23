// Shared by metadata, structured data and the sitemap. Dates reflect content edits.
export const pages = {
  home: {
    path: '/',
    title: 'Bot de WhatsApp para empresas en Argentina que reserva y toma pedidos',
    description:
      'Conectado a tu agenda o a tu sistema, Atende reserva turnos, registra pedidos y cotiza por WhatsApp. La conexión se arma a pedido y tu equipo supervisa.',
    updated: '2026-11-23',
  },
  what: {
    path: '/que-es-atende',
    title: '¿Qué es Atende? El asistente de WhatsApp que termina la tarea',
    description:
      'Atende reserva turnos y registra pedidos por WhatsApp con una conexión a tu sistema. Conocé qué incluye el plan, cómo se vincula tu número y cómo interviene tu equipo.',
    updated: '2026-11-18',
  },
  services: {
    path: '/servicios',
    title: 'Automatizar WhatsApp en tu empresa: turnos, pedidos y ventas',
    description:
      'Elegí qué tarea querés que Atende termine en WhatsApp: reservar turnos, tomar pedidos o calificar consultas. Conectado a tu sistema y con tu equipo al tanto.',
    updated: '2026-11-18',
  },
  integrations: {
    path: '/integraciones',
    title: 'Integraciones de WhatsApp a pedido: agenda, stock y CRM',
    description:
      'Conectamos Atende con la agenda, el stock o el CRM de tu negocio, a pedido. Mirá qué viene incluido, qué se arma para vos y qué hace falta para empezar.',
    updated: '2026-11-18',
  },
  cases: {
    path: '/casos-de-uso',
    title: 'WhatsApp por rubro: qué puede resolver Atende en tu negocio',
    description:
      'Clínicas, peluquerías, restaurantes, comercios, concesionarias y estudios: qué tarea termina Atende por WhatsApp en cada rubro y qué conexión necesita.',
    updated: '2026-11-18',
  },
  pricing: {
    path: '/precios',
    title: 'Precios y planes del bot de WhatsApp con IA',
    description:
      'Consultá los planes vigentes de Atende sin registrarte. Estimá cuántas respuestas de WhatsApp necesita tu equipo y qué conexiones se cotizan aparte.',
    updated: '2026-11-18',
  },
  faq: {
    path: '/preguntas-frecuentes',
    title: 'Preguntas frecuentes sobre Atende: número, API o QR, planes y límites',
    description:
      'Cómo reservar con tu agenda, recibir pedidos por audio, programar mensajes y pasar un chat a una persona. Consultá los planes y las opciones para tu número.',
    updated: '2026-11-18',
  },
  about: {
    path: '/nosotros',
    title: 'Quiénes somos: Atende, automatización de WhatsApp desde Córdoba',
    description:
      'Atende se hace en Córdoba, Argentina, para que los negocios terminen tareas por WhatsApp. Qué hacemos, cómo trabajamos, qué publicamos y cómo contactarnos.',
    updated: '2026-11-18',
  },
  demo: {
    path: '/demo',
    title: 'Pedí una demo de Atende para tu negocio',
    description:
      'Contanos qué tarea querés sacarte de encima en WhatsApp, como turnos, pedidos o presupuestos, y vemos qué conexión necesita tu negocio antes de contratar.',
    updated: '2026-11-18',
  },
} as const;

export const legalPages = [
  { path: '/terminos-y-condiciones', updated: '2026-06-26' },
  { path: '/politica-de-privacidad', updated: '2026-11-11' },
] as const;

export const site = {
  name: 'Atende',
  domain: 'atende.com.ar',
  url: 'https://www.atende.com.ar',
  appUrl: 'https://app.atende.com.ar',
  tagline: 'Conectado a tu agenda, Atende reserva el turno mientras vos atendés.',
  description:
    'Atende automatiza WhatsApp para empresas y PyMEs argentinas: conectado a tus sistemas, reserva turnos, toma pedidos y cotiza, y responde mensajes de texto a cualquier hora, con tu equipo al tanto.',
  whatsapp: {
    number: '543512901337',
    display: '+54 351 290 1337',
  },
  email: 'hola@atende.com.ar',
  location: 'Córdoba, Argentina',
  legalName: 'atende',
  trustStrip: [
    'API oficial de Meta o QR, a elección',
    'Tu número sigue siendo el mismo',
    'Conexiones a pedido para tu negocio',
    'Hablás con el equipo por WhatsApp o email',
  ] as const,
  // Only real, owner-confirmed public profiles. Consumed by Organization.sameAs.
  sameAs: [] as readonly string[],
} as const;

export type Site = typeof site;

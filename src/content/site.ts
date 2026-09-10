export const site = {
  name: 'atende',
  domain: 'atende.com.ar',
  url: 'https://www.atende.com.ar',
  appUrl: 'https://app.atende.com.ar',
  tagline: 'Tu negocio atendido, incluso cuando vos no estás.',
  description:
    'Automatizá la atención y las consultas de venta por WhatsApp con IA. Atende reúne a tu equipo en una bandeja compartida para empresas y PyMEs argentinas.',
  whatsapp: {
    number: '543512901337',
    display: '+54 351 290 1337',
  },
  email: 'hola@atende.com.ar',
  location: 'Córdoba, Argentina',
  legalName: 'atende',
  trustStrip: [
    'Conectás con QR',
    'Tu número sigue siendo tuyo',
    'Tu equipo puede intervenir',
    'Soporte humano',
  ] as const,
} as const;

export type Site = typeof site;

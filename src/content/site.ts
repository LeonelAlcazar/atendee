export const site = {
  name: 'atende',
  domain: 'atende.com.ar',
  url: 'https://atende.com.ar',
  tagline: 'Tu negocio atendido mientras dormís.',
  description:
    'Bots de atención, turnos y ventas por WhatsApp para PyMEs argentinas. Sin apps, sin contratos, sin que tus clientes aprendan nada nuevo.',
  whatsapp: {
    number: '543512901337',
    display: '+54 351 290 1337',
  },
  email: 'hola@atende.com.ar',
  location: 'Córdoba, Argentina',
  legalName: 'atende',
  trustStrip: [
    'Sin instalación',
    'Sin contratos',
    'Setup en 48h',
    'Soporte humano',
  ] as const,
} as const;

export type Site = typeof site;

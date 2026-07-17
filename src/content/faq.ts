export type FaqItem = {
  q: string;
  a: string;
};

export const faq: FaqItem[] = [
  {
    q: '¿Cómo conecto mi WhatsApp?',
    a: 'Desde el panel de Atende pedís un código QR y lo escaneás con el teléfono que usa tu negocio. El panel te muestra en todo momento si el número está conectado y listo.',
  },
  {
    q: '¿Tengo que cambiar de número?',
    a: 'No. Conectás el WhatsApp que ya usa tu negocio, así tus clientes pueden seguir escribiéndote al mismo lugar de siempre.',
  },
  {
    q: '¿Atende responde todo solo?',
    a: 'Responde las consultas para las que lo preparaste. Si falta información o una conversación necesita a una persona, tu equipo puede tomarla desde la bandeja.',
  },
  {
    q: '¿Puedo sumar a mi equipo?',
    a: 'Sí. Podés invitar a las personas que trabajan con vos para que vean las mismas conversaciones y respondan desde un solo lugar.',
  },
  {
    q: '¿Mis clientes tienen que instalar algo?',
    a: 'No. Para ellos todo sigue pasando en WhatsApp. Tu equipo usa el panel web de Atende para configurar, mirar y responder conversaciones.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Después de crear tu espacio vas a ver los planes disponibles antes de confirmar cualquier pago. Si querés saber cuál te conviene, escribinos y lo vemos con vos.',
  },
];

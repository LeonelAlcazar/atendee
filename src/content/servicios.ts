export type ChatMessage = {
  from: 'them' | 'us';
  text: string;
};

export type Servicio = {
  id: 'atencion' | 'turnos' | 'ventas';
  number: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  conversation: ChatMessage[];
  ctaContext: string;
};

export const servicios: Servicio[] = [
  {
    id: 'atencion',
    number: '01',
    title: 'Atención automática',
    short: 'Respondé las preguntas frecuentes 24/7, sin tener a alguien siempre conectado.',
    description:
      'Un bot que responde lo que tus clientes preguntan todos los días: horarios, ubicación, precios, estado de un pedido. Cuando hace falta, deriva la conversación a una persona sin que el cliente note el cambio.',
    bullets: [
      'Respuestas a preguntas frecuentes en segundos',
      'Derivación a humano cuando la consulta lo requiere',
      'Respuestas distintas según horario (abierto / cerrado)',
      'Historial completo de cada conversación',
    ],
    conversation: [
      { from: 'them', text: '¿A qué hora abren hoy?' },
      { from: 'us', text: 'Hola! Hoy atendemos de 9 a 18hs. ¿Querés sacar turno?' },
      { from: 'them', text: 'Sí, para mañana a la mañana' },
      { from: 'us', text: 'Te paso a Carolina del equipo así te confirma 👇' },
    ],
    ctaContext: 'Hola, quiero saber más sobre Atención automática',
  },
  {
    id: 'turnos',
    number: '02',
    title: 'Turnos por WhatsApp',
    short: 'Tus clientes piden turno por chat. Vos lo ves en tu calendario.',
    description:
      'El cliente escribe, elige día y hora, y queda agendado. Le llega un recordatorio automático antes del turno. Si tiene que cancelar, también lo hace por WhatsApp.',
    bullets: [
      'Reserva paso a paso por WhatsApp',
      'Sincroniza con Google Calendar o tu sistema actual',
      'Recordatorios automáticos 24h y 2h antes',
      'Cancelaciones y reprogramaciones sin llamadas',
    ],
    conversation: [
      { from: 'them', text: 'Quiero un turno para corte' },
      { from: 'us', text: 'Genial. ¿Para qué día?' },
      { from: 'them', text: 'Jueves a la tarde' },
      { from: 'us', text: 'Tengo 16:30 o 18:00. ¿Cuál te queda mejor?' },
      { from: 'them', text: '18hs' },
      { from: 'us', text: 'Listo ✅ Te espero el jueves a las 18hs.' },
    ],
    ctaContext: 'Hola, quiero saber más sobre Turnos por WhatsApp',
  },
  {
    id: 'ventas',
    number: '03',
    title: 'Ventas y seguimiento',
    short: 'Convertí consultas en ventas y recuperá las que se enfrían.',
    description:
      'Califica cada consulta, manda catálogos, fichas técnicas, presupuestos. Si el cliente deja de responder, retoma la conversación con un mensaje a medida unos días después.',
    bullets: [
      'Catálogo y fichas enviadas al instante',
      'Calificación automática de leads',
      'Re-engagement de consultas que se enfriaron',
      'Reportes simples de qué funciona y qué no',
    ],
    conversation: [
      { from: 'them', text: 'Hola, ví el departamento del centro' },
      { from: 'us', text: 'Hola! Te paso ficha completa y fotos 📎' },
      { from: 'us', text: '¿Te gustaría coordinar una visita esta semana?' },
      { from: 'them', text: 'Lo charlo y te aviso' },
      { from: 'us', text: 'Dale, te escribo el viernes así no se pierde 👌' },
    ],
    ctaContext: 'Hola, quiero saber más sobre Ventas y seguimiento',
  },
];

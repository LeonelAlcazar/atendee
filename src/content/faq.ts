export type FaqItem = {
  q: string;
  a: string;
};

// The home answers the five objections that stop a demo request. The long list
// lives in /preguntas-frecuentes.
export const faq: FaqItem[] = [
  {
    q: '¿Tengo que cambiar de número?',
    a: 'No. Seguís con el número que ya usa tu negocio y tus clientes te escriben al mismo WhatsApp. Elegís cómo conectar tu número: con la API oficial de Meta o con un QR.',
  },
  {
    q: '¿Cómo hace Atende para reservar un turno o tomar un pedido?',
    a: 'Lo conectamos con tu agenda, tu stock o tu CRM. La conexión la armamos a pedido, para tu negocio: en la demo nos contás qué sistema usás y qué tarea querés sacarte de encima.',
  },
  {
    q: '¿Qué hace Atende sin conectar mi sistema?',
    a: 'Responde mensajes de texto y notas de voz a cualquier hora, mientras el servicio y tu WhatsApp estén conectados. Manda fotos y videos de tu biblioteca, recuerda datos del contacto y le pasa la conversación a una persona cuando hace falta. Tu equipo también puede programar mensajes para cada día, semana o mes.',
  },
  {
    q: '¿Y si quiero contestar yo?',
    a: 'Marcá la conversación como Necesita humano y el asistente deja de responder en ese chat. Para apagarlo en todo el espacio, pasá a Modo CRM.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Los planes están publicados en la página de precios y los ves sin crear una cuenta. La conexión con tu agenda o tu sistema se cotiza aparte, según lo que necesite tu negocio.',
  },
];

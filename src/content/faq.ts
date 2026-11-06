export type FaqItem = {
  q: string;
  a: string;
};

export const faq: FaqItem[] = [
  {
    q: '¿Qué es Atende?',
    a: 'Atende es un bot de WhatsApp para empresas y PyMEs argentinas, hecho en Córdoba. Conectado a tu agenda o a tu sistema, reserva turnos, registra pedidos y cotiza, y responde mensajes de texto con lo que configurás. Tu equipo trabaja sobre las mismas conversaciones en una bandeja compartida.',
  },
  {
    q: '¿Sirve como chatbot para WhatsApp Business?',
    a: 'Atende se vincula con un QR desde dispositivos vinculados, una función que también tienen las cuentas de WhatsApp Business, y tus clientes te siguen escribiendo al mismo número. No usa la API oficial de Meta. Si tu número está en la app WhatsApp Business, contanos en la demo y lo confirmamos para tu caso.',
  },
  {
    q: '¿Es la API oficial de WhatsApp?',
    a: 'No. Atende se conecta por QR, como un dispositivo vinculado, y no es la API oficial de Meta. No pasa por una aprobación de Meta ni tiene su verificación. Si tu empresa exige la API oficial, hoy Atende no es la opción.',
  },
  {
    q: '¿WhatsApp me puede restringir el número?',
    a: 'Sí, puede pasar, y nadie puede prometerte lo contrario. La conexión por QR no tiene respaldo de Meta. Atende limita el ritmo de envío y frena ante errores repetidos, pero eso no elimina el riesgo. Mandar mensajes a quien no te escribió lo aumenta.',
  },
  {
    q: '¿Cómo pido una conexión con mi agenda, mi stock o mi CRM?',
    a: 'Pedís una demo y nos contás qué sistema usás y qué tarea querés que Atende termine. Vemos qué hace falta y armamos la conexión para tu negocio. Hoy no hay conectores genéricos para activar por tu cuenta: cada conexión se arma a pedido, y el alcance lo definimos con vos antes de contratar.',
  },
  {
    q: '¿Qué hace Atende sin una conexión?',
    a: 'Responde mensajes de texto, deriva a una persona, cierra la conversación, manda fotos y videos de tu biblioteca y recuerda datos del contacto y del negocio. Para un turno o un pedido, junta los datos y tu equipo lo confirma.',
  },
  {
    q: '¿Qué mensajes entiende?',
    a: 'Mensajes de texto. Audios, fotos, videos, documentos, stickers, ubicaciones y grupos no llegan a Atende, así que ni el asistente ni la bandeja los ven. Los seguís viendo en tu WhatsApp.',
  },
  {
    q: '¿Cómo freno al asistente en un chat?',
    a: 'Marcá la conversación como Necesita humano y el asistente deja de responder ahí. Responder desde la bandeja o tocar Asignarme no lo frena. El chat se cierra 12 horas después del último mensaje del contacto, y si vuelve a escribir, responde el asistente. Para apagarlo en todo el espacio, pasá a Modo CRM.',
  },
  {
    q: '¿Puedo probarlo antes de que les responda a mis clientes?',
    a: 'No hay modo de prueba. Apenas conectás el número, Atende les responde a todos tus contactos. Cargá antes qué hace tu negocio y tus preguntas frecuentes, y después probalo desde otro número; usa créditos.',
  },
  {
    q: '¿Tengo que cambiar de número?',
    a: 'No. Conectás el número que ya usás con un QR y tus clientes te siguen escribiendo al mismo WhatsApp. Ellos no instalan nada.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Los planes vigentes y sus respuestas del asistente se ven en la app antes de pagar, y empezás con créditos de bienvenida, sin tarjeta. Las conexiones a pedido las vemos con vos en la demo.',
  },
];

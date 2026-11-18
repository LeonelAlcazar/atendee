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
    a: 'Sí. En la app vinculás el número que ya usa tu negocio escaneando un QR desde Dispositivos vinculados. Tus clientes te siguen escribiendo al mismo WhatsApp.',
  },
  {
    q: '¿Atende usa la API oficial de WhatsApp o un QR?',
    a: 'La conexión que hacés desde la app usa un QR y queda como un dispositivo vinculado. Si tu operación requiere la API oficial de Meta, revisamos el alta, los requisitos y los costos en la demo.',
  },
  {
    q: '¿Cómo pido una conexión con mi agenda, mi stock o mi CRM?',
    a: 'Pedís una demo y nos contás qué sistema usás y qué tarea querés que Atende termine. Vemos qué hace falta y armamos la conexión para tu negocio. Hoy no hay conectores genéricos para activar por tu cuenta: cada conexión se arma a pedido, y el alcance lo definimos con vos antes de contratar.',
  },
  {
    q: '¿Qué hace Atende sin conectar mi agenda o mi sistema?',
    a: 'Responde mensajes de texto a cualquier hora, mientras el servicio y tu WhatsApp estén conectados, deriva a una persona, cierra la conversación, manda fotos y videos de tu biblioteca y recuerda datos del contacto y del negocio. Para un turno o un pedido, junta los datos y tu equipo lo confirma.',
  },
  {
    q: '¿Qué mensajes entiende?',
    a: 'La bandeja recibe texto, audios, fotos, videos, documentos y stickers en chats individuales. Con el asistente activo, una nota de voz se transcribe y el asistente puede responder a partir de esa transcripción. Tu equipo puede abrir las fotos y los documentos en la bandeja. El asistente recibe el texto que acompaña al archivo.',
  },
  {
    q: '¿Cómo freno al asistente en un chat?',
    a: 'Marcá la conversación como Necesita humano para que la siga una persona. Si solo respondés desde la bandeja o tocás Asignarme, el asistente sigue activo. Para apagarlo en todo el espacio, pasá a Modo CRM.',
  },
  {
    q: '¿Puedo probarlo antes de que les responda a mis clientes?',
    a: 'Sí, si Atende habilitó el chat de prueba para tu espacio. Desde el panel podés ensayar una consulta sin gastar respuestas. Las herramientas conectadas pueden realizar acciones reales, así que elegí datos de prueba. Si probás desde otro teléfono por WhatsApp, la respuesta consume saldo.',
  },
  {
    q: '¿Tengo que cambiar de número?',
    a: 'No. Conectás el número que ya usás y tus clientes te siguen escribiendo al mismo WhatsApp. Ellos no instalan nada.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'En la página de precios podés ver los planes generales sin crear una cuenta y estimar cuántas respuestas usarías al mes. Si querés que reserve turnos o registre pedidos en tu sistema, la conexión se cotiza por separado para tu negocio.',
  },
];

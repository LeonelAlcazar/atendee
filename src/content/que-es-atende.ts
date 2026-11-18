import { site } from './site';

// Canonical fact sheet. Keep it dense and plain: people and assistants quote it.
export const definition =
  'Atende es un asistente de WhatsApp para PyMEs argentinas. Con una conexión a medida, reserva un turno en tu agenda, registra un pedido en tu sistema o guarda una consulta en tu CRM. Tu equipo supervisa la conversación desde una bandeja compartida.';

export const positioning =
  'Atende termina la tarea en la conversación: reserva, cotiza, registra pedidos. Lo hace en el número que tu negocio ya usa, conectado a tu sistema con una conexión que armamos a pedido, y con tu equipo al tanto.';

export const facts: { label: string; text: string }[] = [
  {
    label: 'Qué es',
    text: 'Un asistente con IA para el WhatsApp de tu negocio, más una bandeja compartida para tu equipo.',
  },
  {
    label: 'Para quién',
    text: 'Negocios y PyMEs argentinas que atienden por WhatsApp.',
  },
  { label: 'Dónde se hace', text: 'Córdoba, Argentina.' },
  {
    label: 'Cómo se conecta',
    text: 'Escaneás el QR del panel con el teléfono de tu negocio. Si necesitás la API oficial de Meta, consultá el alta en la demo.',
  },
  { label: 'Qué recibe', text: 'Textos, notas de voz, fotos, videos, documentos y stickers de chats individuales.' },
  {
    label: 'Cuándo responde',
    text: 'A cualquier hora, mientras el servicio y tu WhatsApp estén conectados. No es una garantía de disponibilidad, y tampoco significa que haya alguien de tu equipo atendiendo.',
  },
  {
    label: 'Cómo se usa',
    text: 'Tus clientes siguen en WhatsApp y no instalan nada. Tu equipo entra desde el navegador, en la computadora o en el celu.',
  },
  {
    label: 'Contacto',
    text: `${site.email} · ${site.whatsapp.display}`,
  },
];

export const included: string[] = [
  'Responde mensajes de texto con lo que le contaste de tu negocio y con tus preguntas frecuentes.',
  'Si tu espacio tiene habilitado el chat de prueba, podés probar el asistente en el panel sin gastar créditos. Sus herramientas pueden ejecutar acciones reales.',
  'Cuando un cliente manda una nota de voz, usa la transcripción disponible para responder.',
  'Manda fotos y videos de tu biblioteca.',
  'Recuerda datos del contacto y del negocio.',
  'Deriva a una persona: avisa y deja la conversación marcada para tu equipo.',
  'Cierra la conversación cuando quedó resuelta.',
];

export const inbox =
  'Todo tu equipo trabaja sobre las mismas conversaciones. Asignás la consulta a un equipo o a una persona, ponés etiquetas y dejás notas que tu cliente no ve. Buscás por contacto o teléfono y filtrás por estado, etiqueta o responsable.';

export const connected: string[] = [
  'Reserva, reprograma o cancela turnos, conectado a tu agenda.',
  'Toma reservas y consulta disponibilidad.',
  'Consulta stock y precios, y registra pedidos.',
  'Cotiza y calcula financiación.',
  'Registra interesados en tu CRM o planilla.',
  'Envía un aviso de retiro cuando tu sistema informa que el pedido está listo, con una integración a pedido.',
];

export const notDone: string[] = [
  'Los mensajes de grupos quedan fuera de la bandeja. En los chats individuales, una persona revisa el contenido de imágenes y documentos. El asistente solo recibe el texto que acompaña al archivo.',
  'El asistente responde cuando le escriben. Tu equipo puede programar mensajes recurrentes desde Contactos.',
  'No trae conexiones listas para activar: cada una se arma para un negocio.',
  'No lee todo el historial. Tiene en cuenta la conversación en curso y las notas que guardó.',
  'No se frena porque alguien del equipo responda. Para seguir vos, marcá la conversación como Necesita humano.',
  'Las derivaciones se identifican en la bandeja por el estado Necesita humano. En Suscripción podés consultar el saldo de respuestas.',
  'No cobra pagos ni señas.',
  'No es para consultas clínicas: dejá escrito en Contexto del asistente que van a una persona.',
  'No funciona en Instagram, Messenger ni otros canales. Solo en WhatsApp.',
];

export const audiences: { slug: string; name: string; action: string }[] = [
  {
    slug: 'clinicas-y-consultorios',
    name: 'Clínicas, consultorios y veterinarias',
    action: 'Reservar o reprogramar el turno',
  },
  {
    slug: 'peluquerias-y-estetica',
    name: 'Peluquerías, estética y gimnasios',
    action: 'Reservar el lugar en la agenda',
  },
  {
    slug: 'restaurantes-y-hoteles',
    name: 'Restaurantes y hoteles',
    action: 'Tomar la reserva',
  },
  {
    slug: 'comercios-y-distribuidoras',
    name: 'Comercios y distribuidoras',
    action: 'Consultar stock y registrar el pedido',
  },
  {
    slug: 'concesionarias-e-inmobiliarias',
    name: 'Concesionarias e inmobiliarias',
    action: 'Cotizar, calcular financiación, registrar al interesado y agendar la visita',
  },
  {
    slug: 'servicios-profesionales',
    name: 'Servicios profesionales',
    action: 'Calificar la consulta y registrarla',
  },
];

export const nextLinks: { href: string; title: string; text: string }[] = [
  {
    href: '/servicios',
    title: 'Soluciones',
    text: 'Turnos y reservas, pedidos y ventas, atención al cliente.',
  },
  {
    href: '/integraciones',
    title: 'Integraciones',
    text: 'Qué hace una conexión y cómo la armamos a pedido.',
  },
  {
    href: '/casos-de-uso',
    title: 'Por rubro',
    text: 'Qué tarea termina Atende en cada tipo de negocio.',
  },
  {
    href: '/precios',
    title: 'Precios',
    text: 'Cómo se cobra, qué es un crédito y qué pasa si se terminan.',
  },
  {
    href: '/preguntas-frecuentes',
    title: 'Preguntas frecuentes',
    text: 'Tu número, cómo se conecta, los límites y cómo frenás al asistente.',
  },
  {
    href: '/nosotros',
    title: 'Nosotros',
    text: 'Quién hace Atende y cómo contactarnos.',
  },
];

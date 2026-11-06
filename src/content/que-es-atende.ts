import { site } from './site';

// Canonical fact sheet. Keep it dense and plain: people and assistants quote it.
export const definition =
  'Atende es un asistente de WhatsApp para negocios argentinos: conectado a los sistemas de cada negocio, reserva turnos, toma pedidos y cotiza dentro de la conversación, y responde mensajes de texto a cualquier hora, con el equipo al tanto desde una bandeja compartida.';

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
    text: 'Elegís cómo conectar tu número: con la API oficial de Meta o con un QR. Sigue siendo el número que tu negocio ya usa.',
  },
  { label: 'Qué recibe', text: 'Mensajes de texto de WhatsApp.' },
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
  'Manda fotos y videos de tu biblioteca.',
  'Recuerda datos del contacto y del negocio.',
  'Deriva a una persona: avisa y deja la conversación marcada para tu equipo.',
  'Cierra la conversación cuando quedó resuelta.',
];

export const inbox =
  'Todo tu equipo trabaja sobre las mismas conversaciones. Asignás responsable, ponés etiquetas y dejás notas que tu cliente no ve. Buscás por contacto o teléfono y filtrás por estado, etiqueta o responsable.';

export const connected: string[] = [
  'Reserva, reprograma o cancela turnos, conectado a tu agenda.',
  'Toma reservas y consulta disponibilidad.',
  'Consulta stock y precios, y registra pedidos.',
  'Cotiza y calcula financiación.',
  'Registra interesados en tu CRM o planilla.',
  'Manda recordatorios y seguimientos, armados a pedido para tu negocio.',
];

export const notDone: string[] = [
  'No recibe audios, imágenes, videos, documentos, stickers ni ubicaciones, y tampoco mensajes de grupos. No los ve el asistente ni aparecen en la bandeja.',
  'No empieza conversaciones por su cuenta. Recordatorios y seguimientos son a pedido.',
  'No trae conexiones listas para activar: cada una se arma para un negocio.',
  'No tiene modo de prueba. Una vez conectado, le responde a cada contacto. Probalo desde otro número; usa créditos.',
  'No lee todo el historial. Tiene en cuenta la conversación en curso y las notas que guardó.',
  'No se frena porque alguien del equipo responda. Para seguir vos, marcá la conversación como Necesita humano.',
  'No alerta a tu equipo cuando deriva ni cuando se terminan las respuestas. Hay que mirar la bandeja y la pantalla Plan.',
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

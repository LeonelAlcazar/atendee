import type { ChatMessage } from './servicios';

export const connectionRows: { label: string; text: string }[] = [
  {
    label: 'Tu agenda',
    text: 'Ofrece los horarios libres, reserva, reprograma y cancela el turno.',
  },
  {
    label: 'Tu sistema de reservas',
    text: 'Consulta disponibilidad y toma la reserva.',
  },
  {
    label: 'Tu stock y tus precios',
    text: 'Dice si hay y a cuánto, y registra el pedido.',
  },
  {
    label: 'Tus listas y tus cuotas',
    text: 'Cotiza y calcula la financiación con tus reglas.',
  },
  {
    label: 'Tu CRM o tu planilla',
    text: 'Registra al interesado con lo que pidió.',
  },
  {
    label: 'Tus turnos y tus contactos',
    text: 'Manda recordatorios y seguimientos armados para tu negocio, a quienes aceptaron recibirlos. Los mensajes que la gente no pidió, en un número conectado por QR, aumentan el riesgo de restricción.',
  },
];

export const needs: { title: string; text: string }[] = [
  {
    title: 'Qué sistema usás',
    text: 'Tu agenda, tu sistema de gestión, tu CRM o tu planilla, y quién lo administra.',
  },
  {
    title: 'Un acceso a ese sistema',
    text: 'Una cuenta o credencial que permita leer y escribir solo lo necesario. Si no sabés cuál, lo vemos con quien administra ese sistema.',
  },
  {
    title: 'Qué puede hacer el asistente',
    text: 'Qué hace solo y qué pasa siempre por una persona. Por ejemplo: reservar sí, cancelar el mismo día no.',
  },
];

export const steps: { title: string; text: string }[] = [
  {
    title: 'Nos contás la tarea',
    text: 'Qué se repite, qué tiene que quedar hecho y en qué sistema.',
  },
  {
    title: 'Vemos tu sistema',
    text: 'Miramos cómo se accede. Si no permite conectarse, te lo decimos antes de cotizar.',
  },
  {
    title: 'Te cotizamos',
    text: 'Cada conexión se cotiza para cada negocio, según el sistema y lo que tenga que hacer.',
  },
  {
    title: 'La armamos y probamos',
    text: 'Probamos casos reales con vos, desde otro número. Las pruebas usan créditos.',
  },
  {
    title: 'Queda en tu espacio',
    text: 'Aparece en Herramientas conectadas y el asistente la usa. Tu equipo sigue mirando la bandeja.',
  },
];

export const rescheduleChat: ChatMessage[] = [
  { from: 'them', text: 'Tengo turno el martes a las 10 y no llego. ¿Se puede pasar?' },
  { from: 'us', text: 'Tengo miércoles 9:30 o jueves 11:00. ¿Cuál te queda mejor?' },
  { from: 'them', text: 'El jueves' },
  { from: 'us', text: 'Listo, tu turno pasó al jueves a las 11:00. El martes quedó libre.' },
];

export const demoChat: ChatMessage[] = [
  { from: 'them', text: '¿Tienen la 150 en rojo? ¿Se puede en cuotas?' },
  { from: 'us', text: 'Sí, hay una en rojo. Se puede en 6 o 12 pagos. ¿Cuál te calculo?' },
  { from: 'them', text: 'En 12. Me llamo Martín' },
  {
    from: 'us',
    text: 'Listo, Martín. Te calculé las 12 cuotas con patente y administración, y te anoté como interesado.',
  },
];

export const serverTips: { title: string; text: string }[] = [
  {
    title: 'Reportá el resultado real',
    text: 'Devolvé isError: true cuando algo falla y el resultado exacto cuando sale bien. El asistente está instruido para afirmar solo lo que tu herramienta reporta.',
  },
  {
    title: 'Hacé idempotentes las escrituras',
    text: 'Una ejecución puede repetirse y no llega una clave de idempotencia. Deduplicá con un dato natural del pedido o del contacto.',
  },
  {
    title: 'Describí cada herramienta',
    text: 'Decí cuándo llamarla y qué datos necesita. El modelo solo tiene esa descripción para decidir.',
  },
  {
    title: 'Separá lecturas de escrituras',
    text: 'Una lectura fresca le gana a una pregunta frecuente. Una escritura debería pedir los datos exactos del contacto.',
  },
  {
    title: 'Usá el teléfono verificado',
    text: 'En general viene en el contexto de la conversación, así que no hace falta pedírselo al contacto. Si WhatsApp no lo expone, el asistente lo pide.',
  },
  {
    title: 'Cuidá nombres y acceso',
    text: 'finish_conversation y escalate_to_human están reservados. Protegé tu servidor con una credencial propia y mandala en los encabezados.',
  },
];

export const compareRows: [string, string, string][] = [
  ['Dirección', 'El asistente llama a tus sistemas', 'Tu cliente de IA lee y manda como tu espacio'],
  ['Suma acciones al asistente', 'Sí', 'No'],
  ['Planes', 'Planes con IA', 'Todos, incluido Plan CRM'],
  ['Acceso', 'Encabezados fijos', 'OAuth, con consentimiento por permiso'],
  ['Qué puede hacer', 'Lo que exponga tu servidor', 'Leer contactos, mensajes y estado, y mandar texto'],
  [
    'Límites',
    'Los de tu servidor',
    'Permisos de 30 días, revocables. 30 envíos por minuto, solo en conversaciones abiertas. Confirma que el mensaje quedó en cola, no que se entregó',
  ],
  ['Dónde está', 'Asistente, Herramientas conectadas', 'Menú Integraciones MCP'],
];

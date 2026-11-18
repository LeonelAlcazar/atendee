// Canonical public status of what Atende does today. Used on the home,
// /que-es-atende, /integraciones and /llms.txt.
export type ActionStatus = 'included' | 'on-request';

export type ActionStatusRow = {
  action: string;
  status: ActionStatus;
  label: string;
};

export const actionStatus: ActionStatusRow[] = [
  { action: 'Responder mensajes de texto a cualquier hora', status: 'included', label: 'Incluido en los planes con IA' },
  { action: 'Responder una nota de voz desde su transcripción', status: 'included', label: 'Incluido con el asistente activo' },
  { action: 'Programar mensajes diarios, semanales o mensuales', status: 'included', label: 'Incluido. Tu equipo elige el texto y los destinatarios en Contactos' },
  { action: 'Derivar a una persona y cerrar la conversación', status: 'included', label: 'Incluido en los planes con IA' },
  { action: 'Enviar fotos y videos de tu biblioteca', status: 'included', label: 'Incluido en los planes con IA' },
  { action: 'Recordar datos del contacto y del negocio', status: 'included', label: 'Incluido en los planes con IA' },
  { action: 'Reservar, reprogramar o cancelar turnos', status: 'on-request', label: 'A pedido, conectado a tu agenda' },
  { action: 'Tomar reservas y consultar disponibilidad', status: 'on-request', label: 'A pedido, conectado a tu sistema' },
  { action: 'Registrar pedidos y consultar stock o precios', status: 'on-request', label: 'A pedido, conectado a tu sistema' },
  { action: 'Cotizar y calcular financiación', status: 'on-request', label: 'A pedido, conectado a tu sistema' },
  { action: 'Registrar interesados en tu CRM o planilla', status: 'on-request', label: 'A pedido, conectado a tu sistema' },
  { action: 'Avisar por WhatsApp que un pedido está listo', status: 'on-request', label: 'A pedido, con un envío iniciado por tu sistema' },
];

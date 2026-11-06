// Canonical public status of what Atende does today. Used on the home,
// /que-es-atende and /integraciones. Owner decision 2026-11-06: connected
// actions and reminders are built on request for each business.
export type ActionStatus = 'included' | 'on-request';

export type ActionStatusRow = {
  action: string;
  status: ActionStatus;
  label: string;
};

export const actionStatus: ActionStatusRow[] = [
  { action: 'Responder mensajes de texto a cualquier hora', status: 'included', label: 'Incluido en los planes con IA' },
  { action: 'Derivar a una persona y cerrar la conversación', status: 'included', label: 'Incluido en los planes con IA' },
  { action: 'Enviar fotos y videos de tu biblioteca', status: 'included', label: 'Incluido en los planes con IA' },
  { action: 'Recordar datos del contacto y del negocio', status: 'included', label: 'Incluido en los planes con IA' },
  { action: 'Reservar, reprogramar o cancelar turnos', status: 'on-request', label: 'A pedido, conectado a tu agenda' },
  { action: 'Tomar reservas y consultar disponibilidad', status: 'on-request', label: 'A pedido, conectado a tu sistema' },
  { action: 'Registrar pedidos y consultar stock o precios', status: 'on-request', label: 'A pedido, conectado a tu sistema' },
  { action: 'Cotizar y calcular financiación', status: 'on-request', label: 'A pedido, conectado a tu sistema' },
  { action: 'Registrar interesados en tu CRM o planilla', status: 'on-request', label: 'A pedido, conectado a tu sistema' },
  { action: 'Recordatorios y seguimientos', status: 'on-request', label: 'A pedido, armados para tu negocio' },
];

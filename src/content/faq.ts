export type FaqItem = {
  q: string;
  a: string;
};

export const faq: FaqItem[] = [
  {
    q: '¿Qué es Atende y para qué empresas sirve?',
    a: 'Atende es un software de atención y ventas por WhatsApp con inteligencia artificial para empresas y PyMEs argentinas. Combina respuestas configuradas con la información del negocio, una bandeja compartida y la posibilidad de que una persona continúe la conversación.',
  },
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
    a: 'Los planes disponibles, sus precios y los límites de respuestas del agente se consultan en la app antes de confirmar el pago. Si necesitás una integración o querés evaluar el alcance para tu empresa, podés solicitar una demo y una propuesta comercial.',
  },
  {
    q: '¿Se integra con mi agenda, CRM o sistema de gestión?',
    a: 'Las integraciones se evalúan según el sistema, los accesos disponibles y el flujo que necesitás. Las reservas, consultas de stock y recordatorios automáticos requieren confirmar una integración; no están incluidos por defecto.',
  },
  {
    q: '¿Qué tengo que preparar para empezar?',
    a: 'Necesitás acceso al WhatsApp del negocio para vincularlo por QR, información actualizada sobre tus servicios y preguntas frecuentes, y una persona que revise las respuestas y atienda las derivaciones. El alcance y los tiempos de configuración dependen de tu operación.',
  },
];

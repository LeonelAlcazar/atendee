import type { FaqItem } from './faq';

export type ChatMessage = { from: 'them' | 'us'; text: string };

export type Servicio = {
  id: 'atencion' | 'turnos' | 'ventas';
  slug: string;
  number: string;
  title: string;
  seoTitle: string;
  short: string;
  description: string;
  bullets: string[];
  conversation: ChatMessage[];
  ctaContext: string;
  fit: string;
  requirements: string[];
  scope: string;
  workflow: { title: string; text: string }[];
  faq: FaqItem[];
};

export const servicios: Servicio[] = [
  {
    id: 'atencion',
    slug: 'atencion-automatica-whatsapp',
    number: '01',
    title: 'Atención automática por WhatsApp con IA',
    seoTitle: 'Atención al cliente por WhatsApp con IA',
    short:
      'Respondé preguntas frecuentes por WhatsApp y derivá a tu equipo desde una bandeja compartida. Para empresas y PyMEs argentinas.',
    description:
      'Atende es un asistente de IA para la atención al cliente por WhatsApp. Responde con la información que configurás sobre tu empresa: horarios, ubicación, servicios y condiciones comerciales. Tu equipo ve el historial y puede continuar la conversación desde el panel web.',
    bullets: [
      'Respuestas a preguntas frecuentes, incluso fuera de horario',
      'Información y tono configurados para tu negocio',
      'Historial compartido para el equipo',
      'Derivación a una persona cuando la consulta lo requiere',
    ],
    conversation: [
      { from: 'them', text: '¿A qué hora abren hoy?' },
      {
        from: 'us',
        text: '¡Hola! Hoy atendemos de 9 a 18. ¿En qué podemos ayudarte?',
      },
      { from: 'them', text: 'Necesito cambiar un pedido que hice ayer' },
      { from: 'us', text: 'Te paso con el equipo para que revise tu pedido.' },
    ],
    ctaContext:
      'Hola, quiero evaluar la atención automática por WhatsApp para mi empresa',
    fit: 'Para responsables de atención y dueños de PyMEs que reciben las mismas preguntas todos los días, acumulan mensajes fuera de horario o necesitan compartir la atención entre varias personas.',
    requirements: [
      'El número de WhatsApp del negocio y acceso al teléfono para vincularlo por QR.',
      'Preguntas frecuentes, horarios y condiciones comerciales actualizados.',
      'Una persona responsable de revisar respuestas y atender las derivaciones.',
    ],
    scope:
      'Las respuestas dependen de la información configurada y de la conexión de WhatsApp. Consultar datos en tiempo real, como el estado de un pedido en otro sistema, requiere una integración que se evalúa por separado.',
    workflow: [
      {
        title: 'Prepará las respuestas',
        text: 'Cargá las preguntas frecuentes y definí qué información puede comunicar Atende. Probá consultas habituales antes de usarlo con clientes.',
      },
      {
        title: 'Conectá tu número',
        text: 'Vinculá WhatsApp desde el panel con un QR. Tus clientes siguen escribiendo al número que conocen.',
      },
      {
        title: 'Supervisá y ajustá',
        text: 'Revisá el historial, intervení cuando haga falta y actualizá las respuestas cuando cambien tus horarios o condiciones.',
      },
    ],
    faq: [
      {
        q: '¿Qué puede responder un chatbot de WhatsApp para empresas?',
        a: 'Atende puede responder preguntas sobre horarios, ubicación, servicios y condiciones que hayas configurado. Los datos que cambian en otro sistema, como stock o estado de pedidos, requieren una integración habilitada.',
      },
      {
        q: '¿La atención automática reemplaza a mi equipo?',
        a: 'Atende se ocupa de consultas repetidas. Tu equipo supervisa la bandeja compartida y puede tomar una conversación para resolver excepciones, reclamos o decisiones comerciales.',
      },
      {
        q: '¿Atende puede responder fuera del horario comercial?',
        a: 'Sí, puede responder consultas configuradas fuera del horario comercial mientras el servicio y la conexión estén activos. La disponibilidad de una persona depende del horario de tu equipo.',
      },
    ],
  },
  {
    id: 'turnos',
    slug: 'turnos-whatsapp',
    number: '02',
    title: 'Consultas y solicitudes de turnos por WhatsApp',
    seoTitle: 'Gestión de consultas y turnos por WhatsApp',
    short:
      'Recibí solicitudes de turnos por WhatsApp con IA y reuní la información para tu equipo. Evaluá el alcance y las integraciones de agenda con Atende.',
    description:
      'Atende responde preguntas sobre servicios y horarios, pide los datos necesarios para solicitar un turno y deja el contexto en la bandeja. Tu equipo confirma la disponibilidad. Si necesitás reservas automáticas, revisamos la integración con tu agenda antes de definir el alcance.',
    bullets: [
      'Información sobre servicios, ubicación y horarios',
      'Solicitud de servicio, día y preferencia horaria por chat',
      'Contexto visible para que recepción confirme el turno',
      'Evaluación de integraciones con la agenda que ya usás',
    ],
    conversation: [
      { from: 'them', text: 'Quiero un turno para corte' },
      { from: 'us', text: '¡Dale! ¿Qué día y horario preferís?' },
      { from: 'them', text: 'Jueves a la tarde' },
      {
        from: 'us',
        text: 'Te paso con el equipo para confirmar un horario. El turno todavía no está reservado.',
      },
    ],
    ctaContext:
      'Hola, quiero evaluar consultas y solicitudes de turnos por WhatsApp para mi negocio',
    fit: 'Para peluquerías, estéticas, consultorios y empresas de servicios donde la recepción necesita reunir la información de cada solicitud mientras atiende presencialmente.',
    requirements: [
      'Servicios ofrecidos, duración orientativa y horarios de atención.',
      'Los datos mínimos que tu equipo necesita para confirmar un turno.',
      'El nombre de tu agenda y las funciones que necesitás integrar, si buscás reservas automáticas.',
    ],
    scope:
      'Recibir una solicitud no confirma una reserva. La consulta de disponibilidad, la creación de turnos, las cancelaciones y los recordatorios automáticos dependen de una integración acordada; no están incluidos por defecto.',
    workflow: [
      {
        title: 'Respondé lo habitual',
        text: 'Atende informa sobre los servicios y horarios que cargaste, para que la persona sepa cómo avanzar.',
      },
      {
        title: 'Reuní la solicitud',
        text: 'La conversación recoge el servicio, el día y la preferencia horaria, sin prometer disponibilidad que no fue verificada.',
      },
      {
        title: 'Confirmá con tu agenda',
        text: 'Recepción revisa el pedido y confirma el turno. Una automatización completa se define después de evaluar el sistema de agenda.',
      },
    ],
    faq: [
      {
        q: '¿Atende confirma turnos automáticamente?',
        a: 'En el flujo básico, Atende reúne la solicitud y tu equipo confirma la disponibilidad. Para reservar automáticamente se necesita una integración con la agenda, evaluada y acordada antes de implementarla.',
      },
      {
        q: '¿Se conecta con Google Calendar o mi sistema de turnos?',
        a: 'La compatibilidad se evalúa según el sistema y los accesos disponibles. Contanos qué agenda usás para confirmar qué se puede conectar, el alcance y las condiciones de implementación.',
      },
      {
        q: '¿Incluye recordatorios automáticos?',
        a: 'Los recordatorios no forman parte del flujo básico de consultas. Si los necesitás, incluí esa necesidad al solicitar la demo para evaluar su implementación.',
      },
    ],
  },
  {
    id: 'ventas',
    slug: 'ventas-whatsapp',
    number: '03',
    title: 'Atención de consultas de venta por WhatsApp',
    seoTitle: 'WhatsApp para ventas y equipos comerciales',
    short:
      'Atendé consultas comerciales por WhatsApp con IA. Reuní la necesidad del cliente y compartí el historial con tu equipo de ventas desde Atende.',
    description:
      'Atende atiende la primera consulta comercial con la información de tu negocio, pregunta qué busca el cliente y deja el contexto disponible para tus vendedores. El equipo retoma la conversación para revisar disponibilidad, preparar una propuesta y avanzar con el cierre.',
    bullets: [
      'Respuestas sobre productos, servicios y condiciones configuradas',
      'Preguntas para entender la necesidad del cliente',
      'Conversaciones e historial accesibles para tus vendedores',
      'Intervención humana para presupuestos y excepciones comerciales',
    ],
    conversation: [
      { from: 'them', text: 'Hola, busco equipamiento para mi local' },
      {
        from: 'us',
        text: '¡Hola! ¿Qué tipo de negocio tenés y qué equipo necesitás?',
      },
      {
        from: 'them',
        text: 'Una cafetería. Necesito una máquina para el mostrador',
      },
      {
        from: 'us',
        text: 'Te paso con ventas para que revise las opciones y prepare una propuesta.',
      },
    ],
    ctaContext:
      'Hola, quiero evaluar Atende para las consultas de venta de mi empresa',
    fit: 'Para equipos comerciales, comercios e inmobiliarias que reciben consultas por WhatsApp y necesitan entender el interés de cada contacto antes de dedicar tiempo a una propuesta.',
    requirements: [
      'Productos o servicios y condiciones comerciales que se pueden comunicar.',
      'Preguntas de calificación: necesidad, cantidad, zona o plazo, según tu negocio.',
      'Criterios para pasar la conversación a ventas y un responsable de continuarla.',
    ],
    scope:
      'Los presupuestos definitivos y las condiciones especiales quedan a cargo de tu equipo, salvo una integración acordada. El acceso a stock, CRM, catálogos externos y los mensajes proactivos de seguimiento se evalúan por separado.',
    workflow: [
      {
        title: 'Atendé el primer contacto',
        text: 'Respondé las dudas que ya tienen una respuesta definida y explicá qué información necesita ventas para avanzar.',
      },
      {
        title: 'Entendé la oportunidad',
        text: 'Configurá preguntas útiles para tu proceso: producto, cantidad, ubicación o fecha prevista de compra.',
      },
      {
        title: 'Continuá con contexto',
        text: 'Un vendedor lee el historial en la bandeja compartida y sigue la conversación para preparar la propuesta.',
      },
    ],
    faq: [
      {
        q: '¿Cómo ayuda Atende a un equipo de ventas?',
        a: 'Responde consultas iniciales con la información configurada y reúne la necesidad del cliente en la conversación. Los vendedores pueden revisar el historial y continuar desde la misma bandeja.',
      },
      {
        q: '¿Atende envía presupuestos o consulta stock en tiempo real?',
        a: 'Puede comunicar información comercial configurada. Calcular presupuestos o consultar stock en otro sistema requiere una integración habilitada y reglas comerciales definidas.',
      },
      {
        q: '¿Hace seguimiento automático de contactos que dejaron de responder?',
        a: 'El envío proactivo de seguimientos no está incluido por defecto. Tu equipo puede retomar las conversaciones desde la bandeja; cualquier automatización adicional se evalúa según el caso.',
      },
    ],
  },
];

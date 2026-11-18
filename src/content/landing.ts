// Copy for the home. Every connected action stays conditional: it needs a
// connection built on request for each business (see SPEC section 3).
export const landing = {
  hero: {
    eyebrow: 'WhatsApp para PyMEs argentinas',
    titleBefore: 'Bot de WhatsApp que',
    titleAccent: 'reserva turnos y registra pedidos',
    titleAfter: 'mientras vos atendés.',
    description:
      'Conectado a tu agenda, Atende reserva el turno. Conectado a tu stock, consulta si hay mercadería y registra el pedido. Armamos la conexión para tu negocio y tu equipo sigue cada conversación desde la bandeja.',
    primaryCta: 'Pedí una demo',
    secondaryCta: 'Ver planes y precios',
    signupLink: 'Crear mi espacio',
  },
  preview: {
    contact: 'Lucía M.',
    status: 'Esperando usuario',
    messages: [
      { from: 'them', text: '¿Tenés una 110 en rojo?' },
      { from: 'us', text: 'Sí, hay una 110 roja en stock. ¿Querés que registre tu interés para ventas?' },
      { from: 'them', text: 'Sí, soy Lucía. Me interesa la roja.' },
      { from: 'us', text: 'Listo, Lucía. Registré tu consulta por la 110 roja.' },
    ],
    result: {
      label: 'Consulta registrada',
      detail: '110 roja · interés guardado en la planilla',
    },
    caption:
      'Ejemplo ilustrativo de la demo de motos de Atende, con el stock y los interesados en Google Sheets.',
    inbox: [
      { name: 'Lucía M.', line: 'Esperando usuario', active: true },
      { name: 'Martín R.', line: 'Necesita humano', active: false },
      { name: 'Sofía P.', line: 'En conversación', active: false },
    ],
  },
  tasks: {
    eyebrow: 'Tareas terminadas, por rubro',
    titleBefore: 'Tu cliente escribe.',
    titleAccent: 'La tarea queda hecha.',
    description:
      'Cada rubro tiene una tarea que se repite todo el día. Elegí la tuya y mirá qué hace Atende, qué conexión necesita y hasta dónde llega.',
    columns: ['Rubro', 'Tu cliente escribe', 'Queda hecho'],
    items: [
      {
        slug: 'clinicas-y-consultorios',
        trade: 'Clínicas, consultorios y veterinarias',
        message: 'Necesito pasar el turno del martes para el jueves',
        result: 'Turno reprogramado',
        connection: 'Conectado a tu agenda',
      },
      {
        slug: 'peluquerias-y-estetica',
        trade: 'Peluquerías, estética y gimnasios',
        message: '¿Tenés lugar el sábado a la mañana para color?',
        result: 'Lugar reservado',
        connection: 'Conectado a tu agenda',
      },
      {
        slug: 'restaurantes-y-hoteles',
        trade: 'Restaurantes y hoteles',
        message: 'Mesa para seis el viernes a las 21',
        result: 'Reserva tomada',
        connection: 'Conectado a tu sistema de reservas',
      },
      {
        slug: 'comercios-y-distribuidoras',
        trade: 'Comercios y distribuidoras',
        message: '¿Tenés 20 cajas para retirar mañana?',
        result: 'Stock consultado y pedido registrado',
        connection: 'Conectado a tu sistema',
      },
      {
        slug: 'concesionarias-e-inmobiliarias',
        trade: 'Concesionarias e inmobiliarias',
        message: '¿Cómo me queda en 12 cuotas? El sábado puedo ir a verla',
        result: 'Cuota calculada, interesado registrado y visita agendada',
        connection: 'Conectado a tu sistema',
      },
      {
        slug: 'servicios-profesionales',
        trade: 'Servicios profesionales',
        message: 'Me despidieron ayer y quiero saber qué me corresponde',
        result: 'Consulta calificada y registrada',
        connection: 'Conectado a tu CRM',
      },
    ],
    note: 'Ejemplos ilustrativos. Cada acción funciona con la conexión armada para tu negocio.',
    allLink: 'Ver los seis rubros',
    byTaskLabel: 'O elegí por tarea:',
    byTask: [
      { slug: 'turnos-whatsapp', label: 'turnos y reservas' },
      { slug: 'ventas-whatsapp', label: 'pedidos y ventas' },
      { slug: 'atencion-automatica-whatsapp', label: 'atención automática' },
    ],
  },
  status: {
    eyebrow: 'Qué funciona hoy',
    title: 'Qué viene incluido y qué armamos a pedido.',
    description:
      'Para contestar un audio alcanza con tener el asistente activo. Para confirmar un turno, hace falta que Atende pueda consultar y escribir en tu agenda.',
    link: 'Cómo armamos cada integración',
    demoLabel: 'Una demo que ya funciona',
    demoText:
      'En nuestra demo de concesionaria podés ver cómo se consulta el stock, se calcula una financiación y se guarda al interesado en Google Sheets.',
  },
  connect: {
    eyebrow: 'Cómo se conecta',
    title: 'Cómo conectar tu WhatsApp y la herramienta que usás.',
    selfLabel: 'Lo hacés vos, en la app',
    steps: [
      {
        number: '01',
        title: 'Creás tu espacio',
        text: 'Entrás a la app y le ponés el nombre de tu negocio.',
      },
      {
        number: '02',
        title: 'Le contás qué hace tu negocio',
        text: 'Qué vendés, qué puede resolver y qué tono usar.',
      },
      {
        number: '03',
        title: 'Invitás a tu equipo',
        text: 'Cada persona entra con su cuenta y ve las mismas conversaciones.',
      },
      {
        number: '04',
        title: 'Activás créditos o un plan',
        text: 'Empezás con créditos de bienvenida, sin tarjeta, o elegís un plan. Un crédito es una respuesta del asistente. Con eso se abre el panel, donde sumás tus preguntas frecuentes, fotos y videos.',
      },
      {
        number: '05',
        title: 'Conectás tu número',
        text: 'Para vincular tu número desde la app, abrí Dispositivos vinculados en el teléfono y escaneá el QR que ves en otra pantalla. Si tu negocio requiere la API oficial de Meta, consultá el alta y el alcance en la demo.',
      },
    ],
    requestLabel: 'Lo armamos nosotros, a pedido',
    requestTitle: 'La conexión que termina la tarea',
    requestText:
      'Nos contás qué sistema usás y qué tarea querés sacarte de encima. Armamos la conexión para tu negocio y el asistente la usa en la conversación.',
    nodes: [
      { name: 'Tu WhatsApp', text: 'El número que ya usás', link: '' },
      { name: 'Atende', text: 'Entiende el pedido y usa la conexión', link: 'Vincular el número' },
      { name: 'Tu sistema', text: 'Agenda, stock o CRM', link: 'A pedido' },
    ],
    requestCta: 'Contanos qué sistema usás',
    integrationsLink: 'Ver integraciones',
    note: 'Si tu espacio tiene habilitado el chat de prueba, podés probar el asistente en el panel sin gastar respuestas. Las acciones sobre herramientas conectadas pueden ser reales. Si le escribís desde otro teléfono por WhatsApp, se consumen respuestas.',
  },
  team: {
    eyebrow: 'Tu equipo al tanto',
    titleBefore: 'Frenás un chat',
    titleAccent: 'o apagás todo.',
    description:
      'Las acciones corren con tu equipo supervisando. Todos ven las mismas conversaciones y deciden cuándo sigue una persona.',
    pause: {
      label: 'Estado de la conversación',
      value: 'Necesita humano',
      title: 'Marcás ese chat y el asistente deja de responder ahí.',
      text: 'Si seguís la conversación vos, marcá Necesita humano. Responder desde la bandeja o tocar Asignarme deja al asistente activo.',
    },
    off: {
      on: 'Asistente activo',
      off: 'Modo CRM',
      title: 'Lo apagás para todo el espacio.',
      text: 'Con un botón pasás a Modo CRM y tu equipo responde a mano.',
    },
    inbox: {
      label: 'Bandeja',
      title: 'Todos sobre las mismas conversaciones.',
      text: 'Asignás responsable, ponés etiquetas y dejás notas que tu cliente no ve. Buscás por contacto o teléfono.',
      tags: ['Responsable', 'Etiqueta', 'Notas internas'],
    },
    fallback: {
      label: 'Sin conexión',
      sample: 'Anoté tu pedido de turno para el jueves. Te lo confirma el equipo.',
      sampleCaption: 'Ejemplo ilustrativo',
      title: 'Sin conexión, el asistente junta el pedido y tu equipo lo confirma.',
      text: 'Cuando hace falta una persona, la conversación queda marcada en la bandeja para que tu equipo la retome.',
    },
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    titleBefore: 'Antes de conectar,',
    titleAccent: 'preguntá todo.',
    description: 'Si tu pregunta no está acá, escribinos por WhatsApp.',
    allLink: 'Ver todas las preguntas',
  },
  finalCta: {
    eyebrow: 'Empezá por una tarea',
    titleBefore: 'Decinos qué tarea',
    titleAccent: 'querés sacarte de encima.',
    description:
      'Turnos, pedidos, presupuestos: contanos cuál te come más tiempo y qué sistema usás. Vemos qué conexión necesita tu negocio antes de contratar.',
    primaryCta: 'Pedí una demo',
    secondaryCta: 'Consultar por WhatsApp',
    reassurance: 'Vemos el alcance y los planes antes de contratar.',
  },
} as const;

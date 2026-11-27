// Copy for the home and for the two shared closers (Faq, CtaFinal). Headlines
// carry the message: body copy is a line or two. Every connected action names
// its connection once and is built on request for each business.
export const landing = {
  hero: {
    titleLead: 'Tu WhatsApp',
    titleRest: 'Vos seguís trabajando.',
    actionDurationMs: 1500,
    // The first action is the H1's static reading, for crawlers, screen
    // readers and reduced motion: "Tu WhatsApp reserva el turno."
    actions: [
      'reserva el turno.',
      'consulta stock.',
      'resuelve dudas.',
      'envía recordatorios.',
      'toma pedidos.',
      'calcula cuotas.',
    ],
    pause: 'Pausar las acciones del titular',
    play: 'Reproducir las acciones del titular',
    description:
      'Atende es el bot de WhatsApp que, conectado a tu agenda o a tu sistema, termina la tarea en el chat.',
    // The funnel starts here: one field, one button. The text travels to the
    // app's sign-up door (?negocio=) and prefills the assistant setup.
    start: {
      label: 'Contanos de tu negocio',
      placeholder: 'Contanos de tu negocio',
      submit: 'Armar mi asistente',
      note: 'Probalo gratis antes de elegir un plan',
      demoLead: 'o',
      demoLink: 'pedí una demo',
    },
    scene: {
      label:
        'Una clienta pide un turno por WhatsApp. Atende le ofrece horarios, lo reserva en la agenda y se lo confirma.',
      clock: '23:47',
      contact: 'Lucía',
      contactStatus: 'Responde Atende',
      messages: [
        { from: 'them', text: '¿Tenés turno para corte el jueves a la tarde?' },
        { from: 'us', text: 'Tengo jueves 16:00 o 17:30. ¿Cuál te queda mejor?' },
        { from: 'them', text: 'A las 16' },
        { from: 'us', text: 'Listo, te reservé el jueves a las 16:00.' },
      ],
      agenda: {
        title: 'Tu agenda',
        day: 'Jueves',
        freeLabel: 'Libre',
        slots: [
          { time: '15:00', label: 'Ocupado', state: 'busy' },
          { time: '16:00', label: 'Lucía', detail: 'Corte', state: 'booked' },
          { time: '17:30', label: 'Libre', state: 'free' },
        ],
      },
      connection: 'Conectado a tu agenda',
      done: { label: 'Turno reservado', detail: 'Jueves 16:00, en tu agenda' },
    },
  },
  flood: {
    titleLead: 'Tu trabajo no es contestar mensajes.',
    titleRest: 'El de Atende, sí.',
    description:
      'Precios, horarios, turnos, pedidos. Atende responde y deja la tarea hecha, para que vos te dediques a lo tuyo.',
    rows: [
      [
        '¿Precio?',
        '¿Tenés turno el jueves?',
        'Hola',
        '¿Dónde está mi pedido?',
        '¿Hacen envíos?',
        '??',
        '¿Hasta qué hora abren?',
        '¿Me pasás la lista?',
      ],
      [
        'Quiero cambiar el turno',
        '¿Tienen stock?',
        'Hola, ¿están?',
        '¿Aceptan tarjeta?',
        '¿Cuánto sale?',
        'Te mandé un audio',
        '¿Hay lugar para hoy?',
        'Buenas',
      ],
      [
        '¿Me cotizás?',
        '¿Dónde quedan?',
        '¿Llegó lo mío?',
        'Mesa para cuatro',
        '¿Siguen abiertos?',
        '¿Me confirmás?',
        '¿En cuotas se puede?',
        'Holaaa',
      ],
    ],
  },
  showcase: {
    titleLead: 'Tu cliente escribe.',
    titleRest: 'La tarea queda hecha.',
    tablistLabel: 'Elegí tu rubro',
    pause: 'Pausar',
    play: 'Reproducir',
    items: [
      {
        slug: 'clinicas-y-consultorios',
        short: 'Clínicas',
        name: 'Clínicas y consultorios',
        message: '¿Me pasás el turno del martes al jueves, a la misma hora?',
        reply: 'Listo, pasé tu turno al jueves a las 10:30. El del martes quedó liberado.',
        result: 'Turno reprogramado',
        connection: 'Conectado a tu agenda',
      },
      {
        slug: 'peluquerias-y-estetica',
        short: 'Peluquerías',
        name: 'Peluquerías y estética',
        message: '¿Tenés lugar el sábado a las 10 para color?',
        reply: 'Sí, hay lugar. Listo, te reservé el sábado a las 10:00.',
        result: 'Turno reservado',
        connection: 'Conectado a tu agenda',
      },
      {
        slug: 'restaurantes-y-hoteles',
        short: 'Restaurantes',
        name: 'Restaurantes y hoteles',
        message: 'Mesa para seis el viernes a las 21, a nombre de Paula',
        reply: 'Listo Paula, mesa para seis el viernes a las 21:00.',
        result: 'Reserva tomada',
        connection: 'Conectado a tu sistema de reservas',
      },
      {
        slug: 'comercios-y-distribuidoras',
        short: 'Comercios',
        name: 'Comercios y distribuidoras',
        message: '¿Tenés 20 cajas de yerba para retirar mañana?',
        reply: 'Sí, hay stock. Listo, registré tu pedido: 20 cajas para retirar mañana.',
        result: 'Pedido registrado',
        connection: 'Conectado a tu stock',
      },
      {
        slug: 'concesionarias-e-inmobiliarias',
        short: 'Concesionarias',
        name: 'Concesionarias e inmobiliarias',
        message: '¿Cómo queda la 110 roja en 12 cuotas? El sábado puedo ir a verla',
        reply: 'Ahí te mandé el plan en 12 cuotas. Listo, tu visita quedó para el sábado a las 11:00.',
        result: 'Cuota calculada y visita agendada',
        connection: 'Conectado a tu sistema',
      },
      {
        slug: 'servicios-profesionales',
        short: 'Profesionales',
        name: 'Servicios profesionales',
        message: 'Me despidieron y me llegó un telegrama. Necesito un abogado',
        reply: 'Listo, registré tu consulta laboral como urgente, con pedido de llamado para hoy.',
        result: 'Consulta calificada y registrada',
        connection: 'Conectado a tu CRM',
      },
    ],
    linkPrefix: 'Ver',
  },
  extras: {
    titleLead: 'Y lo que viene después,',
    titleRest: 'también.',
    recurring: {
      title: 'Recordatorios y seguimientos',
      text: 'Los programás una vez y salen cada día, semana o mes. Conectado a tu agenda, a pedido, reserva el turno cuando te responden.',
      rule: 'Cada mes · día 1 · 10:00',
      audience: 'Etiqueta: Clientes',
      sample: 'Hola Sofi, ¿te reservo el turno de este mes?',
    },
    ready: {
      title: 'Avisos de pedido listo',
      text: 'Tu sistema avisa y Atende manda el WhatsApp. Lo conectamos a pedido, para tu negocio.',
      source: 'Tu sistema',
      event: 'pedido listo',
      sample: 'Hola Martín, tu pedido ya está listo. Podés pasar a retirarlo.',
    },
    voice: {
      title: 'Notas de voz',
      text: 'Tu cliente manda un audio. Atende lo entiende y le responde.',
      length: '0:14',
      sample: 'Abrimos de 9 a 18. Los sábados, hasta las 13.',
    },
  },
  control: {
    titleLead: 'Atende trabaja.',
    titleRest: 'Tu equipo manda.',
    description:
      'Tu equipo sigue las conversaciones desde una bandeja compartida y decide cuándo entra una persona.',
    points: [
      {
        title: 'Necesita humano',
        text: 'Marcás el chat y el asistente deja de responder ahí.',
      },
      {
        title: 'Modo CRM',
        text: 'Apagás el asistente en todo el espacio y responde tu equipo.',
      },
    ],
  },
  // The inbox scene of the control section (ProductPreview).
  preview: {
    label:
      'La bandeja de Atende: un cliente pide hablar con una persona, la conversación queda en Necesita humano y responde el equipo.',
    nav: ['Bandeja', 'Biblioteca', 'Equipo', 'Asistente'],
    search: 'Buscar contacto o teléfono',
    contact: 'Martín R.',
    status: 'Necesita humano',
    statusNote: 'El asistente no responde en este chat',
    teamLabel: 'Equipo',
    inbox: [
      { name: 'Lucía M.', line: 'Esperando usuario', active: false },
      { name: 'Martín R.', line: 'Necesita humano', active: true },
      { name: 'Sofía P.', line: 'En conversación', active: false },
    ],
    messages: [
      { from: 'them', text: 'Necesito precio por 40 cajas. ¿Puedo hablar con alguien?' },
      { from: 'us', text: 'Sí, te paso con una persona del equipo.' },
      { from: 'team', text: 'Hola Martín, soy Caro. Ya te armo el precio por las 40.' },
    ],
  },
  start: {
    titleLead: 'Empezás con el número',
    titleRest: 'que ya tenés.',
    steps: [
      {
        title: 'Conectás tu número',
        text: 'Elegís cómo conectar tu número: con la API oficial de Meta o con un QR.',
      },
      {
        title: 'Le contás cómo trabajás',
        text: 'Qué vendés, tus horarios y cómo querés que responda.',
      },
      {
        title: 'Conectamos tu sistema',
        text: 'Tu agenda, tu stock o tu CRM. Lo armamos a pedido, para tu negocio.',
      },
    ],
  },
  // A quiet row of links under the steps: where to read more.
  links: {
    title: 'Más sobre Atende',
    items: [
      { href: '/servicios/turnos-whatsapp', label: 'Turnos y reservas' },
      { href: '/servicios/ventas-whatsapp', label: 'Pedidos y ventas' },
      { href: '/servicios/atencion-automatica-whatsapp', label: 'Atención automática' },
      { href: '/precios', label: 'Precios' },
      { href: '/integraciones', label: 'Integraciones' },
      { href: '/blog/bot-de-whatsapp', label: 'Qué es un bot de WhatsApp' },
      { href: '/blog/recordatorios-de-turnos-por-whatsapp', label: 'Recordatorios de turnos' },
      { href: '/blog/cuanto-cuesta-automatizar-whatsapp', label: 'Cuánto cuesta automatizar WhatsApp' },
    ],
  },
  // Shared with the secondary pages: keep both blocks generic.
  faq: {
    title: 'Preguntas frecuentes',
    whatsappLead: '¿Te quedó una duda?',
    whatsappLink: 'Escribinos por WhatsApp',
    allLink: 'Ver todas las preguntas',
  },
  finalCta: {
    title: '¿Qué mensaje no querés volver a contestar?',
    description:
      'Contanos qué tarea te come más tiempo. Te mostramos cómo la resuelve Atende en tu negocio.',
    primaryCta: 'Pedí una demo',
    secondaryCta: 'Escribinos por WhatsApp',
    reassurance: 'Vemos el alcance y los planes antes de contratar.',
  },
} as const;

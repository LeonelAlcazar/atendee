import type { FaqItem } from './faq';

export type ChatMessage = { from: 'them' | 'us'; text: string };

export type DetailStatus = 'Incluido' | 'A pedido';

export type DetailRow = {
  label: string;
  text: string;
  status?: DetailStatus;
};

export type ServiceLink = { slug: string; label: string };

export type ServiceNote = {
  title: string;
  text: string;
  link?: { href: string; label: string };
};

export type Servicio = {
  id: 'atencion' | 'turnos' | 'ventas';
  slug: string;
  updated: string;
  /** Short name: navigation, breadcrumbs and the Service schema. */
  title: string;
  /** The page H1. Always names an action. */
  headline: string;
  seoTitle: string;
  /** Meta description and hub summary. */
  short: string;
  /** Visible lead paragraph. Also the Service schema description. */
  description: string;
  doneTitle: string;
  bullets: string[];
  conversation: ChatMessage[];
  caption: string;
  result: { label: string; detail: string };
  ctaContext: string;
  demoLabel: string;
  buyingQuestion: string;
  fit: string;
  detail: { title: string; intro: string; rows: DetailRow[] };
  workflowTitle: string;
  workflow: { title: string; text: string }[];
  human: { title: string; text: string; items: string[] };
  notes: ServiceNote[];
  requirements: string[];
  /** The one place each page states what happens without a connection. */
  scope: string;
  faq: FaqItem[];
  guides: ServiceLink[];
  rubros: ServiceLink[];
};

export const servicios: Servicio[] = [
  {
    id: 'turnos',
    slug: 'turnos-whatsapp',
    updated: '2026-11-18',
    title: 'Turnos y reservas por WhatsApp',
    headline: 'Conectado a tu agenda, Atende reserva el turno por WhatsApp.',
    seoTitle: 'Sistema de turnos por WhatsApp: reservas en tu agenda',
    short:
      'Conectado a tu agenda, Atende reserva, reprograma y cancela turnos por WhatsApp, y toma reservas. La conexión se arma a pedido y tu equipo supervisa.',
    description:
      'Atende consulta tu agenda, ofrece los horarios libres y confirma por WhatsApp cuando el turno queda reservado. Armamos la conexión a pedido para tu negocio. Recepción supervisa las reservas, los cambios y las cancelaciones desde la bandeja.',
    doneTitle: 'Qué deja hecho en el chat',
    bullets: [
      'Ofrece los horarios libres de tu agenda',
      'Reserva el turno con el servicio y el profesional que corresponden',
      'Reprograma y cancela sin que nadie atienda el teléfono',
      'Toma reservas con fecha, horario y cantidad de personas',
      'Recordatorios a pedido, armados para tu negocio',
    ],
    conversation: [
      { from: 'them', text: 'Hola, ¿tienen turno para coloración esta semana?' },
      { from: 'us', text: 'Tengo jueves 16:00 o viernes 10:30. ¿Cuál te queda mejor?' },
      { from: 'them', text: 'El viernes' },
      {
        from: 'us',
        text: 'Listo, te reservé el viernes a las 10:30. Si no llegás, avisame por acá y lo cambiamos.',
      },
    ],
    caption: 'Ejemplo ilustrativo, con la agenda conectada',
    result: {
      label: 'Turno reservado',
      detail: 'El asistente lo confirmó después de que tu agenda lo aceptó.',
    },
    ctaContext:
      'Hola, quiero que Atende reserve turnos por WhatsApp en la agenda de mi negocio',
    demoLabel: 'Consultar por mi agenda',
    buyingQuestion: '¿Mi agenda puede reservar un horario y liberarlo si lo cambian?',
    fit: 'Para clínicas, consultorios, veterinarias, peluquerías, centros de estética, gimnasios, restaurantes y hoteles donde la recepción atiende el mostrador, el teléfono y el WhatsApp al mismo tiempo, y los turnos se pasan a mano a la agenda cuando hay un rato.',
    detail: {
      title: 'Las reglas de tu agenda que hay que definir',
      intro:
        'Toda agenda tiene reglas que nadie escribió. Recepción las sabe de memoria; el asistente las necesita por escrito, porque las va a aplicar en cada chat.',
      rows: [
        {
          label: 'Duración',
          text: 'Una coloración no ocupa lo mismo que un corte, ni una primera consulta lo mismo que un control.',
        },
        {
          label: 'Quién atiende',
          text: 'Profesional, sala o box. Si el contacto quiere a una persona en particular, manda la agenda de esa persona.',
        },
        {
          label: 'Obra social o prepaga',
          text: 'Si trabajás con coberturas, pregunta con cuál viene y, si no la tomás, lo dice antes de ofrecer un horario.',
        },
        {
          label: 'Seña',
          text: 'Atende no cobra. Si pedís seña para confirmar, definimos cómo queda el turno hasta que tu equipo o tu sistema la registre.',
        },
        {
          label: 'Cambios y cancelaciones',
          text: 'Hasta cuándo se resuelve por chat y desde cuándo pasa a una persona.',
        },
        {
          label: 'Reservas de mesa o habitación',
          text: 'Cantidad de personas, turno de cena, noches: lo que tu sistema pide para tomarla.',
        },
      ],
    },
    workflowTitle: 'Del primer mensaje al turno en la agenda',
    workflow: [
      {
        title: 'Pide lo que falta',
        text: 'Servicio, día y franja. Si el mensaje ya trae todo, no lo vuelve a preguntar.',
      },
      {
        title: 'Mira tu agenda',
        text: 'Consulta los horarios libres en ese momento y ofrece los que sirven. Está armado para no prometer un horario que no vio.',
      },
      {
        title: 'Reserva y confirma',
        text: 'Deja el turno en tu agenda y le confirma al contacto lo que la agenda aceptó.',
      },
    ],
    human: {
      title: 'Dónde entra recepción',
      text: 'Recepción mantiene el control de la agenda. Si una consulta se sale de las reglas, el asistente marca la conversación como Necesita humano. El equipo puede seguir el chat desde la bandeja.',
      items: [
        'Un sobreturno, una urgencia o un pedido que no está en tus reglas.',
        'Las consultas clínicas: dejá escrito en Contexto del asistente que van a una persona y que se queda en lo administrativo.',
        'Un contacto que pide hablar con alguien del equipo.',
      ],
    },
    notes: [
      {
        title: 'Recordatorios de turno, a pedido',
        text: 'Para recordar la cita del jueves, tu agenda tiene que saber que el turno sigue vigente e iniciar el envío de texto. Esa conexión se arma a pedido. Si lo que querés es avisar a la misma clase todos los lunes, tu equipo puede programar el texto desde Contactos.',
        link: {
          href: '/blog/recordatorios-de-turnos-por-whatsapp',
          label: 'Cómo funcionan los recordatorios a pedido',
        },
      },
    ],
    requirements: [
      'Qué agenda o sistema de reservas usás, y con qué acceso.',
      'Tus servicios con su duración, y quién atiende cada uno.',
      'Tus reglas de seña, cambios y cancelaciones.',
      'Alguien en recepción que mire la bandeja y tome las excepciones.',
    ],
    scope:
      'Sin conexión, el asistente junta el pedido y tu equipo lo confirma: servicio, día y franja quedan en la conversación, y el turno existe recién cuando recepción lo anota en la agenda.',
    faq: [
      {
        q: '¿Atende confirma el turno solo?',
        a: 'Sí, conectado a tu agenda: ofrece horarios libres, reserva y le confirma al contacto lo que tu agenda aceptó. Esa conexión hay que armarla para tu negocio antes de empezar.',
      },
      {
        q: '¿Se conecta con mi sistema de turnos?',
        a: 'Armamos la conexión a pedido con el sistema que usás. No hay una lista de agendas listas para activar. Contanos cuál es y qué acceso tenés; si no permite conectarse, te lo decimos antes de cotizar.',
      },
      {
        q: '¿Atende reemplaza mi agenda?',
        a: 'No. Atende no es una agenda de turnos online: trabaja sobre la que ya usás y le ahorra a recepción pasar cada turno a mano.',
      },
      {
        q: '¿Qué pasa si dos personas piden el mismo horario?',
        a: 'Manda tu agenda. El turno se reserva ahí y el asistente informa lo que la agenda devolvió. Si ese horario ya se ocupó, ofrece otro.',
      },
      {
        q: '¿Manda recordatorios de turnos?',
        a: 'Sí, cuando tu agenda está preparada para iniciar el aviso de texto. Armamos esa conexión a pedido. Para acordar el alcance vemos de dónde salen la fecha y el número, y qué pasa si el contacto ya canceló o cambió su turno.',
      },
      {
        q: '¿Sirve para clínicas y consultorios?',
        a: 'Sí, para lo administrativo: turnos, horarios, coberturas y cambios. Las consultas clínicas van a una persona y el asistente no debe juntar datos de pacientes.',
      },
    ],
    guides: [
      {
        slug: 'recordatorios-de-turnos-por-whatsapp',
        label: 'Recordatorios de turnos por WhatsApp: qué necesitan',
      },
      {
        slug: 'como-automatizar-whatsapp-clinicas',
        label: 'Cómo ordenar los turnos de una clínica',
      },
      {
        slug: 'como-automatizar-whatsapp-peluquerias',
        label: 'Cómo manejar la agenda de una peluquería',
      },
      {
        slug: 'como-automatizar-whatsapp-restaurantes',
        label: 'Cómo tomar reservas en un restaurante',
      },
      {
        slug: 'como-automatizar-whatsapp-hoteles',
        label: 'Cómo atender consultas de reserva en un hotel',
      },
    ],
    rubros: [
      {
        slug: 'clinicas-y-consultorios',
        label: 'WhatsApp para clínicas, consultorios y veterinarias',
      },
      {
        slug: 'peluquerias-y-estetica',
        label: 'WhatsApp para peluquerías, estética y gimnasios',
      },
      {
        slug: 'restaurantes-y-hoteles',
        label: 'Chatbot para restaurantes y hoteles',
      },
    ],
  },
  {
    id: 'ventas',
    slug: 'ventas-whatsapp',
    updated: '2026-11-18',
    title: 'Pedidos y ventas por WhatsApp',
    headline: 'Atende consulta el stock y registra el pedido por WhatsApp.',
    seoTitle: 'App para recibir pedidos por WhatsApp: ventas y presupuestos',
    short:
      'Conectado a tu sistema, Atende consulta stock, arma el presupuesto y registra el pedido por WhatsApp. Tus clientes no instalan nada y tu equipo supervisa.',
    description:
      'Atende toma pedidos por WhatsApp, consulta stock y precios y guarda el pedido cuando tu sistema lo acepta. Armamos la conexión a pedido según tus listas, unidades de venta y forma de entrega. Tu cliente escribe al número de siempre y tu vendedor supervisa desde la bandeja.',
    doneTitle: 'Qué deja hecho antes de que entre un vendedor',
    bullets: [
      'Consulta stock y precio vigente de lo que te piden',
      'Arma el presupuesto con tus listas y tus reglas',
      'Calcula cuotas, si vendés financiado',
      'Registra el pedido con producto, cantidad y retiro o envío',
      'Anota al interesado en tu CRM o planilla',
    ],
    conversation: [
      { from: 'them', text: 'Hola, ¿tienen látex blanco de 20 litros?' },
      { from: 'us', text: 'Sí, quedan 14. ¿Cuántos necesitás, y es con retiro o envío?' },
      { from: 'them', text: 'Mandame 6 a Alta Córdoba' },
      {
        from: 'us',
        text: 'Listo, tu pedido quedó registrado: 6 baldes de látex de 20 L con envío a Alta Córdoba. Es el número 2381.',
      },
    ],
    caption: 'Ejemplo ilustrativo, con tu sistema de pedidos conectado',
    result: {
      label: 'Pedido registrado',
      detail: 'El número lo devolvió tu sistema. El asistente recién ahí lo informó.',
    },
    ctaContext:
      'Hola, quiero que Atende tome pedidos por WhatsApp y los registre en mi sistema',
    demoLabel: 'Consultar por mis pedidos',
    buyingQuestion: '¿Puede usar mi lista de precios y guardar el pedido donde prepara el depósito?',
    fit: 'Para comercios, distribuidoras y mayoristas que hoy reciben pedidos por WhatsApp y después los pasan a mano al sistema o a una planilla. También para concesionarias e inmobiliarias, donde la venta arranca con una cotización y hay que anotar al interesado antes de que se enfríe.',
    detail: {
      title: 'Qué queda registrado en cada pedido',
      intro:
        'Por WhatsApp un pedido llega en partes: “¿tenés látex?”, “mandame seis”, “a la tarde”. El asistente repregunta hasta tener lo que tu sistema necesita para cargarlo.',
      rows: [
        {
          label: 'Producto y presentación',
          text: 'Látex de 20 litros no es látex de 4. Si el mensaje no alcanza, pregunta antes de registrar.',
        },
        {
          label: 'Cantidad y unidad',
          text: 'Unidades, cajas o bultos, según cómo vendés. Si no alcanza el stock, lo dice y ofrece lo que hay.',
        },
        {
          label: 'Cliente',
          text: 'El número en general ya viene del chat, sin pedirlo. Tu sistema puede reconocer a un cliente habitual o cargar uno nuevo.',
        },
        {
          label: 'Retiro o envío',
          text: 'Zona, dirección y franja horaria, con tus reglas de reparto y tu mínimo de compra.',
        },
        {
          label: 'Forma de pago',
          text: 'La que elige el cliente entre las que aceptás. Atende no cobra: el pago sigue por donde lo manejás hoy.',
        },
        {
          label: 'Número de pedido',
          text: 'El que devuelve tu sistema. Si el sistema da error, la instrucción es no informar el pedido como hecho.',
        },
      ],
    },
    workflowTitle: 'Cómo pasa de la consulta al pedido',
    workflow: [
      {
        title: 'Mira el stock y el precio',
        text: 'Cuando preguntan si hay, Atende lo consulta en tu sistema en ese momento. Un dato que cambia todos los días no se contesta de memoria.',
      },
      {
        title: 'Arma el presupuesto',
        text: 'Aplica tus listas y tus reglas y, si vendés en cuotas, calcula la financiación. Lo que no está en las reglas va a un vendedor.',
      },
      {
        title: 'Registra y confirma',
        text: 'Cuando el cliente dice que sí, deja el pedido o al interesado en tu sistema y le confirma lo que quedó cargado.',
      },
    ],
    human: {
      title: 'Dónde sigue tu vendedor',
      text: 'Si alguien pide un descuento especial o quiere negociar una entrega, el asistente marca el chat como Necesita humano. Tu vendedor ve lo que ya se habló y sigue desde la bandeja.',
      items: [
        'Un precio especial o un descuento fuera de tus reglas.',
        'Un cliente con cuenta corriente, deuda o condiciones propias.',
        'Un reclamo por una entrega.',
        'Alguien que pide hablar con una persona.',
      ],
    },
    notes: [
      {
        title: '¿Hace falta una app para recibir pedidos por WhatsApp?',
        text: 'Para tus clientes, no: te siguen escribiendo al mismo número. Tu equipo entra a Atende desde el navegador, también en el celu. Lo que cambia es qué pasa después del mensaje: en vez de quedar en el chat hasta que alguien lo copie, el pedido entra a tu sistema.',
      },
      {
        title: 'Si te mandan la lista en audio o en foto',
        text: 'Si el asistente está activo y la nota de voz se transcribe, puede pedir que aclaren la cantidad o la presentación y tomar el pedido con tu sistema conectado. Las fotos y los PDF llegan a la bandeja para el vendedor. El asistente no lee los renglones de una lista fotografiada.',
      },
      {
        title: 'Una demo que ya funciona',
        text: 'Tenemos una demo para una concesionaria de motos: consulta stock y precios, calcula la financiación y registra al interesado en Google Sheets. Es una demo, no un cliente, y muestra qué hace una conexión de verdad.',
        link: { href: '/integraciones#demo', label: 'Ver qué hace la demo' },
      },
    ],
    requirements: [
      'Qué sistema usás para stock, precios y pedidos, o si es una planilla, y con qué acceso.',
      'Tus listas y tus reglas: mínimo de compra, zonas, medios de pago, descuentos.',
      'Qué puede cerrar el asistente solo y qué pasa siempre por un vendedor.',
      'Alguien que mire la bandeja y tome las conversaciones marcadas.',
    ],
    scope:
      'Sin conexión, el asistente junta el pedido y tu equipo lo confirma: producto, cantidad y envío quedan en la conversación, y el pedido existe recién cuando alguien lo carga. Es un buen comienzo si todavía no tenés un sistema.',
    faq: [
      {
        q: '¿Atende puede tomar pedidos solo?',
        a: 'Sí, conectado a tu sistema: consulta el stock, repregunta lo que falta, registra el pedido y le confirma al cliente lo que tu sistema aceptó. Esa conexión hay que armarla para tu negocio antes de empezar.',
      },
      {
        q: '¿Puede pasar presupuestos por WhatsApp?',
        a: 'Sí, cuando la conexión le da tus listas y tus reglas vigentes. Si un precio no está en lo que cargaste ni en tu sistema, el asistente no debe inventarlo: pide los datos y deja la consulta para un vendedor.',
      },
      {
        q: '¿Qué pasa con los pedidos que llegan de noche?',
        a: 'El asistente responde mensajes de texto a cualquier hora, mientras el servicio y tu WhatsApp estén conectados. Un vendedor sigue la conversación en el horario de tu equipo.',
      },
      {
        q: '¿Atende cobra los pedidos?',
        a: 'No. Atende no procesa pagos ni señas. Puede informar los medios que aceptás y anotar el que eligió el cliente; el cobro sigue por donde lo manejás hoy.',
      },
      {
        q: '¿Hace seguimiento de los que dejaron de responder?',
        a: 'El vendedor puede retomar el chat desde la bandeja. Para avisar que el pedido está listo, tu sistema puede iniciar un texto con una conexión a pedido. El asistente no decide por su cuenta volver a escribirle a un interesado.',
      },
      {
        q: '¿Cómo trabaja mi equipo de ventas con Atende?',
        a: 'Todo el equipo usa la misma bandeja. Asignan responsable, ponen etiquetas y dejan notas que el cliente no ve. Para que el asistente deje de responder en un chat hay que marcarlo como Necesita humano: responder o tocar Asignarme no lo frena.',
      },
    ],
    guides: [
      {
        slug: 'cotizaciones-por-whatsapp-automaticas',
        label: 'Cómo preparar presupuestos por WhatsApp',
      },
      {
        slug: 'bot-de-whatsapp-con-ia-para-ventas',
        label: 'Qué datos conviene pedir en una consulta de venta',
      },
      {
        slug: 'como-automatizar-whatsapp-distribuidoras',
        label: 'Toma de pedidos por WhatsApp en una distribuidora',
      },
      {
        slug: 'como-automatizar-whatsapp-tiendas-online',
        label: 'Consultas de stock y envíos en una tienda online',
      },
      {
        slug: 'registrar-leads-de-whatsapp-en-google-sheets',
        label: 'Registrar interesados de WhatsApp en una planilla',
      },
      {
        slug: 'atencion-comercial-whatsapp-24-7',
        label: 'Cómo organizar las ventas fuera de horario',
      },
    ],
    rubros: [
      {
        slug: 'comercios-y-distribuidoras',
        label: 'WhatsApp para comercios y distribuidoras',
      },
      {
        slug: 'concesionarias-e-inmobiliarias',
        label: 'WhatsApp para concesionarias e inmobiliarias',
      },
    ],
  },
  {
    id: 'atencion',
    slug: 'atencion-automatica-whatsapp',
    updated: '2026-11-18',
    title: 'Atención al cliente por WhatsApp con IA',
    headline:
      'Conectado a tu sistema, Atende busca el pedido y le contesta a tu cliente.',
    seoTitle: 'IA para atención al cliente por WhatsApp que resuelve y deriva',
    short:
      'Conectado a tu sistema, Atende busca el pedido y le contesta a tu cliente en el chat. Además responde mensajes de texto a cualquier hora y deriva a tu equipo.',
    description:
      'Atende busca el pedido en tu sistema y contesta con el estado registrado. Esa consulta requiere una conexión a pedido. Con un plan con IA también responde preguntas frecuentes y deriva reclamos al equipo que atiende la bandeja.',
    doneTitle: 'Qué resuelve sin que nadie toque el teléfono',
    bullets: [
      'Contesta horarios, zonas de envío, medios de pago y condiciones',
      'Manda las fotos y los videos de tu biblioteca cuando hacen falta',
      'Recuerda datos del contacto y del negocio',
      'Deriva a una persona y deja la conversación marcada',
      'Cierra la conversación cuando la consulta quedó resuelta',
      'Busca un pedido o un dato en tu sistema, con la conexión armada',
    ],
    conversation: [
      { from: 'them', text: '¿Hasta qué hora están hoy?' },
      { from: 'us', text: 'Hoy atendemos hasta las 18.' },
      { from: 'them', text: 'Gracias. ¿Mi pedido de ayer ya salió?' },
      {
        from: 'us',
        text: 'Sí, el pedido 4127 salió hoy a la mañana y llega mañana por la tarde.',
      },
    ],
    caption: 'Ejemplo ilustrativo, con tu sistema de pedidos conectado',
    result: {
      label: 'Consulta resuelta',
      detail: 'El dato salió de tu sistema, no de una respuesta guardada.',
    },
    ctaContext:
      'Hola, quiero que Atende resuelva la atención al cliente de mi negocio por WhatsApp',
    demoLabel: 'Consultar por mi atención al cliente',
    buyingQuestion: '¿Qué puede resolver el asistente y cuándo interviene mi equipo?',
    fit: 'Para negocios que contestan las mismas preguntas todo el día, que reciben mensajes cuando ya cerraron o que reparten el WhatsApp entre varias personas. Rinde más cuando la consulta se resuelve con un dato que ya tenés: un horario, una zona de envío, una condición, el estado de un pedido.',
    detail: {
      title: 'Qué hace Atende con cada mensaje',
      intro:
        'Qué recibe el equipo en la bandeja y con qué información puede trabajar el asistente.',
      rows: [
        {
          label: '“¿Hasta qué hora están?”',
          text: 'Contesta con lo que cargaste en el Contexto del asistente y en tus preguntas frecuentes.',
          status: 'Incluido',
        },
        {
          label: '“Pasame fotos del modelo negro”',
          text: 'Busca en tu biblioteca y manda las fotos con el mensaje.',
          status: 'Incluido',
        },
        {
          label: '“¿Mi pedido ya salió?”',
          text: 'Con la conexión, lo busca en tu sistema y contesta con el dato que encontró.',
          status: 'A pedido',
        },
        {
          label: '“Quiero hacer un reclamo”',
          text: 'Avisa que lo va a ver una persona y marca la conversación como Necesita humano. Queda entre los pendientes de la bandeja.',
          status: 'Incluido',
        },
        {
          label: 'Una nota de voz',
          text: 'Con el asistente activo y una transcripción disponible, puede atender la consulta a partir de ese texto. Tu equipo puede escuchar el audio en la bandeja.',
          status: 'Incluido',
        },
        {
          label: 'Una foto o un PDF',
          text: 'Llega como adjunto a la bandeja. Tu equipo lo abre. El asistente solo recibe el tipo de archivo y el texto que lo acompaña.',
          status: 'Incluido',
        },
      ],
    },
    workflowTitle: 'Cómo lo dejás andando',
    workflow: [
      {
        title: 'Contale qué hace tu negocio',
        text: 'Creás tu espacio y escribís qué vendés, qué consultas puede resolver y el tono. Después lo ajustás en Contexto del asistente.',
      },
      {
        title: 'Conectá el número',
        text: 'Invitás a tu equipo y activás créditos o un plan con IA. Cargás tus preguntas frecuentes, fotos y videos. Podés vincular tu número escaneando un QR. Si necesitás la API oficial de Meta, consultá el alcance en la demo.',
      },
      {
        title: 'Probá dos consultas',
        text: 'Antes de atender clientes, probá una consulta de horario y otra que deba tomar una persona. Si tu espacio tiene habilitado el chat de prueba, podés hacerlo en el panel. Las herramientas conectadas ejecutan acciones reales incluso en ese chat.',
      },
    ],
    human: {
      title: 'Cuando hace falta una persona',
      text: 'El asistente marca el chat como Necesita humano. Tu equipo ve por qué se derivó, revisa lo que ya dijo el cliente y sigue desde la bandeja.',
      items: [
        'Para seguir vos en otro chat, marcalo como Necesita humano. Responder o tocar Asignarme no frena al asistente.',
        'La conversación se cierra sola después de un período sin mensajes. Si vuelve a escribir, responde el asistente.',
        'Para apagarlo en todo el espacio, pasá a Modo CRM y tu equipo contesta a mano.',
      ],
    },
    notes: [],
    requirements: [
      'Para vincular el número con QR, el teléfono del negocio y otra pantalla donde abrir el código.',
      'Tus horarios, zonas, condiciones y preguntas frecuentes al día.',
      'Una persona que mire la bandeja y tome las conversaciones marcadas.',
      'Si querés que busque pedidos: qué sistema usás y qué dato puede leer.',
    ],
    scope:
      'Sin conexión, el asistente junta el pedido y tu equipo lo confirma. Contesta con lo que cargaste y no ve datos que cambian en otro sistema, como el estado de un pedido.',
    faq: [
      {
        q: '¿Qué puede responder la IA por WhatsApp?',
        a: 'Lo que le contaste de tu negocio y lo que cargaste en tus preguntas frecuentes: horarios, zonas, servicios, condiciones. Si le falta el dato, lo dice o deriva. Los datos que cambian en otro sistema necesitan una conexión.',
      },
      {
        q: '¿Puede inventar una respuesta?',
        a: 'Está armado para no inventar datos: si le falta algo, lo dice o deriva. Es un diseño, no una garantía. Por eso tu equipo mira la bandeja y corrige el contexto cuando una respuesta no cierra.',
      },
      {
        q: '¿Reemplaza a mi equipo?',
        a: 'No. Se ocupa de lo que se repite. Los reclamos, las excepciones y las decisiones comerciales pasan a una persona.',
      },
      {
        q: '¿Responde fuera de horario?',
        a: 'Sí. Responde mensajes de texto a cualquier hora, mientras el servicio y tu WhatsApp estén conectados. Eso no significa que haya alguien de tu equipo disponible: si deriva a la noche, la conversación queda marcada y se cierra sola después de un período sin mensajes, aunque nadie la haya tomado.',
      },
      {
        q: '¿Entiende audios y fotos?',
        a: 'Con el asistente activo, Atende puede responder usando la transcripción disponible de la nota de voz. Tu equipo puede escucharla aunque el asistente esté apagado. Las fotos, videos y documentos se reciben en la bandeja para que los revise una persona. El asistente puede usar el texto que los acompaña.',
      },
      {
        q: '¿Se acuerda de lo que hablamos antes?',
        a: 'Tiene en cuenta la conversación en curso y las notas que guardó sobre el contacto y el negocio. No lee todo el historial ni las notas internas de tu equipo.',
      },
    ],
    guides: [
      {
        slug: 'bot-de-whatsapp',
        label: 'Qué tareas puede resolver un bot de WhatsApp',
      },
      {
        slug: 'whatsapp-ia-atencion-humana',
        label: 'Cómo organizar el pase del asistente a una persona',
      },
      {
        slug: 'como-crear-un-bot-de-whatsapp',
        label: 'Cómo preparar el contexto y las respuestas',
      },
      {
        slug: 'mensajes-automaticos-whatsapp-negocios',
        label: 'Ejemplos de mensajes automáticos para negocios',
      },
      {
        slug: 'whatsapp-varios-usuarios',
        label: 'Cómo atender un WhatsApp entre varias personas',
      },
    ],
    rubros: [
      {
        slug: 'servicios-profesionales',
        label: 'WhatsApp para abogados, contadores y estudios',
      },
      {
        slug: 'comercios-y-distribuidoras',
        label: 'Atención por WhatsApp en comercios',
      },
      {
        slug: 'clinicas-y-consultorios',
        label: 'Consultas administrativas en clínicas y consultorios',
      },
    ],
  },
];

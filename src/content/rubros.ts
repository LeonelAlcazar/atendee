import type { FaqItem } from './faq';
import type { ChatMessage } from './servicios';

// One content model per trade. The page shell is shared, but each rubro lists
// its own typed blocks, so pages differ in structure and not only in wording.
// Text in paragraphs, cells and notes accepts [label](/path) links. FAQ text
// stays plain because it must match the FAQPage schema word for word.

export type ChatResult = { label: string; detail: string };

export type BlockTone = 'plain' | 'surface' | 'mint' | 'sky' | 'sun' | 'coral' | 'forest';

type BlockBase = {
  id: string;
  title: string;
  intro?: string;
  tone?: BlockTone;
};

export type TableBlock = BlockBase & {
  kind: 'table';
  caption: string;
  columns: string[];
  rows: string[][];
  note?: string;
};

export type StepsBlock = BlockBase & {
  kind: 'steps';
  steps: { title: string; text: string }[];
  note?: string;
};

export type ChatBlock = BlockBase & {
  kind: 'chat';
  paragraphs: string[];
  caption: string;
  messages: ChatMessage[];
  result?: ChatResult;
};

export type CalloutBlock = BlockBase & {
  kind: 'callout';
  paragraphs: string[];
};

export type ProseBlock = BlockBase & {
  kind: 'prose';
  paragraphs: string[];
};

export type NotesBlock = BlockBase & {
  kind: 'notes';
  items: { title: string; text: string }[];
};

export type ChecklistBlock = BlockBase & {
  kind: 'checklist';
  groups: { title?: string; items: string[] }[];
  note?: string;
};

export type CompareBlock = BlockBase & {
  kind: 'compare';
  sides: { title: string; points: string[] }[];
  note?: string;
};

export type TicketBlock = BlockBase & {
  kind: 'ticket';
  paragraphs: string[];
  ticket: {
    label: string;
    header: { label: string; value: string }[];
    lines: { item: string; quantity: string; note?: string }[];
    footer: { label: string; value: string }[];
  };
};

export type RubroBlock =
  | TableBlock
  | StepsBlock
  | ChatBlock
  | CalloutBlock
  | ProseBlock
  | NotesBlock
  | ChecklistBlock
  | CompareBlock
  | TicketBlock;

export type Rubro = {
  slug: string;
  name: string;
  title: string;
  description: string;
  updated: string;
  h1: { before: string; accent: string };
  lede: string;
  supervision: string;
  chat: { caption: string; messages: ChatMessage[]; result: ChatResult };
  fallback: string;
  blocks: RubroBlock[];
  faq: FaqItem[];
  guides: { slug: string; label: string }[];
  service: { href: string; label: string };
  cta: { title: string; text: string; demoLabel: string; context: string };
  hub: { tag: string; task: string; scene: string; needs: string; tone: string };
};

const clinicas: Rubro = {
  slug: 'clinicas-y-consultorios',
  name: 'Clínicas, consultorios y veterinarias',
  title: 'WhatsApp para clínicas, consultorios y veterinarias: turnos',
  description:
    'Conectado a tu agenda, Atende reserva y reprograma turnos por WhatsApp según obra social y tipo de consulta. Lo clínico siempre pasa a una persona.',
  updated: '2026-11-06',
  h1: {
    before: 'WhatsApp para clínicas y veterinarias que',
    accent: 'reserva y reprograma turnos.',
  },
  lede:
    'Con gente en el mostrador y el teléfono sonando, el WhatsApp de recepción queda para después. Conectado a tu agenda, Atende pregunta si es primera vez o control, si viene por obra social o particular, ofrece los horarios libres y reserva o mueve el turno en la conversación. Esa conexión se arma a pedido para tu consultorio.',
  supervision:
    'Se configura para hacer solo tareas administrativas. Síntomas, medicación, resultados y recetas pasan a una persona, y recepción ve toda la conversación en la bandeja.',
  chat: {
    caption: 'Ejemplo ilustrativo, con la agenda conectada',
    messages: [
      { from: 'them', text: 'Hola, tengo turno el jueves a las 10 con la cardióloga y no voy a poder ir' },
      { from: 'us', text: 'Sin problema. La doctora tiene lugar el lunes 9:20 o el martes 11:40. ¿Te sirve alguno?' },
      { from: 'them', text: 'El martes' },
      { from: 'us', text: 'Listo, pasé tu turno al martes 11:40. El del jueves quedó liberado.' },
    ],
    result: {
      label: 'Turno reprogramado en tu agenda',
      detail: 'Martes 11:40, cardiología. El horario del jueves queda libre para otro paciente.',
    },
  },
  fallback:
    'Sin conexión, el asistente junta con qué profesional y qué horario prefiere el paciente, y recepción lo confirma desde la bandeja. En ese caso está armado para no decirle que el turno quedó reservado.',
  blocks: [
    {
      kind: 'table',
      id: 'triage',
      title: 'Qué contesta el asistente y qué pasa a una persona',
      intro:
        'La línea no depende de qué tan fácil parezca la pregunta. Todo lo que toque el cuerpo, un remedio o un estudio va a una persona, aunque cualquiera de tu equipo sepa la respuesta de memoria. Esa línea la dejás escrita en Contexto del asistente: es una instrucción, y sin ella el asistente no la conoce.',
      caption: 'Mensajes frecuentes de pacientes, tipo de consulta y qué pasa con cada uno',
      columns: ['Lo que escribe el paciente', 'Tipo', 'Qué pasa'],
      rows: [
        ['¿Atienden por PAMI?', 'Administrativo', 'Responde con la lista de coberturas que cargaste. Si ese plan no figura, no adivina y lo deja para recepción.'],
        ['Quiero turno con la pediatra, es la primera vez', 'Administrativo', 'Con la agenda conectada, busca un horario de primera consulta y lo reserva.'],
        ['No llego al turno de mañana', 'Administrativo', 'Conectado, lo mueve o lo cancela según tu regla de aviso, y el horario vuelve a quedar libre.'],
        ['¿Cuánto sale la consulta particular?', 'Administrativo', 'Repite el valor que cargaste. Si aumentó y nadie lo actualizó, va a decir el viejo.'],
        ['¿Puedo tomar ibuprofeno con lo que me recetaron?', 'Clínico', 'No contesta. Pasa la conversación a una persona.'],
        ['¿Ya salió el resultado del análisis?', 'Clínico', 'No consulta ni interpreta estudios. Pasa a una persona.'],
        ['Me duele mucho el pecho', 'Urgencia', 'No evalúa. Da el número de guardia o emergencias que definiste y marca la conversación.'],
      ],
    },
    {
      kind: 'table',
      id: 'especialidades',
      tone: 'surface',
      title: 'Un médico, un odontólogo y una veterinaria no dan el mismo turno',
      intro:
        'El tipo de turno cambia cuánto tiempo bloquea la agenda y qué tiene que preguntar el asistente antes de ofrecer un horario.',
      caption: 'Diferencias entre consultorio médico, odontología y veterinaria',
      columns: ['Tema', 'Consultorio médico', 'Odontología', 'Veterinaria'],
      rows: [
        ['Qué pregunta primero', '¿Primera vez o control? ¿Obra social, prepaga o particular?', '¿Consulta, limpieza o seguís un tratamiento?', '¿Qué animal es y qué necesita: consulta, vacuna o baño?'],
        ['Cómo cambia el turno', 'La primera consulta suele llevar más tiempo que un control.', 'Un tratamiento son varias sesiones con el mismo profesional y, a veces, el mismo sillón.', 'Consulta, vacunación, cirugía programada y peluquería suelen ir en agendas separadas.'],
        ['Qué no resuelve por WhatsApp', 'Órdenes, recetas y autorizaciones.', 'Presupuestos de tratamiento: hay que ver la boca.', 'Dosis, síntomas y si conviene esperar a mañana.'],
        ['Qué se trata como urgencia', 'Lo que defina tu equipo, y va a guardia o emergencias.', 'Dolor fuerte o un golpe: recepción decide si hay sobreturno.', 'Intoxicación, atropello o parto: tu guardia o la que indiques.'],
      ],
    },
    {
      kind: 'chat',
      id: 'veterinarias',
      tone: 'sky',
      title: 'Veterinarias: la urgencia de las dos de la mañana',
      paragraphs: [
        'El asistente [contesta a cualquier hora](/servicios/atencion-automatica-whatsapp), mientras el servicio y tu WhatsApp estén conectados. En una veterinaria eso también es un riesgo: alguien desesperado escribe de madrugada, recibe una respuesta y cree que hay un veterinario del otro lado. Si no tenés guardia, la respuesta lo tiene que decir en la primera línea y dar adónde ir.',
        'Derivar marca la conversación como Necesita humano, pero no le suena a nadie en el teléfono. Por eso el número de guardia va en el mensaje al dueño: esa persona no puede depender de que alguien de tu equipo abra la bandeja.',
      ],
      caption: 'Ejemplo ilustrativo de una derivación, sin conexión',
      messages: [
        { from: 'them', text: 'Mi perra comió veneno para ratas, ¿qué le doy?' },
        { from: 'us', text: 'Eso no te lo puedo responder por acá, lo tiene que ver un veterinario ahora.' },
        { from: 'us', text: 'A esta hora no tenemos guardia. Llamá ya a [la guardia que indicaste].' },
      ],
      result: {
        label: 'Pasó a una persona',
        detail: 'La conversación queda en Necesita humano y el asistente deja de responder en ese chat.',
      },
    },
    {
      kind: 'checklist',
      id: 'preparar',
      title: 'Qué tenés que definir para conectar la agenda',
      groups: [
        {
          items: [
            'Profesionales y sedes, con los días que atiende cada uno.',
            'Cuánto dura cada tipo de turno: primera vez, control, práctica.',
            'Qué obras sociales y planes toma cada profesional. No siempre es la misma lista para todo el consultorio.',
            'Tu regla para mover turnos: hasta cuándo avisa el paciente y qué pasa si avisa tarde.',
            'Qué turnos no se dan por WhatsApp, como sobreturnos, cirugías o prácticas con preparación.',
          ],
        },
        {
          items: [
            'Dónde vive tu agenda. Si está en un sistema, vemos si deja leer y escribir. Si está en un cuaderno, todavía no hay qué conectar: arrancás con el asistente juntando pedidos.',
            'El número de guardia o el texto exacto para una urgencia.',
            'Quién mira la bandeja en cada turno de recepción. La derivación marca el chat, nadie recibe una alerta.',
          ],
        },
      ],
    },
    {
      kind: 'notes',
      id: 'limites',
      tone: 'surface',
      title: 'Lo que un consultorio tiene que saber antes',
      items: [
        {
          title: 'Audios de pacientes mayores',
          text: 'Un audio nunca llega a Atende. El paciente no recibe respuesta del asistente y el mensaje queda en el WhatsApp del teléfono del negocio, así que alguien tiene que mirarlo.',
        },
        {
          title: 'Órdenes y credenciales',
          text: 'Las fotos de una orden, de la credencial o de un estudio tampoco llegan. Si recepción pide esos papeles por WhatsApp, ese circuito sigue en el teléfono.',
        },
        {
          title: 'Datos de salud',
          text: 'El asistente se configura para no pedir diagnósticos ni historia clínica. Es una instrucción, no un candado: si un paciente cuenta sus síntomas, ese texto queda en la conversación. Probalo desde otro número con las frases que te llegan de verdad; usa créditos.',
        },
        {
          title: 'Recordatorio del día anterior',
          text: 'No sale solo, porque Atende no empieza conversaciones por su cuenta. Se [arma a pedido](/blog/recordatorios-de-turnos-por-whatsapp), y para esos avisos conviene evaluar la API oficial de Meta.',
        },
        {
          title: 'Cuando recepción quiere seguir',
          text: 'Contestar desde la bandeja no frena al asistente. Hay que marcar el chat como Necesita humano. Ese chat se cierra 12 horas después del último mensaje del paciente y, si vuelve a escribir, responde el asistente.',
        },
      ],
    },
  ],
  faq: [
    {
      q: '¿Atende puede dar turnos con obra social?',
      a: 'Puede responder qué coberturas tomás, con la lista que cargues, y con la agenda conectada reservar el tipo de turno que corresponde. No verifica si el afiliado está al día ni gestiona autorizaciones: eso sigue en recepción.',
    },
    {
      q: '¿Qué pasa si un paciente pregunta por síntomas o medicación?',
      a: 'Se configura para no responder consultas clínicas: las pasa a una persona y la conversación queda marcada como Necesita humano. Si es una urgencia, da el número de guardia o emergencias que definiste, porque la marca no le avisa a nadie por teléfono.',
    },
    {
      q: '¿Sirve para un consultorio con varios profesionales o sedes?',
      a: 'Sí, si tu agenda los distingue. Todo entra por el mismo WhatsApp, porque un espacio trabaja con un número, y el asistente pregunta con quién o en qué sede antes de ofrecer horarios.',
    },
    {
      q: '¿Atende guarda datos de los pacientes?',
      a: 'El asistente se configura para quedarse en lo administrativo y no pedir datos clínicos. Sí se guardan los mensajes de texto, el nombre de WhatsApp y el número. Si un paciente escribe información de salud por su cuenta, ese texto queda en la conversación. Tu consultorio responde por los datos de sus pacientes.',
    },
  ],
  guides: [
    { slug: 'como-automatizar-whatsapp-clinicas', label: 'Guía para clínicas' },
    { slug: 'como-automatizar-whatsapp-odontologicas', label: 'Guía para consultorios odontológicos' },
    { slug: 'como-automatizar-whatsapp-veterinarias', label: 'Guía para veterinarias' },
  ],
  service: { href: '/servicios/turnos-whatsapp', label: 'Turnos y reservas por WhatsApp' },
  cta: {
    title: 'Mirá cómo quedaría con tu agenda.',
    text: 'Contanos cómo das turnos hoy, qué coberturas tomás y dónde está tu agenda. Vemos juntos qué se puede conectar y qué sigue en recepción.',
    demoLabel: 'Pedir una demo para mi consultorio',
    context: 'Hola, tengo un consultorio y quiero ver cómo Atende reserva y reprograma turnos por WhatsApp',
  },
  hub: {
    tag: 'Turnos',
    task: 'Reservar o reprogramar el turno',
    scene: 'El paciente avisa que no llega el jueves y el turno pasa al martes, con el horario viejo liberado. Síntomas y medicación van a una persona.',
    needs: 'tu agenda',
    tone: 'bg-sky',
  },
};

const peluquerias: Rubro = {
  slug: 'peluquerias-y-estetica',
  name: 'Peluquerías, estética y gimnasios',
  title: 'WhatsApp para peluquerías, estética y gimnasios: turnos y cupos',
  description:
    'Conectado a tu agenda, Atende reserva el lugar según duración del servicio y profesional, o el cupo de la clase. La seña la confirma tu equipo.',
  updated: '2026-11-06',
  h1: {
    before: 'WhatsApp para peluquerías y gimnasios que',
    accent: 'reserva el lugar en la agenda.',
  },
  lede:
    'Con las manos en un color no hay quien conteste, y a la noche el celular tiene una pila de chats sin responder. Conectado a tu agenda, Atende pregunta qué servicio quiere la clienta, ofrece los horarios que alcanzan para ese servicio con la profesional que pidió y deja el lugar reservado. Esa conexión se arma a pedido para tu salón.',
  supervision:
    'Si vendés clases, hace lo mismo con los cupos. Vos ves toda la conversación desde el celular, en la bandeja de tu equipo.',
  chat: {
    caption: 'Ejemplo ilustrativo, con la agenda conectada',
    messages: [
      { from: 'them', text: 'Hola, quiero corte y color con Caro el sábado' },
      { from: 'us', text: 'Corte y color con Caro lleva casi toda la mañana. Tengo sábado 9:00 o 13:30. ¿Cuál te queda mejor?' },
      { from: 'them', text: 'A las 9' },
      { from: 'us', text: 'Listo, te reservé el sábado 9:00 con Caro. Para color pedimos seña, te paso el alias por acá.' },
    ],
    result: {
      label: 'Turno reservado, seña pendiente',
      detail: 'Sábado 9:00, corte y color, con Caro. Tu agenda bloquea el tiempo que lleva el servicio.',
    },
  },
  fallback:
    'Sin conexión, el asistente junta el servicio, con quién y qué día prefiere, y tu equipo mira la agenda y confirma. Hasta entonces la clienta no lee que tiene turno.',
  blocks: [
    {
      kind: 'table',
      id: 'servicios',
      title: 'Por qué un color no entra en el casillero de un corte',
      intro:
        'Las dobles reservas suelen nacer acá: un servicio largo anotado como si fuera corto. Antes de ofrecer un horario, el asistente tiene que saber qué preguntarle a la clienta y cuánto bloquea tu agenda.',
      caption: 'Qué necesita saber la agenda y qué pregunta el asistente para cada servicio',
      columns: ['Servicio', 'Qué tiene que saber la agenda', 'Qué pregunta el asistente antes de reservar'],
      rows: [
        ['Corte', 'Es corto y entra en los huecos, por eso conviene que no bloquee de más.', 'Con quién, y si viene con lavado y brushing.'],
        ['Color o mechas', 'Tiene tiempo de pose. Si tu profesional toma otra clienta en ese rato, la agenda lo tiene que permitir.', 'Si es retoque de raíz o color completo, y el largo del pelo.'],
        ['Alisado o keratina', 'Es un bloque largo, que cambia con el largo y el tipo de pelo.', 'El largo, y si tiene color o decoloración hecha.'],
        ['Uñas', 'No lleva lo mismo un service que una primera vez, ni semipermanente que esculpidas.', 'Qué técnica quiere y si hay que retirar algo anterior.'],
        ['Depilación y cosmetología', 'Depende de la zona y de la cabina o el equipo, que pueden ser compartidos.', 'La zona, y si viene por una sesión suelta o por un paquete que ya pagó.'],
      ],
      note: 'Esta tabla no trae minutos a propósito: las duraciones son las tuyas y cambian de una profesional a otra.',
    },
    {
      kind: 'prose',
      id: 'profesional',
      tone: 'surface',
      title: '“Con Caro o con nadie”: la profesional preferida',
      paragraphs: [
        'Muchas clientas vienen por una persona más que por el salón. Si Caro no tiene lugar el sábado, el asistente ofrece el próximo hueco con ella y, solo si vos lo permitís, otra profesional para ese día. Esa regla la definís vos: hay salones donde ofrecer a otra es normal y otros donde termina en discusión en el mostrador.',
        'Todo tiene que entrar por un número, porque un espacio trabaja con uno. Si cada profesional alquila su sillón y atiende a sus clientas desde su celular personal, esas conversaciones quedan afuera de Atende.',
      ],
    },
    {
      kind: 'steps',
      id: 'sena',
      tone: 'sun',
      title: 'La seña: hasta dónde llega Atende',
      intro: 'Atende no cobra ni valida transferencias. Deja el lugar tomado y la seña pendiente, y la confirma tu equipo.',
      steps: [
        { title: 'Reserva con seña pendiente', text: 'Con la agenda conectada, el lugar queda tomado y marcado como pendiente, si tu agenda maneja ese estado.' },
        { title: 'Pasa el alias y el monto', text: 'Manda los datos que cargaste. Si la seña cambia según el servicio, eso va en el contexto del asistente.' },
        { title: 'La clienta manda el comprobante', text: 'Si lo manda como imagen, no llega a Atende. Queda en el WhatsApp del teléfono y el asistente no se entera.' },
        { title: 'Tu equipo confirma', text: 'Alguien mira la cuenta y da el OK. Si la seña no entra, liberar el lugar es decisión tuya: Atende no le escribe a la clienta para reclamarla.' },
      ],
    },
    {
      kind: 'chat',
      id: 'gimnasios',
      title: 'Si vendés clases, lo que se agota son los cupos',
      paragraphs: [
        'En un gimnasio o un estudio de pilates el horario es fijo y lo que se termina son los lugares. Conectado a donde llevás la grilla, Atende mira cuántos quedan en la clase y anota a quien escribe.',
        'Antes hay que decidir tres cosas: si puede reservar alguien que debe la cuota, hasta cuándo se cancela sin perder la clase y cómo se descuenta de un abono. Sin esas reglas escritas, el asistente no debería anotar a nadie.',
        'Una lista de espera necesita avisar cuando se libera un lugar, y ese es un mensaje que empieza Atende: se arma a pedido. Las preguntas sobre lesiones o apto físico pasan a una persona.',
      ],
      caption: 'Ejemplo ilustrativo, con la grilla de clases conectada',
      messages: [
        { from: 'them', text: '¿Hay lugar en funcional hoy a las 19?' },
        { from: 'us', text: 'Sí, quedan 2 lugares en la de las 19. ¿Te anoto?' },
        { from: 'them', text: 'Dale' },
        { from: 'us', text: 'Listo, quedaste anotada en funcional hoy a las 19.' },
      ],
      result: { label: 'Cupo reservado', detail: 'Funcional, hoy 19:00. Queda un lugar menos en la clase.' },
    },
    {
      kind: 'checklist',
      id: 'preparar',
      tone: 'surface',
      title: 'Lo que hay que tener a mano antes de conectar',
      groups: [
        {
          title: 'Salón o centro de estética',
          items: [
            'Tu lista de servicios con la duración real de cada uno, por profesional.',
            'Quién hace qué: no todas hacen color ni todas hacen uñas.',
            'Qué servicios piden seña, de cuánto y a qué alias.',
            'Hasta cuándo se cancela o se mueve un turno sin perder la seña.',
            'Dónde está tu agenda. Si es un cuaderno, no hay nada que conectar: arrancás con el asistente juntando pedidos.',
          ],
        },
        {
          title: 'Gimnasio o estudio',
          items: [
            'La grilla de clases, con el cupo de cada una.',
            'Los tipos de abono y cómo descuentan clases.',
            'Tu regla para quien debe la cuota.',
            'Dónde anotás hoy quién va a cada clase.',
          ],
        },
      ],
    },
    {
      kind: 'notes',
      id: 'limites',
      title: 'Lo que no llega y lo que no sale solo',
      items: [
        {
          title: 'La foto del color que quiere',
          text: 'La clienta manda una foto de referencia y esa imagen no llega a Atende, así que el asistente no se entera. Podés pedirle en el contexto que pregunte por escrito qué color busca. La foto la mira alguien en el teléfono.',
        },
        {
          title: 'El audio desde el auto',
          text: 'Un audio tampoco llega y no recibe respuesta. Si tus clientas escriben mucho así, alguien tiene que revisar el teléfono del negocio.',
        },
        {
          title: 'El aviso del día anterior',
          text: 'Se arma a pedido; Atende no lo manda por su cuenta. Para esos avisos conviene evaluar la API oficial de Meta, que usa plantillas aprobadas fuera de la ventana de 24 horas.',
        },
        {
          title: 'La clienta enojada',
          text: 'Si alguien reclama por un color, marcá el chat como Necesita humano. Contestar desde la bandeja no alcanza: el asistente seguiría respondiendo.',
        },
      ],
    },
  ],
  faq: [
    {
      q: '¿Atende puede cobrar la seña?',
      a: 'No. Pasa el alias y el monto que cargaste y, con la agenda conectada, deja el turno con seña pendiente. El comprobante, si lo mandan como imagen, no llega a Atende: lo revisa tu equipo y confirma.',
    },
    {
      q: '¿Cada profesional puede tener su propia agenda?',
      a: 'Sí, si tu agenda las separa: la conexión lee la de cada profesional y el asistente ofrece los horarios de la persona que pidió la clienta. Todo entra por el WhatsApp del salón, porque un espacio trabaja con un número.',
    },
    {
      q: '¿Puede mandar fotos de trabajos anteriores?',
      a: 'Sí, y eso no necesita conexión: subís fotos y videos a la biblioteca una vez y el asistente los manda cuando hacen falta. Al revés no funciona: las fotos que manda la clienta no llegan a Atende.',
    },
    {
      q: '¿Sirve para un gimnasio con clases y cupos?',
      a: 'Sí, conectado a donde llevás la grilla y los cupos: mira cuántos lugares quedan y anota a quien escribe. Sin conexión, responde los horarios que cargaste y tu equipo anota.',
    },
    {
      q: '¿Manda recordatorios para que no falten?',
      a: 'No por su cuenta. Los recordatorios se arman a pedido para tu negocio. Para esos avisos conviene evaluar la API oficial de Meta.',
    },
  ],
  guides: [
    { slug: 'como-automatizar-whatsapp-peluquerias', label: 'Guía para peluquerías' },
    { slug: 'como-automatizar-whatsapp-centros-de-estetica', label: 'Guía para centros de estética' },
    { slug: 'como-automatizar-whatsapp-gimnasios', label: 'Guía para gimnasios' },
  ],
  service: { href: '/servicios/turnos-whatsapp', label: 'Turnos y reservas por WhatsApp' },
  cta: {
    title: 'Traé tu lista de servicios y la vemos.',
    text: 'Contanos qué servicios das, quién hace cada uno y dónde anotás hoy los turnos. Te decimos qué haría falta conectar y cómo arrancar mientras tanto.',
    demoLabel: 'Pedir una demo para mi salón',
    context: 'Hola, tengo una peluquería y quiero ver cómo Atende reserva turnos según el servicio y la seña',
  },
  hub: {
    tag: 'Agenda',
    task: 'Reservar el lugar en la agenda',
    scene: 'Corte y color con la profesional que pidió la clienta, con la agenda bloqueada el tiempo que lleva y la seña pendiente. En un gimnasio, el cupo de la clase.',
    needs: 'tu agenda o tu grilla de clases',
    tone: 'bg-coral-soft',
  },
};

const restaurantes: Rubro = {
  slug: 'restaurantes-y-hoteles',
  name: 'Restaurantes y hoteles',
  title: 'Chatbot para restaurantes y hoteles: reservas por WhatsApp',
  description:
    'Conectado a tu sistema de reservas, Atende toma la mesa o la habitación por WhatsApp: personas, turno, fechas. No lo reemplaza, y los grupos pasan a tu equipo.',
  updated: '2026-11-06',
  h1: {
    before: 'Chatbot para restaurantes y hoteles que',
    accent: 'toma la reserva.',
  },
  lede:
    'Viernes a las nueve, con el salón lleno, nadie mira el WhatsApp. Conectado a tu sistema de reservas, Atende pregunta cuántos son, para qué día y qué turno, se fija si hay lugar y toma la reserva en la conversación. Esa conexión se arma a pedido para tu negocio.',
  supervision:
    'Los grupos, las alergias y los reclamos pasan a tu equipo, que ve toda la conversación en la bandeja.',
  chat: {
    caption: 'Ejemplo ilustrativo, con tu sistema de reservas conectado',
    messages: [
      { from: 'them', text: 'Hola, ¿tienen mesa para 4 el sábado a la noche?' },
      { from: 'us', text: 'Para 4 el sábado tengo primer turno a las 20:30 o segundo a las 22:30. ¿Cuál preferís?' },
      { from: 'them', text: 'El de las 22:30, a nombre de Sofía' },
      { from: 'us', text: 'Listo Sofía, mesa para 4 el sábado a las 22:30. Si cambia la cantidad, avisanos por acá.' },
    ],
    result: {
      label: 'Reserva tomada',
      detail: 'Mesa para 4, sábado 22:30, a nombre de Sofía. Cargada en tu sistema de reservas.',
    },
  },
  fallback:
    'Sin conexión, el asistente junta nombre, personas, día y turno, y tu encargado confirma desde la bandeja. No tiene de dónde saber si hay lugar, así que no da la mesa por reservada.',
  blocks: [
    {
      kind: 'callout',
      id: 'sistema',
      tone: 'forest',
      title: 'Atende no reemplaza tu sistema de reservas',
      paragraphs: [
        'Si ya usás uno, sigue siendo el lugar donde viven las mesas, el plano del salón y la disponibilidad. Atende trabaja al lado: le pregunta a ese sistema antes de ofrecer un horario y escribe ahí la reserva, así la mesa que entró por WhatsApp aparece junto con las que entraron por teléfono o por tu web.',
        'Si hoy anotás en un cuaderno, tu primer paso es sin conexión y cada reserva la cierra una persona. Te ordena el WhatsApp y te saca [las preguntas repetidas](/servicios/atencion-automatica-whatsapp), pero no toma reservas por vos.',
      ],
    },
    {
      kind: 'table',
      id: 'mesa-habitacion',
      title: 'Una mesa y una habitación se reservan distinto',
      caption: 'Diferencias entre una reserva de restaurante y una de hotel',
      columns: ['Tema', 'Restaurante', 'Hotel'],
      rows: [
        ['Qué define la reserva', 'Personas, día y turno.', 'Entrada, salida, huéspedes y tipo de habitación.'],
        ['Qué se agota', 'Las mesas de ese turno. Una mesa de cuatro no siempre recibe a cinco.', 'Las noches seguidas: una habitación libre el viernes y ocupada el sábado no sirve para el fin de semana.'],
        ['De dónde sale el precio', 'La carta, o un menú fijo si esa fecha es especial.', 'El tarifario por temporada, con feriados y mínimo de noches.'],
        ['Cuándo se pide seña', 'En grupos, fechas especiales o noches fuertes, según tu regla.', 'Según tu política, con la cancelación explicada antes de reservar.'],
        ['El riesgo mayor', 'Dar una mesa que ya entró por otro canal.', 'Vender dos veces la misma habitación si también la ofrecés en agencias online y la disponibilidad no está al día.'],
        ['Qué pasa a una persona', 'Grupos grandes, eventos y consultas por alergias.', 'Contingentes, facturas a empresas y reclamos durante la estadía.'],
      ],
    },
    {
      kind: 'chat',
      id: 'hotel',
      tone: 'mint',
      title: 'En un hotel, primero las fechas exactas',
      paragraphs: [
        '“El finde largo” no alcanza: un feriado puente cambia la tarifa y a veces el mínimo de noches. Conectado a tu sistema, el asistente consulta disponibilidad y tarifa para esas noches, y la respuesta sale de ahí, no de una pregunta frecuente que alguien cargó en marzo.',
        'Las fotos de las habitaciones no necesitan conexión. Las subís a la biblioteca y el asistente las manda cuando se las piden.',
      ],
      caption: 'Ejemplo ilustrativo, con el sistema del hotel conectado',
      messages: [
        { from: 'them', text: 'Hola, ¿tienen habitación para dos del viernes al domingo?' },
        { from: 'us', text: 'Sí, tengo doble con desayuno para esas dos noches. Para reservarla pedimos una seña. ¿Te la dejo a tu nombre?' },
        { from: 'them', text: 'Sí, a nombre de Julián' },
        { from: 'us', text: 'Listo Julián, la doble quedó reservada con seña pendiente. Te paso los datos para transferir.' },
      ],
      result: {
        label: 'Reserva cargada, seña pendiente',
        detail: 'Doble, 2 noches, de viernes a domingo. Tu equipo la confirma cuando entra la seña.',
      },
    },
    {
      kind: 'table',
      id: 'problemas',
      title: 'Los mensajes que arman problema un sábado a la noche',
      intro: 'Acá se ve si la configuración está bien hecha. No hay modo de prueba: una vez conectado el número, el asistente responde a todos. Probá estos casos desde otro número; usa créditos.',
      caption: 'Mensajes problemáticos, por qué lo son y qué conviene que haga el asistente',
      columns: ['El mensaje', 'El problema', 'Qué conviene que haga'],
      rows: [
        ['Somos 14, ¿tienen lugar?', 'Un grupo cambia el armado del salón, el menú y la seña.', 'Juntar fecha, cantidad y ocasión, y pasar a tu encargado sin confirmar.'],
        ['Soy celíaca, ¿puedo comer tranquila?', 'Una respuesta equivocada es un problema de salud.', 'Decir lo que cargaste de la carta y pasar a una persona. Nunca asegurar que no hay contaminación cruzada.'],
        ['Mesa para ya, llegamos en 20', 'El salón cambia minuto a minuto.', 'Si tu sistema no lo tiene al día, decirlo y dar el teléfono del local.'],
        ['Al final somos 6, no 4', 'La mesa puede no alcanzar.', 'Conectado, volver a consultar lugar antes de cambiar la reserva.'],
        ['Ya te mandé el comprobante', 'La imagen no llega a Atende.', 'Decir que lo revisa el equipo. Nunca dar la seña por acreditada.'],
        ['Llegamos a las 2 de la mañana', 'Quizás nadie abre a esa hora.', 'Responder tu política de ingreso tarde. Si no la cargaste, pasar a una persona.'],
      ],
    },
    {
      kind: 'checklist',
      id: 'preparar',
      tone: 'surface',
      title: 'Qué necesitamos saber para conectar',
      groups: [
        {
          title: 'Restaurante',
          items: [
            'Turnos de mesa, horarios y capacidad de cada uno.',
            'Desde cuántas personas es grupo y quién lo toma.',
            'Fechas con seña, con monto, alias y plazo.',
            'Hasta cuándo se cancela o se cambia la cantidad.',
            'Días sin reservas, por orden de llegada.',
            'Tu sistema de reservas: qué deja leer y escribir.',
          ],
        },
        {
          title: 'Hotel',
          items: [
            'Tipos de habitación y capacidad real de cada uno.',
            'Tarifario por temporada, feriados y mínimo de noches.',
            'Política de seña y cancelación, escrita como se la dirías a un huésped.',
            'Horarios de ingreso y salida, y qué pasa con un ingreso tarde.',
            'En qué otros canales vendés y dónde se unifica la disponibilidad.',
          ],
        },
      ],
    },
    {
      kind: 'notes',
      id: 'limites',
      title: 'Qué no hace, aunque esté conectado',
      items: [
        { title: 'La carta en PDF', text: 'El asistente manda fotos y videos de la biblioteca, no documentos. Si querés que mande la carta, subila como imagen.' },
        { title: 'Ubicaciones', text: 'Si un huésped te manda su ubicación, no llega. Al revés sí: el asistente pasa tu dirección y cómo llegar como texto, si lo cargaste.' },
        { title: '“Llegamos tarde” por audio', text: 'Un audio nunca llega a Atende. Si tu salón depende de esos avisos, alguien tiene que mirar el teléfono del negocio durante el servicio.' },
        { title: 'Cobrar', text: 'Atende no cobra ni confirma transferencias. Pasa los datos que cargaste y la seña la acredita tu equipo.' },
        { title: 'Un reclamo durante la estadía', text: 'Marcá el chat como Necesita humano, porque responder desde la bandeja no frena al asistente. Se cierra 12 horas después del último mensaje del huésped y, si vuelve a escribir, contesta el asistente.' },
      ],
    },
  ],
  faq: [
    {
      q: '¿Atende reemplaza mi sistema de reservas?',
      a: 'No. Tu sistema sigue mandando sobre mesas y disponibilidad. Atende toma la reserva por WhatsApp y la escribe ahí, con una conexión que se arma a pedido para tu negocio.',
    },
    {
      q: '¿Qué pasa si no uso ningún sistema de reservas?',
      a: 'El asistente junta nombre, personas, día y turno, y tu equipo confirma desde la bandeja. No le dice a nadie que la mesa quedó reservada, porque no tiene de dónde saber si hay lugar.',
    },
    {
      q: '¿Cómo se maneja un grupo grande o un evento?',
      a: 'Definís desde cuántas personas es grupo. A partir de ahí el asistente junta fecha, cantidad y ocasión, y la conversación pasa a tu encargado, que arma el menú, la seña y la mesa.',
    },
    {
      q: '¿Sirve para un hotel que también vende por agencias online?',
      a: 'Sí, si existe un lugar donde se unifica la disponibilidad y la conexión puede leerlo. Sin eso, el asistente no debería confirmar habitaciones: junta fechas y huéspedes, y responde tu recepción.',
    },
    {
      q: '¿Contesta cuando el local está cerrado?',
      a: 'Sí, responde mensajes de texto a cualquier hora, mientras el servicio y tu WhatsApp estén conectados. Eso no significa que haya alguien de tu equipo mirando: lo que pasa a una persona queda marcado, y ese chat se cierra solo 12 horas después del último mensaje del contacto. Al abrir, mirá también las Finalizadas.',
    },
  ],
  guides: [
    { slug: 'como-automatizar-whatsapp-restaurantes', label: 'Guía para restaurantes' },
    { slug: 'como-automatizar-whatsapp-hoteles', label: 'Guía para hoteles' },
    { slug: 'como-automatizar-whatsapp-eventos', label: 'Guía para salones y eventos' },
    { slug: 'como-automatizar-whatsapp-agencias-de-viajes', label: 'Guía para agencias de viajes' },
  ],
  service: { href: '/servicios/turnos-whatsapp', label: 'Turnos y reservas por WhatsApp' },
  cta: {
    title: 'Contanos dónde anotás hoy tus reservas.',
    text: 'Con eso vemos si hay un sistema para conectar o si conviene arrancar con el asistente juntando reservas y tu equipo cerrándolas.',
    demoLabel: 'Pedir una demo para mi local',
    context: 'Hola, tengo un restaurante u hotel y quiero ver cómo Atende toma reservas junto a mi sistema',
  },
  hub: {
    tag: 'Reservas',
    task: 'Tomar la reserva',
    scene: 'Mesa para 4 en el segundo turno del sábado, o una doble de viernes a domingo con seña pendiente. Trabaja al lado de tu sistema de reservas.',
    needs: 'tu sistema de reservas',
    tone: 'bg-mint',
  },
};

const comercios: Rubro = {
  slug: 'comercios-y-distribuidoras',
  name: 'Comercios y distribuidoras',
  title: 'Stock y pedidos por WhatsApp para comercios y distribuidoras',
  description:
    'Conectado a tu stock y tu lista de precios, Atende consulta disponibilidad y registra el pedido por WhatsApp, con mínimos y zonas. Hay arranque sin ERP.',
  updated: '2026-11-06',
  h1: {
    before: 'WhatsApp para distribuidoras que',
    accent: 'consulta el stock y registra el pedido.',
  },
  lede:
    'El lunes a primera hora entran las listas: “lo mismo de siempre, pero sumame dos cajas de aceite”. Conectado a tu stock y a tu lista de precios, Atende se fija qué hay, aplica el precio de ese cliente, avisa si no llega al mínimo y registra el pedido en la conversación. Esa conexión se arma a pedido para tu negocio.',
  supervision:
    'Tu equipo ve toda la conversación en la bandeja, y si no tenés ERP hay un [arranque sin sistema](#sin-erp).',
  chat: {
    caption: 'Ejemplo ilustrativo, con stock y lista de precios conectados',
    messages: [
      { from: 'them', text: 'Hola, lo mismo de la semana pasada pero sumame 2 cajas de aceite' },
      { from: 'us', text: 'Tu último pedido más 2 cajas de aceite. La yerba de 1 kg no tiene stock, hay de 500 g. ¿La cambio?' },
      { from: 'them', text: 'Sí, cambiala' },
      { from: 'us', text: 'Listo, registré tu pedido con tu lista de precios. Sale en el reparto del jueves.' },
    ],
    result: {
      label: 'Pedido registrado',
      detail: 'Cargado en tu sistema, con la lista de ese cliente y el reparto de su zona.',
    },
  },
  fallback:
    'Sin conexión, el asistente junta productos, cantidades y si retira o le enviás, y tu equipo revisa stock y precio y confirma el pedido desde la bandeja.',
  blocks: [
    {
      kind: 'ticket',
      id: 'pedido',
      tone: 'surface',
      title: 'Lo que queda cargado cuando termina el chat',
      paragraphs: [
        'El pedido termina escrito donde tu depósito ya trabaja, y nadie tiene que releer un chat a las siete de la mañana para armar el reparto.',
        'El cliente se reconoce por su número de WhatsApp, que en general la conexión recibe sin que haya que pedirlo. Si tiene cuenta en tu sistema, de ahí salen su lista de precios, su zona y su último pedido.',
        'Atende no guarda pedidos anteriores por su cuenta. “Lo mismo de la semana pasada” funciona porque lo lee de tu sistema; sin conexión, el cliente tiene que escribirlo de nuevo.',
      ],
      ticket: {
        label: 'Pedido de ejemplo. Ejemplo ilustrativo',
        header: [
          { label: 'Cliente', value: 'Reconocido por su número' },
          { label: 'Lista', value: 'Mayorista B' },
          { label: 'Zona', value: 'Norte' },
        ],
        lines: [
          { item: 'Aceite de girasol 900 ml, caja', quantity: '6 cajas', note: '2 sumadas hoy' },
          { item: 'Yerba 500 g, bulto', quantity: '4 bultos', note: 'reemplaza a la de 1 kg, sin stock' },
          { item: 'Fideos secos 500 g, bulto', quantity: '5 bultos' },
        ],
        footer: [
          { label: 'Mínimo de compra', value: 'Cumplido' },
          { label: 'Entrega', value: 'Reparto del jueves' },
        ],
      },
    },
    {
      kind: 'table',
      id: 'reglas',
      title: 'Las reglas que hoy tiene en la cabeza quien atiende el WhatsApp',
      intro:
        'Cada una de estas reglas tiene que estar escrita en algún lado para que el asistente la cumpla. Si solo la sabe tu vendedor de hace veinte años, primero hay que sacarla de ahí.',
      caption: 'Reglas comerciales y qué hace el asistente con y sin conexión',
      columns: ['Regla', 'Conectado a tu sistema', 'Sin conexión'],
      rows: [
        ['Lista de precios por cliente', 'Lee la lista de ese cliente en el momento.', 'No pasa precios individuales. Los confirma tu equipo.'],
        ['Mínimo de compra', 'Avisa cuánto falta antes de cerrar, por monto o por bultos.', 'Explica la regla general que cargaste.'],
        ['Zonas y días de reparto', 'Dice cuándo sale el próximo reparto a su zona.', 'Responde con la tabla de zonas que cargaste.'],
        ['Horario de corte', 'Si el pedido entró tarde, avisa que va al reparto siguiente.', 'Informa el horario cargado.'],
        ['Retiro o envío', 'Registra cómo lo quiere y por dónde retira.', 'Lo pregunta y queda en la conversación.'],
        ['Stock', 'Consulta en el momento y ofrece el reemplazo que definiste.', 'No promete stock.'],
        ['Cuenta corriente', 'Si tu sistema marca saldo vencido, no cierra el pedido y lo pasa a una persona.', 'Queda en manos de tu equipo.'],
      ],
    },
    {
      kind: 'steps',
      id: 'sin-erp',
      tone: 'mint',
      title: 'Empezar sin ERP',
      intro:
        'Muchas distribuidoras chicas trabajan con una planilla, una lista en PDF y la memoria de quien atiende. No hace falta cambiar eso para arrancar.',
      steps: [
        {
          title: 'Primero, sin conexión',
          text: 'Cargás qué vendés, tus zonas y tus condiciones. El asistente junta el pedido por texto y tu equipo lo revisa y lo confirma. Ya te sacás de encima la parte de preguntar.',
        },
        {
          title: 'Después, una planilla ordenada',
          text: 'Una hoja con código, producto, stock y precio da una base para armar la conexión. Nuestra [demo de concesionaria](/casos-de-uso/concesionarias-e-inmobiliarias) trabaja así, sobre Google Sheets. El trabajo real es mantenerla al día.',
        },
        {
          title: 'Por último, tu sistema de gestión',
          text: 'Si ya tenés un sistema de stock o facturación, vemos si deja leer y escribir. Si deja, el pedido entra directo ahí y la planilla se jubila.',
        },
      ],
    },
    {
      kind: 'notes',
      id: 'riesgos',
      title: 'Dónde se rompe un pedido por WhatsApp',
      items: [
        { title: 'El pedido por audio', text: 'Leer la lista en un audio mientras maneja es costumbre en muchos clientes, y un audio nunca llega a Atende. Es el límite que más pesa en este rubro: esos clientes van a tener que escribir, o los sigue atendiendo alguien desde el teléfono.' },
        { title: 'La foto de la lista', text: 'Lo mismo con la foto del papel escrito a mano o una orden de compra en PDF. No llegan, y el asistente no sabe que existen.' },
        { title: 'El empleado que pide desde otro número', text: 'Si ese número no está en tu sistema, el asistente no sabe qué lista le toca. Conviene cargar los números autorizados de cada cuenta.' },
        { title: 'Caja, bulto, pack', text: 'Cada cliente dice distinto. Si “aceite” puede ser tres productos, el asistente pregunta cuál, y las equivalencias tienen que venir en la conexión.' },
        { title: 'La lista de la semana pasada', text: 'Si tus precios cambian seguido, no los cargues en las preguntas frecuentes: el asistente repetiría el valor viejo. Los precios que se mueven se leen del sistema.' },
        { title: 'El pedido grabado dos veces', text: 'Si una respuesta se corta y el proceso se repite, un pedido puede entrar doble. La conexión lo tiene que frenar comparando cliente, día y contenido: es parte de lo que hay que resolver al armarla.' },
        { title: 'Si WhatsApp es tu único canal', text: 'Si tu número se desconecta, el asistente deja de responder hasta que vuelvas a conectarlo. Si casi todos tus pedidos entran por ahí, tené otro camino previsto para ese día.' },
      ],
    },
    {
      kind: 'compare',
      id: 'comercio-distribuidora',
      tone: 'surface',
      title: 'Comercio de barrio o distribuidora: cambia lo que hay que conectar',
      sides: [
        {
          title: 'Comercio',
          points: [
            'Precio de mostrador, igual para todos.',
            'Stock por variante: “¿lo tenés en negro, talle M?”.',
            'Fotos del producto desde tu biblioteca, sin conexión.',
            'Retiro en el local o envío a coordinar.',
            'Pedidos sueltos, de gente que quizás no vuelve a escribir.',
          ],
        },
        {
          title: 'Distribuidora',
          points: [
            'Cuentas con lista propia y condiciones propias.',
            'Stock por bulto, con reemplazos aceptados.',
            'Pedido repetido, que parte del anterior.',
            'Reparto por zona, con horario de corte.',
            'Mínimos de compra y cuenta corriente.',
          ],
        },
      ],
    },
    {
      kind: 'checklist',
      id: 'preparar',
      title: 'Qué preparar para conectar pedidos',
      groups: [
        {
          items: [
            'Dónde vive el stock y cada cuánto se actualiza.',
            'Tus listas de precios y qué cliente va en cada una.',
            'Los números de WhatsApp de cada cuenta, incluidos los de sus empleados.',
            'Mínimos por zona o por cliente, y horario de corte.',
          ],
        },
        {
          items: [
            'Días de reparto por zona y condiciones de retiro.',
            'Qué reemplazos aceptás cuando falta un producto.',
            'Qué pasa con una cuenta con saldo vencido.',
            'Cómo llaman tus clientes a cada producto, además del nombre en tu lista.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: '¿Puedo empezar sin ERP ni sistema de stock?',
      a: 'Sí. Sin conexión, el asistente junta productos, cantidades y forma de entrega, y tu equipo confirma stock y precio. Cuando tengas una planilla ordenada o un sistema que deje leer y escribir, se arma la conexión a pedido.',
    },
    {
      q: '¿Cómo sabe qué lista de precios le toca a cada cliente?',
      a: 'Por su número de WhatsApp, que en general la conexión recibe sin pedirlo. Si ese número está cargado en una cuenta de tu sistema, de ahí sale su lista. Si escribe desde otro número, el asistente no lo reconoce.',
    },
    {
      q: '¿Puede repetir el último pedido de un cliente?',
      a: 'Sí, si tu sistema guarda los pedidos y la conexión puede leerlos. Atende no los guarda por su cuenta: tiene en cuenta la conversación en curso y sus notas, no un historial de compras.',
    },
    {
      q: '¿Qué pasa si un cliente manda el pedido por audio o en una foto?',
      a: 'No llega a Atende y el asistente no responde. El mensaje queda en el WhatsApp del teléfono del negocio. Para que el pedido entre solo, tiene que venir escrito.',
    },
    {
      q: '¿Atende cobra o factura el pedido?',
      a: 'No. Registra el pedido en tu sistema y hasta ahí llega. El cobro y la factura siguen en tu circuito de siempre.',
    },
  ],
  guides: [
    { slug: 'como-automatizar-whatsapp-distribuidoras', label: 'Guía para distribuidoras' },
    { slug: 'como-automatizar-whatsapp-ferreterias', label: 'Guía para ferreterías' },
    { slug: 'como-automatizar-whatsapp-indumentaria', label: 'Guía para indumentaria' },
    { slug: 'como-automatizar-whatsapp-mueblerias', label: 'Guía para mueblerías' },
    { slug: 'como-automatizar-whatsapp-tiendas-online', label: 'Guía para tiendas online' },
    { slug: 'como-automatizar-whatsapp-fabricantes', label: 'Guía para fabricantes' },
    { slug: 'como-automatizar-whatsapp-logistica', label: 'Guía para logística' },
  ],
  service: { href: '/servicios/ventas-whatsapp', label: 'Pedidos y ventas por WhatsApp' },
  cta: {
    title: 'Traé un pedido real y lo armamos.',
    text: 'Mandanos cómo te llega un pedido típico y dónde tenés el stock y los precios. Vemos si conviene conectar ya o arrancar sin sistema.',
    demoLabel: 'Pedir una demo para mi negocio',
    context: 'Hola, tengo una distribuidora y quiero ver cómo Atende registra pedidos con stock y lista de precios',
  },
  hub: {
    tag: 'Pedidos',
    task: 'Consultar stock y registrar el pedido',
    scene: '“Lo mismo de la semana pasada, pero sumame 2 cajas”: mira el stock, aplica la lista de ese cliente y deja el pedido cargado. Hay arranque sin ERP.',
    needs: 'tu stock y tu lista de precios',
    tone: 'bg-sun/65',
  },
};

const concesionarias: Rubro = {
  slug: 'concesionarias-e-inmobiliarias',
  name: 'Concesionarias e inmobiliarias',
  title: 'Chatbot de WhatsApp para concesionarias e inmobiliarias',
  description:
    'Conectado a tu stock y tu agenda, Atende cotiza, calcula cuotas, registra al interesado y reserva la visita. Mirá la demo de motos y qué se arma a pedido.',
  updated: '2026-11-06',
  h1: {
    before: 'WhatsApp para concesionarias e inmobiliarias que',
    accent: 'cotiza y registra al interesado.',
  },
  lede:
    'Un domingo a la noche alguien pregunta por la 110 en rojo y cuánto le queda la cuota. Conectado a tu stock y a tus formas de pago, Atende busca la unidad, calcula la financiación, anota al interesado y, con tu agenda conectada, deja la visita reservada. Para tu negocio, esa conexión se arma a pedido.',
  supervision:
    'Tenemos una demo de concesionaria de motos que hace hoy las tres primeras tareas. Es una demo, no un cliente. El vendedor ve toda la conversación en la bandeja y cierra la operación.',
  chat: {
    caption: 'Ejemplo ilustrativo, basado en nuestra demo de concesionaria de motos',
    messages: [
      { from: 'them', text: 'Hola, ¿tienen la 110 en rojo? ¿Cuánto queda en 12 cuotas?' },
      { from: 'us', text: 'Sí, hay en rojo. En 12 cuotas queda en [cuota según tu planilla], con patente y gastos. Es un valor estimado.' },
      { from: 'them', text: 'Me interesa. Soy Nico' },
      { from: 'us', text: 'Listo Nico, te anoté como interesado en la 110 roja en 12 cuotas.' },
    ],
    result: {
      label: 'Interesado registrado',
      detail: 'Nico, 110 roja, 12 cuotas. Fila cargada en la planilla de la demo, con su número.',
    },
  },
  fallback:
    'Sin conexión, el asistente responde con lo que cargaste, junta qué busca el interesado y tu vendedor sigue desde la bandeja. No cotiza ni da stock que no pueda leer.',
  blocks: [
    {
      kind: 'table',
      id: 'demo',
      tone: 'surface',
      title: 'Qué hace la demo hoy y qué se arma para vos',
      intro:
        'De los seis rubros, este es el único con una conexión funcionando: una demo interna de concesionaria de motos, con stock, precios e interesados en una planilla de Google Sheets. La contamos porque funciona, y aclaramos hasta dónde llega.',
      caption: 'Tareas de una concesionaria, estado en la demo y qué hace falta para un negocio real',
      columns: ['Tarea', 'En la demo de motos', 'Para tu negocio'],
      rows: [
        ['Buscar una unidad por modelo, marca o color, con precio', 'Funciona', 'A pedido, conectado a tu stock'],
        ['Listar formas de pago, con interés y cantidad de pagos', 'Funciona', 'A pedido, con tus planes vigentes'],
        ['Calcular la cuota estimada, con patente y gastos', 'Funciona', 'A pedido, con tus costos y tus reglas'],
        ['Anotar al interesado', 'Funciona: suma una fila con nombre, número, moto y estado “no atendido”', 'A pedido, conectado a tu CRM o planilla'],
        ['Agendar la visita o la prueba de manejo', 'No está en la demo', 'A pedido, conectado a tu agenda'],
        ['Tomar un usado como parte de pago', 'No está en la demo', 'El asistente junta los datos y lo tasa una persona'],
      ],
      note: 'Un límite real de la demo: si el proceso se repite, puede sumar dos veces la misma fila. En una conexión para tu negocio eso se resuelve al armarla. Lo contamos en detalle en la [guía para registrar interesados en una planilla](/blog/registrar-leads-de-whatsapp-en-google-sheets).',
    },
    {
      kind: 'table',
      id: 'vehiculos',
      title: '0 km, usado, plan de ahorro: tres conversaciones distintas',
      intro:
        'En una concesionaria la pregunta “¿cuánto sale?” quiere decir cosas diferentes según qué esté mirando el interesado, y en cada caso hay algo que el asistente no puede prometer.',
      caption: 'Tipos de consulta en una concesionaria, qué necesita el asistente y qué no puede prometer',
      columns: ['Consulta', 'Qué necesita el asistente', 'Qué nunca promete'],
      rows: [
        ['0 km', 'Stock por color y versión, y precio de lista vigente.', 'Una fecha de entrega que tu sistema no informe.'],
        ['Usado', 'Año, kilómetros, estado y precio, unidad por unidad.', 'Que la unidad siga disponible cuando llegue el interesado, salvo que la conexión la reserve.'],
        ['“Te dejo el mío”', 'Marca, modelo, año y kilómetros, por escrito. Las fotos no llegan.', 'Un valor de toma. Lo define una persona que lo ve.'],
        ['Plan de ahorro', 'Tu explicación de cuota pura, suscripción y adjudicación.', 'Adjudicación ni fecha de entrega. Tampoco lo presenta como un crédito.'],
        ['Cuotas o crédito prendario', 'Planes vigentes, anticipo y costos.', 'Que el crédito esté aprobado. La cuota es estimada hasta que alguien la confirma.'],
      ],
    },
    {
      kind: 'chat',
      id: 'inmobiliarias',
      tone: 'mint',
      title: 'Inmobiliarias: del aviso a la visita',
      paragraphs: [
        'La consulta suele llegar desde un aviso en Zonaprop, Argenprop o Mercado Libre, con un link o una referencia. Atende no está integrado con esos portales y no abre el link. Reconoce la propiedad por la referencia o la dirección, si está en tu ficha.',
        'Conectado a tu cartera y a tu agenda, el asistente confirma que la propiedad sigue disponible, responde lo que figura en la ficha y reserva la visita con quien corresponda. La agenda de visitas se arma a pedido, igual que el resto.',
      ],
      caption: 'Ejemplo ilustrativo, con cartera y agenda conectadas',
      messages: [
        { from: 'them', text: 'Hola, vi el 2 ambientes de Nueva Córdoba, ref. 1482. ¿Sigue disponible?' },
        { from: 'us', text: 'Sí, sigue en alquiler. Para coordinar la visita: ¿es para vos y cuándo te mudarías?' },
        { from: 'them', text: 'Para mí, en enero. ¿Se puede ver el sábado?' },
        { from: 'us', text: 'Tengo sábado 11:00 o 12:30. ¿Cuál preferís?' },
        { from: 'them', text: 'A las 11' },
        { from: 'us', text: 'Listo, tu visita quedó reservada para el sábado a las 11:00.' },
      ],
      result: {
        label: 'Visita reservada',
        detail: 'Sábado 11:00, ref. 1482. Interesado registrado con su número y fecha de mudanza.',
      },
    },
    {
      kind: 'compare',
      id: 'alquiler-venta',
      title: 'Alquiler y venta se filtran distinto',
      intro: 'Si el asistente hace las mismas preguntas en los dos casos, tu corredor termina visitando con gente que no califica.',
      sides: [
        {
          title: 'Alquiler',
          points: [
            'Filtra por fecha de mudanza, garantía e ingresos.',
            'Las preguntas de siempre: precio, expensas, ajuste, requisitos, si aceptan mascotas.',
            'Varias visitas seguidas a la misma unidad funcionan bien.',
            'Las condiciones del contrato las habla una persona.',
          ],
        },
        {
          title: 'Venta',
          points: [
            'Filtra por forma de pago: contado, crédito hipotecario o si primero tiene que vender.',
            'Las preguntas de siempre: precio, expensas, escritura, si es apto crédito.',
            'La visita suele depender también del dueño.',
            'Una contraoferta nunca la contesta el asistente.',
          ],
        },
      ],
    },
    {
      kind: 'checklist',
      id: 'preparar',
      tone: 'surface',
      title: 'Qué hay que ordenar antes de conectar',
      groups: [
        {
          title: 'Concesionaria',
          items: [
            'Stock con modelo, versión, color, año y precio. Los usados, unidad por unidad.',
            'Planes y formas de pago vigentes, con interés, anticipo y costos de patentamiento.',
            'Quién actualiza esos datos y cada cuánto.',
            'Qué datos del interesado querés y dónde los anotás.',
          ],
        },
        {
          title: 'Inmobiliaria',
          items: [
            'Cartera con referencia, operación, precio, expensas y estado.',
            'Una ficha por propiedad, con lo que se puede responder sin preguntar.',
            'Requisitos de alquiler: garantías aceptadas e ingresos.',
            'Agenda de visitas por corredor y zonas que cubre cada uno.',
          ],
        },
      ],
    },
    {
      kind: 'notes',
      id: 'limites',
      title: 'Lo que puede salir mal si los datos no están al día',
      items: [
        { title: 'Una propiedad que ya se alquiló', text: 'Si tu ficha no se actualiza, el asistente va a decir que sigue disponible. La respuesta es tan buena como tu cartera.' },
        { title: 'Precios que cambian', text: 'Una lista vieja en las preguntas frecuentes te compromete. Lo que cambia seguido se lee del sistema, y la cuota siempre se presenta como estimada.' },
        { title: 'Fotos del stock o de la cartera', text: 'Subís fotos y videos a la biblioteca y el asistente los manda; eso no necesita conexión. La biblioteca tiene un tope por espacio, así que alcanza para lo que más se consulta, no para toda la cartera. Fichas en PDF no manda.' },
        { title: 'El usado por foto y la ubicación', text: 'Las fotos del auto que mandan a tasar, los audios y las ubicaciones no llegan a Atende. Tu vendedor los ve en el teléfono del negocio.' },
        { title: 'Cuando el vendedor quiere seguir', text: 'Responder desde la bandeja no frena al asistente. Hay que marcar el chat como Necesita humano, sobre todo si está negociando.' },
      ],
    },
  ],
  faq: [
    {
      q: '¿La demo de motos es un cliente real?',
      a: 'No. Es una demo que armamos nosotros para mostrar una conexión funcionando: consulta stock y precios, calcula financiación y registra interesados en Google Sheets. Sirve para entender cómo se comporta, no como prueba de resultados.',
    },
    {
      q: '¿Atende se conecta con Zonaprop, Argenprop o Mercado Libre?',
      a: 'No hay integración con portales. Las consultas que entran por WhatsApp desde un aviso llegan como cualquier mensaje de texto. Lo que se conecta, a pedido, es tu propia cartera, para que el asistente reconozca la propiedad por su referencia.',
    },
    {
      q: '¿Puede tasar un usado o aprobar un crédito?',
      a: 'No. Junta los datos del usado por escrito y, conectado a tus planes, calcula una cuota estimada, pero la tasación y la aprobación las hace una persona o la entidad que corresponda.',
    },
    {
      q: '¿Qué pasa si dos personas preguntan por la misma unidad?',
      a: 'El asistente lee el stock en cada consulta, pero registrar a un interesado no reserva la unidad. Si querés apartarla, eso tiene que formar parte de la conexión y de tu regla comercial, como una seña que confirma tu vendedor.',
    },
    {
      q: '¿Sirve si tengo la cartera en una planilla?',
      a: 'Sí, puede ser un buen punto de partida si tiene columnas claras y alguien la mantiene. La demo trabaja sobre una planilla. La conexión para tu inmobiliaria o concesionaria se arma a pedido.',
    },
  ],
  guides: [
    { slug: 'como-automatizar-whatsapp-concesionaria', label: 'Guía para concesionarias' },
    { slug: 'como-automatizar-whatsapp-venta-de-motos', label: 'Guía para venta de motos' },
    { slug: 'como-automatizar-whatsapp-inmobiliarias', label: 'Guía para inmobiliarias' },
    { slug: 'como-automatizar-whatsapp-constructoras', label: 'Guía para constructoras' },
  ],
  service: { href: '/servicios/ventas-whatsapp', label: 'Pedidos y ventas por WhatsApp' },
  cta: {
    title: 'Contanos cómo vendés y lo vemos.',
    text: 'Contanos dónde tenés el stock o la cartera, tus planes y tu agenda. Con lo que hace la demo de motos como referencia, vemos qué haría falta en tu negocio.',
    demoLabel: 'Pedir una demo para mi negocio',
    context: 'Hola, tengo una concesionaria o inmobiliaria y quiero ver qué haría falta para que Atende cotice y registre interesados',
  },
  hub: {
    tag: 'Cotizaciones',
    task: 'Cotizar, calcular cuotas, registrar al interesado y agendar la visita',
    scene: 'Nuestra demo de motos busca la unidad, calcula la cuota y anota al interesado en una planilla. Es una demo, no un cliente. Para inmobiliarias: del aviso a la visita.',
    needs: 'tu stock o cartera, tus planes y tu agenda',
    tone: 'bg-surface',
  },
};

const profesionales: Rubro = {
  slug: 'servicios-profesionales',
  name: 'Servicios profesionales',
  title: 'WhatsApp para abogados y contadores que filtra consultas',
  description:
    'Conectado a tu CRM, Atende filtra cada consulta por tema y urgencia y la registra para el profesional. Se configura para no asesorar: eso queda en tu estudio.',
  updated: '2026-11-06',
  h1: {
    before: 'WhatsApp para abogados y contadores que',
    accent: 'filtra la consulta y la registra.',
  },
  lede:
    'Un estudio pierde la tarde en consultas que no son de su materia y a veces se entera tarde de la que tenía un plazo corriendo. Conectado a tu CRM, Atende pregunta el tema, si hay un vencimiento y cómo prefiere que lo contacten, y registra la consulta para el profesional que corresponde. Esa conexión se arma a pedido para tu estudio.',
  supervision:
    'Se configura para no asesorar: ordena la consulta y tu equipo la toma desde la bandeja, donde ve toda la conversación.',
  chat: {
    caption: 'Ejemplo ilustrativo, con el CRM del estudio conectado',
    messages: [
      { from: 'them', text: 'Hola, me despidieron y me llegó un telegrama. Necesito un abogado' },
      { from: 'us', text: 'Soy el asistente del estudio y no puedo asesorarte. Paso tu consulta a un abogado. ¿El telegrama te da un plazo?' },
      { from: 'them', text: 'Sí, 48 horas' },
      { from: 'us', text: 'Entonces la marco como urgente. ¿Preferís que te llamen hoy después de las 17 o mañana a la mañana?' },
      { from: 'them', text: 'Hoy' },
      { from: 'us', text: 'Listo, quedó registrada tu consulta laboral como urgente, con pedido de llamado hoy después de las 17.' },
    ],
    result: {
      label: 'Consulta registrada',
      detail: 'Laboral, urgente por plazo, llamado pedido para hoy. Cargada en tu CRM.',
    },
  },
  fallback:
    'Sin conexión, el filtro funciona igual, pero el resultado queda en la conversación: el asistente la marca como Necesita humano y tu equipo le pone etiqueta y responsable. Sus notas son memoria interna y no se ven en ninguna pantalla, así que pedile que escriba el resumen en el chat.',
  blocks: [
    {
      kind: 'compare',
      id: 'carriles',
      title: 'Tres carriles antes de la primera pregunta de fondo',
      intro:
        'Lo primero que un estudio necesita saber es quién escribe. Una misma frase, “tengo un problema con ARCA”, pide cosas distintas si viene de un cliente de años o de alguien que te encontró ayer.',
      sides: [
        {
          title: 'Ya es cliente',
          points: [
            'Conectado, se reconoce por su número en tu CRM.',
            'No pasa por el filtro comercial.',
            'Su consulta va directo a su profesional.',
          ],
        },
        {
          title: 'Consulta nueva de tu materia',
          points: [
            'Tema, plazo y forma de contacto, en pocas preguntas.',
            'Si tu estudio chequea conflictos, se pide la contraparte.',
            'Queda registrada para el profesional que la toma.',
          ],
        },
        {
          title: 'Fuera de tu materia',
          points: [
            'Lo dice rápido y sin vueltas.',
            'Si tenés colegas a quienes derivar, pasa ese dato.',
            'No le ocupa una hora a nadie del estudio.',
          ],
        },
      ],
    },
    {
      kind: 'table',
      id: 'filtro',
      tone: 'surface',
      title: 'Qué pregunta según la materia, y qué no contesta nunca',
      intro:
        'Las preguntas de filtro son cortas a propósito. Sirven para saber quién la toma y qué tan rápido, y no para que el contacto cuente el caso completo por WhatsApp.',
      caption: 'Por materia: pregunta de filtro, señal de urgencia y lo que el asistente no responde',
      columns: ['Materia', 'Pregunta de filtro', 'Señal de urgencia', 'Lo que nunca responde'],
      rows: [
        ['Laboral', '¿Seguís trabajando ahí? ¿Recibiste telegrama?', 'Un plazo en un telegrama o una audiencia fijada.', 'Cuánto le corresponde de indemnización.'],
        ['Familia', '¿Hay un expediente abierto o es la primera consulta?', 'Violencia o riesgo para alguien: da el canal de emergencia que definiste y pasa a una persona.', 'Qué le conviene hacer.'],
        ['Sucesiones', '¿Quién falleció y hay bienes registrables?', 'En general no la hay, salvo una venta en curso.', 'Quién hereda y cuánto.'],
        ['Penal', '¿Es por una persona detenida?', 'Una detención: da tu teléfono de guardia y pasa a una persona.', 'Qué declarar.'],
        ['Monotributo y ARCA', '¿Es por tu categoría, una deuda o una intimación?', 'Una intimación con fecha o un vencimiento de esta semana.', 'En qué categoría le conviene estar.'],
        ['Sueldos y sociedades', '¿Cuántos empleados tenés? ¿Ya tenés contador?', 'Un vencimiento o una inspección.', 'Cómo encuadrar a un empleado o qué figura usar.'],
      ],
    },
    {
      kind: 'callout',
      id: 'confidencialidad',
      tone: 'sun',
      title: 'Confidencialidad: lo que tenés que saber antes de activarlo',
      paragraphs: [
        'Vos seguís respondiendo por tu secreto profesional. Por eso el asistente se configura para no pedir el relato del caso: con el tema y el plazo alcanza para derivar. Si alguien lo cuenta igual, ese texto queda guardado en la conversación.',
        'Todas las personas de tu espacio ven todas las conversaciones. No hay permisos por rol ni chats reservados para un profesional. Si tu estudio necesita separar lo que ve cada socio, hoy Atende no lo resuelve.',
        'Para generar cada respuesta, el texto pasa por proveedores externos. Leé la [Política de privacidad](/politica-de-privacidad) antes de decidir, y definí qué temas preferís que no entren nunca por este canal.',
      ],
    },
    {
      kind: 'notes',
      id: 'limites',
      title: 'Situaciones que hay que resolver antes de que pasen',
      items: [
        { title: 'Viernes a las 20, plazo corriendo', text: 'El asistente registra y marca la consulta, pero no le suena a nadie el teléfono, y el chat se cierra solo 12 horas después del último mensaje. Si atendés urgencias, el teléfono de guardia va en el mensaje. Si no, que lo diga con claridad.' },
        { title: 'La carta documento en PDF', text: 'Documentos, fotos y audios no llegan a Atende. La cédula que el contacto saca con el celular queda en el WhatsApp del teléfono del negocio, y el asistente no sabe que existe.' },
        { title: '“¿Cuánto me cobrás?”', text: 'El asistente dice solo lo que decidiste publicar: el valor de la consulta, que la primera no tiene costo, o que los honorarios los habla el profesional. Nunca estima el costo de un caso.' },
        { title: 'Vencimientos que cambian', text: 'Un estudio contable recibe la misma pregunta en cada vencimiento. Si cargás fechas en las preguntas frecuentes, alguien tiene que actualizarlas cada mes; si no, mejor que pase a una persona.' },
        { title: 'Cuando el profesional toma el caso', text: 'Contestar desde la bandeja no frena al asistente. Marcá el chat como Necesita humano. Se cierra 12 horas después del último mensaje del contacto y, si vuelve a escribir, responde el asistente.' },
      ],
    },
    {
      kind: 'checklist',
      id: 'preparar',
      tone: 'mint',
      title: 'Qué definir con tu estudio para conectar el CRM',
      groups: [
        {
          title: 'Reglas del estudio',
          items: [
            'Qué materias tomás y cuáles no, escritas como se las dirías a alguien.',
            'Qué es urgente para vos y quién lo atiende fuera de horario.',
            'Quién toma cada materia.',
            'Qué se dice sobre honorarios y qué no.',
          ],
        },
        {
          title: 'Datos de la conexión',
          items: [
            'Qué campos hay que completar en tu CRM o planilla.',
            'Cómo se reconoce a un cliente actual: su número tiene que estar cargado.',
            'Si chequeás conflictos, qué dato necesitás antes de dar una consulta.',
            'Cómo se avisa al profesional cuando entra una consulta nueva.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: '¿El asistente da asesoramiento legal o impositivo?',
      a: 'No. Se configura para ordenar la consulta y pasarla al profesional. Si alguien pregunta qué le corresponde o qué le conviene, dice que eso lo responde el estudio. Es una instrucción, así que conviene probarla desde otro número con frases reales; usa créditos.',
    },
    {
      q: '¿Se mantiene la confidencialidad de la consulta?',
      a: 'El asistente se configura para no pedir el relato del caso, pero lo que el contacto escriba queda en la conversación, que ven todas las personas de tu espacio. No hay permisos por rol. El secreto profesional sigue siendo tu responsabilidad, y la Política de privacidad explica cómo se tratan los datos.',
    },
    {
      q: '¿Qué pasa con una consulta urgente fuera de horario?',
      a: 'El asistente responde a cualquier hora, mientras el servicio y tu WhatsApp estén conectados, y deja la consulta marcada. Nadie recibe una alerta, y el chat se cierra solo 12 horas después del último mensaje del contacto. Si atendés urgencias, tu teléfono de guardia tiene que estar en la respuesta.',
    },
    {
      q: '¿Puede recibir escritos, telegramas o comprobantes?',
      a: 'No. Las fotos y los documentos no llegan a Atende. Quedan en el WhatsApp del teléfono del negocio. El asistente trabaja solo con mensajes de texto.',
    },
    {
      q: '¿Sirve sin CRM?',
      a: 'Sí. Sin conexión, el filtro funciona igual y la consulta queda en la conversación, marcada para tu equipo, que le pone etiqueta y responsable. Lo que no pasa sin conexión es que quede cargada sola en otro sistema.',
    },
  ],
  guides: [
    { slug: 'como-automatizar-whatsapp-estudios-juridicos', label: 'Guía para estudios jurídicos' },
    { slug: 'como-automatizar-whatsapp-estudios-contables', label: 'Guía para estudios contables' },
    { slug: 'como-automatizar-whatsapp-seguros', label: 'Guía para productores de seguros' },
    { slug: 'como-automatizar-whatsapp-consorcios', label: 'Guía para administraciones de consorcios' },
  ],
  service: { href: '/servicios/atencion-automatica-whatsapp', label: 'Atención al cliente por WhatsApp con IA' },
  cta: {
    title: 'Contanos qué consultas querés dejar de atender vos.',
    text: 'Con tus materias, tu criterio de urgencia y lo que hoy usás para registrar consultas vemos qué conviene conectar y qué conviene que no entre por este canal.',
    demoLabel: 'Pedir una demo para mi estudio',
    context: 'Hola, tengo un estudio y quiero ver cómo Atende filtra y registra consultas por WhatsApp',
  },
  hub: {
    tag: 'Consultas',
    task: 'Calificar la consulta y registrarla',
    scene: 'Un despido con telegrama y 48 horas para responder queda cargado como urgente para el abogado laboral. Se configura para no asesorar.',
    needs: 'tu CRM o tu planilla',
    tone: 'bg-sky',
  },
};

export const rubros: Rubro[] = [
  clinicas,
  peluquerias,
  restaurantes,
  comercios,
  concesionarias,
  profesionales,
];

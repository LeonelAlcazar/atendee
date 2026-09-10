import type { ChatMessage } from './servicios';

export type Caso = {
  id: string;
  industry: string;
  problem: string;
  solution: string;
  conversation: ChatMessage[];
};

export const casos: Caso[] = [
  {
    id: 'clinicas',
    industry: 'Clínicas y consultorios',
    problem: 'Las recepcionistas pasan el día respondiendo "¿a qué hora atienden?" y "¿tienen turno para esta semana?".',
    solution: 'Atende responde consultas administrativas con la información del consultorio y reúne solicitudes de turnos. Recepción confirma la disponibilidad; las consultas clínicas se derivan a una persona.',
    conversation: [
      { from: 'them', text: '¿Atienden obra social Galeno?' },
      { from: 'us', text: 'Según la información del consultorio, atendemos Galeno. ¿Con qué profesional querés consultar?' },
      { from: 'them', text: 'Sí, con la Dra. López' },
      { from: 'us', text: 'Te paso con recepción para confirmar cobertura y disponibilidad.' },
    ],
  },
  {
    id: 'peluquerias',
    industry: 'Peluquerías y estéticas',
    problem: 'Pierden turnos porque nadie atiende durante un servicio. La agenda en papel genera dobles reservas.',
    solution: 'Atende explica los servicios y pide el día y horario preferidos mientras el equipo trabaja. Una persona revisa la agenda y confirma la reserva.',
    conversation: [
      { from: 'them', text: 'Hola, para corte y color' },
      { from: 'us', text: 'Buenísimo! ¿Qué día te queda?' },
      { from: 'them', text: 'Sábado' },
      { from: 'us', text: '¿Preferís por la mañana o por la tarde? El equipo revisa la agenda y te confirma.' },
    ],
  },
  {
    id: 'inmobiliarias',
    industry: 'Inmobiliarias',
    problem: 'Cada consulta requiere mandar fotos, ficha técnica, dirección. Los corredores responden lo mismo 20 veces por día.',
    solution: 'Atende pregunta por la propiedad y el tipo de operación, responde con la información configurada y deja el contexto para que el corredor coordine una visita.',
    conversation: [
      { from: 'them', text: 'Hola, vi el depto de Nueva Córdoba' },
      { from: 'us', text: '¡Hola! ¿Buscás comprar o alquilar? Pasame la referencia del aviso.' },
      { from: 'us', text: '¿Te interesa coordinar visita?' },
      { from: 'them', text: 'Sí, sábado a la tarde' },
    ],
  },
  {
    id: 'comercios',
    industry: 'Comercios de barrio',
    problem: 'No tienen tiempo para responder mientras atienden el local. Los pedidos por WhatsApp se mezclan con todo lo demás.',
    solution: 'Atende responde horarios y condiciones de entrega, pregunta qué necesita el cliente y deja la consulta lista para que el comercio confirme stock, precio y pedido.',
    conversation: [
      { from: 'them', text: 'Hola, quiero hacer un pedido' },
      { from: 'us', text: 'Dale! ¿Qué necesitás?' },
      { from: 'them', text: '2 docenas de empanadas, mitad carne mitad pollo' },
      { from: 'us', text: '¿Retirás o necesitás envío? El equipo te confirma disponibilidad, total y horario.' },
    ],
  },
];

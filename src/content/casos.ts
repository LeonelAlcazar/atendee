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
    solution: 'atende responde horarios, da turnos y manda recordatorios. La recepción atiende solo lo que necesita atención humana.',
    conversation: [
      { from: 'them', text: '¿Atienden obra social Galeno?' },
      { from: 'us', text: 'Sí, atendemos Galeno. ¿Querés que te dé turno?' },
      { from: 'them', text: 'Sí, con la Dra. López' },
      { from: 'us', text: 'Tengo martes 10:30 o jueves 15:00.' },
    ],
  },
  {
    id: 'peluquerias',
    industry: 'Peluquerías y estéticas',
    problem: 'Pierden turnos porque nadie atiende durante un servicio. La agenda en papel genera dobles reservas.',
    solution: 'El bot toma turnos durante el horario de trabajo y manda recordatorio el día anterior. Sin doble reserva, sin huecos.',
    conversation: [
      { from: 'them', text: 'Hola, para corte y color' },
      { from: 'us', text: 'Buenísimo! ¿Qué día te queda?' },
      { from: 'them', text: 'Sábado' },
      { from: 'us', text: 'Tenemos 11hs o 14:30. Color demora ~2hs.' },
    ],
  },
  {
    id: 'inmobiliarias',
    industry: 'Inmobiliarias',
    problem: 'Cada consulta requiere mandar fotos, ficha técnica, dirección. Los corredores responden lo mismo 20 veces por día.',
    solution: 'atende manda automáticamente toda la info de la propiedad consultada y agenda visitas. El corredor entra solo cuando hay interés real.',
    conversation: [
      { from: 'them', text: 'Hola, ví el depto de Nueva Córdoba' },
      { from: 'us', text: 'Te paso ficha + fotos 📎' },
      { from: 'us', text: '¿Te interesa coordinar visita?' },
      { from: 'them', text: 'Sí, sábado a la tarde' },
    ],
  },
  {
    id: 'comercios',
    industry: 'Comercios de barrio',
    problem: 'No tienen tiempo para responder mientras atienden el local. Los pedidos por WhatsApp se mezclan con todo lo demás.',
    solution: 'El bot toma pedidos, calcula totales y avisa cuando están listos. El comercio ve solo el pedido cerrado, no el ida y vuelta.',
    conversation: [
      { from: 'them', text: 'Hola, quiero hacer un pedido' },
      { from: 'us', text: 'Dale! ¿Qué necesitás?' },
      { from: 'them', text: '2 docenas de empanadas, mitad carne mitad pollo' },
      { from: 'us', text: '✅ $X. Listo en 25 min. ¿Pasás a buscar o delivery?' },
    ],
  },
];

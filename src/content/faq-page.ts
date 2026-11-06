import type { FaqItem } from './faq';
import { site } from './site';

export type FaqGroup = {
  id: string;
  title: string;
  items: FaqItem[];
};

// Operational questions about Atende only. Generic "qué es un bot" answers
// belong in the guides. Answers are plain text: the same objects feed the page
// and the FAQ schema, and the site audit compares them.
export const faqGroups: FaqGroup[] = [
  {
    id: 'numero',
    title: 'Tu número y la conexión',
    items: [
      {
        q: '¿Atende funciona con el número que ya tengo?',
        a: 'Sí. Conectás el número que ya usás con un QR y tus clientes te siguen escribiendo al mismo WhatsApp. Cada espacio conecta un número.',
      },
      {
        q: '¿Atende usa la API oficial de Meta?',
        a: 'No. Se conecta por QR. No es la API oficial de Meta y no tiene aprobación de Meta. Queda como un dispositivo vinculado a tu WhatsApp.',
      },
      {
        q: '¿Hay riesgo de que WhatsApp restrinja mi número?',
        a: 'Puede pasar, y no podemos prometer que no pase. Mandar mensajes que la gente no pidió aumenta el riesgo. Si tu negocio no puede aceptarlo, conviene una opción con la API oficial de Meta.',
      },
      {
        q: '¿Qué pasos hay que seguir para empezar?',
        a: 'Creás tu espacio, le contás qué hace tu negocio, invitás a tu equipo, activás créditos o un plan y escaneás el QR.',
      },
      {
        q: '¿Qué necesito para escanear el QR?',
        a: 'El teléfono del negocio y otra pantalla. Abrís el QR en la pantalla WhatsApp del panel y lo escaneás desde dispositivos vinculados. Antes tenés que activar créditos o un plan.',
      },
      {
        q: '¿Apenas conecto ya les responde a mis clientes?',
        a: 'Sí. No hay modo de prueba: una vez vinculado, el asistente le responde a cada contacto. Probalo desde otro número; usa créditos.',
      },
      {
        q: '¿Qué pasa si se desconecta mi WhatsApp?',
        a: 'El asistente deja de responder hasta que vuelvas a conectar. El estado se ve en la pantalla WhatsApp del panel. Nadie recibe un aviso, así que conviene revisarla.',
      },
    ],
  },
  {
    id: 'mensajes',
    title: 'Qué entiende y qué no',
    items: [
      {
        q: '¿Qué mensajes entiende Atende?',
        a: 'Mensajes de texto. Audios, imágenes, videos, documentos, stickers, ubicaciones y mensajes de grupos no llegan a Atende.',
      },
      {
        q: '¿Qué pasa si un cliente manda un audio o una foto?',
        a: 'El asistente no lo ve y no contesta, y tampoco aparece en la bandeja. Queda en tu WhatsApp, así que alguien tiene que revisarlo en el teléfono.',
      },
      {
        q: '¿Responde a cualquier hora?',
        a: 'Sí, a cualquier hora, mientras el servicio y tu WhatsApp estén conectados. No es una garantía de disponibilidad, y tampoco significa que tu equipo esté atendiendo a esa hora.',
      },
      {
        q: '¿Cuánto tarda en contestar?',
        a: 'No es instantáneo y no publicamos un tiempo. El asistente espera un momento por si el contacto sigue escribiendo, junta esos mensajes y contesta una sola vez.',
      },
      {
        q: '¿De dónde saca las respuestas?',
        a: 'De lo que escribís en Contexto del asistente, de tus preguntas frecuentes y, si hay una conexión, de lo que devuelve tu sistema. Está armado para no inventar datos: si le falta algo, lo dice o deriva. Es un diseño, no una garantía.',
      },
      {
        q: '¿Se acuerda de conversaciones anteriores?',
        a: 'Tiene en cuenta la conversación en curso y las notas que guardó sobre el contacto y el negocio. No lee todo el historial ni las Notas internas de tu equipo.',
      },
      {
        q: '¿Sirve para consultas de salud?',
        a: 'Para lo administrativo, como turnos y horarios. Las consultas clínicas van a una persona: dejalo escrito en Contexto del asistente y no uses este canal para juntar datos de pacientes.',
      },
    ],
  },
  {
    id: 'equipo',
    title: 'Tu equipo y el control',
    items: [
      {
        q: '¿Cómo sigo yo una conversación?',
        a: 'Marcala como Necesita humano en Estado de la conversación y el asistente deja de responder ahí. Responder desde la bandeja o tocar Asignarme no lo frena.',
      },
      {
        q: '¿Hasta cuándo queda frenado el asistente en ese chat?',
        a: 'La conversación se cierra sola 12 horas después del último mensaje del contacto, aunque esté en Necesita humano. Si el contacto escribe de nuevo, responde el asistente. Para devolverlo antes, elegí En conversación.',
      },
      {
        q: '¿Cómo apago el asistente para todos los chats?',
        a: 'Con el botón del encabezado pasás a Modo CRM y tu equipo responde a mano. Vale para todo el espacio, no hay un interruptor por contacto, y cualquier persona del equipo puede hacerlo.',
      },
      {
        q: '¿Me avisan cuando el asistente deriva una conversación?',
        a: 'No hay una alerta especial. El asistente le avisa al contacto y la conversación queda marcada como Necesita humano, entre los pendientes de la bandeja. Alguien de tu equipo tiene que mirarla: si nadie la toma, se cierra sola 12 horas después del último mensaje del contacto.',
      },
      {
        q: '¿Veo si respondió el asistente o una persona?',
        a: 'Todavía no. Ves toda la conversación, pero los mensajes no muestran quién los escribió. Mostrarlo llega próximamente.',
      },
      {
        q: '¿Cómo busco una conversación?',
        a: 'Por contacto o teléfono, no por el texto de los mensajes. También filtrás por estado, etiqueta o responsable.',
      },
      {
        q: '¿Hay permisos por persona?',
        a: 'No. Quienes entran al espacio trabajan sobre las mismas conversaciones y pueden hacer lo mismo. Lo único que cambia es quién puede invitar a más personas.',
      },
      {
        q: '¿Se puede usar desde el celular?',
        a: 'Sí. La bandeja funciona en el celu: leés, respondés y asignás desde el navegador. No hay una app nativa, y para conectar WhatsApp necesitás otra pantalla que muestre el QR.',
      },
    ],
  },
  {
    id: 'conexiones',
    title: 'Conexiones a pedido',
    items: [
      {
        q: '¿Atende reserva turnos y registra pedidos solo?',
        a: 'Sí, conectado a tu sistema: reserva el turno, registra el pedido y le confirma al contacto lo que tu sistema aceptó. Esa conexión se arma a pedido para tu negocio. Sin conexión, el asistente junta el pedido y tu equipo lo confirma.',
      },
      {
        q: '¿Con qué sistemas se conecta?',
        a: 'Con el que usa tu negocio, si ese sistema permite conectarse. No hay una lista de integraciones listas para activar: te armamos la conexión a pedido. Contanos cuál usás y qué acceso tenés.',
      },
      {
        q: '¿Cuánto cuesta una conexión?',
        a: 'Se cotiza para cada negocio, según el sistema y lo que el asistente tenga que hacer. No viene incluida en el plan.',
      },
      {
        q: '¿Cómo sé que la reserva se hizo de verdad?',
        a: 'El asistente está armado para informar solo lo que tu sistema confirmó. Si tu sistema da error, la instrucción es no decir que quedó hecho. Igual conviene que tu equipo revise la agenda o los pedidos.',
      },
      {
        q: '¿Qué pasa si la conexión falla?',
        a: 'La conversación sigue sin esa herramienta: el asistente responde, pero no puede reservar ni registrar, y nadie recibe un aviso. Por eso tu equipo tiene que estar atento.',
      },
      {
        q: '¿Puede mandar recordatorios o seguimientos?',
        a: 'A pedido. Atende no empieza conversaciones por su cuenta. Si los necesitás, los armamos para tu negocio. Los mensajes que la gente no pidió, en un número conectado por QR, aumentan el riesgo de restricción.',
      },
      {
        q: '¿Tienen alguna conexión funcionando?',
        a: 'Sí, una demo para una concesionaria de motos: consulta stock y precios, calcula financiación y registra al interesado en Google Sheets. Es una demo, no un cliente.',
      },
      {
        q: '¿Qué es WhatsApp MCP y en qué se diferencia?',
        a: 'Deja que una aplicación de IA que vos autorizás lea tus conversaciones y mande mensajes de texto. Las conexiones van al revés: le dan acciones al asistente. WhatsApp MCP no suma ninguna, y la compatibilidad con cada aplicación todavía no está confirmada.',
      },
    ],
  },
  {
    id: 'planes',
    title: 'Planes y créditos',
    items: [
      {
        q: '¿Dónde veo los precios?',
        a: 'En la app, en Plan, antes de pagar. Para entrar primero creás tu espacio.',
      },
      {
        q: '¿Puedo empezar sin tarjeta?',
        a: 'Sí. Empezás con 100 créditos de bienvenida, una vez, sin tarjeta. Un crédito es una respuesta del asistente.',
      },
      {
        q: '¿Qué diferencia hay entre Plan CRM y los planes con IA?',
        a: 'Plan CRM es manual: bandeja, etiquetas, notas y WhatsApp MCP, sin asistente. Los planes con IA, Starter, Pro y Business, suman el asistente y cambian en la cantidad de respuestas por mes.',
      },
      {
        q: '¿Qué pasa si se terminan las respuestas y los créditos?',
        a: 'El asistente deja de responder. El contacto no recibe nada y nadie recibe un aviso. Con un plan activo, los mensajes siguen entrando a la bandeja. Sin plan y sin créditos, dejan de entrar a Atende y el panel se bloquea, salvo Plan e Integraciones.',
      },
      {
        q: '¿Me avisan antes de quedarme sin respuestas?',
        a: 'No. Mirá la pantalla Plan de la app, donde ves tu plan, cuándo renueva y tus créditos disponibles.',
      },
    ],
  },
  {
    id: 'datos',
    title: 'Datos y privacidad',
    items: [
      {
        q: '¿Qué datos guarda Atende?',
        a: 'Los mensajes de texto, el nombre de WhatsApp y el número del contacto, el estado de la conversación, las etiquetas, las notas de tu equipo, las notas del asistente, tu configuración y los archivos de tu biblioteca.',
      },
      {
        q: '¿Guarda los audios y las fotos que mandan mis clientes?',
        a: 'No. Los audios, imágenes, videos, documentos y stickers que entran nunca llegan a Atende.',
      },
      {
        q: '¿Otro negocio puede ver mis conversaciones?',
        a: 'No. Cada espacio lee solo sus propios datos.',
      },
      {
        q: '¿Quién responde por los datos de mis contactos?',
        a: 'Tu negocio, porque es quien trata esos datos y le da instrucciones a Atende como proveedor. La Política de privacidad lo explica.',
      },
      {
        q: '¿Cómo pido acceder a mis datos, corregirlos o borrarlos?',
        a: `Escribinos a ${site.email} con el asunto “Datos personales” e indicá qué querés hacer.`,
      },
    ],
  },
];

export const faqPageItems: FaqItem[] = faqGroups.flatMap((group) => group.items);

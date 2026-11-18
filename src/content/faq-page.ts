import type { FaqItem } from './faq';
import { site } from './site';

export type FaqGroup = {
  id: string;
  title: string;
  next?: { href: string; label: string };
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
        a: 'Sí. Conectás el número que ya usás y tus clientes te siguen escribiendo al mismo WhatsApp. Cada espacio conecta un número.',
      },
      {
        q: '¿Atende usa la API oficial de Meta o un QR?',
        a: 'Para vincular tu número desde el panel, escaneás un QR desde Dispositivos vinculados. Si tu negocio necesita la API oficial de Meta, pedí una demo para revisar con el equipo el alta y las condiciones de esa ruta.',
      },
      {
        q: '¿Qué pasos hay que seguir para empezar?',
        a: 'Creás tu espacio, configurás qué puede resolver el asistente, invitás a tu equipo y activás créditos o un plan. Para vincular WhatsApp desde el panel, escaneás el QR con tu teléfono.',
      },
      {
        q: '¿Qué necesito para escanear el QR?',
        a: 'El teléfono del negocio y otra pantalla. Abrís el QR en la pantalla WhatsApp del panel y lo escaneás desde dispositivos vinculados. Antes tenés que activar créditos o un plan.',
      },
      {
        q: '¿Apenas conecto ya les responde a mis clientes?',
        a: 'Con WhatsApp vinculado, IA activa y saldo disponible, el asistente puede responder a los contactos que escriban. Si tu espacio tiene habilitado el chat de prueba, podés probar respuestas en el panel sin gastar créditos. Las herramientas que uses en esa prueba pueden realizar acciones reales.',
      },
      {
        q: '¿Qué pasa si se desconecta mi WhatsApp?',
        a: 'El asistente deja de responder hasta que vuelvas a conectar. El estado se ve en la pantalla WhatsApp del panel. Nadie recibe un aviso, así que conviene revisarla.',
      },
    ],
  },
  {
    id: 'mensajes',
    next: { href: '/blog/pedidos-por-audio-whatsapp-distribuidores', label: 'Ver cómo tomar un pedido por audio' },
    title: 'Qué entiende y qué no',
    items: [
      {
        q: '¿Qué mensajes entiende Atende?',
        a: 'En un chat individual, el asistente usa el texto y, con la IA activa, la transcripción disponible de una nota de voz. Si te mandan una foto o un documento, la bandeja muestra el archivo a tu equipo. El asistente recibe el texto que lo acompaña y no interpreta su contenido.',
      },
      {
        q: '¿Qué pasa si un cliente manda un audio o una foto?',
        a: 'El audio aparece en la bandeja. Con el asistente activo, la transcripción disponible figura debajo del audio y puede servir para tomar el pedido. En Plan CRM o con el asistente apagado, tu equipo escucha la nota de voz. Si es una foto, puede abrirla y seguir el chat.',
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
        a: 'Mientras figure Necesita humano, responde tu equipo. Podés reactivar el asistente desde la conversación. Si el chat se cierra por inactividad y el contacto vuelve a escribir, empieza un nuevo ciclo.',
      },
      {
        q: '¿Cómo apago el asistente para todos los chats?',
        a: 'Podés apagar el asistente en la configuración de tu espacio. Para seguir un solo caso a mano, marcá esa conversación como Necesita humano.',
      },
      {
        q: '¿Me avisan cuando el asistente deriva una conversación?',
        a: 'La conversación queda marcada como Necesita humano en la bandeja. Tu equipo puede asignarla a la persona que la va a seguir.',
      },
      {
        q: '¿Veo si respondió el asistente o una persona?',
        a: 'Los mensajes enviados desde la bandeja muestran el nombre de la persona cuando está disponible, o la etiqueta Equipo. Los envíos programados aparecen como Mensaje recurrente.',
      },
      {
        q: '¿Cómo busco una conversación?',
        a: 'Por contacto o teléfono, no por el texto de los mensajes. También filtrás por estado, etiqueta o responsable.',
      },
      {
        q: '¿Hay permisos por persona?',
        a: 'Cada persona entra con su cuenta. Un administrador del espacio puede invitar personas y armar equipos para distribuir la atención.',
      },
      {
        q: '¿Se puede usar desde el celular?',
        a: 'Sí. La bandeja funciona en el celu: leés, respondés y asignás desde el navegador. No hay una app nativa, y para conectar por QR necesitás otra pantalla que lo muestre.',
      },
    ],
  },
  {
    id: 'conexiones',
    next: { href: '/integraciones#demo', label: 'Ver cómo se registra una consulta en la demo de motos' },
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
        a: 'Ejemplo ilustrativo con una agenda conectada. El cliente elige el jueves a las 16, la agenda guarda el turno y recién entonces Atende le escribe “Listo, te reservé el jueves a las 16”. Tu equipo puede comprobarlo en la agenda. Si falla la reserva, queda pendiente.',
      },
      {
        q: '¿Qué pasa si la conexión falla?',
        a: 'La conversación sigue sin esa herramienta: el asistente responde, pero no puede reservar ni registrar, y nadie recibe un aviso. Por eso tu equipo tiene que estar atento.',
      },
      {
        q: '¿Puede mandar recordatorios o seguimientos?',
        a: 'Tu equipo puede programar mensajes diarios, semanales o mensuales desde Contactos para una lista o una etiqueta. Para avisar que un pedido está listo o recordar un turno en su fecha exacta, el aviso lo inicia tu sistema mediante una conexión que habilitamos a pedido. El asistente no elige por su cuenta a quién volver a escribirle.',
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
    next: { href: '/precios#calculadora', label: 'Calcular cuántas respuestas necesita mi negocio' },
    title: 'Planes y créditos',
    items: [
      {
        q: '¿Dónde veo los precios?',
        a: 'Podés consultar los planes generales en la página Precios, sin crear una cuenta. En Suscripción ves las opciones disponibles para tu espacio antes de pagar. Las conexiones con tu sistema se cotizan por separado.',
      },
      {
        q: '¿Puedo empezar sin tarjeta?',
        a: 'Sí, si tenés créditos de bienvenida disponibles. En Suscripción ves la cantidad y las condiciones antes de activarlos. Cada respuesta del asistente consume una unidad.',
      },
      {
        q: '¿Qué diferencia hay entre Plan CRM y los planes con IA?',
        a: 'Plan CRM es manual: bandeja, etiquetas, notas y WhatsApp MCP, sin asistente. Los planes con IA, Starter, Pro y Business, suman el asistente y cambian en la cantidad de respuestas por mes.',
      },
      {
        q: '¿Qué pasa si se terminan las respuestas y los créditos?',
        a: 'El asistente deja de responder. El contacto no recibe nada y nadie recibe un aviso. Con un plan activo, los mensajes siguen entrando a la bandeja. Sin plan y sin créditos, dejan de entrar a Atende y el panel se bloquea, salvo Suscripción, Ajustes y Aplicaciones conectadas.',
      },
      {
        q: '¿Me avisan antes de quedarme sin respuestas?',
        a: 'No. Mirá la pantalla Suscripción de la app, donde ves tu plan, cuándo renueva y tus créditos disponibles.',
      },
    ],
  },
  {
    id: 'datos',
    next: { href: '/politica-de-privacidad', label: 'Leer la política de privacidad' },
    title: 'Datos y privacidad',
    items: [
      {
        q: '¿Qué datos guarda Atende?',
        a: 'La bandeja guarda mensajes, adjuntos disponibles de chats individuales, datos del contacto, estados, etiquetas y notas del equipo. También se guarda la configuración de tu espacio y de la biblioteca de archivos.',
      },
      {
        q: '¿Guarda los audios y las fotos que mandan mis clientes?',
        a: 'Sí. Los audios, fotos, videos, documentos y stickers disponibles quedan en la bandeja. Los archivos de visualización única no se guardan. Si el asistente está apagado, el audio llega sin transcripción.',
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

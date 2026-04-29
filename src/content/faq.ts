export type FaqItem = {
  q: string;
  a: string;
};

export const faq: FaqItem[] = [
  {
    q: '¿Necesito WhatsApp Business API?',
    a: 'Sí, es lo que permite automatizar de forma oficial. Nosotros nos ocupamos de toda la configuración con Meta, vos solo nos pasás el número.',
  },
  {
    q: '¿Pierdo el control de mi número?',
    a: 'No. El número sigue siendo tuyo. Vos decidís cuándo el bot responde y cuándo derivás a una persona. Podés desactivar la automatización cuando quieras.',
  },
  {
    q: '¿Cuánto tarda el setup?',
    a: 'Entre 48 y 72hs hábiles desde que tenemos toda la información. Incluye: aprobación con Meta, diseño del flujo y pruebas con vos.',
  },
  {
    q: '¿Funciona con mi sistema de turnos actual?',
    a: 'Sí. Integramos con Google Calendar, sistemas de gestión médica y la mayoría de softwares de turnos del mercado. Si usás algo distinto, lo evaluamos en la primera charla.',
  },
  {
    q: '¿Qué pasa si un cliente quiere hablar con una persona?',
    a: 'El bot detecta cuándo derivar y pasa la conversación a tu equipo. También podés intervenir manualmente en cualquier chat en cualquier momento.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Depende del volumen y la complejidad del flujo. Charlemos por WhatsApp y te pasamos un presupuesto a medida en el día.',
  },
];

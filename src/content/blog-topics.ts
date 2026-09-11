export const blogTopics = [
  {
    slug: 'guias',
    name: 'Guías de WhatsApp',
    description:
      'Prepará respuestas, organizá la atención humana y evaluá el costo de automatizar WhatsApp en tu empresa.',
  },
  {
    slug: 'alternativas',
    name: 'Alternativas y comparativas',
    description:
      'Compará Atende con otras herramientas de WhatsApp según tu proceso, los canales que usás y las integraciones que necesitás.',
  },
  {
    slug: 'automotor',
    name: 'Automotor',
    description:
      'Guías para concesionarias de autos, venta de motos y talleres: consultas comerciales, unidades, visitas y solicitudes de servicio.',
  },
  {
    slug: 'salud',
    name: 'Salud y veterinaria',
    description:
      'Organizá consultas administrativas y solicitudes de turnos en clínicas, odontología y veterinarias, con intervención profesional.',
  },
  {
    slug: 'belleza-y-bienestar',
    name: 'Belleza y bienestar',
    description:
      'Atendé consultas de peluquerías, centros de estética y gimnasios mientras tu equipo está trabajando con clientes.',
  },
  {
    slug: 'inmuebles-y-hogar',
    name: 'Inmuebles y hogar',
    description:
      'Reuní consultas de propiedades, consorcios, obras y servicios técnicos con el contexto que necesita cada responsable.',
  },
  {
    slug: 'comercio',
    name: 'Comercio y distribución',
    description:
      'Guías de atención para tiendas online, indumentaria, ferreterías, mueblerías y mayoristas: productos, pedidos y postventa.',
  },
  {
    slug: 'gastronomia-y-turismo',
    name: 'Gastronomía y turismo',
    description:
      'Organizá pedidos, consultas de alojamiento, viajes y eventos sin confirmar disponibilidad que todavía no fue verificada.',
  },
  {
    slug: 'educacion',
    name: 'Educación',
    description:
      'Respondé consultas sobre idiomas y cursos, reuní preferencias de cursada y prepará el contacto con admisiones.',
  },
  {
    slug: 'servicios-profesionales',
    name: 'Servicios profesionales',
    description:
      'Primera atención para estudios contables, jurídicos y productores de seguros, con criterios claros para derivar a una persona.',
  },
  {
    slug: 'industria-y-logistica',
    name: 'Industria, agro y logística',
    description:
      'Prepará solicitudes de cotización con datos de producción, transporte y abastecimiento para que el equipo técnico pueda avanzar.',
  },
] as const;

export type BlogTopicSlug = (typeof blogTopics)[number]['slug'];
export function getBlogTopic(slug: string) {
  return blogTopics.find((topic) => topic.slug === slug);
}
export const blogPage = {
  path: '/blog' as const,
  title: 'Guías de WhatsApp para negocios y alternativas',
  description:
    'Aprendé a automatizar WhatsApp según tu rubro. Guías prácticas, ejemplos de conversaciones y comparativas para elegir cómo atender con IA y tu equipo.',
};
export const editorialPage = {
  path: '/blog/editorial' as const,
  title: 'Cómo elaboramos las guías y comparativas de Atende',
  description:
    'Conocé quién publica el blog de Atende, cómo documentamos las comparativas y qué diferencia hay entre un ejemplo, una función y una integración.',
  updated: '2026-09-10',
};

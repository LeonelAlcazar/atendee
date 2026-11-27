import type { BlogPost } from './blog-content';
import { blogTopics, editorialPage } from '../content/blog-topics';
import { definition } from '../content/que-es-atende';
import { pages } from '../content/pages';
import { rubros } from '../content/rubros';
import { servicios } from '../content/servicios';
import { site } from '../content/site';
import { actionStatus } from '../content/status';

type Link = { name: string; path: string; notes?: string };

const link = ({ name, path, notes }: Link) =>
  `- [${name}](${site.url}${path})${notes ? `: ${notes}` : ''}`;
const section = (title: string, links: Link[]) =>
  [`## ${title}`, '', ...links.map(link)].join('\n');
const postLink = (post: BlogPost): Link => ({
  name: post.title,
  path: `/blog/${post.slug}`,
  notes: post.description,
});
const pageLink = (page: { title: string; path: string; description: string }) => ({
  name: page.title,
  path: page.path,
  notes: page.description,
});

// llmstxt.org format: H1, blockquote, notes without headings, H2 link lists.
// Everything except the limits below comes from the catalogs, so it cannot drift.
export function createLlmsTxt(posts: BlogPost[]) {
  const guides = posts.filter(
    (post) => ['guias', 'bot-de-whatsapp', 'recordatorio-de-turnos'].includes(post.category),
  );
  const comparisons = posts.filter((post) => post.category === 'alternativas');
  const sectorGuides = posts.filter(
    (post) => !guides.includes(post) && !comparisons.includes(post),
  );
  return [
    `# ${site.name}`,
    // The one definition, word for word on every surface.
    `> ${definition}`,
    `Estado de hoy:`,
    actionStatus.map((row) => `- ${row.action}: ${row.label}.`).join('\n'),
    `Demo real: para una concesionaria de motos consulta stock y precios, calcula financiación y registra al interesado en Google Sheets. Es una demo, no un cliente.`,
    `Conexión: el negocio vincula el número que ya usa desde el panel, con un QR que abre en otra pantalla. El alta por la API oficial de Meta se consulta en la demo.`,
    [
      `Límites:`,
      `- Responde mensajes de texto, a cualquier hora, mientras el servicio y el WhatsApp del negocio estén conectados. La bandeja recibe fotos, videos, documentos, stickers y notas de voz de chats individuales. Con la IA activa, el asistente puede responder a partir de la transcripción disponible del audio. Para interpretar imágenes y documentos interviene el equipo.`,
      `- Cada espacio tiene un chat de prueba para probar el asistente gratis antes de elegir un plan, sin usar las respuestas del plan. Las herramientas conectadas pueden ejecutar acciones reales.`,
      `- Responder desde la bandeja no pausa al asistente. Lo pausa marcar la conversación como Necesita humano, mientras ese estado siga activo. También se puede apagar el asistente en todo el espacio.`,
      `- El equipo puede programar textos recurrentes desde Contactos. Un aviso por un evento, como un pedido listo, necesita que el sistema del negocio lo dispare con la integración habilitada. El asistente no decide iniciar seguimientos.`,
      `- Los planes vigentes y sus precios están en ${site.url}/precios, sin crear una cuenta. La conexión a pedido se cotiza para cada negocio.`,
    ].join('\n'),
    `Contacto: ${site.email}, ${site.whatsapp.display}. ${site.location}.`,
    section('Producto', [
      pageLink(pages.what),
      pageLink(pages.services),
      ...servicios.map((service) => ({
        name: service.title,
        path: `/servicios/${service.slug}`,
        notes: service.short,
      })),
      pageLink(pages.integrations),
      pageLink(pages.pricing),
      pageLink(pages.faq),
      pageLink(pages.about),
      pageLink(pages.demo),
    ]),
    section('Rubros', [
      pageLink(pages.cases),
      ...rubros.map((rubro) => ({
        name: rubro.title,
        path: `/casos-de-uso/${rubro.slug}`,
        notes: rubro.description,
      })),
    ]),
    section('Guías', guides.map(postLink)),
    section('Comparativas', comparisons.map(postLink)),
    section('Optional', [
      ...sectorGuides.map(postLink),
      ...blogTopics
        .filter((topic) => posts.some((post) => post.category === topic.slug))
        .map((topic) => ({
          name: topic.name,
          path: `/blog/tema/${topic.slug}`,
          notes: topic.description,
        })),
      pageLink(editorialPage),
    ]),
  ].join('\n\n').concat('\n');
}

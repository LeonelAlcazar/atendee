import type { BlogPost } from './blog-content';
import { blogTopics, editorialPage } from '../content/blog-topics';
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
    (post) => post.category === 'guias' || post.category === 'bot-de-whatsapp',
  );
  const comparisons = posts.filter((post) => post.category === 'alternativas');
  const sectorGuides = posts.filter(
    (post) => !guides.includes(post) && !comparisons.includes(post),
  );
  return [
    `# ${site.name}`,
    `> Atende automatiza WhatsApp para empresas y PyMEs argentinas. Conectado a la agenda o al sistema del negocio, reserva turnos, registra pedidos y cotiza en la conversación, en el número que el negocio ya usa y con su equipo al tanto. Esa conexión se arma a pedido para cada negocio; sin ella, el asistente junta los datos y el equipo confirma.`,
    `Estado de hoy:`,
    actionStatus.map((row) => `- ${row.action}: ${row.label}.`).join('\n'),
    `Demo real: para una concesionaria de motos consulta stock y precios, calcula financiación y registra al interesado en Google Sheets. Es una demo, no un cliente.`,
    `Conexión: el negocio escanea un QR desde el panel para vincular su número. El alta por la API oficial de Meta se consulta en la demo.`,
    [
      `Límites:`,
      `- Responde mensajes de texto, a cualquier hora, mientras el servicio y el WhatsApp del negocio estén conectados. La bandeja recibe fotos, videos, documentos, stickers y notas de voz de chats individuales. Con la IA activa, el asistente puede responder a partir de la transcripción disponible del audio. Para interpretar imágenes y documentos interviene el equipo.`,
      `- En los espacios con chat de prueba habilitado, el equipo puede probar una conversación sin consumir créditos. Las herramientas conectadas pueden ejecutar acciones reales.`,
      `- Responder desde la bandeja no pausa al asistente. Lo pausa marcar la conversación como Necesita humano, mientras ese estado siga activo. También se puede apagar el asistente en todo el espacio.`,
      `- El equipo puede programar textos recurrentes desde Contactos. Un aviso por un evento, como un pedido listo, necesita que el sistema del negocio lo dispare con la integración habilitada. El asistente no decide iniciar seguimientos.`,
      `- Los planes generales se pueden consultar sin registrarse en ${site.url}/precios. Cada negocio ve sus condiciones en ${site.appUrl} antes de pagar.`,
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

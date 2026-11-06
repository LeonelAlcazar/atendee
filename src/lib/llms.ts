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
    [
      `Límites:`,
      `- Responde mensajes de texto, a cualquier hora, mientras el servicio y el WhatsApp del negocio estén conectados. Audios, imágenes, videos, documentos, stickers, ubicaciones y grupos no llegan a Atende.`,
      `- Se conecta por QR. No es la API oficial de Meta y nadie puede prometer que WhatsApp no restrinja un número.`,
      `- Una vez conectado responde a todos los contactos: no hay modo de prueba. Se prueba desde otro número y usa créditos.`,
      `- Responder desde la bandeja no pausa al asistente. Lo pausa marcar la conversación como Necesita humano, hasta que el chat se cierra solo 12 horas después del último mensaje del contacto. Modo CRM lo apaga en todo el espacio.`,
      `- Atende no manda mensajes por su cuenta. Los recordatorios y seguimientos se arman a pedido para cada negocio.`,
      `- Los precios vigentes se ven en la app antes de pagar: ${site.appUrl}`,
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

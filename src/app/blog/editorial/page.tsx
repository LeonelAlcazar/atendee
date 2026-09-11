import Link from 'next/link';
import { editorialPage } from '@/content/blog-topics';
import { createPageMetadata } from '@/lib/metadata';
import { pageGraph } from '@/lib/structured-data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/jsonld';
import { site } from '@/content/site';
export const metadata = createPageMetadata(editorialPage);
const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Criterios editoriales', path: '/blog/editorial' },
];
export default function EditorialPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <article className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <h1 className="break-words font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Cómo elaboramos las guías de Atende
        </h1>
        <div className="blog-prose mt-8">
          <p>
            Este blog lo publica Atende, un producto de atención por WhatsApp
            para empresas y PyMEs argentinas. Las guías expresan nuestra
            propuesta de trabajo y las comparativas incluyen nuestro propio
            producto: existe un interés comercial.
          </p>
          <h2>Quién firma los artículos</h2>
          <p>
            La firma Equipo Atende identifica a la organización que publica el
            contenido. No representa una evaluación independiente ni una
            revisión médica, jurídica o financiera. Podés contactarnos en{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a> para señalar un
            error o pedir información sobre una afirmación.
          </p>
          <h2>Ejemplos y alcance del producto</h2>
          <p>
            Las conversaciones son ejemplos ilustrativos; no son testimonios ni
            resultados de clientes. Distinguimos las respuestas con información
            configurada, la intervención de una persona y las acciones que
            requieren una integración. Las guías de sectores regulados se
            limitan a la organización de consultas administrativas.
          </p>
          <h2>Cómo leer una comparativa</h2>
          <p>
            Indicamos enlaces a fuentes oficiales y fechas de consulta.
            Comparamos procesos y criterios de selección; no asignamos puntajes
            sin mediciones ni afirmamos que una herramienta sea la mejor para
            todos. Una función anunciada por otro proveedor debe confirmarse en
            el plan y la configuración que vas a contratar.
          </p>
          <h2>Fechas y correcciones</h2>
          <p>
            Cada artículo muestra su fecha de publicación y, cuando cambia el
            contenido, su fecha de actualización. Las fuentes tienen su propia
            fecha de consulta. Los precios se verifican al contratar y no se
            infieren a partir de ejemplos del blog.
          </p>
          <p>
            Revisá las <Link href="/servicios">funciones de Atende</Link>, las{' '}
            <Link href="/precios">condiciones de contratación</Link> o{' '}
            <Link href="/blog">explorá las guías por rubro</Link>.
          </p>
        </div>
      </article>
      <JsonLd value={pageGraph({ ...editorialPage, breadcrumbs })} />
    </>
  );
}

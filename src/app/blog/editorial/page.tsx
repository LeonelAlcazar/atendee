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
            Este blog lo publica Atende desde Córdoba, Argentina. Atende
            automatiza WhatsApp para negocios: conectado a tus sistemas,
            reserva, cotiza y registra pedidos, y responde mensajes de texto.
            Vendemos el producto del que hablamos, así que hay un interés
            comercial, y las comparativas nos incluyen.
          </p>
          <h2>Quién publica</h2>
          <p>
            La firma Equipo Atende identifica a la organización, no a una
            persona. Lo que publicamos es responsabilidad de Atende. No es una
            evaluación independiente ni reemplaza el consejo de un profesional
            de la salud, del derecho o de las finanzas. Las guías de rubros
            regulados se limitan a tareas administrativas. Más datos sobre
            nosotros en <Link href="/nosotros">quiénes somos</Link>.
          </p>
          <h2>Cómo hacemos una guía</h2>
          <ol>
            <li>
              Partimos de una pregunta concreta de un negocio, como sacar turnos
              o tomar pedidos por WhatsApp, y miramos cómo la busca la gente.
            </li>
            <li>
              Escribimos el borrador con ayuda de herramientas de inteligencia
              artificial.
            </li>
            <li>
              El equipo lo revisa antes de publicarlo: corrige lo que dice sobre
              Atende contra el producto y abre las fuentes que citamos.
            </li>
            <li>
              Un control automático frena las frases que el producto no puede
              cumplir, como prometer que responde todo o que un número no se
              puede restringir.
            </li>
          </ol>
          <h2>Qué significa “Ejemplo ilustrativo”</h2>
          <p>
            Es una conversación armada para mostrar cómo sería una tarea. No es
            un cliente real, un testimonio ni un resultado medido. Si el ejemplo
            termina con un turno reservado o un pedido registrado, ese final
            necesita una conexión con tu agenda o tu sistema, y esa conexión se
            arma a pedido para tu negocio. Sin ella, el asistente junta los
            datos y tu equipo confirma. Lo que funciona hoy está en{' '}
            <Link href="/integraciones">integraciones</Link>.
          </p>
          <h2>Cómo comparamos herramientas</h2>
          <p>
            Cada comparativa enlaza las páginas de los proveedores y muestra la
            fecha en que las consultamos. Comparamos por tarea y por criterios
            que declaramos, sin puntajes que no podamos medir y sin decir que
            una herramienta es la mejor para todos. Decimos qué le falta a
            Atende y cuándo te conviene otra opción. Lo que anuncia otro
            proveedor hay que confirmarlo en el plan que vas a contratar. Si
            trabajás en una de esas empresas y un dato cambió, avisanos.
          </p>
          <h2>Fechas</h2>
          <p>
            Cada artículo muestra su fecha de publicación y, si el contenido
            cambió, la de actualización. Esa fecha se mueve cuando hay un cambio
            real, no para que el artículo parezca nuevo. Cada fuente tiene su
            propia fecha de consulta: es la última vez que la abrimos. Los
            precios de Atende no están en las guías; los planes vigentes se ven
            en la app antes de pagar.
          </p>
          <h2>Cómo avisarnos de un error</h2>
          <p>
            Escribinos a <a href={`mailto:${site.email}`}>{site.email}</a> o por
            WhatsApp al {site.whatsapp.display} con el enlace al artículo y el
            dato que está mal. Si confirmamos el error, corregimos el texto y
            actualizamos la fecha.
          </p>
          <p>
            Mirá <Link href="/servicios">qué tareas resuelve Atende</Link>, las{' '}
            <Link href="/precios">condiciones de contratación</Link> o{' '}
            <Link href="/blog">las guías por rubro</Link>.
          </p>
        </div>
      </article>
      <JsonLd value={pageGraph({ ...editorialPage, breadcrumbs })} />
    </>
  );
}

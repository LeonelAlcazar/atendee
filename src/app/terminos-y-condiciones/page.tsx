import type { Metadata } from 'next';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { site } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';

const lastUpdated = '26 de junio de 2026';
const linkClass = 'underline underline-offset-4 hover:text-coral';

export const metadata: Metadata = createPageMetadata({
  title: 'Términos y condiciones',
  description:
    'Términos y condiciones de uso y contratación de atende para clientes y usuarios en Argentina.',
  path: '/terminos-y-condiciones',
});

const sections = [
  {
    id: 'responsable',
    title: '1. Responsable y aceptación',
    body: (
      <>
        <p>
          Estos términos y condiciones regulan el acceso al sitio {site.url}, el
          contacto comercial con atende y la contratación de servicios de
          automatización, atención, turnos y ventas por WhatsApp para negocios
          que operan en Argentina.
        </p>
        <p>
          El responsable del sitio y de la oferta comercial es {site.legalName},
          con contacto en{' '}
          <a className={linkClass} href={`mailto:${site.email}`}>
            {site.email}
          </a>{' '}
          y WhatsApp{' '}
          <a
            className={linkClass}
            href={`https://wa.me/${site.whatsapp.number}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.whatsapp.display}
          </a>
          . Si una propuesta, factura, orden de servicio o contrato identifica
          datos fiscales o comerciales adicionales, esos documentos prevalecen
          para esa contratación.
        </p>
        <p>
          Al navegar el sitio, solicitar información, aceptar una propuesta o
          usar los servicios, aceptás estos términos en la medida permitida por
          la legislación argentina aplicable.
        </p>
      </>
    ),
  },
  {
    id: 'servicios',
    title: '2. Servicios ofrecidos',
    body: (
      <>
        <p>
          Atende desarrolla y opera soluciones conversacionales para WhatsApp,
          incluyendo bots de atención, gestión de turnos, respuestas frecuentes,
          captura de oportunidades comerciales y seguimiento de ventas.
        </p>
        <p>
          Las funcionalidades, tiempos de implementación, integraciones,
          precios, medios de pago, alcance del soporte y condiciones particulares
          se definen en la propuesta comercial, contrato, checkout o intercambio
          escrito aceptado por el cliente.
        </p>
      </>
    ),
  },
  {
    id: 'uso-permitido',
    title: '3. Uso permitido y obligaciones del cliente',
    body: (
      <p>
        El cliente debe usar el sitio y los servicios de forma lícita,
        profesional y compatible con la normativa argentina, las reglas de
        WhatsApp/Meta y las condiciones de cualquier plataforma de terceros que
        intervenga en la prestación.
      </p>
    ),
    points: [
      'No usar el servicio para spam, fraude, phishing, suplantación de identidad, hostigamiento, actividades ilícitas o envíos no solicitados que infrinjan normas de consumo, datos personales o telecomunicaciones.',
      'Contar con autorización, consentimiento o base legal suficiente para cargar, enviar o tratar datos de clientes, pacientes, usuarios, leads, empleados o terceros.',
      'Revisar y aprobar los textos, flujos, respuestas automáticas, promociones, precios y condiciones comerciales que el bot comunique en nombre del negocio.',
      'Informar a atende cualquier requisito sectorial específico, por ejemplo en salud, educación, finanzas, seguros, inmobiliarias, comercio electrónico o actividades reguladas.',
      'Mantener actualizadas sus credenciales, accesos, catálogos, horarios, políticas comerciales y canales de atención humana.',
    ],
  },
  {
    id: 'contratacion-pagos',
    title: '4. Contratación, precios y pagos',
    body: (
      <>
        <p>
          La información del sitio es orientativa y no constituye una oferta
          irrevocable. La contratación queda perfeccionada cuando el cliente
          acepta una propuesta, confirma un pedido, completa un checkout o usa
          un servicio sujeto a pago, según el canal definido para cada caso.
        </p>
        <p>
          Los precios, impuestos, moneda, forma de facturación, renovaciones,
          bonificaciones, pruebas gratuitas y penalidades por mora se rigen por
          la propuesta o instrumento comercial aplicable. Ante falta de pago,
          atende puede pausar la implementación, limitar funcionalidades o
          suspender el servicio previa comunicación razonable, salvo que una
          norma aplicable exija otro procedimiento.
        </p>
      </>
    ),
  },
  {
    id: 'arrepentimiento-baja',
    title: '5. Arrepentimiento, baja y atención a consumidores',
    body: (
      <>
        <p>
          Cuando el cliente actúe como consumidor o usuario en los términos de la
          Ley 24.240 y contrate a distancia, podrá ejercer los derechos de
          revocación o arrepentimiento que correspondan bajo la normativa
          argentina, incluyendo el plazo legal de diez días cuando resulte
          aplicable.
        </p>
        <p>
          Para solicitar arrepentimiento, baja, cancelación de renovación o
          reclamos comerciales, escribinos a{' '}
          <a className={linkClass} href={`mailto:${site.email}`}>
            {site.email}
          </a>{' '}
          o por WhatsApp a{' '}
          <a
            className={linkClass}
            href={`https://wa.me/${site.whatsapp.number}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.whatsapp.display}
          </a>
          . El pedido debe incluir nombre, medio de contacto, servicio contratado
          y, si corresponde, comprobante o identificación de la operación.
        </p>
        <p>
          Estos términos no limitan derechos irrenunciables reconocidos por la
          Ley de Defensa del Consumidor, el Código Civil y Comercial de la Nación
          ni normas complementarias.
        </p>
      </>
    ),
  },
  {
    id: 'datos-confidencialidad',
    title: '6. Datos, contenidos y confidencialidad',
    body: (
      <>
        <p>
          El cliente conserva la responsabilidad sobre los datos, mensajes,
          archivos, catálogos, precios, promociones, listas de contactos,
          conversaciones y demás contenidos que entregue o conecte al servicio.
          Atende podrá tratarlos únicamente para prestar, mantener, proteger y
          mejorar el servicio contratado, conforme a la{' '}
          <a className={linkClass} href="/politica-de-privacidad">
            Política de privacidad
          </a>{' '}
          y a los acuerdos específicos que correspondan.
        </p>
        <p>
          La información técnica, comercial y operativa compartida entre las
          partes será tratada como confidencial, salvo que sea pública, se haya
          recibido legítimamente de un tercero, deba divulgarse por obligación
          legal o cuente con autorización de la parte que la reveló.
        </p>
      </>
    ),
  },
  {
    id: 'propiedad-intelectual',
    title: '7. Propiedad intelectual',
    body: (
      <>
        <p>
          El sitio, marca, textos, diseños, código, flujos base, metodologías,
          plantillas y materiales de atende pertenecen a atende o a sus
          licenciantes. No se transfieren derechos de propiedad intelectual salvo
          pacto escrito expreso.
        </p>
        <p>
          El cliente mantiene sus derechos sobre marcas, logos, materiales,
          datos, catálogos y contenidos propios que entregue para configurar el
          servicio, y otorga a atende una autorización limitada para usarlos
          durante la prestación contratada.
        </p>
      </>
    ),
  },
  {
    id: 'plataformas-terceros',
    title: '8. Plataformas de terceros',
    body: (
      <>
        <p>
          El servicio puede depender de WhatsApp, Meta, proveedores de hosting,
          mensajería, inteligencia artificial, pagos, analítica, integraciones o
          herramientas externas. Atende no controla cambios de disponibilidad,
          políticas, precios, límites, aprobaciones, bloqueos, errores o
          decisiones de esas plataformas.
        </p>
        <p>
          Si un tercero modifica sus condiciones o restringe una integración,
          atende podrá ajustar el servicio, proponer alternativas o suspender
          funcionalidades afectadas cuando sea técnicamente necesario.
        </p>
      </>
    ),
  },
  {
    id: 'garantias-responsabilidad',
    title: '9. Garantías y responsabilidad',
    body: (
      <>
        <p>
          Atende presta servicios tecnológicos con criterio profesional, pero no
          garantiza resultados comerciales específicos, ventas mínimas,
          disponibilidad absoluta, ausencia total de errores ni que el servicio
          reemplace controles humanos del negocio.
        </p>
        <p>
          El cliente es responsable por las decisiones comerciales, legales,
          sanitarias, financieras o profesionales que comunique a través del bot.
          Ninguna cláusula de estos términos excluye o limita garantías,
          responsabilidades o derechos que la legislación argentina considere
          irrenunciables para consumidores y usuarios.
        </p>
      </>
    ),
  },
  {
    id: 'modificaciones',
    title: '10. Cambios en el sitio, servicios o términos',
    body: (
      <>
        <p>
          Atende puede actualizar el sitio, funcionalidades, documentación,
          precios y estos términos para reflejar cambios operativos, técnicos,
          comerciales o normativos. La versión vigente se publica en esta página
          con su fecha de actualización.
        </p>
        <p>
          Para contrataciones en curso, los cambios sustanciales se informarán
          por canales razonables. Si una propuesta o contrato vigente establece
          reglas específicas de modificación, se aplicarán esas reglas.
        </p>
      </>
    ),
  },
  {
    id: 'ley-aplicable',
    title: '11. Ley aplicable y reclamos',
    body: (
      <>
        <p>
          Estos términos se rigen por las leyes de la República Argentina. Las
          partes procurarán resolver cualquier reclamo de buena fe a través de
          los canales de contacto publicados.
        </p>
        <p>
          En relaciones entre empresas, y salvo pacto escrito distinto, las
          controversias se someterán a los tribunales ordinarios competentes de
          la Provincia de Córdoba. En relaciones de consumo, esta cláusula no
          restringe jurisdicciones, autoridades administrativas ni mecanismos de
          reclamo reconocidos por la normativa argentina aplicable.
        </p>
      </>
    ),
  },
];

const references = [
  {
    label: 'Ley 24.240 de Defensa del Consumidor',
    href: 'https://www.argentina.gob.ar/normativa/nacional/ley-24240-638',
  },
  {
    label: 'Código Civil y Comercial de la Nación',
    href: 'https://www.argentina.gob.ar/normativa/nacional/ley-26994-235975',
  },
  {
    label: 'Ley 25.326 de Protección de Datos Personales',
    href: 'https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790',
  },
  {
    label: 'Disposición DNDC 954/2025',
    href: 'https://www.argentina.gob.ar/normativa/nacional/disposici%C3%B3n-954-2025-414199',
  },
  {
    label: 'Disposición DNDC 3/2026',
    href: 'https://www.argentina.gob.ar/normativa/nacional/disposici%C3%B3n-3-2026-416015',
  },
];

export default function TerminosYCondicionesPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Términos y condiciones"
      description="Condiciones de uso, contratación, soporte, cancelación y responsabilidad aplicables al sitio y a los servicios de atende en Argentina."
      lastUpdated={lastUpdated}
      sections={sections}
      references={references}
    />
  );
}

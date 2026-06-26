import type { Metadata } from 'next';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { site } from '@/content/site';

const lastUpdated = '26 de junio de 2026';
const linkClass = 'underline underline-offset-4 hover:text-coral';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description:
    'Política de privacidad de atende para el tratamiento de datos personales en Argentina.',
  alternates: {
    canonical: '/politica-de-privacidad',
  },
};

const sections = [
  {
    id: 'responsable',
    title: '1. Responsable y alcance',
    body: (
      <>
        <p>
          Esta política explica cómo {site.legalName} trata datos personales de
          personas que visitan {site.url}, consultan por WhatsApp o email,
          solicitan una propuesta, contratan servicios o interactúan con canales
          operados por atende.
        </p>
        <p>
          El canal de contacto para privacidad es{' '}
          <a className={linkClass} href={`mailto:${site.email}`}>
            {site.email}
          </a>
          . También podés escribirnos por WhatsApp a{' '}
          <a
            className={linkClass}
            href={`https://wa.me/${site.whatsapp.number}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.whatsapp.display}
          </a>
          .
        </p>
        <p>
          Cuando un cliente usa atende para responder mensajes de sus propios
          usuarios, clientes, pacientes, leads o contactos, ese cliente es
          responsable de contar con una base legal válida para tratar esos datos
          y para instruir a atende como proveedor tecnológico.
        </p>
      </>
    ),
  },
  {
    id: 'datos-tratados',
    title: '2. Datos que podemos tratar',
    body: (
      <p>
        La información tratada depende de cómo interactúes con el sitio o con el
        servicio. No pedimos datos sensibles para consultas comerciales y te
        recomendamos no enviarlos salvo que sean estrictamente necesarios para tu
        solicitud.
      </p>
    ),
    points: [
      'Datos identificatorios y de contacto: nombre, apellido, empresa, rol, email, teléfono, ciudad, provincia y país.',
      'Datos comerciales: rubro, necesidades del negocio, mensajes enviados, historial de consultas, propuestas, contratación, facturación y soporte.',
      'Datos de uso y técnicos: fecha y hora de interacción, páginas visitadas, dispositivo, navegador, dirección IP, registros de seguridad y eventos necesarios para operar el sitio o servicio.',
      'Datos conversacionales: mensajes, audios, archivos, etiquetas, respuestas automáticas, estados de conversación y metadatos necesarios para prestar automatización o soporte.',
      'Datos provistos por clientes para configurar el bot: horarios, servicios, catálogos, listas de precios, preguntas frecuentes, políticas comerciales e información operativa del negocio.',
    ],
  },
  {
    id: 'finalidades',
    title: '3. Finalidades del tratamiento',
    body: (
      <p>
        Tratamos datos personales con finalidades determinadas, explícitas y
        relacionadas con la operación comercial y técnica de atende.
      </p>
    ),
    points: [
      'Responder consultas, preparar demos, enviar propuestas y mantener conversaciones comerciales solicitadas.',
      'Implementar, operar, monitorear, mantener, personalizar y mejorar bots, integraciones, flujos conversacionales y soporte.',
      'Gestionar clientes, pagos, facturación, renovaciones, soporte, baja de servicios, auditoría interna y obligaciones administrativas.',
      'Prevenir abusos, fraude, accesos indebidos, incidentes de seguridad, spam o usos no autorizados del servicio.',
      'Cumplir obligaciones legales, regulatorias, contables, fiscales, contractuales o requerimientos válidos de autoridades competentes.',
      'Enviar comunicaciones operativas y comerciales relacionadas con atende, con opción de solicitar baja cuando corresponda.',
    ],
  },
  {
    id: 'base-legal',
    title: '4. Base legal y consentimiento',
    body: (
      <>
        <p>
          El tratamiento se realiza de acuerdo con la Ley 25.326 de Protección de
          Datos Personales, su normativa complementaria y los principios de
          licitud, finalidad, proporcionalidad, calidad, seguridad y
          confidencialidad.
        </p>
        <p>
          Podemos tratar datos por consentimiento, por una relación contractual o
          precontractual, por cumplimiento de obligaciones legales o porque el
          dato resulta necesario para responder una solicitud iniciada por la
          persona interesada o para prestar el servicio contratado.
        </p>
      </>
    ),
  },
  {
    id: 'terceros-transferencias',
    title: '5. Proveedores y transferencias',
    body: (
      <>
        <p>
          Podemos compartir datos con proveedores que ayudan a operar el sitio y
          los servicios, como infraestructura cloud, mensajería, WhatsApp/Meta,
          correo electrónico, pagos, facturación, soporte, analítica,
          inteligencia artificial, seguridad, asesores profesionales o
          integraciones solicitadas por clientes.
        </p>
        <p>
          Esos proveedores pueden estar radicados en Argentina o en el exterior.
          Cuando corresponda, usamos contratos, instrucciones, controles de
          acceso y medidas razonables para que traten los datos sólo para las
          finalidades autorizadas y bajo estándares compatibles con esta política.
        </p>
        <p>
          También podemos revelar información si existe una obligación legal, una
          orden válida de autoridad competente, una necesidad de proteger
          derechos propios o de terceros, o una operación societaria o comercial
          que requiera transferir activos relacionados con el servicio.
        </p>
      </>
    ),
  },
  {
    id: 'conservacion',
    title: '6. Conservación',
    body: (
      <>
        <p>
          Conservamos los datos durante el tiempo necesario para cumplir las
          finalidades informadas, prestar el servicio, atender reclamos, respaldar
          operaciones, cumplir obligaciones legales o defender derechos.
        </p>
        <p>
          Cuando los datos ya no sean necesarios, procuraremos eliminarlos,
          anonimizarlos o bloquearlos según corresponda. El cliente puede pedir
          criterios de retención específicos para su servicio cuando la
          contratación lo requiera.
        </p>
      </>
    ),
  },
  {
    id: 'seguridad',
    title: '7. Seguridad y confidencialidad',
    body: (
      <>
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger los
          datos contra accesos no autorizados, pérdida, alteración, divulgación o
          uso indebido. Entre ellas pueden incluirse controles de acceso,
          separación de entornos, registros, backups, cifrado disponible,
          revisión de proveedores y restricciones por necesidad de conocimiento.
        </p>
        <p>
          Ningún sistema conectado a internet es completamente infalible. Si
          detectamos un incidente relevante, adoptaremos medidas de contención,
          análisis y comunicación según su alcance y la normativa aplicable.
        </p>
      </>
    ),
  },
  {
    id: 'derechos',
    title: '8. Derechos de titulares de datos',
    body: (
      <>
        <p>
          En Argentina podés ejercer los derechos de acceso, rectificación,
          actualización y supresión de tus datos personales. Para hacerlo,
          escribinos a{' '}
          <a className={linkClass} href={`mailto:${site.email}`}>
            {site.email}
          </a>{' '}
          con el asunto "Datos personales" e indicá qué derecho querés ejercer.
          Podemos pedir información razonable para verificar tu identidad.
        </p>
        <p>
          El derecho de acceso puede ejercerse gratuitamente en intervalos no
          inferiores a seis meses, salvo que acredites un interés legítimo. Las
          solicitudes de acceso se responderán dentro de los plazos legales
          aplicables y los pedidos de rectificación, actualización o supresión se
          atenderán conforme a la Ley 25.326.
        </p>
        <p>
          La Agencia de Acceso a la Información Pública, órgano de control de la
          Ley 25.326, recibe reclamos y denuncias de quienes consideren afectados
          sus derechos de datos personales.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: '9. Cookies y tecnologías similares',
    body: (
      <>
        <p>
          El sitio puede usar tecnologías técnicas necesarias para funcionar,
          mantener seguridad, cargar contenido y medir rendimiento. Si en el
          futuro incorporamos cookies de analítica, publicidad o perfilado que
          requieran información adicional, actualizaremos esta política o el
          mecanismo de aviso correspondiente.
        </p>
        <p>
          Podés configurar tu navegador para bloquear o eliminar cookies, aunque
          algunas funciones podrían verse afectadas.
        </p>
      </>
    ),
  },
  {
    id: 'menores',
    title: '10. Menores de edad',
    body: (
      <p>
        Atende está dirigido a negocios y no busca recopilar datos de niñas,
        niños o adolescentes. Si detectamos que recibimos datos de una persona
        menor de edad sin autorización suficiente, podremos eliminarlos o pedir
        información adicional para gestionar el caso.
      </p>
    ),
  },
  {
    id: 'cambios',
    title: '11. Cambios en esta política',
    body: (
      <>
        <p>
          Podemos actualizar esta política para reflejar cambios operativos,
          técnicos, comerciales o normativos. La versión vigente se publica en
          esta página con su fecha de última actualización.
        </p>
        <p>
          Si un cambio afecta de forma sustancial el tratamiento de datos en una
          relación vigente, procuraremos informarlo por canales razonables.
        </p>
      </>
    ),
  },
];

const references = [
  {
    label: 'Ley 25.326 de Protección de Datos Personales',
    href: 'https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790',
  },
  {
    label: 'AAIP: derechos sobre datos personales',
    href: 'https://www.argentina.gob.ar/aaip/datospersonales/derechos',
  },
  {
    label: 'AAIP: datos personales',
    href: 'https://www.argentina.gob.ar/aaip/datospersonales',
  },
];

export default function PoliticaDePrivacidadPage() {
  return (
    <LegalDocument
      eyebrow="Privacidad"
      title="Política de privacidad"
      description="Cómo recopilamos, usamos, protegemos y compartimos datos personales al operar el sitio y los servicios de atende para el mercado argentino."
      lastUpdated={lastUpdated}
      sections={sections}
      references={references}
    />
  );
}

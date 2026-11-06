import { describe, expect, it } from 'vitest';
import { checkClaims, claimRules } from './claims';

const rules = (file: string, source: string) =>
  checkClaims(file, source).findings.map((finding) => finding.rule);
const markdown = (text: string) => rules('post.md', text);
const code = (text: string) => rules('copy.ts', `export const copy = '${text}';`);

describe('banned claims', () => {
  it.each([
    ['Todas las conversaciones visibles', 'todas-las-conversaciones'],
    ['Con Atende tu equipo ve todo', 'equipo-ve-todo'],
    ['Ves quién respondió y qué se dijo.', 'atribucion-en-bandeja'],
    ['Podés tomar cualquier conversación', 'tomar-conversacion'],
    ['Responde al instante', 'velocidad'],
    ['Contesta en segundos', 'velocidad'],
    ['Conexión sin riesgo de bloqueo', 'sin-bloqueo'],
    ['Número verificado por Meta', 'aval-de-meta'],
    ['Listo en 5 minutos', 'tiempo-de-instalacion'],
    ['Queda listo en pocos minutos', 'tiempo-de-instalacion'],
    ['Las integraciones se evalúan por separado', 'se-evalua'],
    ['Buenísimo! ¿Qué día te queda?', 'voz-del-asistente'],
    ['Hola, ¿en qué podemos ayudarte hoy.', 'voz-del-asistente'],
    ['Atención 24/7 con IA', '24-7'],
    ['Atende no es la API oficial de Meta.', 'niega-la-api'],
    ['Se conecta por QR. No es la API oficial de Meta.', 'niega-la-api'],
    ['Atende no usa la API oficial de Meta', 'niega-la-api'],
    ['Atende no tiene la API', 'niega-la-api'],
    ['Como no es la API oficial, los mensajes suman riesgo.', 'niega-la-api'],
    ['Si necesitás la API oficial, Atende no es para vos.', 'niega-la-api'],
    ['Si tu empresa exige la API oficial, hoy Atende no es la opción.', 'niega-la-api'],
    ['No conviene si necesitás la API oficial de Meta.', 'niega-la-api'],
    ['Atende se conecta por QR.', 'solo-qr'],
    ['Se conecta por QR, en el número que ya usás.', 'solo-qr'],
    ['Atende solo se conecta con un QR.', 'solo-qr'],
    ['Respondés y el bot se frena', 'pausa-indefinida'],
    ['Queda pausado hasta que vos quieras', 'pausa-indefinida'],
    ['Cuando respondés, el asistente se pausa', 'responder-pausa'],
    ['Probalo antes de que lo vean tus clientes', 'modo-de-prueba'],
    ['Se integra con Google Calendar y Tiendanube', 'producto-sin-conector'],
    ['Sin permanencia', 'condiciones-sin-definir'],
    ['Soporte prioritario', 'soporte-sin-definir'],
    ['Recuerda todo el historial', 'memoria-total'],
    ['Tu número sigue siendo tuyo', 'numero-tuyo'],
    ['Ya somos +500 empresas', 'prueba-social'],
    ['Más de 500 empresas usan Atende', 'prueba-social'],
    ['500 negocios ya confían en nosotros', 'prueba-social'],
    ['Nuestros clientes felices lo recomiendan', 'prueba-social'],
    ['Atención 24/7 mientras vos dormís', '24-7'],
    ['Garantizamos atención 24/7', '24-7'],
    ['Atende busca tu turno 24/7', '24-7'],
    ['Atende responde todos tus mensajes', 'todos-los-mensajes'],
    ['También responde audios y fotos', 'entiende-medios'],
    ['Atende lee las imágenes que te mandan', 'entiende-medios'],
    ['Atende está certificado por Meta', 'aval-de-meta'],
    ['Atende es partner oficial de Meta', 'partner-de-meta'],
    ['Atende es Tech Provider de Meta', 'partner-de-meta'],
    ['Somos Tech Provider de Meta', 'partner-de-meta'],
    ['Atende es BSP de WhatsApp', 'partner-de-meta'],
    ['Atende es un BSP', 'partner-de-meta'],
    ['Con la API oficial no te bloquean el número', 'promesa-de-whatsapp'],
    ['Conexión segura, sin bloqueos de WhatsApp', 'sin-bloqueo'],
    ['Cero riesgo de baneo', 'sin-bloqueo'],
    ['WhatsApp nunca te va a bloquear el número', 'promesa-de-whatsapp'],
    ['Funciona con Google Calendar y Tiendanube', 'producto-sin-conector'],
    ['Compatible con Tiendanube', 'producto-sin-conector'],
    ['Atende también funciona en Instagram', 'otro-canal'],
    ['Atende manda recordatorios automáticos', 'recordatorio-sin-pedido'],
    ['Resultados garantizados desde el primer mes', 'resultado-prometido'],
    ['Aumentá tus ventas un 30% con Atende', 'resultado-prometido'],
    ['Atende responde consultas clínicas', 'consulta-clinica'],
  ])('flags %s', (text, rule) => {
    expect(code(text)).toContain(rule);
    expect(markdown(text)).toContain(rule);
  });

  it('matches without accents and in any case', () => {
    expect(code('VES QUIEN RESPONDIO')).toContain('atribucion-en-bandeja');
    expect(code('buenisimo')).toContain('voz-del-asistente');
  });
  it('flags hard-coded prices in site code, but not sourced prices in posts', () => {
    expect(code('Desde $15000 por mes')).toContain('precio-en-codigo');
    expect(code('Desde U$S 49 por mes')).toContain('precio-en-codigo');
    expect(code('Desde 15.000 pesos por mes')).toContain('precio-en-codigo');
    expect(code('Solo 49 dólares al mes')).toContain('precio-en-codigo');
    expect(markdown('Botmaker publica planes desde USD 149.')).toEqual([]);
  });
  it('flags invented discounts and urgency in site code', () => {
    expect(code('50% de descuento')).toContain('descuento-o-urgencia');
    expect(code('Oferta por tiempo limitado')).toContain('descuento-o-urgencia');
  });
  it('is not fooled by markup or by YAML quotes', () => {
    expect(markdown('Atende responde *al* instante.')).toContain('velocidad');
    expect(markdown('Sin **riesgo** de bloqueo.')).toContain('sin-bloqueo');
    expect(markdown('Responde [al](/x) instante.')).toContain('velocidad');
    expect(
      markdown('---\ntitle: "Responde al instante"\n---\n\nTexto.'),
    ).toContain('velocidad');
    expect(
      markdown('---\nfaq:\n  - a: "Sin riesgo de bloqueo"\n---\n\nTexto.'),
    ).toContain('sin-bloqueo');
  });
  it('has one rule per id', () => {
    const ids = claimRules.map((rule) => rule.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('copy that explains a limit is not a claim', () => {
  it.each([
    ['A negated phrase', 'Atende no responde al instante.'],
    ['A limit stated with nunca', 'Nunca prometemos que sea sin riesgo de bloqueo.'],
    ['A buyer question', '¿Entiende audios y fotos?'],
    ['A question about a claim', '¿Responde al instante?'],
    ['A quoted competitor', 'Cliengo promete “atención 24/7” en su página.'],
    ['A long quote', 'La página dice "Nunca pierdas un cliente: atención 24/7 con IA".'],
    ['The connection choice', 'Elegís cómo conectar tu número: con la API oficial de Meta o con un QR.'],
    ['Atende on the API', 'Atende usa la API oficial de Meta o un QR, a elección.'],
    ['A rival on the API', 'Botmaker usa la API oficial de Meta.'],
    ['What the QR route is', 'La conexión por QR no es la API oficial de Meta.'],
    ['Weighing the API', 'Para recordatorios conviene evaluar la API oficial de Meta.'],
    ['A plain QR step', 'Escaneás el QR desde dispositivos vinculados.'],
    ['The QR route, chosen', 'Si elegís el QR, Atende se conecta por QR desde dispositivos vinculados.'],
    ['Denying a status', 'Atende no es Tech Provider de Meta.'],
    ['Denying a BSP status', 'Atende no es un BSP.'],
    ['A rival as BSP', 'Wati es BSP de Meta.'],
    ['The hours caveat', '24/7 solo mientras el servicio esté conectado.'],
    ['Modo CRM', 'Modo CRM apaga el asistente en todas las conversaciones.'],
    ['No per-chat privacy', 'Todas las personas de tu espacio ven todas las conversaciones.'],
    ['Another use of tuyo', 'Si cotizás en el portal, ese paso sigue siendo tuyo.'],
    ['The credits button', 'Los créditos se acreditan al instante.'],
    ['The pause limit', 'Responder desde la bandeja no pausa al asistente.'],
    ['Pausing the real way', 'Si seguís respondiendo vos, marcá Necesita humano y el asistente deja de responder.'],
    ['A planned feature', 'Próximamente ves quién respondió en la bandeja.'],
    ['Evaluating a tool', 'Antes de contratar, se evalúa el costo total.'],
    ['Connection in general', 'Conectado a tu agenda, Atende reserva el turno.'],
    ['The hours caveat, spelled out', 'Atención 24/7 mientras el servicio esté conectado.'],
    ['Nobody promising', 'Nadie puede prometer que WhatsApp no te va a restringir el número.'],
    ['Only WhatsApp', 'Atende no funciona en Instagram ni en Messenger.'],
    ['A reminder on request', 'El asistente manda recordatorios automáticos a pedido.'],
    ['A competitor partner', 'Darwin AI es partner de WhatsApp.'],
    ['Sending from the library', 'Atende manda fotos y videos de tu biblioteca.'],
    ['A rule of thumb on limits', 'No hay una lista de integraciones listas para activar.'],
  ])('%s', (_, text) => {
    expect(markdown(text)).toEqual([]);
  });
  it('keeps the negation inside its clause', () => {
    expect(markdown('Si no estás, Atende responde al instante.')).toContain(
      'velocidad',
    );
    expect(
      markdown('No tenés que esperar porque responde al instante.'),
    ).toContain('velocidad');
    expect(markdown('No falla y responde al instante.')).toContain('velocidad');
    expect(
      markdown('Sin cables y sin vueltas Atende responde al instante.'),
    ).toContain('velocidad');
    expect(markdown('No te preocupes: sin riesgo de bloqueo.')).toContain(
      'sin-bloqueo',
    );
  });
  it('keeps a condition inside its sentence', () => {
    expect(
      markdown('La integración está lista. Después se evalúa el resultado.'),
    ).toEqual([]);
  });
  it('treats the 24/7 guide as the page that explains the search phrase', () => {
    const title = "title: 'Atención comercial 24/7 por WhatsApp'";
    expect(rules('atencion-comercial-whatsapp-24-7.md', title)).toEqual([]);
    expect(rules('otra-guia.md', title)).toContain('24-7');
  });
});

describe('what the checker reads', () => {
  it('ignores comments, imports and class names', () => {
    expect(
      rules(
        'page.tsx',
        `// Responde al instante
        /* Sin permanencia */
        import x from './al instante';
        export const a = <p className="al instante">Hola {/* al instante */}</p>;`,
      ),
    ).toEqual([]);
  });
  it('reads JSX text, attributes and template literals', () => {
    expect(rules('a.tsx', 'export const a = <p>Responde al instante</p>;')).toEqual(['velocidad']);
    expect(rules('a.tsx', 'export const a = <a title="Responde al instante" />;')).toEqual(['velocidad']);
    expect(rules('a.ts', 'export const a = `Responde al instante ${b}`;')).toEqual(['velocidad']);
  });
  it('reads a sentence across inline markup and line breaks', () => {
    expect(
      rules(
        'a.tsx',
        `export const a = <p>Atende <strong>responde</strong>
          al{' '}
          instante</p>;`,
      ),
    ).toEqual(['velocidad']);
    expect(
      rules('a.tsx', 'export const a = <p>No responde <b>al instante</b>.</p>;'),
    ).toEqual([]);
  });
  it('reads Markdown paragraphs and YAML values that wrap across lines', () => {
    expect(markdown('Atende responde\nal instante.')).toEqual(['velocidad']);
    expect(
      markdown("---\nsummary: >-\n  Atende responde\n  al instante.\n---\nTexto"),
    ).toEqual(['velocidad']);
  });
  it('skips frontmatter URLs and comments, but not frontmatter copy', () => {
    expect(
      markdown(
        "---\n# Responde al instante\nsources:\n  - url: 'https://x.com/al instante'\n---\nTexto",
      ),
    ).toEqual([]);
    expect(markdown("---\ndescription: 'Responde al instante'\n---\nTexto")).toEqual(['velocidad']);
  });
  it('reports the file, line and the text around the match', () => {
    const [finding] = checkClaims('post.md', 'Uno\n\nResponde al instante.').findings;
    expect(finding).toMatchObject({ file: 'post.md', line: 3, rule: 'velocidad' });
    expect(finding.text).toContain('al instante');
    expect(finding.fix).toBeTruthy();
  });
});

describe('documented exceptions', () => {
  it('accepts a reasoned exception in Markdown, YAML, TS and JSX', () => {
    const md = checkClaims('post.md', '<!-- claims-allow: cita de Kommo -->\nResponde al instante.');
    expect(md.findings).toEqual([]);
    expect(md.allowed).toHaveLength(1);
    expect(
      checkClaims('post.md', "---\n# claims-allow: frase buscada\ndescription: 'Responde al instante'\n---\nTexto").findings,
    ).toEqual([]);
    expect(
      checkClaims('a.ts', "// claims-allow: cita del proveedor\nexport const a = 'Responde al instante';").findings,
    ).toEqual([]);
    expect(
      checkClaims('a.tsx', 'export const a = (<div>\n{/* claims-allow: cita */}\n<p>Responde al instante</p></div>);').findings,
    ).toEqual([]);
  });
  it('covers its own line and the next two, and no further', () => {
    const near = "// claims-allow: cita\nexport const a = {\n  b: 'Responde al instante',\n};";
    const far = "// claims-allow: cita\nconst x = 1;\nconst y = 2;\nexport const a = 'Responde al instante';";
    expect(checkClaims('a.ts', near).findings).toEqual([]);
    expect(checkClaims('a.ts', far).findings).toHaveLength(1);
  });
  it('rejects an exception without a reason', () => {
    const report = checkClaims('post.md', '<!-- claims-allow: -->\nResponde al instante.');
    expect(report.invalidDirectives).toEqual([1]);
    expect(report.findings).toHaveLength(1);
  });
  it('reports an exception that no longer matches anything', () => {
    expect(
      checkClaims('post.md', '<!-- claims-allow: cita vieja -->\nTexto.').unusedDirectives,
    ).toEqual([1]);
  });
});

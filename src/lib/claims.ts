import ts from 'typescript';

// Claims the product cannot back. Patterns run on lowercase text without accents.
// Sources: AGENTS.md Rule 2, the rebuild spec (truth rules) and the product facts.
export type ClaimRule = {
  id: string;
  pattern: RegExp;
  fix: string;
  /** The sentence must also match this for the rule to apply. */
  requires?: RegExp;
  /** A sentence matching this is fine. */
  except?: RegExp;
  /** Marketing code only. Blog posts may quote sourced third-party prices. */
  srcOnly?: boolean;
  /** Files where the phrase is the topic, such as a guide about that search. */
  exceptFile?: RegExp;
};

export const claimRules: ClaimRule[] = [
  {
    id: 'todos-los-mensajes',
    pattern: /\btodos (los|tus) mensajes\b/,
    fix: 'Decí "mensajes de texto": audios, fotos y grupos no llegan.',
  },
  {
    id: 'todas-las-conversaciones',
    pattern: /\btodas las conversaciones\b/,
    // Who can see the chats is a limit worth stating; the claim is about coverage.
    except:
      /\bmodo crm\b|\btodo el espacio\b|\bde texto\b|\bpermisos\b|\bpersonas de tu espacio\b/,
    fix: 'Decí "ves toda la conversación" o "cada conversación de texto".',
  },
  {
    id: 'equipo-ve-todo',
    pattern: /\btu equipo ve todo\b/,
    fix: 'Decí "ves toda la conversación".',
  },
  {
    id: 'entiende-medios',
    pattern:
      /\b(entiende|escucha|transcribe|interpreta|lee|responde|contesta|procesa)\s+(a\s+)?(los\s+|las\s+|tus\s+)?(audios?|fotos?|imagenes|videos?|stickers?)\b/,
    fix: 'Solo llegan mensajes de texto.',
  },
  {
    id: 'velocidad',
    pattern: /\bal instante\b|\ben segundos\b/,
    // Activating credits is immediate; this rule is about reply speed.
    except: /\bacredit|\bcreditos?\b/,
    fix: 'Decí "sin esperar a que alguien se libere".',
  },
  {
    id: '24-7',
    pattern: /\b24\s?(\/|x)\s?7\b/,
    except:
      /\bmientras (el|la|tu|tus|los|este|esten|siga|sigan)\b|\b(no es|sin|ni|no son) (una |ninguna )?garantia\b|\bbuscas\b|\bbuscan\b|\bbuscar\b|\bbusqueda\b|\bsignifica\b/,
    exceptFile: /atencion-comercial-whatsapp-24-7\.md$/,
    fix: 'Decí "a cualquier hora, mientras el servicio y tu WhatsApp estén conectados".',
  },
  {
    id: 'aval-de-meta',
    pattern:
      /\b(verificad|aprobad|certificad|autorizad|avalad|homologad)[oa]s? por (meta|whatsapp|facebook)\b/,
    fix: 'Usar la API oficial no es un estatus. Decí "Elegís cómo conectar tu número: con la API oficial de Meta o con un QR."',
  },
  {
    id: 'partner-de-meta',
    pattern:
      /\b(partner|socio|proveedor|tech provider|bsp)( oficial)? de (meta|whatsapp)\b|\b(atende|somos)\b(?:(?!\b(no|ni)\b).){0,30}\b(tech provider|bsp|business solution provider)\b/,
    requires: /\batende\b|\bsomos\b/,
    fix: 'Usar la API oficial no es un estatus: nada de partner, Tech Provider, BSP ni aprobación de Meta.',
  },
  {
    id: 'sin-bloqueo',
    pattern:
      /\b(sin|cero)\s+riesgos? de (bloqueo|ban|baneo|restriccion|suspension)\b|\bsin (bloqueos?|baneos?)\b/,
    fix: 'Nunca prometas que WhatsApp no va a restringir un número.',
  },
  {
    id: 'promesa-de-whatsapp',
    pattern:
      /\b(nunca|no) te va(n)? a (bloquear|banear|restringir|suspender)\b|\b(nunca|no) te (bloquean|banean|restringen|suspenden)\b|\bwhatsapp (nunca|no) (te )?(bloquea|banea|restringe|suspende)\b/,
    except: /\bpromet|\bgarantiz|\bnadie\b/,
    fix: 'Nunca prometas que WhatsApp no va a restringir un número, por ninguna de las dos rutas.',
  },
  {
    // The customer chooses the route, so denying the API is now the false claim.
    // A sentence about the QR route itself ("el QR no es la API") stays fine.
    id: 'niega-la-api',
    pattern:
      /\batende\b.{0,40}\bno (es|usa|tiene|ofrece|pasa por|trabaja con)( la)? api\b|^\s*no (es|usa|tiene)( la)? api oficial\b|\bcomo no (es|usa|tiene)( la)? api\b|\bapi oficial\b.{0,60}\bno (conviene|es para vos|es la opcion)\b|\bno (conviene|es para vos|es la opcion)\b.{0,50}\bapi oficial\b/,
    fix: 'Decí "Elegís cómo conectar tu número: con la API oficial de Meta o con un QR."',
  },
  {
    id: 'solo-qr',
    pattern:
      /\batende\b.{0,20}\bse conecta (solo |solamente |unicamente )?(por|con) (un )?qr\b|^\s*se conecta (solo |solamente |unicamente )?(por|con) (un )?qr\b/,
    except: /\bapi\b|\beleg|\belig/,
    fix: 'Decí "Elegís cómo conectar tu número: con la API oficial de Meta o con un QR."',
  },
  {
    id: 'tiempo-de-instalacion',
    pattern:
      /\blist[oa]s? en\b.{0,30}\bminutos?\b|\b(configur|activ|conect|arranc|empez)\w*\b.{0,20}\ben (menos de )?(\d+|unos|pocos|cinco|diez|quince) minutos\b/,
    fix: 'Contá los pasos, sin minutos.',
  },
  {
    id: 'se-evalua',
    pattern: /\bse evaluan?\b/,
    requires: /\bintegraci|\bconexion|\bconector|\brecordatorio|\bseguimiento/,
    fix: 'Decí "esa conexión se arma a pedido para tu negocio".',
  },
  {
    id: 'listo-para-activar',
    pattern: /\blist[oa]s? para activar\b|\bout of the box\b/,
    fix: 'Las conexiones se arman a pedido para cada negocio.',
  },
  {
    id: 'conexion-incluida',
    pattern: /\b(integracion|conexion|conector)(es)?\s+(ya\s+)?incluid[oa]s?\b/,
    fix: 'Las conexiones se arman a pedido: no vienen incluidas.',
  },
  {
    id: 'producto-sin-conector',
    pattern:
      /\b(integr|conect|sincroniz|funciona con|compatible)\w*\b.{0,50}\b(google calendar|tiendanube|tokko)\b/,
    fix: 'No nombres productos sin conector. Decí "conectado a tu agenda".',
  },
  {
    id: 'canales-sin-puente',
    pattern: /\binstagram\b.{0,30}\b(messenger|telegram)\b|\bmessenger\b.{0,30}\btelegram\b/,
    requires: /\batende\b/,
    fix: 'Atende solo funciona en WhatsApp.',
  },
  {
    id: 'otro-canal',
    pattern:
      /\batende\b.{0,40}\b(funciona|responde|atiende|disponible)\b.{0,20}\b(instagram|messenger|telegram)\b/,
    except: /\bno (funciona|responde|atiende|esta)\b|\bsolo\b/,
    fix: 'Atende solo funciona en WhatsApp.',
  },
  {
    id: 'recordatorio-sin-pedido',
    pattern:
      /\b(recordatorios?|seguimientos?)( de \w+)? automatic\w*\b|\bautomatic\w*\b.{0,20}\b(recordatorios?|seguimientos?)\b/,
    requires: /\batende\b|\basistente\b/,
    except: /\ba pedido\b|\barmad[oa]s?\b/,
    fix: 'Recordatorios y seguimientos son "a pedido", nunca incluidos.',
  },
  {
    id: 'atribucion-en-bandeja',
    pattern:
      /\bquien respondio\b|\bves si respondio\b|\bves (cada|que) accion\b|\bsi respondio el bot\b/,
    fix: 'La bandeja todavía no lo muestra. Decí "ves toda la conversación".',
  },
  {
    id: 'tomar-conversacion',
    pattern:
      /\btom\w* cualquier conversacion\b|\bintervenir en cualquier\b|\balguien toma el control\b/,
    fix: 'Decí "marcá la conversación como Necesita humano".',
  },
  {
    id: 'pausa-indefinida',
    pattern:
      /\bpausad[oa]s? hasta que\b|\bhasta que vos quieras\b|\bel bot se frena\b/,
    fix: 'La pausa dura hasta que el chat se cierra: 12 horas después del último mensaje del contacto.',
  },
  {
    id: 'responder-pausa',
    pattern:
      /\b(respond|asign)\w*\b.{0,40}\b(se pausa|pausa al|se frena|se detiene|deja de responder)\b/,
    except: /\bnecesita humano\b|\bmodo crm\b|\bno (pausa|frena|detiene)\b/,
    fix: 'Responder o "Asignarme" no pausa. Solo "Necesita humano".',
  },
  {
    id: 'modo-de-prueba',
    pattern:
      /\bantes de que lo vean tus clientes\b|\bantes de usarlo con clientes\b|\bsin que lo vean tus clientes\b/,
    fix: 'Decí "Probalo desde otro número; usa créditos."',
  },
  {
    id: 'buscar-en-mensajes',
    pattern: /\bbusca\w*\b.{0,30}\bmensajes\b.{0,20}\bcontexto\b/,
    fix: 'La búsqueda es por contacto o teléfono.',
  },
  {
    id: 'permisos-por-rol',
    pattern: /\bpermisos por rol\b/,
    fix: 'No hay permisos por rol.',
  },
  {
    id: 'aviso-sin-respuestas',
    pattern: /\bte avisamos antes de\b/,
    fix: 'No hay aviso de saldo bajo.',
  },
  {
    id: 'memoria-total',
    pattern: /\brecuerda todo\b/,
    fix: 'Decí "tiene en cuenta la conversación en curso".',
  },
  {
    id: 'condiciones-sin-definir',
    pattern: /\bsin permanencia\b|\bcancelas cuando quieras\b/,
    fix: 'Decí "los planes vigentes se ven en la app antes de pagar".',
  },
  {
    id: 'soporte-sin-definir',
    pattern: /\bsoporte (24|prioritario|humano|dedicado)\b|\bgerente de cuenta\b/,
    fix: 'Decí "escribinos por WhatsApp o email".',
  },
  {
    id: 'datos-sin-confirmar',
    pattern:
      /\bdatos en argentina\b|\bno entrenamos\b|\bcifrado de punta a punta\b/,
    fix: 'Enlazá la Política de privacidad.',
  },
  {
    id: 'numero-tuyo',
    pattern: /\bnumero sigue siendo tuyo\b/,
    fix: 'Decí "tu número sigue siendo el mismo".',
  },
  {
    id: 'prueba-social',
    pattern:
      /\b(miles|cientos) de (empresas|negocios|clientes)\b|(\+\s?|\bmas de )\d[\d.]* (empresas|negocios|clientes|pymes)\b|\b\d[\d.]* (empresas|negocios|clientes|pymes) (ya )?(usan|confian|eligen|trabajan)\b|\bconfian en (atende|nosotros)\b|\bclientes (felices|satisfechos|contentos)\b/,
    fix: 'No hay clientes ni métricas publicables.',
  },
  {
    id: 'resultado-prometido',
    pattern:
      /\bresultados? garantizad[oa]s?\b|\bgarantizamos\b|\b(aument|duplic|triplic|mejor|sub)\w*\b.{0,30}\b(ventas|conversion\w*|facturacion)\b.{0,20}\d+\s?(%|x\b|veces)/,
    fix: 'Sin métricas ni resultados prometidos.',
  },
  {
    id: 'descuento-o-urgencia',
    pattern:
      /\b\d+\s?% (de )?(descuento|off)\b|\bpor tiempo limitado\b|\bultimos (lugares|cupos disponibles)\b/,
    srcOnly: true,
    fix: 'Sin descuentos ni urgencia inventada.',
  },
  {
    id: 'consulta-clinica',
    pattern:
      /\b(responde|contesta|resuelve)\s+(a\s+)?(las\s+|tus\s+)?(consultas|preguntas)\s+(clinicas|medicas)\b|\b(guarda|registra|carga)\s+(la\s+|las\s+)?historias? clinicas?\b/,
    fix: 'Lo clínico va a una persona y no se juntan datos de pacientes.',
  },
  {
    id: 'difusiones',
    pattern: /\bdifusion(es)? masivas?\b/,
    except: /\bno (conviene|sirve|es para|hace|manda|envia)\b/,
    fix: 'Atende no manda mensajes por su cuenta.',
  },
  {
    id: 'precio-en-codigo',
    pattern: /(\$|\busd|\bars|\bu\$s)\s?\d|\b\d[\d.]*\s?(pesos|dolares)\b/,
    srcOnly: true,
    fix: 'Los precios viven en la app y en el catálogo de planes.',
  },
  {
    id: 'voz-del-asistente',
    pattern: /\bbuenisimo\b|\ben que podemos ayudarte\b|¡excelente\b|\bcon gusto\b/,
    fix: 'El asistente habla sin relleno: una a tres líneas directas.',
  },
];

export type ClaimFinding = {
  file: string;
  line: number;
  rule: string;
  fix: string;
  text: string;
};
export type ClaimReport = {
  findings: ClaimFinding[];
  allowed: ClaimFinding[];
  invalidDirectives: number[];
  unusedDirectives: number[];
};
type Segment = { line: number; text: string };

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();

function extractCode(file: string, source: string): Segment[] {
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const segments: Segment[] = [];
  const push = (node: ts.Node, text: string) => {
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean)
      segments.push({
        line:
          sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1,
        text: clean,
      });
  };
  const visitAttributes = (node: ts.JsxOpeningLikeElement) =>
    node.attributes.properties.forEach(visit);
  // Inline markup stays in its sentence: <p>No responde <b>al instante</b></p>.
  const flatten = (node: ts.JsxChild): string => {
    if (ts.isJsxText(node)) return node.text;
    if (ts.isJsxExpression(node)) {
      if (!node.expression) return '';
      if (ts.isStringLiteralLike(node.expression)) return node.expression.text;
      visit(node.expression);
      return ' ';
    }
    if (ts.isJsxElement(node)) {
      visitAttributes(node.openingElement);
      return node.children.map(flatten).join('');
    }
    if (ts.isJsxFragment(node)) return node.children.map(flatten).join('');
    visitAttributes(node);
    return ' ';
  };
  const hasOwnText = (node: ts.JsxElement | ts.JsxFragment) =>
    node.children.some(
      (child) =>
        (ts.isJsxText(child) && child.text.trim()) ||
        (ts.isJsxExpression(child) &&
          child.expression &&
          ts.isStringLiteralLike(child.expression) &&
          child.expression.text.trim()),
    );
  function visit(node: ts.Node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return;
    if (ts.isJsxAttribute(node) && node.name.getText() === 'className') return;
    if ((ts.isJsxElement(node) || ts.isJsxFragment(node)) && hasOwnText(node)) {
      if (ts.isJsxElement(node)) visitAttributes(node.openingElement);
      push(node, node.children.map(flatten).join(''));
      return;
    }
    if (ts.isStringLiteralLike(node)) return push(node, node.text);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map((s) => s.literal.text)];
      push(node, parts.join(' '));
      node.templateSpans.forEach((span) => visit(span.expression));
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return segments;
}

// Prose wraps across lines, so a block runs until a blank line or a new element.
const markdownBlockStart = /^(- |\d+\. |\||#|>|[a-zA-Z]+:)/;
// Markup must not split a phrase, and YAML quotes are not quotations.
const stripMarkup = (text: string) =>
  text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '');
const unquoteYaml = (text: string) =>
  text.replace(/^((?:- )?[a-zA-Z]+:\s*)(["'])(.*)\2$/, '$1$3');

function extractMarkdown(source: string): Segment[] {
  const lines = source.split('\n');
  const frontmatterEnd = lines[0] === '---' ? lines.indexOf('---', 1) : -1;
  const segments: Segment[] = [];
  let open = false;
  lines.forEach((raw, index) => {
    const skip = index <= frontmatterEnd && /^\s*(#|(- )?url:|---)/.test(raw);
    const clean = skip ? '' : raw.replace(/<!--.*?-->/g, ' ').trim();
    const text = stripMarkup(index <= frontmatterEnd ? unquoteYaml(clean) : clean);
    if (text && open && !markdownBlockStart.test(text))
      segments[segments.length - 1].text += ` ${text}`;
    else if (text) segments.push({ line: index + 1, text });
    open = Boolean(text);
  });
  return segments;
}

// "No responde al instante" explains a limit, "¿Responde al instante?" is the
// buyer asking, and a quoted phrase reports what someone else says. None is a
// claim, so pages about limits stay clean without an exception.
function isNegated(before: string) {
  const clause =
    before.split(/[,:()—–]|\b(?:y|porque|pero|sino|entonces)\b/).at(-1) ?? '';
  const words = clause.trim().split(/\s+/);
  return (
    /\b(no|nunca|ni|tampoco|jamas|nadie|evita\w*|proximamente|todavia)\b/.test(
      words.slice(-6).join(' '),
    ) || /\bsin\b/.test(words.slice(-2).join(' '))
  );
}

function isQuoted(before: string) {
  return (
    (before.match(/"/g)?.length ?? 0) % 2 === 1 ||
    before.lastIndexOf('“') > before.lastIndexOf('”') ||
    before.lastIndexOf('«') > before.lastIndexOf('»')
  );
}

function matchSegment(segment: Segment, file: string) {
  const text = normalize(segment.text);
  const isBlogPost = file.endsWith('.md');
  const hits: Omit<ClaimFinding, 'file'>[] = [];
  // One sentence at a time, so `requires` cannot reach into the next idea.
  for (const { 0: sentence, index: offset } of text.matchAll(
    /[^.!?;|]+[.!?;|]*/g,
  )) {
    if (sentence.trimEnd().endsWith('?')) continue;
    for (const rule of claimRules) {
      if (rule.srcOnly && isBlogPost) continue;
      if (rule.exceptFile?.test(file)) continue;
      if (rule.requires && !rule.requires.test(sentence)) continue;
      if (rule.except?.test(sentence)) continue;
      const match = rule.pattern.exec(sentence);
      if (!match) continue;
      const start = offset + match.index;
      if (isNegated(sentence.slice(0, match.index))) continue;
      if (isQuoted(text.slice(0, start))) continue;
      hits.push({
        line: segment.line,
        rule: rule.id,
        fix: rule.fix,
        text: segment.text.slice(Math.max(0, start - 60), start + 100),
      });
    }
  }
  return hits;
}

// `claims-allow: reason` covers its own line and the next two. The reason is
// mandatory, so every exception states why the phrase is safe on that page.
function readDirectives(source: string) {
  const valid: number[] = [];
  const invalid: number[] = [];
  source.split('\n').forEach((line, index) => {
    const directive = line.match(/claims-allow:(.*)$/);
    if (!directive) return;
    const reason = directive[1].replace(/\*\/|\}|-->/g, '').trim();
    (reason ? valid : invalid).push(index + 1);
  });
  return { valid, invalid };
}

export function checkClaims(file: string, source: string): ClaimReport {
  const segments = file.endsWith('.md')
    ? extractMarkdown(source)
    : extractCode(file, source);
  const directives = readDirectives(source);
  const used = new Set<number>();
  const findings: ClaimFinding[] = [];
  const allowed: ClaimFinding[] = [];
  for (const segment of segments)
    for (const hit of matchSegment(segment, file)) {
      const directive = directives.valid.find(
        (line) => hit.line >= line && hit.line <= line + 2,
      );
      if (directive) used.add(directive);
      (directive ? allowed : findings).push({ file, ...hit });
    }
  return {
    findings,
    allowed,
    invalidDirectives: directives.invalid,
    unusedDirectives: directives.valid.filter((line) => !used.has(line)),
  };
}

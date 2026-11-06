# Plan fuera del sitio y medición

Para el dueño de Atende. Escrito el 6 de noviembre de 2026. Nada de esto se ejecutó: no se contactó a nadie, no se envió nada a directorios ni a buscadores y no se dio de alta ninguna cuenta.

## Lo más importante

**Para que te nombren, pesa más lo que dicen otros que lo que dice tu sitio.** El sitio nuevo era necesario, pero solo no alcanza.

- En un estudio de 90 días con 468.037 citas, las características de la página explicaron 2,8% de la variación de citas en ChatGPT dentro de un mismo sitio ([Chen y Koudas, 2026](https://arxiv.org/html/2610.15033)).
- En ese mismo trabajo, que una página de terceros citada nombre a un proveedor de nicho multiplicó por 39,7 las chances de que la respuesta de ChatGPT lo nombre. Para marcas grandes el factor fue 4,2. Son 55 consultas en inglés de Estados Unidos, así que tomalo como dirección y no como un número exacto.
- Atende apareció en 0 de 13 búsquedas de compradores y en ninguna de las listas comparativas leídas (`atende.com.ar`, búsqueda desde Estados Unidos, noviembre de 2026).
- La causa no está probada: nadie demostró que una mención genere una recomendación. Google además avisa que las menciones "inauténticas" no ayudan.

No hay datos en español para casi nada de esto. Y Google orgánico sigue siendo el objetivo principal: Search Console muestra 10 clics en 48 días, y el tráfico desde IA ronda 1% en una muestra de 13.770 dominios ([fuente secundaria](https://remoteworkeurope.eu/news/2026/conductor-aeo-geo-benchmarks-ai-referrals-one-percent)).

## Lo que necesitamos de vos

Sin esto hay acciones que no se pueden hacer bien. Está ordenado por lo que más destraba.

| Qué | Para qué sirve | Dónde va |
| --- | --- | --- |
| Razón social, CUIT y domicilio legal | Registrarse en directorios, y la identidad verificable que hoy falta. `site.legalName` todavía dice "atende", que es la marca | `/nosotros`, datos de la organización, términos |
| Perfiles sociales reales con su URL | Separar a Atende de nombres parecidos como Atendio, AutoAtende y AtiendeApp. Puede haber Instagram y página de Meta, pero no encontré las URL | `site.sameAs` en `src/content/site.ts` |
| Videos reales de demo | Uno por rubro, que termine con la tarea hecha. Hoy solo es real el de la concesionaria de motos. Rotulalo "Ejemplo ilustrativo" y nombrá la conexión | YouTube, y embebido en cada rubro |
| Clientes reales dispuestos a opinar | Reseñas y notas de prensa. Sin esto no hay casos ni métricas para publicar | Capterra, G2, prensa |
| Un revisor con nombre, si querés | Opcional. Una persona real que firme mejora un poco la confianza y casi nada las citas. La firma "Equipo Atende" es válida | `/blog/editorial`, `/nosotros` |
| Visto bueno para `whatsapp-qr-o-api-oficial` | Ese artículo queda en borrador hasta que apruebes cómo habla del QR y de las restricciones | `content/blog/` |
| Cómo se cobra una conexión a pedido | Precio fijo o caso por caso sigue sin definir, y en directorios y demos te lo van a preguntar | Tu decisión comercial |

## Antes de escribirle a nadie

- Usá siempre la misma línea, para que la marca no se confunda: *Atende (atende.com.ar): automatización de WhatsApp para negocios argentinos, desde Córdoba. Conectado a tu agenda o a tu sistema, reserva, cotiza y registra pedidos. Esa conexión se arma a pedido.*
- Las mismas reglas del sitio valen afuera. Nada de "24/7" como promesa, de estatus ante Meta (partner, Tech Provider, BSP, verificado, aprobado) ni de clientes o números inventados. El cliente elige cómo conectar su número, con la API oficial de Meta o con un QR, y hay que decirlo.
- Declará todo lo pago. Otterly marcó como compensados 44,8% de los publicadores de listas que pudo verificar.
- Reseñas solo de clientes reales, sin incentivos ocultos. Google sumó en julio de 2026 una [pauta contra reseñas falsas e incentivos no declarados](https://developers.google.com/search/updates).
- No compres notas en sitios grandes para aprovechar su posicionamiento: eso cae en la política de reputación del sitio de Google.

## Acciones, en orden

"Verificar a mano" significa que la página bloqueó la revisión automática y no se pudo confirmar.

### 1. Dejar la medición lista

Antes de cualquier otra cosa, para tener un punto de partida. Ver [Medición](#medición).

### 2. Después del deploy

1. Revisá que estén en vivo `/sitemap.xml`, `/llms.txt`, las rutas nuevas y las tres redirecciones.
2. Enviá el sitemap en Search Console.
3. Verificá el sitio en [Bing Webmaster Tools](https://www.bing.com/webmasters).
4. Corré IndexNow a mano: `npm run indexnow -- --dry-run --since 2026-11-06`, y después sin `--dry-run`. Ayuda a Bing y Copilot. Google no participa y no hay razón para esperar mejoras en ChatGPT.

### 3. Comparativas en español que ya aparecen

Es lo primero porque son las páginas de las que hoy salen las respuestas. Mandá datos correctos y ofrecé una demo. Si te incluyen o no es decisión de ellos.

| Dónde | Qué hacer | Nota |
| --- | --- | --- |
| [ComparaSoftware](https://www.comparasoftware.com/registro) | Registrar el producto. Tiene una [lista 2026](https://www.comparasoftware.com/chatbot/articulos/bots-whatsapp-2026) | Gratis según su sitio |
| [Directorio de Develop Argentina](https://developargentina.com/directorio/empresas-software-argentina) | Pedir el alta | Revisión editorial y USD 15 por mes si aprueban. Apareció en 7 de 13 búsquedas |
| [Duotach](https://duotach.com/blog/mejores-chatbots-whatsapp-argentina) | Enviar datos correctos | Dicen revisar herramientas en sitios oficiales. También 7 de 13 búsquedas. Venden Vozia, y lo declaran |
| [Yo Facturo](https://yo-facturo.com/blog/bot-whatsapp-argentina-ia/), [Clientify](https://clientify.com/blog/crm/mejores-chatbots-para-whatsapp) | Enviar datos correctos | Son rivales o proveedores, así que la inclusión es incierta |

Las listas de competidores como YCloud, Cliengo o respond.io no te van a sumar. Sirven como mapa de qué consultas se responden. La de [YCloud](https://www.ycloud.com/es/blog/top-whatsapp-business-api-solution-providers-argentina) ni siquiera aplica: es de proveedores de la API.

### 4. Plataformas de reseñas

[G2 acordó en enero de 2026 comprar Capterra, Software Advice y GetApp](https://company.g2.com/news/g2-acquires-capterra-software-advice-getapp), así que un mismo esfuerzo puede cubrir varias. Pesan más en AI Overviews y Perplexity que en ChatGPT, y no hay datos para español.

- [Capterra para proveedores](https://www.capterra.com/vendors/sign-up) y su [categoría en Argentina](https://www.capterra.com.ar/directory/32448/chatbot/pricing/free/software). Verificar a mano.
- [G2, alta de producto](https://www.g2.com/products/new). Verificar a mano.

Hacelo cuando tengas clientes reales que opinen. Un perfil vacío aporta poco.

### 5. YouTube en español

YouTube es el dominio más citado en AI Overviews, con 5,6% de las URL ([Ahrefs](https://ahrefs.com/blog/ai-overview-citations-top-10)). Empezá por la demo de motos, que es real: consulta stock y precios, calcula financiación y registra al interesado en Google Sheets. Decí que es una demo.

### 6. Prensa argentina, con una historia real

Sin clientes ni métricas, el ángulo honesto es el comentario de experto. Por ejemplo, qué significa para una PyME el cambio de precios de Meta de octubre de 2026. Confirmá el dato en la [página de Meta](https://developers.facebook.com/docs/whatsapp/pricing) antes de citarlo. Solo casos de clientes con su permiso.

- **Córdoba:** [InfoNegocios](https://infonegocios.info/), [Punto a Punto](https://www.puntoapunto.com.ar/), [Comercio y Justicia](https://comercioyjusticia.info/), [La Voz Negocios](https://www.lavoz.com.ar/negocios/) (verificar a mano).
- **Nacional:** [iProUP](https://www.iproup.com/startups), [Mercado](https://mercado.com.ar/), [ITSitio](https://www.itsitio.com/), [Ecosistema Startup](https://ecosistemastartup.com/), [Infotechnology](https://www.cronista.com/infotechnology/it-business/asi-funciona-la-novedad-de-whatsapp-que-usan-las-pymes-para-vender-mas-sin-sumar-personal/).

### 7. Cámaras y comunidad local

No hay datos de impacto: es una apuesta razonable, y además conseguís contactos.

- [Córdoba Cluster](https://cordobacluster.com/): su [catálogo de socios](https://catalogo.cordobacluster.com/nuestros-socios) es un listado real.
- [CESSI](https://cessi.org.ar/quiero-asociarme/): cámara nacional del software.
- [Cámara de Comercio de Córdoba](https://camcomcba.com.ar/asociate/): acá están tus clientes, no tus pares.
- [CACE](https://cace.org.ar/), [CAME](https://www.redcame.org.ar/), [UIC](https://www.uic.org.ar/), [Córdoba Acelera](https://cordobaacelera.com.ar/): no revisé condiciones de membresía ni de listado.
- [CorLab](https://corlab.cordoba.gob.ar/): directorio municipal de startups. La ventana 2026 cerró el 15 de mayo, según [esta nota](https://infonegocios.info/ciudad-informa/convocatoria-abierta-para-el-censo-2026-de-startups-cordobesas). Atento a la próxima.
- Pedile a clientes y socios que nombren a Atende en sus propios sitios.

### 8. Lo de bajo esfuerzo

Sirve para que exista una referencia de la marca, no para traer clientes.

- [AlternativeTo](https://alternativeto.net/software/manychat/): sumar Atende como alternativa. Verificar a mano.
- [BetaList](https://betalist.com/submissions/new), [SaaSHub](https://www.saashub.com/submit) (verificar a mano), [Crunchbase](https://www.crunchbase.com/).
- [Product Hunt](https://www.producthunt.com/), Reddit y LinkedIn: solo si vas a participar de verdad. Verificar a mano.
- [Registro oficial de MCP](https://registry.modelcontextprotocol.io/) y [Glama](https://glama.ai/mcp/servers): solo para el endpoint público `/mcp`. No suma acciones al asistente.

### Todavía no

- **[App Store de Tiendanube](https://www.tiendanube.com/tienda-aplicaciones-nube/categorias/comunicacion):** pide una app real, y hoy no existe ese conector.
- **[Hackceleration](https://hackceleration.com/es/labs):** prueba sobre un número con API real. Como el cliente puede elegir la API oficial, revisá si Atende entra en su método por esa ruta.
- **Wikipedia:** necesita cobertura independiente primero.
- **Perfil de Empresa de Google:** exige un local que los clientes puedan visitar, o atender en su domicilio. [Revisá si aplica](https://support.google.com/business/answer/3038177) antes de crearlo.

## Medición

Hay que medir antes de que empiece el trabajo de afuera. Si no, después no hay con qué comparar. El repositorio no tiene analítica conectada: emite eventos de conversión, pero nada los recibe. Conectar una es lo primero.

### Bing Webmaster Tools: AI Performance

Es la única vista de primera mano de cómo una IA usa tus páginas. Muestra citas por URL y frases de búsqueda, con datos muestreados. [Anuncio de Bing](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview). Mirala una vez por mes.

### Search Console

- **[Informe de IA generativa](https://support.google.com/webmasters/answer/16984139):** muestra solo impresiones y aparece recién cuando hay suficientes. Si todavía no está, no es un error.
- **[Control de IA generativa](https://support.google.com/webmasters/answer/16908024):** el sitio tiene que estar "incluido". Viene incluido por defecto y existe en todo el mundo desde el 31 de agosto de 2026. Confirmalo una vez en Configuración.
- Exportá consultas por página cada mes, para ver si las páginas nuevas toman las consultas que buscaban.

### Un set fijo de preguntas en español de Argentina

Las respuestas cambian mucho de un día a otro. La coincidencia diaria de fuentes citadas va de [0,34 a 0,42](https://arxiv.org/abs/2604.07585), y una sola corrida no dice nada. **Corré cada pregunta 7 u 8 veces**, en sesión nueva y sin personalización, en ChatGPT, Gemini, Perplexity y Copilot. Repetí una vez por mes, siempre con las mismas preguntas.

1. ¿Cuál es el mejor chatbot de WhatsApp para pymes en Argentina?
2. ¿Qué bot de WhatsApp me conviene para tomar turnos en un consultorio?
3. ¿Qué sistema de reservas por WhatsApp sirve para un restaurante en Argentina?
4. Necesito un bot que consulte stock y tome pedidos por WhatsApp. ¿Qué opciones hay?
5. ¿Qué bot de WhatsApp conviene para una inmobiliaria o una concesionaria?
6. ¿Cuál es una alternativa argentina a ManyChat?
7. Software para atender WhatsApp en equipo con IA en Argentina
8. ¿Qué es Atende?

Por cada corrida anotá si nombra a Atende, si cita `atende.com.ar`, qué otras marcas y fuentes aparecen y si lo que dice es cierto. La última importa: una respuesta equivocada sobre cómo se conecta el número o sobre las integraciones se corrige en las páginas de terceros.

### Visitas que llegan desde una IA

Con la analítica conectada, filtrá:

- `utm_source=chatgpt.com`, que ChatGPT suele agregar.
- Referentes `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com` y `claude.ai`.

Para ver qué robots entran, el [conjunto de reglas AI Bots de Vercel](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets) viene apagado. Ponelo en **Log**, nunca en **Deny**: queremos que entren.

Contá las consultas de demo que llegan por cada vía. Un clic en contacto no es una venta.

## Sobre `llms.txt`

Lo publicamos en `/llms.txt`, y hay que decirlo claro: **es un seguro barato, sin ningún consumidor confirmado.** Ningún motor importante confirmó que lo use, y Google dice que su buscador no lo usa. Un estudio de unos 300.000 dominios no encontró relación con las citas ([SE Ranking](https://seranking.com/blog/llms-txt/)). Se genera solo desde los catálogos, así que no tiene costo de mantenimiento. No le dediques tiempo ni presupuesto, y no esperes resultados.

## Lo que no hay que hacer

- Reglas por robot en `robots.txt`, o bloquear robots de entrenamiento. A una marca que recién empieza le conviene que la recuerden.
- Pagar un "puntaje de visibilidad en IA". Google dice que [ninguna herramienta externa accede a sus sistemas](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
- Publicar una lista propia de "los mejores bots" con Atende primero.
- Inventar autores, reseñas, menciones o números.
- Ofrecer conectores genéricos o fechas. Las conexiones se arman a pedido para cada negocio.

# Search Console: diagnóstico y prioridades del 28 de octubre de 2026

La prioridad es mejorar la explicación del producto y las páginas que ya muestran señales comerciales, y publicar dos guías con tareas distintas: preparar cotizaciones y organizar la atención fuera de horario. La muestra es pequeña: **10 clics y 341 impresiones**. Permite elegir hipótesis de trabajo, pero todavía no permite atribuir ventas, demostrar una tendencia ni pronosticar crecimiento.

## Fuentes y método

Se leyeron completas las siete exportaciones de `atende.com.ar-Performance-on-Search-2026-10-28`, ubicadas en `/home/leonel/Downloads/`. Los CSV originales se conservaron sin cambios. La fecha del nombre del directorio es la fecha de exportación; los datos diarios abarcan **2026-09-09 a 2026-10-26**, 48 días. No se inventaron registros para completar los tres meses que indica el filtro.

| Archivo | Filas de datos | Qué contiene | Resultado y uso |
| --- | ---: | --- | --- |
| `Filters.csv` | 2 | Tipo de búsqueda y período elegido | `Web (text-based)` y `Last 3 months`. No contiene filtros de país, dispositivo, consulta o URL. |
| `Chart.csv` | 48 | Una fila por fecha | 10 clics, 341 impresiones, CTR calculado de 2,93%. Referencia para el total de la propiedad. |
| `Queries.csv` | 22 | Consultas visibles | 2 clics y 127 impresiones. Identifica lenguaje e intenciones, pero no representa todas las búsquedas. |
| `Pages.csv` | 30 | URL mostradas | 10 clics y 433 impresiones a nivel URL. Incluye `www.atende.com.ar` y `app.atende.com.ar`. |
| `Countries.csv` | 22 | Países | 10 clics y 341 impresiones; Argentina concentra 9 clics y 252 impresiones. |
| `Devices.csv` | 2 | Mobile y Desktop | 5 clics en cada dispositivo; 200 impresiones móviles y 141 de escritorio. |
| `Search appearance.csv` | 0 | Encabezados sin registros | No aporta un desglose de apariencias. No demuestra que falte schema ni que exista un problema de indexación. |

El CTR agregado se calcula como `suma(clics) / suma(impresiones)`, nunca promediando porcentajes de filas. La posición aproximada de la propiedad es **10,55**, reconstruida ponderando las posiciones diarias por sus impresiones. Es aproximada porque las posiciones exportadas ya están redondeadas. No sirve para afirmar que cada consulta está en esa posición.

La tabla de páginas agrupa por URL; el gráfico agrupa por propiedad. Por eso sus impresiones no son sumandos intercambiables: **433 no reemplaza a 341**. Dos páginas del sitio pueden aparecer en una misma búsqueda. Google documenta esa diferencia en la [lectura del gráfico y la tabla de rendimiento](https://support.google.com/webmasters/answer/7576553?hl=es).

Las consultas visibles cubren **20% de los clics** y **37,2% de las impresiones** del gráfico. Los 8 clics y 214 impresiones restantes no tienen una consulta identificable en este archivo. La omisión por privacidad y los límites de los informes explican por qué las tablas pueden ser incompletas; estos CSV no permiten asignar una causa individual a cada registro omitido. Véanse los [límites y filtros de Search Console](https://developers.google.com/search/blog/2022/10/performance-data-deep-dive).

**Las dimensiones son independientes.** Una consulta no puede vincularse a una URL, país, fecha o dispositivo por su posición en el archivo ni por tener métricas parecidas. Las asociaciones editoriales de este documento son propuestas basadas en la intención y el contenido, no atribuciones observadas. Para verificarlas hace falta filtrar una página en Search Console y exportar sus consultas, o consultar dimensiones conjuntas mediante la API.

## Lectura de fechas, países y dispositivos

| Período observado | Días | Clics | Impresiones | CTR calculado |
| --- | ---: | ---: | ---: | ---: |
| 9 sep. a 2 oct. | 24 | 6 | 166 | 3,61% |
| 3 a 26 oct. | 24 | 4 | 175 | 2,29% |
| 29 sep. a 26 oct., referencia de 28 días | 28 | 4 | 202 | 1,98% |

Los períodos de 24 días muestran 9 impresiones más y 2 clics menos en la segunda mitad. Con estos recuentos y sin controlar el cambio de consultas no se concluye una mejora ni una caída sostenida. La referencia de 28 días puede reutilizarse después, manteniendo filtros y duración comparables.

| País | Clics | Impresiones | Posición exportada |
| --- | ---: | ---: | ---: |
| Argentina | 9 | 252 | 9,10 |
| Colombia | 1 | 10 | 12,30 |
| España | 0 | 17 | 32,82 |
| México | 0 | 12 | 11,00 |
| Estados Unidos | 0 | 9 | 6,11 |
| Perú | 0 | 8 | 5,00 |
| Paraguay | 0 | 7 | 7,71 |
| Bolivia | 0 | 6 | 6,17 |
| Venezuela | 0 | 4 | 5,00 |
| Panamá | 0 | 2 | 2,00 |
| Chile | 0 | 2 | 4,00 |
| Australia | 0 | 2 | 37,00 |
| Francia | 0 | 1 | 2,00 |
| India | 0 | 1 | 2,00 |
| Turquía | 0 | 1 | 5,00 |
| Lituania | 0 | 1 | 6,00 |
| Nicaragua | 0 | 1 | 6,00 |
| Portugal | 0 | 1 | 7,00 |
| Georgia | 0 | 1 | 8,00 |
| Letonia | 0 | 1 | 25,00 |
| Irlanda | 0 | 1 | 66,00 |
| Reino Unido | 0 | 1 | 73,00 |

Argentina representa **73,9% de las impresiones y 90% de los clics**. Esto acompaña la orientación argentina del producto; no justifica abrir páginas por país ni traducir todo el sitio. Las consultas en otros idiomas o variantes ambiguas tampoco prueban una demanda regional diferente.

| Dispositivo | Clics | Impresiones | CTR exportado | Posición exportada |
| --- | ---: | ---: | ---: | ---: |
| Mobile | 5 | 200 | 2,50% | 5,23 |
| Desktop | 5 | 141 | 3,55% | 18,11 |

El móvil aporta 58,7% de las impresiones. Hay que verificar lectura, tablas, navegación y contacto en pantallas pequeñas. La diferencia de CTR no demuestra un defecto móvil: cada segmento puede tener consultas, posiciones y países distintos, y solo hay cinco clics en cada uno.

## Todas las consultas y su decisión editorial

Se preservan las grafías exportadas en esta tabla. No se propone repetir errores ortográficos dentro de las páginas.

| Consulta visible | Clics | Impresiones | Posición | Decisión |
| --- | ---: | ---: | ---: | --- |
| atende | 2 | 56 | 2,68 | Explicar la marca y el producto desde el inicio de la home. |
| atendé | 0 | 21 | 8,71 | Misma página de marca; no crear una variante por acento. |
| atiende | 0 | 8 | 18,12 | Intención ambigua; observar sin crear contenido. |
| que es atende | 0 | 6 | 8,17 | Definición breve y visible, además de la FAQ existente. |
| alternativas a zenvia | 0 | 6 | 12,83 | Ampliar la comparativa existente con criterios verificables. |
| whatsapp para distribuidores | 0 | 5 | 43,20 | Reenfocar la guía de distribuidoras en recepción de pedidos. |
| atención comercial 24/7 whatsapp | 0 | 4 | 65,25 | Nueva guía de operación fuera de horario y enlaces desde servicios. |
| whatsapp automation argentina | 0 | 3 | 67,67 | Reforzar contexto argentino en la guía general, escrita en español. |
| toma de pedidos por whatsapp para distribuidores | 0 | 3 | 84,67 | Resolver dentro de la guía de distribuidoras; no duplicar una URL. |
| alternativa zenvia | 0 | 2 | 9,50 | Misma comparativa de Zenvia. |
| cotizar por whatsapp automáticamente | 0 | 2 | 59,00 | Nueva guía: datos, cálculo, validación y envío de cotizaciones. |
| atende que es | 0 | 1 | 1,00 | Misma definición en home. |
| atende atende | 0 | 1 | 4,00 | Misma página de marca. |
| atendê | 0 | 1 | 10,00 | Variante ambigua de marca; no crear versión portuguesa. |
| automatizar atención huéspedes | 0 | 1 | 16,00 | Ajustar la guía de hoteles hacia atención administrativa a huéspedes. |
| alternativas a manychat | 0 | 1 | 23,00 | Revisar la comparativa existente; no abrir otra URL. |
| automatizacion compras mayoristas | 0 | 1 | 25,00 | Conservar perspectiva de la distribuidora y explicar recepción/confirmación. |
| responde io | 0 | 1 | 25,00 | Revisar la comparativa existente con el nombre correcto respond.io. |
| app allende | 0 | 1 | 54,00 | Probablemente otra intención; no orientar contenido a ella. |
| atento argentina | 0 | 1 | 70,00 | Posible búsqueda de otra marca; no crear landing. |
| atendida | 0 | 1 | 71,00 | Ambigua; no orientar contenido a ella. |
| whatsapp automatico para empresas | 0 | 1 | 84,00 | Mejorar la guía general y su enlace al servicio correspondiente. |

La clasificación editorial agrupa seis consultas similares a marca en 86 impresiones y 2 clics; cuatro ambiguas en 11 impresiones; y doce relacionadas con la oferta en 30 impresiones. No es una clasificación verificada de la intención de cada persona ni una distribución del tráfico total. En especial, no corresponde afirmar que todo el tráfico sea de marca porque los dos clics con consulta visible sean de `atende`.

## Páginas observadas y alcance de los cambios

En la siguiente tabla se abrevia `https://www.atende.com.ar` como `/`. Las impresiones se mantienen a nivel URL.

| Página | Clics | Impresiones | Posición | Acción |
| --- | ---: | ---: | ---: | --- |
| `/` | 5 | 134 | 5,28 | Definición de marca, texto de atención fuera de horario y enlaces útiles. |
| `https://app.atende.com.ar/` | 2 | 31 | 21,10 | Observar por separado el acceso a la aplicación. |
| `/precios` | 1 | 11 | 3,91 | Mantener una ruta clara a condiciones vigentes y propuesta. |
| `/blog/como-automatizar-whatsapp-centros-de-estetica` | 1 | 8 | 9,50 | Conservar; un clic no identifica un sector ganador. |
| `/blog/como-automatizar-whatsapp-odontologicas` | 1 | 5 | 10,20 | Conservar; misma cautela de muestra. |
| `/servicios/ventas-whatsapp` | 0 | 36 | 14,89 | Prioridad comercial: consultas, pedidos y cotizaciones con alcance explícito. |
| `/terminos-y-condiciones` | 0 | 34 | 5,56 | Conservar finalidad legal; no optimizar como landing de ventas. |
| `/blog/como-automatizar-whatsapp-distribuidoras` | 0 | 20 | 27,55 | Prioridad editorial: recepción y revisión de pedidos mayoristas. |
| `/blog/como-automatizar-whatsapp-estudios-juridicos` | 0 | 19 | 3,53 | Revisar consultas conjuntas antes de diagnosticar CTR. |
| `/casos-de-uso` | 0 | 14 | 4,86 | Mantener ejemplos identificados como ilustrativos. |
| `/blog/como-automatizar-whatsapp-indumentaria` | 0 | 12 | 4,42 | Conservar y observar consultas. |
| `/blog/como-automatizar-whatsapp-constructoras` | 0 | 12 | 5,75 | Conservar y observar consultas. |
| `/blog/como-automatizar-whatsapp-seguros` | 0 | 11 | 6,18 | Conservar y observar consultas. |
| `/blog/como-automatizar-whatsapp-veterinarias` | 0 | 10 | 4,70 | Conservar y observar consultas. |
| `/blog/mejor-alternativa-a-zenvia` | 0 | 10 | 11,10 | Prioridad editorial: comparación concreta y fuentes actuales. |
| `/blog/como-automatizar-whatsapp-clinicas` | 0 | 9 | 5,56 | Conservar y observar consultas. |
| `/blog/como-automatizar-whatsapp-logistica` | 0 | 9 | 18,11 | Enlazar la guía de cotizaciones cuando aporte al flujo. |
| `/blog/mejor-alternativa-a-respond-io` | 0 | 7 | 13,57 | Actualización acotada, basada en fuentes oficiales. |
| `/blog/cuanto-cuesta-automatizar-whatsapp` | 0 | 6 | 8,00 | Mantener diferenciación respecto de precios de Atende. |
| `/politica-de-privacidad` | 0 | 5 | 3,00 | Conservar finalidad legal. |
| `/blog/como-automatizar-whatsapp-fabricantes` | 0 | 5 | 43,00 | Enlazar cotizaciones cuando aporte al flujo. |
| `/blog/como-automatizar-whatsapp-mueblerias` | 0 | 4 | 5,00 | Conservar y observar. |
| `/blog/como-automatizar-whatsapp-academias-y-cursos` | 0 | 4 | 6,75 | Conservar y observar. |
| `/blog/como-automatizar-whatsapp-gimnasios` | 0 | 4 | 8,00 | Conservar y observar. |
| `/blog/como-automatizar-whatsapp-ferreterias` | 0 | 3 | 2,67 | Conservar y observar. |
| `/blog/mejor-alternativa-a-manychat` | 0 | 3 | 11,67 | Actualización acotada, basada en fuentes oficiales. |
| `/blog/whatsapp-ia-atencion-humana` | 0 | 2 | 9,00 | Mantener su intención de derivación; enlazar fuera de horario. |
| `/blog/como-automatizar-whatsapp-tiendas-online` | 0 | 2 | 9,50 | Conservar y observar. |
| `/blog/como-automatizar-whatsapp-hoteles` | 0 | 2 | 12,50 | Ajuste de intención y contenido administrativo para huéspedes. |
| `/blog/como-automatizar-whatsapp-empresa` | 0 | 1 | 84,00 | Mejorar la guía principal y conectar las guías específicas. |

Las 23 URL de artículos suman 168 impresiones y 2 clics a nivel página. El catálogo previo contiene 40 artículos: la ausencia de 17 artículos de esta exportación no prueba que estén excluidos del índice. Tampoco la visibilidad de documentos legales demuestra que estén quitando clics a las páginas comerciales. No se propone borrar, redirigir o desindexar URLs por estos datos.

## Prioridades de contenido y páginas comerciales

### 1. Hacer reconocible Atende y aclarar la oferta comercial

La home ya tiene una FAQ de definición. Conviene llevar una versión breve al texto principal: software de atención por WhatsApp con IA, información configurada, bandeja compartida e intervención humana para empresas argentinas. El título debe ser descriptivo, con la marca una sola vez; el generador actual añade `— atende` automáticamente.

La página `/servicios/ventas-whatsapp` debe explicar qué recibe ventas: producto o servicio, cantidad, variante, zona y contexto. Pedir esos datos no equivale a producir una cotización definitiva ni registrar un pedido. Vincular desde esa explicación a distribuidoras y a la nueva guía de cotizaciones; conservar la demo como siguiente paso comercial. Una formulación adecuada del título es “Ventas y cotizaciones por WhatsApp con IA”, siempre que la descripción y el cuerpo aclaren que se trata de consultas y solicitudes con revisión.

Cambiar la afirmación incondicional “Responde 24/7” y “sin hacer esperar” por una descripción de consultas configuradas fuera de horario, dependiente del servicio y la conexión. Mantener aparte el horario del equipo humano. Precios debe seguir conduciendo al checkout vigente o a una propuesta; estos datos no justifican inventar importes, descuentos, pruebas gratis o disponibilidad de planes.

Google recomienda títulos descriptivos y concisos y puede generar un título diferente en resultados. Estos cambios orientan la comprensión; no garantizan un snippet determinado ni un aumento del CTR. [Guía oficial sobre títulos](https://developers.google.com/search/docs/appearance/title-link).

### 2. Profundizar las dos guías con mejor señal de intención

- **Distribuidoras:** mantener `/blog/como-automatizar-whatsapp-distribuidoras`. Usar “WhatsApp para distribuidores: toma de pedidos mayoristas” como enfoque. Añadir una plantilla de solicitud con código, presentación, cantidad y localidad; distinguir cliente nuevo/habitual; mostrar la revisión de unidades, precios por cuenta, mínimo, stock y reparto. Un pedido recibido por chat sigue pendiente hasta la confirmación operativa. Enlazar ventas y cotizaciones, con ejemplos de renglones incompletos y cambios de presentación.
- **Zenvia:** mantener `/blog/mejor-alternativa-a-zenvia` para conservar continuidad de URL; el título visible puede pasar de “Mejor alternativa” a “Alternativas a Zenvia para WhatsApp: cómo comparar”. Explicar cuándo alcanza una operación concentrada en WhatsApp y cuándo deben evaluarse más canales y sistemas. Comparar conexión, alcance contratado, supervisión y migración con datos verificables. Zenvia anuncia Customer Cloud multicanal y una oferta con API oficial; Atende tiene conexión QR verificada en el repositorio. No declarar equivalencia técnica, importación de historial ni ahorro universal. Fuentes consultadas el 2026-10-28: [Customer Cloud](https://zenvia.com/es-mx/customer-cloud/) y [WhatsApp de Zenvia](https://zenvia.com/es-mx/whatsapp/).

### 3. Publicar dos guías con utilidad propia

| Nueva URL | Trabajo del lector | Contenido necesario | Límite respecto de páginas existentes |
| --- | --- | --- | --- |
| `/blog/cotizaciones-por-whatsapp-automaticas` | Preparar una solicitud que ventas pueda presupuestar y saber qué requiere un cálculo automático | Datos mínimos; diferencias entre información de precios, cálculo y propuesta final; reglas de vigencia y excepciones; plantilla; conversación ilustrativa; revisión humana; requisitos de integración | La guía general cubre la implementación; distribuidoras cubre reposición mayorista; el servicio presenta la oferta de Atende. |
| `/blog/atencion-comercial-whatsapp-24-7` | Organizar consultas que llegan cuando el equipo no está | Horario humano; respuestas configuradas; derivaciones pendientes; revisión al abrir; cambios de horario; fallas de conexión; criterios de atención y métricas | Mensajes automáticos conserva las plantillas; atención humana conserva el proceso de pase. La nueva guía resuelve la operación completa fuera de horario. |

Ambas deben responder la duda principal al comienzo y aportar decisiones y ejemplos que puedan usarse sin contratar. No se necesitan nuevas páginas por cada sinónimo. “24/7” describe la intención consultada y requiere explicar sus condiciones; no debe presentarse como un SLA garantizado.

### 4. Actualizaciones complementarias y enlaces

La guía de empresa debe funcionar como punto de partida: qué preparar, qué elegir, qué confirmar y cómo probar una primera automatización. Enlazar desde ella a las nuevas guías. Hoteles puede precisar la atención a huéspedes, separando información del alojamiento, solicitudes y reservas confirmadas. Manychat y respond.io pueden mejorar sus criterios de elección y fuentes sin crear otras comparativas ni afirmar demanda alta por una sola impresión.

Reemplazar parte de los destacados de home por guías relevantes para estas tareas. Añadir enlaces dentro de la explicación correspondiente, con textos descriptivos. No poner todas las palabras clave en todos los artículos. Las modificaciones sustanciales deben actualizar `updatedAt`; no alterar `publishedAt` de artículos existentes ni rejuvenecer en bloque contenido que no se revisó.

El catálogo ya cubre muchos rubros con una estructura similar. Esta iteración debe aportar mayor especificidad antes que sumar otra tanda de variantes por sector. Google recomienda contenido que permita completar una tarea y desaconseja publicar grandes volúmenes o cambiar fechas solo para parecer reciente. [Contenido útil y orientado a las personas](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## Veracidad del producto y búsqueda con IA

El alcance base utilizado en estos textos proviene de [SEO, producto y ventas](seo-and-sales.md): respuestas configuradas, conexión por QR, historial compartido y participación humana. Consultar stock vivo, calcular o registrar operaciones en otro sistema, confirmar reservas y enviar seguimientos proactivos requiere una integración confirmada. Una nueva promesa debe contrastarse con el código y la configuración del producto, no deducirse del término de búsqueda.

Conservar contenido completo en HTML, canonical, enlaces internos, fechas honestas y datos estructurados coherentes con lo visible. Google indica que no hace falta un archivo especial para aparecer en sus funciones de IA; tampoco garantiza la indexación o inclusión por cumplir estos requisitos. [Funciones de IA y sitios web](https://developers.google.com/search/docs/appearance/ai-features).

Las FAQ visibles siguen siendo útiles. El archivo de apariencias vacío no justifica agregar marcado para intentar conseguir FAQ enriquecidas: Google dejó de mostrar ese resultado el **7 de mayo de 2026**, según sus [actualizaciones de documentación](https://developers.google.com/search/updates#may-2026). El schema existente puede mantenerse como descripción del contenido; no debe venderse como una ventaja visual garantizada.

## Medición después de publicar

1. Registrar la fecha y versión efectivamente desplegadas. Verificar en producción las páginas modificadas, las dos nuevas URL, sus canonical, HTML, enlaces y sitemap. Las verificaciones locales no prueban un despliegue.
2. En la propiedad autorizada de Search Console, comprobar el sitemap e inspeccionar las URL prioritarias. Si la cuenta disponible no tiene acceso a `atende.com.ar`, dejar constancia del pendiente; no afirmar que se envió el sitemap ni crear otra propiedad ajena.
3. A los 28 días de datos completos posteriores a la publicación, exportar los mismos siete informes con filtros equivalentes. Repetir a los 56 días para tener más observaciones. Son puntos de revisión, no plazos garantizados de resultados. Comparar períodos de igual duración y tener presente estacionalidad, campañas y cambios de mezcla.
4. Exportar consultas filtradas por home, ventas, distribuidoras, Zenvia y cada nueva guía. Con ese cruce evaluar si aparece la intención esperada, qué URL la recibe y si hay solapamientos. Separar el host `www` de `app` al evaluar adquisición comercial. Mantener visibles los recuentos pequeños junto al CTR.
5. Distinguir cobertura de consultas, indexación, impresiones relevantes y clics. No usar la posición global como único indicador. Si aumenta la cantidad de consultas descubiertas, la posición promedio puede cambiar aunque una página mejore para su consulta objetivo.
6. Revisar el recorrido de negocio con los eventos existentes: `atende_cta_click` y `atende_demo_prepared`. Hoy son hooks del navegador; el repositorio no demuestra que exista un recolector de analítica configurado. Preparar un mensaje o abrir WhatsApp no es enviar una consulta. La calidad del contacto, la reunión y la venta se registran en el proceso comercial, con definiciones separadas.

La evaluación inicial no fija una meta porcentual de crecimiento: diez clics no sostienen una previsión fiable. El primer criterio de avance es que las páginas publicadas estén accesibles, reflejen el alcance real y empiecen a recibir consultas relevantes comprobadas con dimensiones conjuntas. El resultado comercial se evalúa con consultas calificadas reales, no con impresiones ni clics aislados.

## Verificación local registrada el 2026-10-28

- `npm run verify` pasó: 14 pruebas, TypeScript, validación de 42 artículos en 30 sectores y 11 temas, compilación de producción de Next.js y auditoría HTTP de 65 páginas. La auditoría verificó metadatos, canonical, schema y contenido visible, sitemap, enlaces y anclas, llamadas a la acción y respuestas 404.
- En el servidor local con la compilación standalone de producción, la home, ventas y los ocho artículos principales de esta iteración no presentaron desbordamiento horizontal del documento a 320 px. A 1440 px se verificaron la home, ventas, las dos guías nuevas y Zenvia, también sin desbordamiento.
- En móvil, el menú abrió y la opción Guías navegó al destino y cerró el menú. En la guía de cotizaciones funcionaron el enlace del índice a su sección y la interacción de las FAQ mediante teclado.

Estas comprobaciones corresponden al entorno local. La verificación del despliegue público y cualquier envío a Search Console requieren evidencia independiente.

---
title: 'Cómo automatizar el WhatsApp de tu negocio de motos: stock, cuotas e interesado anotado'
seoTitle: 'Cómo automatizar WhatsApp en la venta de motos: stock y cuotas'
description: >-
  Cómo confirmar stock, calcular cuotas con patente y gastos y anotar al
  interesado desde WhatsApp en un negocio de motos: una demo real y sus límites.
summary: >-
  Para automatizar el WhatsApp de un negocio de motos, el asistente tiene que
  leer tu stock y tus condiciones de financiación. Nuestra demo de concesionaria
  de motos ya busca la unidad, calcula la cuota con patente y gastos y anota al
  interesado en Google Sheets para que lo tome un vendedor. En tu local esa
  conexión se arma a pedido; sin ella, el asistente junta modelo y nombre y tu
  equipo confirma.
publishedAt: '2026-09-10'
updatedAt: '2026-11-06'
category: automotor
sector: Venta de motos
tags:
  - WhatsApp
  - Venta de motos
  - Financiación
  - Google Sheets
related:
  - como-automatizar-whatsapp-concesionaria
  - como-automatizar-whatsapp-servicios-tecnicos
faq:
  - q: ¿Atende puede decirle a un cliente si hay stock de una moto?
    a: >-
      Sí, si está conectado a tu stock. La demo lo hace leyendo una planilla, y
      en tu negocio esa conexión se arma a pedido. Sin ella el asistente no sabe
      qué unidades tenés: junta el modelo y tu equipo confirma.
  - q: ¿La cuota que calcula el asistente es una oferta firme?
    a: >-
      No. Es una simulación con las tasas y los costos cargados. Orienta al
      cliente, pero la cotización final y la aprobación del crédito quedan a
      cargo de tu equipo y de quien financia.
  - q: ¿La demo de motos es un caso de cliente?
    a: >-
      No. Tiene unidades y precios de prueba, y no hay un local real detrás. La
      mostramos para que veas qué hace una conexión de verdad y dónde están sus
      límites.
  - q: ¿Puede quedar anotado dos veces el mismo interesado?
    a: >-
      En la demo, sí: si una corrida se repite, agrega una segunda fila porque
      no revisa duplicados. Una conexión real tiene que evitarlo con una clave
      natural, como número y modelo.
  - q: ¿Qué pasa si me mandan la foto de un repuesto?
    a: >-
      Esa foto nunca llega a Atende, y el texto escrito abajo se pierde con
      ella. El asistente no la ve ni contesta. Pedile modelo, año y pieza por
      texto, y que alguien de repuestos mire las fotos en el teléfono del local.
---
Alguien escribe a la noche: “¿tenés la Wave en rojo y en cuántas cuotas sale?”. Para que esa charla termine bien hacen falta tres cosas hechas: confirmar que la moto está, calcular la cuota con los gastos adentro y dejar a esa persona anotada para que un vendedor la tome a la mañana.

Eso ya lo hace una demo de concesionaria de motos que armamos, conectada a una planilla de Google Sheets. Tiene unidades y precios de prueba y no hay un local real detrás, así que podemos contarte con detalle qué hace y dónde se queda corta.

## Las cuatro hojas de la demo

Si tu stock vive en un Excel que actualiza el encargado, esto te va a resultar conocido.

| Hoja | Columnas | Para qué la usa el asistente |
| --- | --- | --- |
| Stock | Nombre, Marca, Color, Stock, Precio | Buscar la unidad y confirmar precio y disponibilidad |
| Financiación | Método, Tipo, Interés, Pagos | Contar qué formas de pago hay |
| Costos | Nombre, Tipo, Cantidad | Sumar patente y gastos administrativos a la cuenta |
| Interesados | Nombre, Número, Moto, Estado, Tomado por, comentarios del asistente | Anotar a quien quiere avanzar |

La búsqueda entiende cómo habla la gente: si alguien dice “la Wave” y después “la roja”, el asistente sigue en la misma moto, y “rojo” o “roja” da lo mismo. Y las tasas se leen de la planilla en cada cálculo, así que si cambiás el interés a la mañana, la cuota siguiente ya sale con el valor nuevo.

## De “¿tenés la Wave?” a la fila anotada

Ejemplo ilustrativo, con la demo conectada a su planilla. Precios y tasas de prueba, no son valores de mercado.

> Cliente: Hola, ¿tenés la Wave en rojo?
>
> Asistente: Sí, la Wave 110 S roja está en stock, a $1.500.000. ¿La pensás de contado o en cuotas?
>
> Cliente: Cuotas. ¿Cómo sería?
>
> Asistente: Con crédito fijo son 12 cuotas de $177.083, con interés, patente y gastos adentro. Es una simulación: el vendedor te confirma las condiciones.
>
> Cliente: Dale, me interesa. Soy Marcos.
>
> Asistente: Te anoté, Marcos: Wave roja en 12 cuotas. Un vendedor te escribe por acá.

Lo que no se ve en el chat también cuenta. El asistente no pidió el teléfono: ya tiene el número desde el que le escriben, y si falta algo pide sólo eso. No anota a “Cliente interesado”: la herramienta rechaza nombres genéricos, así que sin nombre real no hay fila. Y dijo “te anoté” recién cuando la planilla aceptó el registro.

La fila queda con Estado en NO ATENDIDO, un guion en Tomado por y un comentario del asistente, por ejemplo “quiere la Wave roja en 12 cuotas”. El vendedor sabe qué moto, qué forma de pago y a quién escribirle sin releer la charla.

## Cómo sale el número de la cuota

Este es el cálculo del ejemplo, con los valores de prueba.

| Concepto | De dónde sale | Monto |
| --- | --- | --- |
| Precio de la moto | Hoja Stock | $1.500.000 |
| Interés del crédito fijo, 30% | Hoja Financiación | $450.000 |
| Patente, 5% | Hoja Costos | $75.000 |
| Gasto administrativo, monto fijo | Hoja Costos | $100.000 |
| **Total** | | **$2.125.000** |
| **12 cuotas de** | | **$177.083,33** |

El interés se aplica sobre el precio de la moto, patente y gastos se suman aparte, y el total se divide por la cantidad de pagos. Cada costo puede ser un porcentaje o un monto fijo. Si el método es UVA, la demo avisa que el resultado es una estimación inicial porque la cuota varía con el índice.

Todo esto es una simulación comercial. No reemplaza la cotización final ni la aprobación de un crédito, y el asistente tiene que decirlo, como en el ejemplo. Si tu financiera trabaja con anticipo, seguro o gastos de otorgamiento, esa lógica entra en tu conexión.

## Lo que la demo no hace

- **No aparta la moto.** Anotar a un interesado no baja el stock. Si queda una XR blanca y preguntan dos personas, las dos leen “hay una”. La seña y la reserva siguen en manos del vendedor.
- **Puede duplicar una fila.** Si una corrida se repite, por ejemplo después de una caída del servicio, la demo no revisa si esa persona ya estaba anotada y agrega otra fila igual.
- **No pide autenticación.** La protegen límites de red, y eso alcanza para probar. Una conexión con tus datos reales necesita autenticación.
- **No mueve estados.** Escribe siempre NO ATENDIDO. Pasar la fila a vendida, o poner quién la tomó, lo hace tu equipo en la planilla.
- **Sólo conoce la hoja de stock.** Usados, repuestos y turnos de taller quedan afuera.
- **Le cree a tu planilla.** Si nadie baja la unidad cuando se vende, el asistente va a ofrecer una moto que ya no está.

## Repuestos y “busco una 150”

Un local de motos recibe más que consultas de venta. “Busco una 150” puede ser alguien que todavía no eligió modelo, “¿tenés la cadena para la mía?” es mostrador de repuestos y “¿me hacés el service?” es taller. La primera pregunta del asistente tiene que separar eso. Para una compra sin modelo elegido, sirve averiguar uso y localidad: hacer repartos todo el día pide otra moto que ir al trabajo los fines de semana.

Para un repuesto hacen falta modelo y año, y la compatibilidad la confirma alguien que conoce la pieza. A la gente le sale natural mandar la foto de la pieza gastada o un audio con el ruido del motor, y ninguno de los dos llega a Atende. El texto escrito abajo de una foto se pierde con ella, así que quien mandó solo eso no recibe respuesta. Dejá escrito en la descripción de tu negocio que el asistente pida los datos por texto, y que alguien de repuestos mire el teléfono del local durante el día.

## La fila anotada no le avisa a nadie

Cuando el asistente anota a alguien no suena ninguna alarma. La fila queda en la planilla, y ventas la tiene que revisar con una rutina fija, por ejemplo al abrir el local. Si después el vendedor sigue la charla desde la bandeja, tiene toda la conversación de texto a la vista, pero contestar no frena al asistente: para eso está [marcar el chat como Necesita humano](/blog/whatsapp-ia-atencion-humana).

## Cómo llevarlo a tu local

Sin conexión ya podés arrancar. El asistente contesta mensajes de texto a cualquier hora, mientras el servicio y tu WhatsApp estén conectados, manda fotos y videos de las motos desde tu biblioteca y junta modelo y nombre para que tu equipo confirme precio, stock y cuotas.

Para que haga lo de la demo con tus datos, conectado a tu stock y a tus condiciones de financiación, esa conexión se arma a pedido para tu negocio. No te damos un armador de flujos: miramos dónde tenés los datos hoy y armamos la conexión ahí. Tené a mano tu lista de motos, tus formas de pago y los costos que sumás al precio. Contamos [cómo trabajamos cada conexión](/integraciones), y [registrar leads de WhatsApp en Google Sheets](/blog/registrar-leads-de-whatsapp-en-google-sheets) se mete de lleno en la parte de la planilla.

El número sigue siendo el del local. Se conecta por QR y no es la API oficial de Meta. Apenas lo vinculás, el asistente le responde a cualquiera que escriba, así que probalo desde otro número, que usa créditos: pedí una moto que no tengas y unas cuotas que no ofrezcas, a ver qué contesta.

Si también vendés autos, la [guía para concesionarias](/blog/como-automatizar-whatsapp-concesionaria) cubre usados, toma y plan de ahorro. Para ver el rubro completo andá a [concesionarias e inmobiliarias](/casos-de-uso/concesionarias-e-inmobiliarias), y para el resto de lo que se puede cerrar en un chat, a [ventas y pedidos por WhatsApp](/servicios/ventas-whatsapp).

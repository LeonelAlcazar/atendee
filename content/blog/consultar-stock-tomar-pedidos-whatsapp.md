---
title: 'Consultá stock y registrá pedidos por WhatsApp en tu distribuidora'
seoTitle: 'Stock y pedidos por WhatsApp para distribuidores'
description: 'Cómo consultar stock al tomar pedidos por WhatsApp: cajas y unidades, faltantes, sustituciones y qué verificar antes de registrar una compra mayorista.'
summary: 'Para tomar un pedido con stock vigente, identificá producto, presentación, cantidad y depósito, consultá disponibilidad y confirmá con el comercio cualquier cambio. Con una integración de stock y pedidos armada a pedido, Atende consulta y registra en tu sistema bajo supervisión. Una consulta de stock no reserva mercadería. Sin esa conexión, reúne la solicitud y tu equipo verifica y confirma.'
salesIntro:
  - 'Conectado a tu stock y pedidos, Atende consulta disponibilidad y registra la compra por WhatsApp.'
  - 'Armamos esa integración a pedido para que tus vendedores no vuelvan a cargar cada renglón.'
  - 'Tu equipo supervisa y resuelve los faltantes que necesitan una decisión comercial.'
publishedAt: '2026-11-16'
updatedAt: '2026-11-16'
category: comercio
tags: ['WhatsApp', 'stock', 'distribuidores', 'pedidos mayoristas']
related:
  - toma-de-pedidos-por-whatsapp-para-distribuidores
  - listas-precios-clientes-mayoristas-whatsapp
  - integrar-pedidos-whatsapp-sistema-gestion
faq:
  - q: '¿Consultar stock por WhatsApp reserva la mercadería?'
    a: 'No. Consultar disponibilidad y reservar son acciones distintas. Atende solo puede decir que quedó reservada si existe esa acción conectada y el sistema confirma el resultado. Registrar un pedido tampoco permite inferir una reserva.'
  - q: '¿Puede Atende cambiar un producto agotado por otro parecido?'
    a: 'Solo si la integración devuelve una alternativa permitida y el comercio acepta el producto, su presentación, cantidad y condiciones. Si la equivalencia requiere criterio comercial o técnico, interviene tu equipo.'
  - q: '¿Qué pasa si mi inventario no está actualizado?'
    a: 'El asistente no corrige la diferencia entre el depósito y tu sistema. Definí una revisión de inventario y dejá esos productos con confirmación humana hasta que la fuente sea confiable.'
  - q: '¿Se puede empezar sin conectar el stock?'
    a: 'Sí. Atende reúne productos, presentaciones y cantidades en la conversación. Tu equipo consulta la existencia, carga el pedido y confirma; no se presenta esa solicitud como una compra registrada.'
---
Un almacén pide seis cajas y el sistema muestra dieciocho disponibles. Antes de responder que alcanza, falta una pregunta: ¿dieciocho cajas o dieciocho unidades? En una distribuidora, esa diferencia puede cambiar toda la compra.

La consulta de stock por WhatsApp tiene que usar el mismo producto y la misma unidad que después recibe el sistema de pedidos. Este es uno de los pasos de la [toma de pedidos para distribuidores](/blog/toma-de-pedidos-por-whatsapp-para-distribuidores); acá nos concentramos en lo que pasa cuando la existencia no coincide con lo solicitado.

## Una cantidad sin presentación todavía no alcanza

Prepará el catálogo para distinguir código, variante, contenido del envase y unidad de venta. Un bidón de cinco litros no equivale a una caja con cuatro bidones. También necesitás saber si el inventario disponible corresponde al depósito que atiende al comercio.

| Dato | Ejemplo ilustrativo | Qué evita |
| --- | --- | --- |
| Código | LIM-5 | Confundir dos productos con nombres similares |
| Presentación | Bidón de 5 litros | Cambiar el tamaño sin consultar |
| Unidad de venta | Caja por 4 bidones | Interpretar cajas como unidades |
| Cantidad pedida | 3 cajas | Cargar una cantidad distinta |
| Depósito habilitado | Depósito que abastece esa sucursal | Ofrecer existencia que no puede usarse |

Si el cliente escribe “tres del grande”, el asistente necesita aclararlo antes de consultar. Si la integración devuelve unidades y el comercio compra cajas, la equivalencia debe estar definida en el catálogo. No alcanza con que el modelo haga una multiplicación razonable: tiene que saber que ese producto realmente se vende así.

## Cuatro respuestas posibles ante un faltante

Una regla comercial útil define qué ofrecer cuando no alcanza el stock. No todos los mayoristas aceptan el mismo tratamiento.

1. **Tomar menos cantidad.** El comercio acepta cuatro cajas en vez de seis. Se registra únicamente la cantidad acordada.
2. **Elegir otra presentación.** Cambiar caja o tamaño requiere volver a mostrar cantidad y precio, aunque la marca sea la misma.
3. **Quitar ese renglón.** El resto del pedido puede seguir si cumple las condiciones de compra.
4. **Consultar a ventas.** Una fecha de reposición desconocida o una sustitución técnica necesita una persona.

No dejes dos cajas pendientes de entrega por defecto. Eso crea un compromiso comercial distinto y exige que tu sistema maneje pendientes, que el cliente los acepte y que la conexión confirme su registro. “Cuando entre te aviso” tampoco es una acción que el asistente decida iniciar solo.

## Del faltante al pedido registrado

Ejemplo ilustrativo de una integración de stock y pedidos que se desarrolla a pedido para la distribuidora. El extracto empieza después de identificar la cuenta y mostrar sus precios y condiciones vigentes. La confirmación final supone un registro exitoso en su sistema.

> Comercio: Necesito seis cajas de LIM-5, las de cuatro bidones.
>
> Asistente: Hay cuatro cajas de LIM-5 por cuatro bidones de cinco litros. ¿Querés llevar esas cuatro o que ventas revise otra opción?
>
> Comercio: Llevamos las cuatro. El precio que me acabás de pasar está bien.
>
> Asistente: Listo, registré el pedido 4826: cuatro cajas de LIM-5 por cuatro bidones. La fecha de entrega queda pendiente de coordinación.

El cierre informa lo que confirmó el sistema: un pedido registrado. No dice que salió del depósito ni que tiene mercadería reservada. Esos estados solo se comunican si también están confirmados.

Sin integración, Atende junta los renglones y los cambios en la conversación; tu equipo consulta la existencia y carga y confirma el pedido. La bandeja compartida permite seguir el intercambio y resolver la excepción.

## El stock puede cambiar entre la consulta y la carga

Dos vendedores pueden ofrecer las mismas últimas cajas. Por eso, al definir la [conexión con tu sistema](/integraciones), acordá qué validación hace el registro final y qué respuesta devuelve si el stock cambió. La lectura de hace unos minutos no alcanza para prometer la misma cantidad después.

Durante la preparación de la integración, probá un caso simple con datos ficticios: consultá cinco cajas, cambiá la disponibilidad en el sistema usado para la prueba y tratá de registrar cinco. El resultado esperado es una respuesta clara sobre el faltante, sin una confirmación inventada. Una persona decide cómo seguir si el sistema no permite resolverlo.

También conviene separar existencia física, stock comprometido y disponibilidad para vender. Pedí al responsable del inventario que defina cuál devuelve la conexión. Esa decisión cambia lo que el asistente puede ofrecer.

## Qué llevar a la demo de stock

Traé un producto por unidad, uno por caja y uno que suele agotarse. Sumá una devolución o ajuste reciente y una regla de sustitución que use tu equipo. Con esos casos se puede evaluar si la fuente devuelve datos suficientes y dónde hace falta intervención humana.

Para completar el circuito, revisá cómo aplicar [listas por cliente](/blog/listas-precios-clientes-mayoristas-whatsapp) y qué exige [registrar el pedido en el sistema de gestión](/blog/integrar-pedidos-whatsapp-sistema-gestion). En la [demo](/demo) definimos qué consultas y acciones necesita tu distribuidora.

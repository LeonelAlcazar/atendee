---
title: 'Aplicá la lista de cada cliente al tomar pedidos mayoristas por WhatsApp'
seoTitle: 'Listas de precios por cliente en pedidos por WhatsApp'
description: 'Cómo usar listas de precios por cliente en WhatsApp: identificar la cuenta, consultar valores vigentes y registrar pedidos sin exponer condiciones ajenas.'
summary: 'Una lista mayorista por cliente debe salir de la cuenta comercial autorizada y del sistema que mantiene precios, presentaciones y condiciones vigentes. Con esa integración y la de pedidos, armadas a pedido, Atende consulta la lista correspondiente y registra la compra. Sin conexión, reúne la solicitud y el vendedor verifica los importes y confirma. El teléfono que escribe no prueba por sí solo a qué cuenta puede acceder.'
salesIntro:
  - 'Conectado a tus listas y pedidos, Atende consulta el precio del cliente y registra su compra por WhatsApp.'
  - 'Armamos la integración a pedido para sacar de la rutina la búsqueda de precios y la carga repetida.'
  - 'Vos definís las condiciones; tu equipo supervisa y decide las excepciones.'
publishedAt: '2026-11-16'
updatedAt: '2026-11-16'
category: comercio
tags: ['WhatsApp', 'listas de precios', 'mayoristas', 'ventas B2B']
related:
  - toma-de-pedidos-por-whatsapp-para-distribuidores
  - consultar-stock-tomar-pedidos-whatsapp
  - repetir-pedidos-mayoristas-whatsapp
faq:
  - q: '¿Atende puede usar un precio distinto para cada comercio?'
    a: 'Con una integración armada para consultar la cuenta autorizada y su lista vigente, sí. Esa capacidad se acuerda por negocio; no viene de cargar una lista genérica en las preguntas frecuentes.'
  - q: '¿Alcanza con reconocer el número de WhatsApp del cliente?'
    a: 'El número identifica a quien escribe, pero no demuestra por sí solo que esté autorizado para una cuenta o sucursal. Definí esa relación en tu sistema y enviá los contactos desconocidos a una validación humana.'
  - q: '¿Puede aprobar descuentos o ampliar una cuenta corriente?'
    a: 'No por iniciativa propia. Puede comunicar condiciones que devuelva la conexión habilitada; un descuento excepcional o un cambio de crédito lo decide una persona autorizada.'
  - q: '¿Qué sucede si cambia la lista mientras se arma el pedido?'
    a: 'La conexión debe verificar la vigencia antes de registrar. Si cambian las condiciones aceptadas, hay que informar el cambio y obtener la conformidad del comercio; no confirmar una compra con otro precio en silencio.'
---
El almacén de barrio compra por caja. La cadena pide por pallet y tiene otra condición. Ambos escriben al mismo WhatsApp, pero compartir el número de atención no significa compartir la lista de precios.

Para una distribuidora, aplicar el precio correcto exige saber quién compra, para qué cuenta y en qué presentación. Este artículo desarrolla esa decisión dentro de la [toma de pedidos por WhatsApp](/blog/toma-de-pedidos-por-whatsapp-para-distribuidores), con reglas que podés revisar con ventas y administración antes de automatizar.

## Primero la cuenta, después el importe

El nombre del perfil de WhatsApp y un CUIT escrito por el contacto no alcanzan para autorizar acceso a condiciones particulares. Una persona puede comprar para dos sucursales o escribir desde un teléfono que todavía no está asociado a la cuenta.

Definí una relación entre contacto autorizado, comercio y sucursal en tu fuente comercial. La integración que armemos debe consultar esa relación antes de devolver la lista aplicable. El asistente recibe el teléfono desde la conversación: no necesita pedirle al contacto que lo vuelva a escribir.

| Situación | Regla a acordar |
| --- | --- |
| Contacto asociado a una sola cuenta | Consultar la lista autorizada para esa cuenta |
| Comprador habilitado para varias sucursales | Preguntar a cuál corresponde esta compra |
| Número nuevo que conoce el nombre del comercio | Ventas valida la autorización antes de compartir condiciones particulares |
| Cliente nuevo | Informar condiciones generales y reunir los datos para el alta comercial |

Estas reglas deben aplicarse en la conexión, no depender solamente de una frase en las instrucciones. Si la herramienta entrega listas de cualquier cuenta sin control, el asistente ya recibió información que no debía consultar.

## Qué tiene que devolver un precio para poder usarlo

“Sale mil” deja demasiadas decisiones abiertas. Para cada renglón necesitás una referencia de producto, unidad de venta, importe y alcance de las condiciones. También importa si el precio incluye los conceptos que el comercio espera ver en el total.

Prepará con administración una ficha de salida: lista y vigencia, presentación, cantidad, precio aplicable, descuentos autorizados y conceptos adicionales que corresponda informar. Si el total lo calcula tu sistema, el asistente comunica ese resultado. No debería completar conceptos que la herramienta omitió.

Las reglas por cantidad requieren especial cuidado. Una bonificación desde diez cajas no equivale a una desde diez unidades. Si el comercio quita un renglón, verificá si sigue cumpliendo el mínimo o el tramo de precio antes de registrar. Para las equivalencias, seguí la [guía de stock y presentación](/blog/consultar-stock-tomar-pedidos-whatsapp).

## El pedido anterior no conserva el precio anterior

“Mandame igual que la semana pasada” sirve para identificar una selección de productos, cuando el historial está conectado. No autoriza a copiar importes vencidos ni condiciones excepcionales.

Al preparar una nueva compra, consultá nuevamente la lista aplicable. Si cambia un valor o una presentación, mostrale al comercio qué está aceptando. La misma revisión vale para un presupuesto que quedó abierto durante varios días.

Si el sistema no informa la vigencia o no devuelve una cotización completa, dejá la confirmación con ventas. Una fecha escrita en una nota del contacto no reemplaza la fuente comercial. El procedimiento para [repetir pedidos mayoristas](/blog/repetir-pedidos-mayoristas-whatsapp) explica cómo separar el historial de la compra nueva.

## Un precio excepcional sigue con una persona

Ejemplo ilustrativo, con integración de cuentas, precios y registro de pedidos desarrollada para la distribuidora. El sistema devuelve las condiciones de una cuenta validada y luego confirma la carga.

> Comercio: Sumame cuatro cajas de P12 para la sucursal Centro. ¿Me hacés el descuento de la compra anterior?
>
> Asistente: La lista vigente de Centro no incluye ese descuento. Puedo pasar la excepción a ventas o seguir con las condiciones que te mostré. ¿Cómo preferís?
>
> Comercio: Seguí con la lista vigente y las cuatro cajas.
>
> Asistente: Registré el pedido 6193 para Centro: cuatro cajas de P12 con las condiciones que aceptaste.

El asistente no aprueba el descuento ni cambia el crédito del cliente. Tu equipo supervisa las conversaciones y puede continuar una negociación. Para que la IA deje de responder en ese chat, marcá **Necesita humano**; contestar desde la bandeja por sí solo no la pausa.

## Tres pruebas antes de ofrecer precios automáticamente

Usá cuentas ficticias en una prueba acordada. Consultá el mismo producto desde dos cuentas con listas diferentes y verificá el resultado. Después, probá un contacto desconocido que mencione el nombre de una cuenta: no debería recibir sus condiciones privadas. Por último, modificá una lista entre la consulta y la confirmación para comprobar cómo se informa el cambio.

Sin esta conexión, Atende reúne la solicitud y tu vendedor verifica precios, carga y confirma. Para poner en marcha el circuito conectado, traé a la [demo](/demo) tus reglas de lista y autorización, con datos de ejemplo. El alcance se define por negocio en [integraciones](/integraciones).

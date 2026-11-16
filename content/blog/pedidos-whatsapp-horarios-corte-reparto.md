---
title: 'Registrá pedidos por WhatsApp con horarios de corte y reglas de reparto'
seoTitle: 'Pedidos por WhatsApp: horarios de corte y reparto'
description: 'Cómo tomar pedidos por WhatsApp con hora de corte, zona y día de reparto. Reglas para pedidos tardíos y diferencias entre solicitud y entrega confirmada.'
summary: >-
  El horario de corte indica hasta cuándo puede entrar un pedido a determinado
  circuito de preparación; no garantiza por sí solo una entrega. Para tomar
  pedidos por WhatsApp, definí zona, día, corte y responsable de las excepciones.
  Con una integración armada a pedido, Atende consulta las reglas disponibles y
  registra la compra con el resultado que devuelve tu sistema. Sin conexión,
  reúne la solicitud y tu equipo verifica el reparto y confirma.
salesIntro:
  - 'Atende registra pedidos por WhatsApp con las reglas de tu distribuidora, mediante una integración a pedido.'
  - 'Cada comercio sabe qué quedó cargado y qué falta confirmar del reparto.'
  - 'Tu equipo supervisa la operación y decide las excepciones al horario de corte.'
publishedAt: '2026-11-16'
updatedAt: '2026-11-16'
category: comercio
tags: ['WhatsApp', 'distribuidores', 'reparto', 'horario de corte']
related:
  - toma-de-pedidos-por-whatsapp-para-distribuidores
  - integrar-pedidos-whatsapp-sistema-gestion
  - evitar-pedidos-duplicados-whatsapp
faq:
  - q: '¿Un pedido recibido antes del corte tiene entrega garantizada?'
    a: 'No. También pueden intervenir el stock, la aprobación comercial, la preparación y el cupo de reparto. El asistente debe comunicar únicamente el estado que el sistema conectado o tu equipo haya confirmado.'
  - q: '¿Atende puede tomar un pedido fuera del horario de atención?'
    a: 'Puede responder a cualquier hora mientras el servicio y la conexión de WhatsApp estén activos, en un plan con IA y con respuestas disponibles. Eso no extiende la hora de corte ni significa que el equipo o el depósito estén trabajando.'
  - q: '¿Qué pasa si un comercio escribe después del corte?'
    a: 'Aplicá la regla acordada: ofrecer el siguiente circuito disponible, tomar una preferencia pendiente o pasar la excepción a una persona. No hay que prometer una salida anterior sin que alguien o una herramienta autorizada la confirme.'
  - q: '¿Se puede agregar mercadería a un pedido que ya está preparado?'
    a: 'Depende del estado del pedido y del procedimiento de la distribuidora. Para modificarlo automáticamente hace falta una acción conectada que lo permita. Si no existe, el equipo revisa la solicitud sin crear una compra nueva por defecto.'
---
Un comercio escribe a las 18:10 para el reparto de mañana. El corte fue a las 18, pero todavía hay gente en depósito. El problema no se resuelve con una respuesta sobre horarios: hay que decidir si el pedido entra, si pasa al siguiente recorrido o si alguien puede autorizar una excepción.

La [toma de pedidos por WhatsApp para distribuidores](/blog/toma-de-pedidos-por-whatsapp-para-distribuidores) necesita separar la recepción del mensaje, el registro comercial y la asignación al reparto. Cada momento puede tener un estado distinto y una persona responsable.

## Escribí una regla de corte que se pueda aplicar

“Tomamos pedidos hasta la tarde” deja demasiado margen. Para cada zona, especificá el día de reparto, el horario de corte y qué hecho debe ocurrir antes de esa hora: recibir el primer mensaje, tener todos los renglones o conseguir la aceptación comercial.

Este ejemplo de procedimiento es ficticio; adaptalo a la operación de tu distribuidora.

| Dato | Ejemplo de regla | Pregunta que resuelve |
| --- | --- | --- |
| Zona | Localidades y barrios enumerados | Si el domicilio pertenece al recorrido |
| Reparto habitual | Jueves | Qué día suele atenderse esa zona |
| Corte | Miércoles, 16:00, hora de Argentina | Hasta cuándo debe quedar validado el pedido |
| Estado necesario | Pedido validado comercialmente | Si alcanza con haber enviado un saludo |
| Después del corte | Solicitud para el próximo recorrido | Qué ofrecer sin inventar una excepción |
| Excepción | La autoriza la persona responsable de reparto | Quién puede cambiar la regla |

También definí qué pasa en feriados y cambios de recorrido. Si la regla está cargada como información del negocio, alguien debe mantenerla vigente. Si depende de cupos que cambian durante el día, hace falta consultar el sistema que los controla mediante una conexión específica.

## Diferenciá día habitual, fecha pedida y entrega confirmada

“Pasamos los jueves” describe una frecuencia. “Lo necesito este jueves” expresa la preferencia del comercio. “Entrega confirmada para el jueves” solo corresponde cuando el circuito de la distribuidora aceptó esa fecha para ese pedido.

El registro de una compra no prueba esa asignación. Tu integración puede devolver un pedido creado y reparto pendiente, y el mensaje al cliente tiene que conservar ambos datos. Lo mismo sucede con un pedido para retiro: que exista no significa que ya esté preparado.

Si querés que Atende consulte y confirme un cupo, esa acción debe formar parte de la [conexión armada a pedido](/integraciones). Sin conexión, el asistente reúne productos, cantidades y destino; tu equipo revisa las condiciones y confirma. No alcanza con escribir una instrucción para disponer de un dato operativo que el asistente no puede consultar.

## Qué responder ante un pedido tardío

Elegí la salida según el estado de la operación. La siguiente tabla sirve para acordar el procedimiento con ventas y depósito.

| Situación | Siguiente paso |
| --- | --- |
| Pedido validado comercialmente antes del corte | Registrar por el circuito habilitado; confirmar el reparto solo cuando esté asignado |
| Primer mensaje antes del corte, validación después | Tratarlo como un pedido fuera de corte según la regla del ejemplo |
| Solicitud completa después del corte | Ofrecer el siguiente recorrido o dejar una preferencia pendiente |
| Cliente pide una excepción | Derivar a la persona autorizada sin prometer la fecha |
| Pedido ya preparado con un agregado | Consultar su estado y permiso de modificación |
| Sistema de reparto sin respuesta | Mantener la fecha pendiente, aunque el pedido haya quedado registrado |

No mezcles el agregado con una nueva compra sin preguntarlo. Un “sumale una caja” necesita referencia y autorización para modificar; esta [guía sobre pedidos duplicados](/blog/evitar-pedidos-duplicados-whatsapp) desarrolla ese caso.

## Un pedido fuera de corte que queda registrado con claridad

Ejemplo ilustrativo de una conexión a pedido que consulta la regla vigente y registra compras. No incluye una acción para garantizar cupos de reparto. Las referencias son ficticias.

> Comercio: Necesito cinco cajas del M24 para mañana en Villa Allende.
>
> Asistente: Para ese recorrido el corte fue hoy a las 16:00. Puedo tomar el pedido con preferencia para el próximo reparto; la fecha queda pendiente. ¿Seguimos?
>
> Comercio: Sí, tomalo igual.
>
> Asistente: Son cinco cajas del M24, por seis unidades, para el domicilio de tu cuenta. Te paso el detalle con tus precios actuales para revisar.

El asistente muestra los importes y las condiciones vigentes devueltos por el sistema para esa cuenta. El resumen mantiene la fecha de reparto como pendiente.

> Comercio: Está bien, cargalo.
>
> Asistente: Listo, quedó registrado el pedido 708 por cinco cajas del M24. La fecha de reparto todavía está pendiente.

El cierre ocurre después del resultado exitoso de la herramienta. Si el cliente necesita sí o sí una fecha anterior, la conversación pasa al equipo: no se confirma una entrega para destrabar la venta.

## Supervisión y prueba antes de ampliar el circuito

Definí quién revisa las excepciones cerca del corte y quién resuelve el reparto pendiente. La bandeja compartida permite seguir la conversación; para que continúe una persona sin respuestas del asistente, marcá **Necesita humano**. Asignarse el chat o responder desde allí no lo pausa.

Probá un caso antes del corte, otro después, un feriado y un agregado a una compra ya preparada. Revisá tanto el mensaje al comercio como el estado escrito en tu sistema. Una regla entendida en el chat pero guardada con otra fecha sigue siendo un problema operativo.

Llevá a la [demo](/demo) tus zonas, horarios y una excepción habitual, con ejemplos sin datos de clientes. Podemos definir qué parte del registro conectar y dónde debe decidir tu equipo. Atender fuera de horario ayuda a reunir pedidos; el calendario de depósito y reparto sigue siendo el que vos establecés.

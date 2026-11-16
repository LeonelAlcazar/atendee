---
title: 'Registrá pedidos de WhatsApp en tu sistema de gestión: qué necesita la integración'
seoTitle: 'Integrar pedidos de WhatsApp con tu sistema de gestión'
description: 'Qué definir para conectar WhatsApp con el sistema de pedidos de una distribuidora: datos, permisos, confirmación, fallos y pruebas antes de empezar.'
summary: 'Integrar pedidos de WhatsApp con un sistema de gestión exige acceso autorizado a clientes, catálogo y condiciones, más una operación que registre la compra y devuelva su referencia. Atende puede ejecutar ese recorrido con una conexión desarrollada a pedido para cada negocio. Antes de usarla, probá cargas correctas, rechazos y reintentos. Sin integración, el asistente reúne la solicitud y tu equipo la carga y confirma.'
salesIntro:
  - 'Conectado a tu sistema de gestión, Atende registra los pedidos que tus clientes hacen por WhatsApp.'
  - 'Desarrollamos esa integración a pedido para que la compra pase del chat al sistema sin recargarla a mano.'
  - 'Tu equipo sigue cada conversación y toma las excepciones comerciales.'
publishedAt: '2026-11-16'
updatedAt: '2026-11-16'
category: comercio
tags: ['WhatsApp', 'sistema de gestión', 'ERP', 'integración', 'pedidos']
related:
  - toma-de-pedidos-por-whatsapp-para-distribuidores
  - evitar-pedidos-duplicados-whatsapp
  - software-pedidos-whatsapp-distribuidores
faq:
  - q: '¿Atende tiene una integración lista para cualquier ERP?'
    a: 'No hay una conexión universal de pedidos lista para todos los sistemas. El alcance se evalúa y se desarrolla por negocio según los accesos disponibles y las operaciones que tu sistema permita.'
  - q: '¿Conectar el stock alcanza para registrar pedidos?'
    a: 'No. Consultar stock es una lectura. Registrar una compra requiere una operación de escritura autorizada que acepte los datos del pedido y confirme qué quedó guardado.'
  - q: '¿Qué debe devolver el sistema después de cargar un pedido?'
    a: 'Una referencia del pedido y su estado, junto con los datos necesarios para comprobar cuenta, renglones y condiciones. El asistente solo comunica los resultados confirmados; una respuesta ambigua no equivale a un alta exitosa.'
  - q: '¿Se puede trabajar mientras se prepara la integración?'
    a: 'Sí. El asistente reúne la solicitud en la conversación y tu equipo carga y confirma desde su circuito habitual. Esa etapa no se presenta como registro automático en el sistema.'
---
Pasar pedidos de WhatsApp al sistema de gestión significa terminar con una compra identificable en el lugar donde trabaja administración. Para lograrlo, la conexión necesita tanto consultar información como registrar una operación. Tener acceso a un catálogo, por sí solo, resuelve únicamente una parte.

Esta guía sirve para preparar la conversación entre el responsable comercial, quien mantiene el sistema y Atende. El recorrido del comprador está en [toma de pedidos por WhatsApp para distribuidores](/blog/toma-de-pedidos-por-whatsapp-para-distribuidores). Acá definimos qué debería entrar, salir y comprobarse en la integración.

## Acordá qué documento va a quedar creado

“Pedido” puede significar una solicitud pendiente de revisión, una orden aceptada o una venta lista para preparar. Antes de conectar nada, elegí el documento y el estado que usa tu negocio.

Si el sistema crea una solicitud pendiente de aprobación, la respuesta al comercio tiene que decir eso. Si crea un pedido comercial aceptado, podrá informarse ese estado. Ninguno de los dos implica automáticamente facturar, cobrar, reservar stock o asignar un reparto.

Escribí una frase verificable: “Al aceptar el resumen, se crea un pedido en estado recibido, asociado a esta cuenta, y se devuelve su número”. Esa frase define mejor el alcance que “conectar WhatsApp al ERP”. También permite reconocer qué tareas siguen fuera de la conexión.

## El contrato entre la conversación y tu sistema

No necesitás llevar código a la primera reunión, pero sí saber quién mantiene cada dato y quién autoriza cada operación. Una planilla de preparación puede tener estas filas:

| Parte del circuito | Información necesaria | Resultado que hay que comprobar |
| --- | --- | --- |
| Identificar la cuenta | Contacto autorizado y sucursal elegida | Cuenta habilitada para comprar |
| Consultar el catálogo | Código, variante y presentación | Producto que existe en el sistema |
| Obtener condiciones | Cuenta, cantidades y modalidad de entrega | Precios y reglas aplicables |
| Registrar el pedido | Resumen aceptado por el comercio | Referencia y estado del documento |
| Revisar una operación | Referencia de la solicitud o del pedido | Si ya existe y qué quedó guardado |

La última fila es clave cuando una respuesta se pierde. Sin una forma de revisar lo ocurrido, repetir la carga puede duplicar la compra. El diseño debe incluir una referencia que permita reconocer la misma operación y un control contra reintentos duplicados; ese control se implementa y se prueba con la integración.

## Lectura y escritura tienen permisos distintos

Pedile al responsable del sistema accesos limitados al circuito acordado. Consultar un precio no debería permitir modificarlo. Registrar pedidos no implica poder borrar ventas ni cambiar límites de crédito.

También hay que verificar que el contacto solo opere sobre cuentas autorizadas. Ese control debe estar en la conexión. Las instrucciones del asistente ayudan a conducir la conversación, pero no reemplazan permisos del sistema.

La conexión se arma a pedido. No prometemos compatibilidad con una marca de software por el solo hecho de que tenga una API. Hace falta revisar qué operaciones ofrece, cómo se autorizan y si su información alcanza para confirmar la tarea.

## Un registro exitoso se comprueba con su resultado

Ejemplo ilustrativo de una conexión de pedidos desarrollada para una distribuidora. El comercio ya revisó productos, cantidades y condiciones; el sistema devuelve el alta exitosa del documento.

> Comercio: Confirmo las dos cajas de A10 y las tres de B20, para retirar.
>
> Asistente: Registré el pedido 7308 para retiro, con dos cajas de A10 y tres de B20. Quedó recibido en tu cuenta.

La confirmación ocurre después del resultado exitoso. Si la respuesta del sistema es “pendiente de revisión”, ese es el estado que corresponde comunicar. Si falla, el asistente no puede decir “ya quedó” ni prometer que alguien lo completará sin que exista ese circuito.

Sin integración, Atende recoge la solicitud y tu equipo registra y confirma por el procedimiento habitual. La supervisión sigue siendo parte del trabajo conectado: las excepciones comerciales se resuelven desde la bandeja compartida.

## Probá también lo que sale mal

Armá un pequeño conjunto de pruebas con datos ficticios antes de operar con compras reales:

- Un pedido válido devuelve una referencia que se puede abrir en el sistema.
- Un código inexistente produce un rechazo claro y no genera una compra parcial inesperada.
- Un cambio de precio obliga a revisar las nuevas condiciones antes de confirmar.
- Una operación reenviada con la misma referencia no crea un segundo pedido.
- Una respuesta interrumpida se resuelve consultando el estado antes de intentar otra carga.
- Un contacto sin autorización no accede a precios ni pedidos ajenos.

Para cada prueba, guardá el mensaje de entrada, el resultado visible en el sistema y la respuesta al comercio. Si no coinciden, todavía hay una decisión por corregir. La [guía de pedidos duplicados](/blog/evitar-pedidos-duplicados-whatsapp) desarrolla el caso de una confirmación perdida.

Llevá a la [demo](/demo) el nombre de tu sistema, el documento que querés registrar y dos pedidos de ejemplo sin datos personales. Con eso definimos el [alcance de la integración](/integraciones) y las pruebas necesarias para tu operación.

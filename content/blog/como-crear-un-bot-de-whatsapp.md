---
title: 'Cómo crear un bot de WhatsApp sin programar: instrucciones y pruebas'
seoTitle: 'Cómo crear un bot de WhatsApp sin programar'
description: >-
  Creá un bot de WhatsApp con un alcance concreto, una plantilla de instrucciones
  y pruebas de conversación. Configurá Atende, conectá por QR y revisá el resultado.
summary: >-
  Para crear un bot de WhatsApp sin programar, elegí una herramienta, definí una
  tarea, cargá información vigente y escribí cuándo debe intervenir tu equipo.
  En Atende configurás el asistente, vinculás el número por QR y probás desde
  otro teléfono. Usá consultas incompletas, cambios de pedido y excepciones para
  verificar las respuestas. Una instrucción escrita es una regla a probar, no
  una garantía de que el bot siempre la cumpla.
publishedAt: '2026-11-04'
updatedAt: '2026-11-04'
category: bot-de-whatsapp
tags:
  - bot de WhatsApp
  - configuración
  - sin programar
  - pruebas
related:
  - bot-de-whatsapp
  - bot-de-whatsapp-con-ia-para-ventas
  - automatizar-whatsapp-gratis
  - como-automatizar-whatsapp-empresa
faq:
  - q: ¿Se puede crear un bot de WhatsApp sin programar?
    a: >-
      Sí, con una herramienta que permita configurar el asistente desde un
      panel. En Atende cargás la información, vinculás WhatsApp por QR y
      supervisás el historial. Las integraciones con otros sistemas deben
      evaluarse aparte; no quedan resueltas por escribir instrucciones.
  - q: ¿Necesito contratar la API de WhatsApp para configurar Atende?
    a: >-
      El flujo de Atende descrito en esta guía usa vinculación por QR desde el
      teléfono del negocio. No requiere que programes una integración de Cloud
      API. Si tu empresa necesita específicamente WhatsApp Business Platform,
      confirmá esa condición antes de elegir la solución.
  - q: ¿Qué información tengo que darle al bot?
    a: >-
      Incluí servicios, horarios, cobertura y condiciones vigentes; los datos
      mínimos que debe pedir para cada solicitud; y los casos que toma una
      persona. Aclarale qué no puede confirmar. Asigná responsables para
      actualizar los datos y revisar las respuestas.
  - q: ¿Cómo sé si el bot está listo para atender clientes?
    a: >-
      Probá la consulta habitual, datos faltantes, una corrección del cliente,
      información no disponible y el pedido de hablar con una persona. Revisá
      también recepción, respuesta y continuidad humana desde el número real.
      Corregí los fallos antes de ampliar el uso.
  - q: ¿El bot aprende automáticamente cada vez que alguien lo corrige?
    a: >-
      No lo presupongas. En el proceso de esta guía, el responsable corrige la
      información o las instrucciones configuradas y vuelve a probar los casos
      afectados. Una respuesta manual en una conversación no reemplaza la
      actualización de la configuración del asistente.
sources:
  - title: 'WhatsApp: opciones de integración con Business Platform'
    url: 'https://whatsappbusiness.com/products/business-platform/'
    checkedAt: '2026-11-04'
---
Para **crear un bot de WhatsApp sin programar**, necesitás una herramienta de configuración, información del negocio y una forma concreta de comprobar las respuestas. El primer resultado debería ser pequeño: por ejemplo, informar condiciones de alquiler y reunir una solicitud para que una persona confirme disponibilidad.

Esta guía muestra cómo pasar de esa idea a instrucciones y pruebas usando Atende. Si todavía estás comparando tecnologías, empezá por [qué es un bot de WhatsApp y cómo elegirlo](/blog/bot-de-whatsapp). Para organizar responsables, sistemas y métricas de toda la empresa, consultá la [guía de implementación](/blog/como-automatizar-whatsapp-empresa).

## 1. Escribí una tarea que puedas comprobar

Usá esta frase: “Cuando alguien pregunte por ___, el bot debe ___; termina cuando ___ o cuando una persona debe continuar”. Obliga a definir el comienzo y el resultado esperado.

Para un negocio ficticio de alquiler de proyectores, podría quedar así:

> Cuando alguien consulte por un alquiler, el bot informa que trabajamos con retiro y devolución en el local. Reúne fecha de uso, cantidad de equipos y duración. La solicitud queda lista para que el equipo confirme disponibilidad, precio y condiciones. Si el cliente pide una persona, se deriva en ese momento.

“Resolver todas las consultas” no permite comprobar nada en particular. “Confirmar automáticamente el alquiler” exige además una fuente de disponibilidad y un sistema que registre la operación. Para empezar, elegí una tarea que puedas sostener con los datos que ya tenés.

## 2. Separá datos, reglas y tono

Cuando una configuración mezcla todo en un párrafo, cuesta encontrar qué cambiar ante un error. Prepará tres bloques:

| Bloque | Qué escribir | Ejemplo ilustrativo |
| --- | --- | --- |
| Información | Hechos vigentes del negocio. | El retiro y la devolución se hacen en el local. |
| Reglas de atención | Qué pedir, qué confirmar y cuándo derivar. | Pedir fecha, cantidad y duración; disponibilidad a cargo del equipo. |
| Forma de responder | Cómo presentar la información. | Usar vos y mensajes breves; preguntar solo lo que falta. |

Evitá indicaciones ambiguas como “siempre damos facilidades” o “respondé como un vendedor experto”. Reemplazalas por condiciones observables. Si el equipo puede evaluar un descuento, indicá que el bot debe recibir la consulta y dejar la decisión pendiente.

No cargues dos versiones de una misma condición. Si cambió el horario de retiro, quitá la versión anterior o dejá explícita la vigencia. Darle más texto al asistente no corrige una contradicción.

## 3. Adaptá esta plantilla de instrucciones

El siguiente ejemplo corresponde al negocio ficticio de proyectores. Reemplazá todos los datos antes de usarlo y probá el comportamiento: el texto expresa lo que querés que haga el asistente, no una garantía automática.

> **Negocio y alcance:** alquilamos proyectores para eventos. Atendé consultas sobre este servicio y reuní solicitudes de alquiler.
>
> **Información vigente:** el retiro y la devolución se hacen en nuestro local. No ofrecemos entrega. El equipo humano atiende de lunes a viernes, de 9 a 18.
>
> **Datos para avanzar:** necesitamos fecha de uso, cantidad de proyectores y duración del alquiler. Si el cliente ya dio un dato, no se lo vuelvas a pedir. Si lo corrige, usá su última indicación.
>
> **Confirmaciones:** el equipo humano confirma disponibilidad, precio, garantía y condiciones finales. No confirmes una reserva ni cobres un importe desde esta configuración.
>
> **Excepciones:** si el cliente pide una persona, tiene un reclamo o necesita información que no está disponible, explicá que debe continuar el equipo. No le exijas completar las preguntas de alquiler para poder derivarlo.
>
> **Respuesta:** usá vos, mensajes breves y preguntas relacionadas con el pedido. Al reunir la solicitud, repetí los datos recibidos y aclarale al cliente qué falta confirmar.

Fijate en dos detalles. La plantilla evita que una solicitud se presente como reserva y permite salir del recorrido sin contestar todas las preguntas. Ambos deben aparecer también en las pruebas.

## 4. Configurá el asistente y conectá el número

En [la app de Atende](https://app.atende.com.ar), creá tu espacio y completá la configuración del asistente con la información preparada. La sección Asistente permite revisar esa configuración después del inicio. Comprobá también que el asistente esté habilitado y que el espacio tenga respuestas disponibles para automatizar.

Desde WhatsApp en el panel, generá el QR y escanealo con el teléfono del negocio desde dispositivos vinculados. Revisá el estado de conexión antes de probar. El QR conecta el canal; no verifica por sí mismo la calidad de las instrucciones.

Si querés empezar con los créditos de bienvenida, la guía para [automatizar WhatsApp gratis](/blog/automatizar-whatsapp-gratis) detalla la activación y sus límites. Las respuestas de prueba también consumen créditos.

Esta configuración usa el flujo de Atende. Si elegís desarrollar sobre WhatsApp Business Platform, Meta contempla una integración directa o mediante un proveedor; es otro recorrido técnico y requiere revisar sus condiciones. [Opciones oficiales de Business Platform](https://whatsappbusiness.com/products/business-platform/).

## 5. Probá una conversación completa desde otro número

No alcanza con mirar una respuesta aislada. El siguiente intercambio es un objetivo de prueba para el ejemplo, no el resultado de un cliente real:

> **Cliente:** Necesito dos proyectores para el sábado. ¿Me los pueden llevar?
>
> **Bot:** Trabajamos con retiro y devolución en el local. Para que el equipo revise los dos proyectores para el sábado, ¿por cuánto tiempo los necesitás?
>
> **Cliente:** Un día. Mejor uno solo, al final usamos una sala.
>
> **Bot:** La solicitud queda por un proyector para el sábado, durante un día. El equipo tiene que confirmar disponibilidad, precio y condiciones; todavía no está reservado. Te responde por este chat dentro del horario de atención, de lunes a viernes de 9 a 18.

Revisá si el asistente conservó la fecha, tomó la corrección de cantidad y aclaró la modalidad. Abrí después la conversación en la bandeja compartida y comprobá que una persona pueda continuar con ese contexto.

## 6. Usá casos de aceptación antes de ampliar el uso

Guardá una lista con el mensaje de prueba, lo esperado y lo que ocurrió. Estos casos cubren fallos distintos:

| Mensaje o situación | Resultado a verificar |
| --- | --- |
| “¿Cuánto sale?” | Identifica qué necesita el cliente antes de responder. |
| El cliente da todos los datos de entrada | Avanza sin repetir preguntas ya respondidas. |
| “Mejor uno solo” después de pedir dos | Conserva la última cantidad. |
| “Reservalo, seguro tienen” | Mantiene la disponibilidad pendiente. |
| “Quiero hablar con alguien” | Facilita el pase sin imponer más preguntas. |
| Consulta por un servicio que no se ofrece | Reconoce el límite sin inventar una oferta. |
| Una persona responde desde la bandeja | La continuidad es clara y no aparecen respuestas contradictorias. |

Probá también la recepción real y el estado de conexión. Si un mensaje no llega, revisá el canal; cambiar las instrucciones no soluciona un problema de vinculación.

## 7. Corregí según el tipo de error

Si el bot da un horario viejo, corregí la información. Si pregunta algo que el cliente ya dijo, revisá la regla de recopilación y repetí ese intercambio. Si promete una reserva, reforzá el límite y comprobá si el alcance necesita intervención humana o una integración.

Cuando falta una función real, como consultar disponibilidad, agregar “consultá la agenda” al texto no crea la conexión. En Atende, las operaciones con agenda, stock o CRM externo y los envíos proactivos se confirman por separado.

Asigná a alguien para revisar las primeras conversaciones y cada cambio comercial. Ampliá el alcance cuando los casos anteriores funcionen y el equipo pueda atender los pendientes. Si el siguiente paso es preparar oportunidades comerciales, seguí con el [bot de WhatsApp con IA para ventas](/blog/bot-de-whatsapp-con-ia-para-ventas) o llevá tus pruebas a una [demo](/demo).

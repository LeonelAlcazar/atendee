---
title: 'Cómo crear un bot de WhatsApp sin programar: instrucciones y pruebas'
seoTitle: 'Cómo crear un bot de WhatsApp sin programar'
description: >-
  Creá un bot de WhatsApp paso a paso: una tarea concreta, una plantilla de
  instrucciones, la conexión del número y pruebas reales. Y qué implica armarlo
  con n8n o ChatGPT.
summary: >-
  Para crear un bot de WhatsApp sin programar, elegí una tarea que termine en
  algo comprobable, como tomar una solicitud de alquiler, y escribí qué datos
  pide, qué confirma y cuándo deriva. En Atende creás tu espacio, le contás qué
  hace tu negocio, invitás a tu equipo, activás créditos o un plan y conectás tu
  número, con la API oficial de Meta o con un QR. Apenas queda conectado, contesta
  a todos tus contactos: no hay modo de prueba, así que probalo desde otro número,
  lo que usa créditos. Armarlo vos con n8n y la API de un modelo también se puede,
  pero es otro trabajo.
publishedAt: '2026-11-04'
updatedAt: '2026-11-06'
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
      Sí, con una herramienta que se configure desde un panel. En Atende le
      contás qué hace tu negocio, conectás tu número y seguís las
      conversaciones desde la bandeja. Para que además reserve o registre
      pedidos hace falta una conexión con tu sistema, que se arma a pedido.
  - q: ¿Necesito contratar la API de WhatsApp para configurar Atende?
    a: >-
      No es obligatorio. Elegís cómo conectar tu número: con la API oficial de
      Meta o con un QR. Por QR, se vincula desde dispositivos vinculados del
      teléfono del negocio, sin programar. Si tu empresa necesita WhatsApp
      Business Platform, lo vemos con vos en la demo.
  - q: ¿Puedo probar el bot sin que le conteste a mis clientes?
    a: >-
      No hay modo de prueba. Una vez vinculado el número, el asistente contesta
      a todos tus contactos. Probalo desde otro número; usa créditos. Si querés
      elegir el momento, dejá el espacio en Modo CRM al conectar el número y activá
      el asistente en un horario tranquilo.
  - q: ¿Qué información tengo que darle al bot?
    a: >-
      Servicios, horarios, cobertura y condiciones vigentes; los datos mínimos
      que debe pedir en cada solicitud; y los casos que toma una persona.
      Aclarale qué no puede confirmar, y asigná a alguien para mantener esos
      datos al día.
  - q: ¿El bot aprende solo cada vez que alguien lo corrige?
    a: >-
      No lo presupongas. El asistente tiene en cuenta la conversación en curso y
      sus propias notas. Si tu equipo corrige algo en un chat, eso no cambia la
      configuración: hay que actualizar el contexto o las preguntas frecuentes y
      volver a probar.
sources:
  - title: 'WhatsApp: opciones de integración con Business Platform'
    url: 'https://whatsappbusiness.com/products/business-platform/'
    checkedAt: '2026-11-06'
  - title: 'n8n: credenciales de WhatsApp Business Cloud'
    url: 'https://docs.n8n.io/integrations/builtin/credentials/whatsapp/'
    checkedAt: '2026-11-06'
---
Para **crear un bot de WhatsApp sin programar**, necesitás una herramienta con panel, la información de tu negocio y una forma concreta de comprobar que la tarea quedó hecha. El primer resultado tiene que ser chico y terminado: por ejemplo, tomar una solicitud de alquiler completa, para que tu equipo solo tenga que confirmarla. Cuando eso funciona, el paso siguiente es que el bot la reserve solo, conectado a tu sistema.

Esta guía lleva esa idea a instrucciones y pruebas usando Atende, y al final cuenta qué implica armarlo por tu cuenta con n8n, ChatGPT o Claude. Si todavía estás comparando tecnologías, empezá por [qué es un bot de WhatsApp y cómo elegirlo](/blog/bot-de-whatsapp). Para ordenar responsables y sistemas de toda la empresa, mirá la [guía para automatizar WhatsApp Business](/blog/como-automatizar-whatsapp-empresa).

## 1. Escribí una tarea que puedas comprobar

Usá esta frase: “Cuando alguien pregunte por ___, el bot debe ___; termina cuando ___ o cuando una persona debe seguir”. Te obliga a definir el comienzo y el resultado esperado.

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

En Atende los tres bloques van al mismo lugar: el campo “Descripción del negocio”, dentro de “Contexto del asistente”. Es un solo cuadro de texto, así que separalos con títulos. Lo que escribas ahí manda sobre las preguntas frecuentes y las herramientas.

Las consultas puntuales van en “Preguntas frecuentes”, hasta 50. El asistente las busca por palabras de la pregunta, no de la respuesta, así que escribilas como las escribe tu cliente: “¿Hacen envíos a Alta Gracia?” funciona mejor que “Política de distribución”.

Evitá indicaciones ambiguas como “siempre damos facilidades” o “respondé como un vendedor experto”. Si el equipo puede evaluar un descuento, indicá que el bot reciba la consulta y deje la decisión pendiente. Y no cargues dos versiones de una misma condición: si cambió el horario de retiro, sacá la anterior.

## 3. Adaptá esta plantilla de instrucciones

El siguiente ejemplo corresponde al negocio ficticio de proyectores. Reemplazá todos los datos: el texto expresa lo que querés que haga el asistente, no una garantía de que siempre lo haga.

> **Negocio y alcance:** alquilamos proyectores para eventos. Atendé consultas sobre este servicio y reuní solicitudes de alquiler.
>
> **Información vigente:** el retiro y la devolución se hacen en nuestro local. No ofrecemos entrega. El equipo atiende de lunes a viernes, de 9 a 18.
>
> **Datos para avanzar:** necesitamos fecha de uso, cantidad de proyectores y duración del alquiler. Si el cliente ya dio un dato, no se lo vuelvas a pedir. Si lo corrige, usá su última indicación.
>
> **Confirmaciones:** el equipo confirma disponibilidad, precio, garantía y condiciones finales. No confirmes una reserva ni cobres un importe.
>
> **Cuando la solicitud esté completa:** repetí los datos, aclará qué falta confirmar y pasá la conversación al equipo.
>
> **Excepciones:** si el cliente pide una persona, tiene un reclamo o necesita algo que no está acá, pasá la conversación al equipo sin exigirle que complete las preguntas.
>
> **Respuesta:** usá vos, mensajes breves y preguntas relacionadas con el pedido. Si te preguntan si sos una persona, decí que sos un asistente automático.

Fijate en tres detalles. La plantilla evita que una solicitud se presente como reserva, deja salir del recorrido sin contestar todo y pide derivar al completar los datos. Lo último importa: derivar marca el chat como “Necesita humano” y lo suma a los pendientes. Sin esa línea, la solicitud queda como una conversación más, y nadie la ve salvo que vaya a buscarla.

## 4. Armá tu espacio y conectá tu número

En [la app de Atende](https://app.atende.com.ar) son cinco pasos, en este orden:

1. **Creá tu espacio.** Te pide el nombre de tu equipo y un link corto.
2. **Contale qué hace tu negocio.** Pegá la plantilla. Podés saltear este paso y hacerlo después desde Asistente, pero el asistente sin contexto no sirve.
3. **Invitá a tu equipo.** Cada persona entra con su cuenta. También se puede dejar para después.
4. **Activá créditos o un plan.** “Probar gratis sin tarjeta” te lleva a los créditos de bienvenida y “Ver planes” a las opciones pagas. Sin una de las dos no se puede vincular WhatsApp. La guía para [automatizar WhatsApp gratis](/blog/automatizar-whatsapp-gratis) detalla los créditos.
5. **Conectá WhatsApp.** Elegís cómo conectar tu número: con la API oficial de Meta o con un QR. Por QR, en la pantalla WhatsApp abrí el QR y escanealo desde dispositivos vinculados, con el teléfono del negocio. Necesitás otra pantalla para verlo: si estabas haciendo todo desde ese celular, abrí el panel en una compu.

Por QR, tus clientes te siguen escribiendo al mismo número. Si vas por la API oficial, los pasos los vemos con vos en la [demo](/demo).

**Antes de conectar, leé esto: no hay modo de prueba.** Una vez vinculado el número, el asistente contesta a todos los contactos que escriban. Cargá primero el contexto y las preguntas frecuentes. Si querés elegir el momento, pasá el interruptor de arriba a “Modo CRM” antes de conectar: los mensajes entran a la bandeja y el asistente no contesta. Volvé a “Asistente activo” cuando el negocio esté tranquilo.

## 5. Probá una conversación completa desde otro número

Probalo desde otro número; usa créditos. No alcanza con mirar una respuesta aislada. Este intercambio es un objetivo de prueba para el ejemplo:

> **Ejemplo ilustrativo, sin conexión**
>
> **Cliente:** Necesito dos proyectores para el sábado. ¿Me los pueden llevar?
>
> **Bot:** Trabajamos con retiro y devolución en el local. Para que el equipo revise los dos proyectores para el sábado, ¿por cuánto tiempo los necesitás?
>
> **Cliente:** Un día. Mejor uno solo, al final usamos una sala.
>
> **Bot:** Queda la solicitud: un proyector el sábado, por un día. Todavía no está reservado: el equipo te confirma por acá, de lunes a viernes de 9 a 18.

Revisá si el asistente conservó la fecha, tomó la corrección de cantidad y aclaró la modalidad. Después abrí la conversación en la bandeja y comprobá que haya quedado como “Necesita humano” y que una persona pueda seguir con ese contexto.

## 6. Usá casos de aceptación antes de ampliar el uso

Guardá una lista con el mensaje de prueba, lo esperado y lo que ocurrió. Estos casos cubren fallos distintos:

| Mensaje o situación | Resultado a verificar |
| --- | --- |
| “¿Cuánto sale?” | Identifica qué necesita el cliente antes de responder. |
| El cliente da todos los datos de entrada | Avanza sin repetir preguntas ya respondidas. |
| “Mejor uno solo” después de pedir dos | Conserva la última cantidad. |
| “Reservalo, seguro tienen” | Mantiene la disponibilidad pendiente. |
| “Quiero hablar con alguien” | Deriva sin imponer más preguntas, y el chat queda marcado. |
| Consulta por un servicio que no se ofrece | Reconoce el límite sin inventar una oferta. |
| Un audio o una foto | No contesta, y en la bandeja no aparece nada: esos mensajes no llegan a Atende. |
| Alguien responde desde la bandeja sin marcar nada | El asistente sigue contestando. Para que se frene, hay que marcar “Necesita humano”. |

Las dos últimas filas no son errores que puedas corregir, pero tu equipo tiene que verlas una vez. Si un mensaje de texto no llega, revisá la conexión; cambiar las instrucciones no arregla un problema de vinculación.

## 7. Corregí según el tipo de error

Si el bot da un horario viejo, corregí la información. Si pregunta algo que el cliente ya dijo, revisá la regla de recopilación y repetí ese intercambio. Si promete una reserva, reforzá el límite y volvé a probar.

Asigná a alguien para revisar las primeras conversaciones y cada cambio comercial. Ampliá el alcance cuando los casos anteriores funcionen y el equipo pueda atender los pendientes.

## 8. Cuando el bot ya junta bien, hacé que termine la tarea

Agregar “consultá la disponibilidad” al texto no crea la conexión. Para que el bot reserve hace falta una herramienta conectada a tu sistema. Con esa conexión, el final de la charla de arriba cambia:

> **Ejemplo ilustrativo, con el sistema de reservas conectado**
>
> **Cliente:** Un día. Mejor uno solo, al final usamos una sala.
>
> **Bot:** Hay uno libre para el sábado. ¿Te lo reservo?
>
> **Cliente:** Dale
>
> **Bot:** Listo, quedó reservado un proyector para el sábado, por un día. Lo retirás en el local.

Esa conexión se arma a pedido para tu negocio: no te damos un armador de flujos, armamos la conexión con tu sistema. Sin ella, sigue valiendo lo de arriba: el asistente junta el pedido y tu equipo lo confirma. Acá está [qué se puede conectar con el asistente](/integraciones). Si lo que sigue es preparar oportunidades comerciales, pasá al [bot de WhatsApp con IA para ventas](/blog/bot-de-whatsapp-con-ia-para-ventas), o llevá tus pruebas a una [demo](/demo).

## ¿Y si lo armo yo con n8n, ChatGPT o Claude?

Se puede, y mucha gente lo busca. Conviene saber qué estás comprando con tu tiempo.

- **Con n8n u otro orquestador.** El nodo de WhatsApp de n8n trabaja con la API oficial: pide [cuenta de desarrollador de Meta, un portfolio comercial y una app de Meta en modo Live](https://docs.n8n.io/integrations/builtin/credentials/whatsapp/), con su token. Después sumás la API de un modelo, un servidor donde corra y el flujo.
- **Con ChatGPT o Claude.** Una suscripción a esos chats no atiende tu número por sí sola. Para que contesten en WhatsApp, tu flujo llama a la API del modelo y pagás por uso. Leer y mandar mensajes de tu espacio desde esos clientes es otra cosa, y lo contamos en [conectar WhatsApp con Claude o ChatGPT](/blog/conectar-whatsapp-con-claude-chatgpt-mcp).
- **Lo que te queda por construir.** Agrupar mensajes seguidos para no contestar tres veces, recordar la charla, pasar a una persona, una bandeja para el equipo y evitar que un reintento cargue dos veces el mismo pedido.

Por la API oficial, además, Meta [cobra por mensaje entregado](/blog/cuanto-cuesta-automatizar-whatsapp). Meta contempla [una integración directa o con un proveedor](https://whatsappbusiness.com/products/business-platform/); las dos son un recorrido técnico aparte. Y si para evitar esos cargos usás una librería no oficial por QR, cargás con el mismo riesgo de restricción que cualquier conexión por QR, más el mantenimiento.

Tiene sentido si ya tenés a alguien técnico que lo va a mantener o si querés controlar cada paso. Si no, la cuenta real no es la licencia sino quién lo arregla un sábado cuando deja de andar.

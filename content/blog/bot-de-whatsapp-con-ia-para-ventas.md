---
title: 'Bot de WhatsApp con IA para ventas: cómo preparar consultas útiles'
seoTitle: 'Bot de WhatsApp con IA para ventas: datos y ejemplos'
description: >-
  Un bot de WhatsApp con IA para ventas que cotiza, anota al interesado y le deja
  al vendedor una consulta lista. Qué datos pedir, ejemplos y cómo pasar el chat.
summary: >-
  Un bot de WhatsApp con IA para ventas hace dos trabajos: conectado a tu
  sistema, consulta stock, calcula cuotas y registra al interesado; sin conexión,
  reúne producto, cantidad y zona para que el vendedor arranque con la consulta
  lista. Definí qué datos cambian la propuesta, preguntá solo lo que falta y
  dejá claro qué queda por confirmar. Para que el vendedor siga sin pisarse con
  el asistente, tiene que marcar el chat como “Necesita humano”: responder no
  alcanza. Los seguimientos automáticos se arman a pedido.
publishedAt: '2026-11-04'
updatedAt: '2026-11-06'
category: bot-de-whatsapp
tags:
  - bot de WhatsApp
  - inteligencia artificial
  - ventas
  - consultas comerciales
  - atención al cliente
related:
  - bot-de-whatsapp
  - como-crear-un-bot-de-whatsapp
  - cotizaciones-por-whatsapp-automaticas
  - whatsapp-ia-atencion-humana
faq:
  - q: ¿Un bot de WhatsApp con IA puede vender por mi negocio?
    a: >-
      Puede atender consultas, explicar condiciones y juntar datos para que
      ventas avance. Conectado a tu sistema, también consulta stock, calcula
      cuotas y registra el pedido. Cerrar una venta puede pedir además
      aceptación, pago y una decisión comercial, y ahí conviene que siga una
      persona.
  - q: ¿Qué datos debería pedir un bot comercial?
    a: >-
      Solo los que cambien el siguiente paso: necesidad, producto o servicio,
      cantidad, zona o plazo, según el negocio. No repitas lo que el cliente ya
      dijo. Si pide hablar con una persona, tiene que poder pasar sin completar
      un cuestionario.
  - q: ¿Atende registra interesados en mi CRM?
    a: >-
      Conectado a tu CRM o planilla, sí: esa conexión se arma a pedido para tu
      negocio. Hay una demo para una concesionaria de motos que registra al
      interesado en Google Sheets. Sin conexión, la consulta queda en la bandeja
      y una persona la carga: el chat no es un registro en otro sistema.
  - q: ¿El bot hace seguimiento si un posible cliente deja de responder?
    a: >-
      No por su cuenta. Atende contesta cuando el cliente escribe. Los
      recordatorios y seguimientos se arman a pedido para cada negocio, y mandar
      mensajes que nadie pidió desde un número vinculado por QR suma riesgo de
      restricción. Mientras tanto, tu equipo los retoma desde la bandeja.
  - q: ¿Cómo sé si el bot ayuda al equipo de ventas?
    a: >-
      Medí consultas con datos suficientes, información repetida, correcciones
      necesarias y tiempo hasta que sigue una persona. Contá propuestas y ventas
      confirmadas por separado: una respuesta automática o un pedido de precio
      no son una venta.
sources: []
---
Un **bot de WhatsApp con IA para ventas** hace dos trabajos. Conectado a tu sistema, consulta el stock, calcula las cuotas y anota al interesado mientras tu vendedor está con otro cliente. Sin conexión, hace el primer tramo: entiende qué busca la persona y le deja al vendedor una consulta lista para contestar.

“Calificar una consulta” significa comprobar si el negocio puede ayudar y qué hace falta para preparar una respuesta comercial. No hace falta convertir el chat en un formulario ni poner puntajes a las personas. Para una PyME puede ser tan simple como distinguir qué producto buscan, en qué cantidad y para qué localidad.

## Qué cierra el bot y qué le queda al vendedor

| Tarea | Sin conexión | Conectado a tu sistema |
| --- | --- | --- |
| Entender qué busca | Lo pregunta y lo deja en el chat. | Igual. |
| Decir si hay stock | Avisa que lo confirma el equipo. | Consulta el stock del momento. |
| Pasar precio o cuotas | Da solo lo que tenga cargado. | Lo calcula con la lista vigente. |
| Registrar al interesado | Queda en la conversación. | Lo anota en tu CRM o planilla. |
| Negociar, hacer una excepción, cerrar | Sigue una persona. | Sigue una persona. |

La última fila no cambia, y está bien que sea así. Lo que cambia es con qué llega el vendedor a esa charla.

Hoy hay una demo de la columna derecha, armada para una concesionaria de motos: consulta stock y precios, calcula financiación y registra al interesado en Google Sheets. Es una demo, no un cliente:

> **Ejemplo ilustrativo, con stock, precios y planilla conectados**
>
> **Cliente:** ¿Tenés la 150 en rojo? ¿En cuánto me queda en 12 cuotas?
>
> **Asistente:** Sí, hay en rojo. En 12 cuotas te queda en [cuota que devuelve tu sistema] por mes. ¿Querés que un vendedor te llame para verla?
>
> **Cliente:** Dale, mañana a la tarde
>
> **Asistente:** Listo, te anoté como interesado en la 150 roja en 12 cuotas, para que te llamen mañana a la tarde.

Conectado a tu sistema, Atende cotiza y registra al interesado; esa conexión se arma a pedido para tu negocio. Sin conexión, el asistente junta el pedido y tu equipo lo confirma. El resto de esta guía sirve para los dos casos, porque la conexión no arregla un bot que pregunta mal. Si vendés por rubro, mirá [concesionarias e inmobiliarias](/casos-de-uso/concesionarias-e-inmobiliarias) o [comercios y distribuidoras](/casos-de-uso/comercios-y-distribuidoras).

## Definí qué hace que una consulta esté lista para ventas

Antes de escribir preguntas, mirá qué decisión toma tu equipo con cada respuesta. Si un dato no cambia la propuesta, la derivación o el próximo paso, quizá se pueda pedir después.

En estos ejemplos ilustrativos, los criterios cambian según la actividad:

| Negocio | Información que ayuda a avanzar | Qué debe revisar ventas |
| --- | --- | --- |
| Equipamiento comercial | Uso previsto, cantidad y localidad. | Modelo adecuado, disponibilidad y propuesta. |
| Servicio de instalación | Tipo de trabajo, zona y plazo esperado. | Alcance técnico y necesidad de una visita. |
| Venta mayorista | Producto, presentación y cantidad. | Mínimo, condiciones de cuenta y precio vigente. |
| Cursos para empresas | Tema, cantidad de participantes y modalidad. | Programa, fechas y presupuesto. |

Sin conexión, estos datos quedan en la conversación: el vendedor los lee ahí. No se crean campos solos en ningún lado.

## Diseñá preguntas que aporten al siguiente paso

Una persona puede empezar con “¿Cuánto sale?” o mandar una necesidad completa. El bot debe adaptarse a lo que ya sabe. Si el cliente escribió “Necesito diez escritorios para una oficina en Córdoba”, volver a preguntar cantidad y localidad hace retroceder la atención.

Podés ordenar la conversación en tres decisiones:

1. **Entender la necesidad.** Aclarar producto, servicio o uso cuando sea ambiguo.
2. **Completar lo que cambia la propuesta.** Preguntar cantidad, zona, medida o plazo solo cuando corresponda.
3. **Seguir o derivar.** Responder con la información disponible o pasarle la solicitud al responsable.

Explicá por qué necesitás un dato si la pregunta puede parecer arbitraria. “¿En qué localidad sería la instalación? Así el equipo revisa la cobertura” da contexto. Pedir una dirección completa antes de saber si atendés esa zona genera trabajo de más.

También tiene que existir una salida: “Quiero hablar con alguien” debe llegar al equipo sin responder todo el recorrido. La guía para [crear el bot](/blog/como-crear-un-bot-de-whatsapp) incluye una plantilla para configurar y probar esa regla.

## Ejemplo: de una consulta ambigua a una necesidad concreta

Este intercambio es ficticio y muestra lo que conviene probar en un negocio de muebles para oficinas, sin conexión. No es un registro de un cliente ni un resultado medido.

> **Ejemplo ilustrativo, sin conexión**
>
> **Cliente:** Hola, ¿qué precio tienen las sillas?
>
> **Bot:** ¿Buscás sillas para puestos de trabajo o para una sala de espera?
>
> **Cliente:** Para que el equipo trabaje todo el día. Son seis, para una oficina en Villa Allende.
>
> **Bot:** Seis sillas para puestos de trabajo en Villa Allende. ¿Tenés una fecha en la que las necesitás?
>
> **Cliente:** Antes de fin de mes. Y quiero verlas antes de decidir.
>
> **Bot:** Queda tu consulta: seis sillas antes de fin de mes, con visita. Un vendedor te confirma modelos y precio por acá, de lunes a viernes de 9 a 18.

El bot distingue el uso, conserva cantidad y localidad, y suma la intención de visitar. No inventa un modelo ni promete el plazo. Para que esa última respuesta salga, el negocio tiene que haber escrito su horario en el contexto y pedido que derive cuando la consulta esté completa.

Si el cliente después corrige “al final son ocho”, probá que el equipo encuentre esa actualización. El historial completo importa más que una primera respuesta convincente.

## Cuándo informar un precio y cuándo dejarlo pendiente

Podés cargar información comercial válida para la consulta: qué servicios ofrecés o qué modalidad de entrega existe. Si vas a dar un precio, tenés que saber a qué producto, condiciones y vigencia corresponde.

Cuando depende de cantidad, cuenta del cliente, financiación, instalación o stock, la respuesta pide más datos y una verificación. El bot no debería convertir un importe orientativo en una oferta definitiva.

Separá estas afirmaciones:

- **“El servicio trae…”:** información que el negocio mantiene cargada.
- **“El equipo puede preparar una propuesta con estos datos”:** una solicitud pendiente.
- **“El pedido quedó confirmado”:** solo después de que tu sistema lo confirme.

La [guía de cotizaciones por WhatsApp](/blog/cotizaciones-por-whatsapp-automaticas) desarrolla las diferencias entre reunir datos, calcular y emitir un presupuesto.

## Cómo pasa el chat al vendedor sin que se pisen

Acá es donde más se rompe la venta. Un vendedor contesta desde la bandeja, el cliente responde, y el que contesta es el asistente, que no sabe qué le prometieron. En Atende, **responder o tocar “Asignarme” no frena al asistente**. Lo frena marcar el chat como “Necesita humano”.

El orden que funciona:

1. Abrí el chat y marcalo “Necesita humano”.
2. Tocá “Asignarme”, así el resto del equipo sabe que es tuyo.
3. Leé el historial con la lista de abajo.
4. Contestá desde donde quedó la charla: “Vi que buscás ocho sillas para puestos de trabajo y querés verlas. Estoy revisando opciones para fin de mes”.
5. Dejá una nota interna con lo que falta. No hay resumen automático, y la nota la ve solo tu equipo.

| Punto de revisión | Qué buscar |
| --- | --- |
| Necesidad actual | Lo que el cliente quiere ahora, con sus correcciones. |
| Datos recibidos | Producto o servicio, cantidad y condiciones relevantes. |
| Pregunta pendiente | Precio, disponibilidad, alcance o coordinación. |
| Compromiso comunicado | Qué se dijo que iba a confirmar el equipo y en qué horario. |
| Próxima acción | Responder, preparar la propuesta o pedir una aclaración concreta. |

Un cuidado más: la pausa no es eterna. El chat se cierra solo 12 horas después del último mensaje del cliente, los mensajes del vendedor no cuentan, y si el cliente vuelve a escribir contesta el asistente. Por eso el vendedor tiene que mirar también “Finalizadas”. La explicación completa está en [cómo pausar el bot y tomar el chat](/blog/whatsapp-ia-atencion-humana). Si el problema es lo que se acumula a la noche, seguí con la [atención fuera de horario](/blog/atencion-comercial-whatsapp-24-7).

## Qué pasa con el seguimiento

Muchos presupuestos se pierden porque nadie vuelve a escribir. Atende contesta cuando el cliente escribe: no inicia mensajes por su cuenta. Los seguimientos se arman a pedido para tu negocio. Ese trabajo tiene un cuidado propio: mandar mensajes que el contacto no pidió, desde un número vinculado por QR, suma riesgo de restricción, y para escribir primero conviene evaluar la API oficial de Meta, la otra forma de conectar tu número.

Mientras tanto, lo más simple funciona: una etiqueta como “presupuesto enviado”, un responsable y un rato por semana para retomar esos chats desde la bandeja.

## Medí calidad comercial, además de cantidad de respuestas

Una consulta respondida puede seguir sin resolver. Para saber si el bot ayuda, elegí un período y revisá consultas del mismo tipo:

- **Datos suficientes:** cuántas solicitudes le alcanzan al vendedor para empezar.
- **Preguntas repetidas:** cuántas veces el equipo pide algo que el cliente ya dijo.
- **Correcciones:** cuántas respuestas hay que rectificar por precio, alcance o promesas.
- **Continuidad:** cuánto tarda una persona en atender una derivación dentro de su horario.
- **Resultado comercial:** propuestas enviadas y ventas confirmadas en tu proceso.

Si de 20 solicitudes revisadas 12 traen los datos acordados, anotá “12 de 20” y qué faltó en las otras ocho. Es una forma de registrar el trabajo, no un resultado de clientes de Atende. No le atribuyas cada venta al bot: también influyen el producto, el precio y el vendedor.

## Cómo evaluar este uso en Atende

Prepará tres consultas anonimizadas: una habitual, una con información incompleta y otra que pida una decisión comercial. Sumá los datos vigentes, el horario de tu equipo y qué debe quedar pendiente.

Mirá las [ventas y pedidos por WhatsApp](/servicios/ventas-whatsapp) y probá el recorrido desde otro número, con la consulta, los datos reunidos, la lectura del historial y el pase al vendedor. Usa créditos. Si necesitás stock, cuotas o tu CRM, anotalos como conexiones a pedir, mirá [qué pide cada conexión](/integraciones) y llevá esos casos a una [demo](/demo).

---
title: 'Cómo evitar que un recordatorio de turnos llegue dos veces por WhatsApp'
seoTitle: 'Cómo evitar recordatorios de turnos duplicados por WhatsApp'
description: 'Identificá por qué llegó dos veces el mismo aviso, cómo reintentar un recordatorio desde la agenda y qué hacer cuando cambia la hora del turno.'
summary: 'Para evitar recordatorios duplicados, dejá una sola vía de envío para cada turno y tipo de aviso. Si tu agenda le pide a Atende repetir el intento por un corte, debe conservar la misma referencia, el teléfono y el texto. Antes de reintentar, verificá que la cita siga vigente. Un cambio de horario ya guardado puede requerir un aviso nuevo.'
salesIntro:
  - 'Atende envía el aviso de tu agenda.'
  - 'Recepción ve a quién se le avisó.'
publishedAt: '2026-11-26'
updatedAt: '2026-11-26'
category: recordatorio-de-turnos
tags: ['recordatorio de turnos', 'WhatsApp', 'avisos duplicados', 'agenda']
related:
  - recordatorios-de-turnos-por-whatsapp
  - recordatorio-de-turnos-desde-una-planilla
  - reprogramar-turnos-desde-el-recordatorio
faq:
  - q: '¿Alcanza con descartar mensajes repetidos para el mismo teléfono?'
    a: 'Un mismo número puede tener dos turnos legítimos. Identificá cada cita y el aviso que le corresponde. Usá el teléfono para localizar la conversación y comprobar a quién se le escribió.'
  - q: '¿Qué hago si el sistema perdió la respuesta de Atende?'
    a: 'Revisá si el aviso ya figura en la bandeja y si el turno sigue vigente. Para reintentar el mismo mensaje por la conexión, conservá la clave del primer intento, el destinatario y el texto.'
  - q: '¿Qué significa que un recordatorio quedó en cola?'
    a: 'Significa que Atende aceptó el mensaje para su envío. Para saber si la persona piensa venir, necesitás que responda en el chat o que tu equipo lo confirme con ella por otro medio.'
sources:
  - title: 'IETF, significado de la respuesta HTTP 202 Accepted'
    url: 'https://www.rfc-editor.org/rfc/rfc9110.html#name-202-accepted'
    checkedAt: '2026-11-26'
---

«Me llegó dos veces, ¿tengo dos turnos?». Para responderle, buscá primero la reserva en la agenda. Dos avisos con la misma hora pueden salir de una sola cita. Si anulás una reserva guiándote por el chat, podés dejar a la persona sin el turno que quería conservar.

## Buscá de dónde salió cada aviso

Revisá quién mandó los dos mensajes, a qué hora y con qué texto. Vale la pena mirar tres lugares con la misma cita a la vista.

| Dónde mirar | Qué te permite comprobar |
| --- | --- |
| Agenda del negocio | Si guardó dos turnos o pidió dos veces el mismo aviso |
| Reglas de envío | Si la agenda y una planilla incluyeron a la misma persona |
| Bandeja y recepción | Si alguien escribió a mano mientras salía el aviso programado |

Elegí una sola vía para el recordatorio de esa cita. Si el salón ya avisa desde su agenda, dejá ese turno afuera de la regla diaria de planillas. Si recepción escribe por una excepción, conviene anotar el envío en el mismo lugar que consulta quien hace el repaso de la tarde. Una referencia de la agenda ayuda a distinguir dos citas reales concertadas desde el mismo número.

## Qué debe conservar tu sistema si repite un intento

Para los recordatorios puntuales, tu agenda decide cuándo avisar y le pide el envío a Atende mediante una conexión que se habilita a pedido. Quien la prepara puede enviar una referencia en el encabezado `Idempotency-Key`. Por ejemplo, puede guardar `turno-4821-v1-aviso-previo` al preparar el primer envío. El número identifica la reserva y la versión indica a qué horario corresponde ese aviso.

Si se corta la conexión mientras llega la respuesta, el resultado queda en duda. Comprobá que el turno siga vigente y que el horario y el teléfono sean los mismos. Para repetir la solicitud, tu sistema debe conservar la clave y el texto originales. Una clave nueva en cada intento hace que Atende reciba dos mensajes distintos. La clave tampoco alcanza para reconocer el WhatsApp que recepción escribió a mano.

Si el sistema ya recibió `202` y `queued`, el aviso entró en la cola. Guardá el identificador que devuelve Atende en el campo `id` junto a la referencia del turno. Esa respuesta por sí sola no permite saber si el teléfono lo recibió, si la persona lo leyó o si va a venir. [Qué significa la respuesta HTTP 202](https://www.rfc-editor.org/rfc/rfc9110.html#name-202-accepted).

## Qué pasa cuando la cita original cambia

Si un taller pasó el turno de las 9 a las 12, revisá qué quedó pendiente en su sistema de turnos. Descartá el aviso para las 9. Un recordatorio para las 12 tiene otro contenido y necesita su propia referencia. [Cómo reprogramar desde un recordatorio](/blog/reprogramar-turnos-desde-el-recordatorio).

## Una prueba corta antes de usar la agenda real

**Ejemplo ilustrativo.** En una prueba del taller, la agenda pide el recordatorio del turno 4821 para el viernes a las 11. Se corta la conexión antes de recibir la respuesta. El sistema reintenta el mismo mensaje con la clave original. Recepción revisa el teléfono de prueba y encuentra un solo aviso. Contesta «Sí, voy». Con permiso para registrar la confirmación, Atende espera el resultado de la agenda y responde «Listo, quedó confirmado tu turno del viernes a las 11». Con solo el envío habilitado, el asistente toma la respuesta y recepción confirma el turno.

Hacé también la prueba inversa. Cargá dos citas legítimas para un mismo número y pedí un aviso por cada una. Cada mensaje tiene que conservar el horario de su propia cita. [Guía de recordatorios de turnos por WhatsApp](/blog/recordatorios-de-turnos-por-whatsapp).

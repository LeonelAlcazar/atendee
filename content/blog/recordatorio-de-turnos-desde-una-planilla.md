---
title: 'Cómo mandar el recordatorio de turnos desde una planilla de Google Sheets'
seoTitle: 'Recordatorio de turnos desde Google Sheets por WhatsApp'
description: 'Prepará una planilla de turnos, filtrá quién necesita el aviso de mañana y usá la fecha y hora de cada fila en el mensaje de WhatsApp.'
summary: 'Para recordar los turnos de mañana desde Google Sheets, hacé que la hoja marque las citas vigentes de quienes aceptaron el aviso. En Atende programá una regla diaria, elegí esa planilla y filtrá las filas marcadas. El mensaje puede incluir el horario de cada fila. En cada ejecución se vuelven a leer los datos y se toma un solo registro por teléfono.'
salesIntro:
  - 'Atende avisa desde tu planilla.'
  - 'Vos elegís los turnos y la hora.'
publishedAt: '2026-11-26'
updatedAt: '2026-11-26'
category: recordatorio-de-turnos
tags: ['Google Sheets', 'recordatorio de turnos', 'WhatsApp', 'mensajes recurrentes']
related:
  - recordatorios-de-turnos-por-whatsapp
  - evitar-recordatorios-de-turnos-duplicados
  - cuando-enviar-recordatorio-de-turnos
faq:
  - q: '¿Qué pasa si el turno cambia después de que miré la vista previa?'
    a: 'La regla vuelve a leer la hoja al preparar el envío. Si el cambio ya figura en la planilla, usa esos datos. Un cambio posterior a esa lectura requiere revisar el aviso con el equipo.'
  - q: '¿Una persona con dos turnos en la misma planilla recibe dos mensajes?'
    a: 'En una misma ejecución se toma la primera fila que cumple el filtro para ese teléfono. Para recordar dos turnos distintos, prepará una fila que detalle ambos o usá el envío puntual desde tu agenda.'
  - q: '¿Puedo incluir el horario real de cada fila en el mensaje?'
    a: 'Sí. Habilitá una columna con el horario escrito como querés que lo lea la persona y elegila en «Insertar dato de la planilla». Revisá cómo queda con una fila de prueba.'
sources:
  - title: 'Hojas de cálculo de Google, función HOY'
    url: 'https://support.google.com/docs/answer/3092984?hl=es'
    checkedAt: '2026-11-26'
  - title: 'Hojas de cálculo de Google, función Y'
    url: 'https://support.google.com/docs/answer/3093301?hl=es'
    checkedAt: '2026-11-26'
  - title: 'Google, zona horaria y ajustes de cálculo de una hoja'
    url: 'https://support.google.com/docs/answer/58515?hl=es'
    checkedAt: '2026-11-26'
  - title: 'Hojas de cálculo de Google, función TEXTO para fechas y horas'
    url: 'https://support.google.com/docs/answer/3094139?hl=es'
    checkedAt: '2026-11-26'
  - title: 'Política de mensajes de WhatsApp Business'
    url: 'https://whatsappbusiness.com/es-la/policy/'
    checkedAt: '2026-11-26'
---

Si cada tarde recepción copia de una planilla los horarios del día siguiente, podés preparar esa misma hoja para que alimente el recordatorio. Una regla diaria le indica a Atende a qué hora consultar Google Sheets. La hoja tiene que decir cuáles son los turnos de mañana y cuáles siguen vigentes.

## Armá la fila que va a leer la regla

En una hoja con funciones en español, probá esta distribución. Usá datos ficticios antes de activar el envío.

| Columna | Qué guardás |
| --- | --- |
| A · Teléfono | El número de contacto autorizado para el aviso |
| B · Fecha | La fecha del turno como fecha, sin hora |
| C · Estado | El texto «Vigente» o «Cancelado» |
| D · Acepta avisos | Una casilla marcada cuando la persona aceptó el recordatorio |
| E · Avisar hoy | El resultado de una fórmula para esa fila |
| F · Horario | El texto que recibirá la persona, como «viernes 27/11 a las 16:00» |
| G · Hora de inicio | La hora del turno como valor horario, por ejemplo 16:00 |

En E2 escribí `=Y(B2=HOY()+1;C2="Vigente";D2)` y copiá la fórmula a las demás filas. Si el turno es mañana, sigue vigente y la persona aceptó el aviso, la celda da verdadero. La comparación de fechas ocurre en Google Sheets. Revisá la zona horaria y la frecuencia de recálculo de la hoja para que el resultado esté al día a la hora del envío. [Ajustes de cálculo en Google Sheets](https://support.google.com/docs/answer/58515?hl=es).

En F2 escribí `=TEXTO(B2;"dddd dd/mm")&" a las "&TEXTO(G2;"HH:mm")` y copiá la fórmula hacia abajo. Cuando muevas la cita, corregí la fecha en B o la hora en G. La fórmula de F actualiza el texto que recibirá la persona. [Cómo dar formato a la fecha y la hora con TEXTO](https://support.google.com/docs/answer/3094139?hl=es).

## Programá el recordatorio y probá el filtro

1. En **Contactos**, entrá a **Mensajes recurrentes** y elegí **Desde planillas**. Seleccioná la hoja habilitada para esos envíos. Para este ejemplo, autorizá el teléfono, la columna lógica «Avisar hoy» y la columna de texto «Horario».
2. Elegí la frecuencia diaria y una hora en la que recepción pueda atender las respuestas. En el filtro simple, seleccioná «Avisar hoy», «Es igual a» y «Sí».
3. Escribí el mensaje. Usá **Insertar dato de la planilla** para agregar «Horario». Con ese encabezado podés escribir «Hola, te escribimos del salón. Te esperamos el {{hoja_horario}}. Si necesitás cambiar el turno, respondé por acá».
4. Revisá la vista previa antes de activar la regla. Probá con un turno de mañana, uno cancelado y otro de la semana que viene. Solo el primero debería aparecer si tiene permiso para recibir avisos.

Esta regla usa el WhatsApp vinculado por QR. Si evaluás la plataforma oficial de WhatsApp, tené en cuenta que exige una plantilla aprobada para escribir cuando pasaron más de 24 horas desde el último mensaje de la persona. [Política de mensajes de WhatsApp Business](https://whatsappbusiness.com/es-la/policy/).

## Cuando dos turnos comparten un teléfono

Dos hermanos pueden tener turnos seguidos y usar el mismo teléfono. En cada ejecución, Atende toma la primera fila que coincide para ese número. Si cargás un horario por fila, el segundo puede quedar afuera del mensaje. Prepará una sola fila con ambos horarios cuando corresponda comunicarlos juntos. Una segunda regla para la misma lista puede volver a escribirles. [Cómo evitar recordatorios duplicados](/blog/evitar-recordatorios-de-turnos-duplicados).

## Qué hacer con un pedido de cambio

El filtro selecciona destinatarios. Si alguien pide mover su turno, el asistente recoge el pedido y recepción verifica y confirma el cambio en su agenda. Para que lo resuelva en el chat hace falta habilitar a pedido la lectura y modificación de esa agenda.

**Ejemplo ilustrativo.** Con esa conexión, una clienta responde «¿Me pasás al sábado a las 11?». La agenda del salón tiene el lugar y acepta el cambio. Recién entonces Atende contesta «Listo, tu turno quedó para el sábado a las 11».

Si usás un sistema que puede avisar a la hora que corresponde a cada cita, ese sistema también puede iniciar el envío puntual mediante una conexión a pedido. La diferencia importa cuando entran turnos nuevos después del envío diario. [Cómo funcionan los recordatorios desde una agenda](/blog/recordatorios-de-turnos-por-whatsapp).

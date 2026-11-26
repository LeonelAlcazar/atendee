---
title: 'Cómo enviar recordatorios de turnos por WhatsApp desde tu agenda'
seoTitle: 'Cómo enviar recordatorios de turnos por WhatsApp desde tu agenda'
description: >-
  Qué necesita tu agenda para mandar un recordatorio de turno por WhatsApp,
  cómo pedir permiso y cuándo podés registrar una confirmación o mover la cita.
summary: >-
  Para enviar un recordatorio por cada cita, tu agenda verifica que el turno
  siga vigente y le indica a Atende cuándo avisar a la persona que aceptó
  recibirlo. El envío desde tu sistema se habilita a pedido. Para reprogramar
  por chat, la agenda también tiene que aceptar cambios. Si llevás los turnos
  en una planilla de Google Sheets conectada, podés programar una regla que
  lea las filas que corresponde avisar.
salesIntro:
  - 'Conectado a tu agenda, a pedido, Atende avisa cada turno.'
  - 'Si los turnos están en Google Sheets, tu equipo programa el aviso desde la planilla.'
publishedAt: '2026-11-06'
updatedAt: '2026-11-26'
category: recordatorio-de-turnos
tags:
  - recordatorios
  - turnos
  - ausentismo
  - consentimiento
  - WhatsApp
related:
  - como-automatizar-whatsapp-clinicas
  - como-automatizar-whatsapp-odontologicas
  - como-automatizar-whatsapp-peluquerias
  - agente-de-ia-para-whatsapp
faq:
  - q: ¿Atende manda recordatorios de turnos?
    a: >-
      Sí. Una agenda conectada a pedido puede indicar cuándo enviar cada aviso.
      Si usás Google Sheets, una regla programada puede leer las filas de tu
      planilla habilitada y mandar el texto con el horario. Para mover la cita
      desde el chat, la agenda tiene que permitir ese cambio.
  - q: ¿Pueden bloquear mi número por mandar recordatorios?
    a: >-
      Hay riesgo, por cualquier ruta. WhatsApp pide que cuentes con el permiso de
      cada persona, y puede limitar o suspender cuentas que reciben quejas o mandan
      mensajes no solicitados. Nadie te puede garantizar que no restrinja un número,
      y escribir primero desde un número vinculado por QR suma riesgo.
  - q: ¿Necesito la API oficial para mandar recordatorios?
    a: >-
      Si tu negocio va a iniciar conversaciones regularmente, evaluá la plataforma
      oficial de WhatsApp. Fuera de las 24 horas desde el último mensaje de la
      persona, esa plataforma exige una plantilla aprobada. Para un recordatorio
      puntual, revisá con qué vía funciona la conexión de tu agenda.
  - q: ¿Qué dato no debería ir en un recordatorio de un consultorio?
    a: >-
      Lo que revele información de salud: diagnóstico, tratamiento o una
      especialidad sensible. Alcanza con fecha, hora, lugar y una forma de cambiar
      el turno. Las consultas clínicas van a una persona, y las reglas de tu
      actividad las tiene que revisar quien te asesore.
sources:
  - title: 'WhatsApp Business: Política de mensajes (última actualización 23 de septiembre de 2026)'
    url: 'https://whatsappbusiness.com/es-la/policy/'
    checkedAt: '2026-11-06'
  - title: 'Meta for Developers: categorización de plantillas'
    url: 'https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization'
    checkedAt: '2026-11-06'
  - title: 'Meta for Developers: obtener el consentimiento para WhatsApp'
    url: 'https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in'
    checkedAt: '2026-11-06'
  - title: 'Meta for Developers: precios de la Plataforma de WhatsApp Business'
    url: 'https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing'
    checkedAt: '2026-11-26'
  - title: 'Ley 25.326 de Protección de los Datos Personales (texto actualizado)'
    url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/64790/texact.htm'
    checkedAt: '2026-11-06'
---

El martes a la tarde, una paciente recibe el recordatorio de su turno del miércoles. Contesta "no llego", el asistente le ofrece otro horario y el turno queda movido. El miércoles a las 10:30 queda libre para otra persona. Un recordatorio de turnos por WhatsApp vale eso: el aviso importa, y lo que pasa cuando la persona contesta importa más.

Para avisar desde tu agenda, tu sistema de turnos verifica la cita e inicia el envío mediante una integración que se arma a pedido. Si recepción lleva los turnos en Google Sheets, también puede [programar la lectura de las citas vigentes desde una planilla](/blog/recordatorio-de-turnos-desde-una-planilla). En ese caso, la persona recibe los datos de la fila que cumple el filtro.

Ejemplo ilustrativo, con la agenda conectada y el recordatorio armado para ese consultorio:

> Consultorio: Hola, Ana. Te recordamos tu turno del miércoles a las 10:30 en el consultorio de Nueva Córdoba. Si no podés venir, avisanos por acá y lo cambiamos.
>
> Paciente: No llego, ¿tenés algo el viernes?
>
> Asistente: Tengo viernes 9:00 o 12:15. ¿Cuál te queda mejor?
>
> Paciente: 12:15
>
> Asistente: Listo, pasé tu turno al viernes a las 12:15. El del miércoles quedó libre.

Esa última línea sale solo si la agenda confirmó el cambio. Esa conexión se arma a pedido para tu negocio. Sin ella, el asistente junta el pedido y tu equipo lo confirma.

## Las cinco piezas de un recordatorio que sirve

**1. Una agenda al día.** Si recepción canceló un turno a las 9 y el mensaje sale a las 10, le recordás a alguien un turno que ya no existe. Revisá la fecha y el estado al preparar el aviso. Solo hace falta permiso para escribir en la agenda si además querés registrar la respuesta o mover la cita.

**2. El momento de envío.** Tu agenda decide cuándo corresponde avisar y le pide a Atende que envíe el texto. Probá qué pasa si hay feriados, si recién se reservó el turno o si se canceló antes del aviso.

**3. Consentimiento.** La [política de WhatsApp](https://whatsappbusiness.com/es-la/policy/) dice que solo podés contactar a alguien si te dio su número y tenés su permiso para mandarle mensajes. Pedilo al dar el turno, en palabras simples: "¿Te avisamos por WhatsApp el día antes?". [Meta pide](https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in) que quede claro quién va a escribir y que la persona acepte recibir esos mensajes.

**4. El texto.** Fecha, hora, lugar y qué hacer si no puede. Más abajo hay un ejemplo de qué dejar afuera.

**5. Un plan para cada respuesta.** Sin esto, solo mandaste un mensaje y le sumaste trabajo a recepción.

Si estás armando el primer aviso, podés elegir [un mensaje de recordatorio listo para adaptar](/blog/mensajes-de-recordatorio-de-turnos) y decidir [con cuánta anticipación mandarlo](/blog/cuando-enviar-recordatorio-de-turnos). Si ya recibís respuestas, fijate [cómo registrar un «sí, voy» en la agenda](/blog/confirmar-asistencia-a-un-turno-por-whatsapp).

## Por qué la gente falta, y qué arregla un recordatorio

No tenemos una cifra para prometerte. Cuánto baja el ausentismo depende de tu rubro y de tu agenda, y cualquier número que veas sin fuente es una suposición. Lo que sí podemos hacer es separar los motivos:

- **Se olvidó.** Acá el recordatorio ayuda directo.
- **No podía y no tenía cómo avisar.** Acá ayuda si puede responder y cambiar el turno en el mismo chat. Si tiene que llamar a un teléfono ocupado, no avisa.
- **Le faltaba algo.** La orden, la autorización de la obra social, los estudios previos. Sirve si el aviso lo menciona con tiempo, no la noche anterior.
- **No le importa perder el lugar.** Un recordatorio no lo arregla. Ahí juegan la seña o la política de cancelación que tengas.

Compará los turnos que se mantuvieron hasta la hora de atención y contá cuántas personas faltaron. Anotá también qué lugares se liberaron con tiempo y cuántos volviste a ocupar. Podés seguir [el cálculo de ausentismo paso a paso](/blog/medir-ausentismo-con-recordatorios-de-turnos).

## Cómo escribir el recordatorio

Corto, con quién escribe y con una salida fácil:

- **Mejor:** "Hola, Ana. Te recordamos tu turno del miércoles a las 10:30 en el consultorio de Nueva Córdoba. Si no podés venir, avisanos por acá y lo cambiamos."
- **Peor:** "Recordatorio de tu sesión de control de tratamiento psiquiátrico. Aprovechá la promo en tu próxima consulta."

El segundo tiene dos problemas. Expone un dato de salud en una pantalla de bloqueo, y la [Ley 25.326](https://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/64790/texact.htm) trata la información de salud como dato sensible. La [política de WhatsApp](https://whatsappbusiness.com/es-la/policy/) también limita enviar información sobre salud donde las normas lo prohíban. Además mete una promoción: un recordatorio con oferta deja de ser un recordatorio. Esto es orientación general, no asesoramiento legal: revisalo con quien te asesore, sobre todo si sos una institución de salud.

## Qué pasa con cada respuesta

| Si la persona responde | Qué tiene que pasar | Qué necesita |
| --- | --- | --- |
| "Sí, voy" | Marcar el turno como confirmado | Permiso para escribir en la agenda |
| "No llego" o "cambiámelo" | Ofrecer horarios y mover el turno | Leer y escribir en la agenda |
| "Cancelá" | Liberar el turno. Si tenés una lista de espera, recepción puede ofrecer el horario | Permiso para cancelar en la agenda |
| "No me escriban más" | Dejar de mandarle y anotarlo | La política de WhatsApp pide [respetar esas solicitudes](https://whatsappbusiness.com/es-la/policy/) |
| Una duda clínica | Pasarla a una persona | Regla en el contexto del asistente y estado **Necesita humano** |
| Un audio o una foto | El asistente usa la transcripción disponible o pide aclaración. La foto la revisa tu equipo | Consultas clínicas y documentación sensible van a una persona |
| Nada | Definir si se insiste o se llama | Tu criterio. Insistir por WhatsApp suma riesgo |

La respuesta entra como cualquier otro mensaje de texto, así que de ahí en adelante el asistente trabaja igual que siempre. Si la agenda está conectada, puede mover el turno. Si no, junta el pedido y lo deja para tu equipo. En [turnos y reservas](/servicios/turnos-whatsapp) está cómo funciona esa parte.

## Escribir primero: qué cambia entre la API oficial y el QR

Cuando un contacto te escribe y el asistente responde, la conversación la empezó esa persona. Con un recordatorio la empezás vos, y eso cambia las cosas. Elegís cómo conectar tu número: con la API oficial de Meta o con un QR. Para escribir primero conviene evaluar la API oficial, que es la vía pensada para eso. Mandar mensajes no solicitados desde un número vinculado por QR puede hacer que WhatsApp restrinja ese número, y por ninguna de las dos rutas te pueden prometer que no va a pasar.

La [política de WhatsApp](https://whatsappbusiness.com/es-la/policy/) dice que las personas pueden bloquear o reportar empresas, que sus sistemas pueden limitar los mensajes según esos comentarios y que WhatsApp puede limitar tu acceso si recibís demasiados comentarios negativos. Meta no publica un número de mensajes seguro.

Para bajar el riesgo, sin eliminarlo:

- Mandale solo a quien aceptó, y solo por un turno que pidió.
- Un mensaje por turno. Nada de insistir tres veces.
- Sin promociones.
- Sacá de la lista a quien pida no recibir más mensajes.
- Arrancá con una parte de la agenda y mirá cómo responde la gente.

## Qué vía mirar según tu agenda

| Tu situación | Qué mirar |
| --- | --- |
| Tu sistema de turnos ya manda recordatorios | Usá eso. No sumes otro aviso para el mismo turno |
| Pocos turnos por día y personas que ya te escriben | Mandalos a mano, o pedí un armado para tu agenda |
| Muchos turnos por día, o gente que nunca te escribió | Evaluá la API oficial de Meta, con plantillas |
| Ese número no puede quedar fuera de servicio | Evaluá la API oficial, o separá los avisos en otro canal |

En la plataforma oficial, si pasaron más de 24 horas desde el último mensaje de la persona, necesitás una plantilla aprobada. Un recordatorio sobre una cita que la persona pidió puede corresponder a la categoría de utilidad. Meta define la categoría y establece la tarifa según el tipo de mensaje entregado y el país del destinatario. [Política de mensajes](https://whatsappbusiness.com/es-la/policy/), [criterios para las plantillas](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization) y [tarifas vigentes](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing).

## Si hoy no tenés nada armado

Tu equipo puede seguir mandando recordatorios a mano desde el teléfono, y es una buena forma de aprender qué responde la gente antes de automatizar. Desde la bandeja de Atende, una conversación Finalizada hay que reabrirla para escribir.

Cuando la persona contesta, el asistente activo puede tomar el pedido de cambio aunque la agenda todavía no esté conectada. Tu equipo revisa la reserva, hace el cambio y confirma el horario. [Qué acciones se pueden conectar a tu sistema](/integraciones).

## Qué cambia según tu rubro

- Si un teléfono familiar recibe varios avisos, identificá la cita por su horario. [Recordatorio de turnos odontológicos](/blog/recordatorio-de-turnos-odontologicos).
- Si una clienta pide otro día para un color, buscá un bloque que alcance para todo el trabajo. [Recordatorios para peluquerías](/blog/recordatorio-de-turnos-para-peluquerias).
- Si el técnico hace varias visitas, indicá el rango de llegada y comprobá que alguien pueda abrir. [Recordatorio de visitas a domicilio](/blog/recordatorio-de-turnos-para-servicio-tecnico-a-domicilio).

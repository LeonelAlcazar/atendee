---
title: 'Recordatorios de turnos por WhatsApp: qué necesitan, cómo se arman y qué riesgo tienen'
seoTitle: 'Recordatorios de turnos por WhatsApp: qué necesitan y qué riesgo'
description: >-
  Un recordatorio de turno por WhatsApp necesita agenda conectada, disparador,
  consentimiento y respuesta prevista. Cómo se arma a pedido y cuándo usar la
  API.
summary: >-
  Un recordatorio de turno por WhatsApp sirve si la persona puede responder y el
  turno se mueve solo. Necesita cinco cosas: agenda conectada, un disparador que
  lo mande, consentimiento, un texto claro y un plan para cada respuesta. Atende
  no manda recordatorios por su cuenta: se arman a pedido para cada negocio.
  Escribir primero desde un número vinculado por QR tiene riesgo de restricción,
  sobre todo sin consentimiento o en volumen. Con muchos turnos, o si tu sistema
  de turnos ya los manda, puede convenirte otra vía.
publishedAt: '2026-11-06'
updatedAt: '2026-11-06'
category: guias
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
      No por su cuenta. Atende responde cuando entra un mensaje. Los recordatorios
      se arman a pedido para cada negocio, conectados a su agenda y con un
      disparador propio. Sin ese armado, tu equipo los manda a mano.
  - q: ¿Pueden bloquear mi número por mandar recordatorios?
    a: >-
      Hay riesgo. WhatsApp pide que cuentes con el permiso de cada persona, y puede
      limitar o suspender cuentas que reciben quejas o mandan mensajes no
      solicitados. En un número vinculado por QR nadie te puede garantizar que no
      lo restrinja.
  - q: ¿Necesito la API oficial para mandar recordatorios?
    a: >-
      No siempre, pero es la vía pensada para que una empresa escriba primero: fuera
      de la ventana de 24 horas usa plantillas aprobadas y Meta cobra por mensaje.
      Conviene mirarla si mandás muchos recordatorios o no podés arriesgar el
      número. Atende no ofrece esa vía.
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
    checkedAt: '2026-11-06'
  - title: 'Ley 25.326 de Protección de los Datos Personales (texto actualizado)'
    url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/64790/texact.htm'
    checkedAt: '2026-11-06'
---

El martes a la tarde, una paciente recibe el recordatorio de su turno del miércoles. Contesta "no llego", el asistente le ofrece otro horario y el turno queda movido. El miércoles a las 10:30 queda libre para otra persona. Un recordatorio de turnos por WhatsApp vale eso: el aviso importa, y lo que pasa cuando la persona contesta importa más.

Vamos de entrada con lo que hay. **Atende no manda recordatorios por su cuenta.** Responde cuando entra un mensaje. Los recordatorios se arman a pedido para cada negocio, conectados a su agenda, y escribir primero tiene un riesgo que conviene mirar antes de decidir.

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

**1. Una agenda conectada.** El recordatorio tiene que salir de la agenda real. Si recepción canceló un turno a las 9 y el mensaje sale a las 10, le recordás a alguien un turno que ya no existe. Por eso esta conexión lee los turnos del día siguiente y escribe los cambios.

**2. Un disparador.** Alguien tiene que decidir cuándo sale cada mensaje. El asistente de Atende trabaja cuando entra un mensaje, así que un recordatorio necesita un proceso aparte que mire la agenda y mande a una hora definida. Esa parte es la que se arma a pedido. Ojo con los feriados, los turnos dados hace cinco minutos y los que ya se confirmaron por otra vía.

**3. Consentimiento.** La [política de WhatsApp](https://whatsappbusiness.com/es-la/policy/) dice que solo podés contactar a alguien si te dio su número y tenés su permiso para mandarle mensajes. Pedilo al dar el turno, en palabras simples: "¿Te avisamos por WhatsApp el día antes?". [Meta pide](https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in) que quede claro quién va a escribir y que la persona acepte recibir esos mensajes.

**4. El texto.** Fecha, hora, lugar y qué hacer si no puede. Más abajo hay un ejemplo de qué dejar afuera.

**5. Un plan para cada respuesta.** Sin esto, solo mandaste un mensaje y le sumaste trabajo a recepción.

## Por qué la gente falta, y qué arregla un recordatorio

No tenemos una cifra para prometerte. Cuánto baja el ausentismo depende de tu rubro y de tu agenda, y cualquier número que veas sin fuente es una suposición. Lo que sí podemos hacer es separar los motivos:

- **Se olvidó.** Acá el recordatorio ayuda directo.
- **No podía y no tenía cómo avisar.** Acá ayuda si puede responder y cambiar el turno en el mismo chat. Si tiene que llamar a un teléfono ocupado, no avisa.
- **Le faltaba algo.** La orden, la autorización de la obra social, los estudios previos. Sirve si el aviso lo menciona con tiempo, no la noche anterior.
- **No le importa perder el lugar.** Un recordatorio no lo arregla. Ahí juegan la seña o la política de cancelación que tengas.

Medí lo tuyo antes y después: turnos dados, ausentes y huecos que pudiste volver a ocupar, mes a mes. Una lista de espera vale tanto como el recordatorio: un turno que se libera el día anterior solo sirve si tenés a quién ofrecérselo.

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
| "Cancelá" | Liberar el turno y avisar a la lista de espera si tenés | Escribir en la agenda |
| "No me escriban más" | Dejar de mandarle y anotarlo | La política de WhatsApp pide [respetar esas solicitudes](https://whatsappbusiness.com/es-la/policy/) |
| Una duda clínica | Pasarla a una persona | Regla en el contexto del asistente y estado **Necesita humano** |
| Un audio o una foto | Nada: no le llega a Atende | Alguien que mire el teléfono. Avisalo en el texto: "respondé por escrito" |
| Nada | Definir si se insiste o se llama | Tu criterio. Insistir por WhatsApp suma riesgo |

La respuesta entra como cualquier otro mensaje de texto, así que de ahí en adelante el asistente trabaja igual que siempre. Si la agenda está conectada, puede mover el turno. Si no, junta el pedido y lo deja para tu equipo. En [turnos y reservas](/servicios/turnos-whatsapp) está cómo funciona esa parte.

## El riesgo de escribir primero desde un número vinculado por QR

Cuando un contacto te escribe y el asistente responde, la conversación la empezó esa persona. Con un recordatorio la empezás vos, y eso cambia las cosas. Atende se conecta por QR y no es la API oficial de Meta. Mandar mensajes no solicitados desde un número vinculado por QR puede hacer que WhatsApp restrinja ese número, y nadie te puede prometer que no va a pasar.

La [política de WhatsApp](https://whatsappbusiness.com/es-la/policy/) dice que las personas pueden bloquear o reportar empresas, que sus sistemas pueden limitar los mensajes según esos comentarios y que WhatsApp puede limitar tu acceso si recibís demasiados comentarios negativos. Meta no publica un número de mensajes seguro.

Para bajar el riesgo, sin eliminarlo:

- Mandale solo a quien aceptó, y solo por un turno que pidió.
- Un mensaje por turno. Nada de insistir tres veces.
- Sin promociones.
- Sacá de la lista a quien pida no recibir más mensajes.
- Arrancá con una parte de la agenda y mirá cómo responde la gente.

Si tu número es el único canal de tu negocio, pensá qué pasaría si mañana no funciona.

## Cuándo otra vía te conviene más

| Tu situación | Qué mirar |
| --- | --- |
| Tu sistema de turnos ya manda recordatorios | Usá eso. No sumes otro aviso para el mismo turno |
| Pocos turnos por día y personas que ya te escriben | Mandalos a mano, o pedí un armado para tu agenda |
| Muchos turnos por día, o gente que nunca te escribió | Mirá la API oficial de WhatsApp, con un proveedor |
| Ese número no puede quedar fuera de servicio | Mirá la API oficial, o separá los avisos en otro canal |

La API oficial está pensada para que una empresa escriba primero. Según la [política](https://whatsappbusiness.com/es-la/policy/), fuera de las 24 horas desde el último mensaje de la persona solo podés usar plantillas aprobadas. Un recordatorio sin promoción, por un turno que la persona pidió, encaja en la descripción de [plantilla de utilidad](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization), aunque esa categoría la define Meta: los contenidos mixtos cuentan como marketing. Meta [cobra esos mensajes](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing) según el país, y hoy Atende no ofrece esa vía. Si es la que te conviene, buscá un proveedor de la API.

## Si hoy no tenés nada armado

Tu equipo puede seguir mandando recordatorios a mano desde el teléfono, y es una buena forma de aprender qué responde la gente antes de automatizar. Desde la bandeja de Atende, una conversación Finalizada hay que reabrirla para escribir.

Cuando la persona contesta, ahí sí el asistente toma la consulta. Eso funciona desde el primer día, sin conexión: junta el pedido y tu equipo confirma el cambio. Si tu negocio es de turnos, seguí por [clínicas y consultorios](/casos-de-uso/clinicas-y-consultorios) o [peluquerías y estética](/casos-de-uso/peluquerias-y-estetica). Acá está [qué se arma a pedido hoy](/integraciones).

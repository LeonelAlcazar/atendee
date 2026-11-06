---
title: 'Cómo automatizar WhatsApp en una administración de consorcios: el reclamo registrado y una persona que decide'
seoTitle: 'WhatsApp para administración de consorcios: reclamos y expensas'
description: >-
  Cómo registrar reclamos de edificios por WhatsApp, contestar expensas sin
  exponer datos de vecinos y actuar ante una filtración, con el administrador a cargo.
summary: >-
  Para automatizar el WhatsApp de una administración de consorcios, hacé que el
  asistente pida edificio, unidad y lugar exacto, y que registre el reclamo si
  está conectado a tu sistema. Puede contestar vencimientos y medios de pago.
  Saldos, responsabilidades y el llamado a un proveedor los decide una persona.
  Para una filtración de noche hace falta un número de guardia, porque Atende no
  llama a nadie.
publishedAt: '2026-09-10'
updatedAt: '2026-11-06'
category: inmuebles-y-hogar
sector: Administraciones de consorcios
tags:
  - WhatsApp
  - Administraciones de consorcios
  - Expensas
  - Reclamos
related:
  - como-automatizar-whatsapp-inmobiliarias
  - como-automatizar-whatsapp-servicios-tecnicos
faq:
  - q: ¿El asistente puede decirle a un vecino cuánto debe de expensas?
    a: >-
      Sin conexión, no: no conoce saldos. Conectado a tu sistema, sólo conviene
      si el número que escribe coincide con la unidad. La deuda de otra unidad
      no se comparte nunca por este canal.
  - q: ¿Qué hace Atende con una urgencia de noche?
    a: >-
      Contesta con el número de guardia que cargaste y marca el chat para tu
      equipo. No llama a nadie ni le avisa al plomero: la urgencia la tiene que
      tomar una persona por teléfono.
  - q: ¿Se puede mandar la liquidación de expensas por el asistente?
    a: >-
      En PDF, no: la biblioteca es de fotos y videos. Sí puede pasar por texto el
      link donde publicás las liquidaciones, si lo cargaste en tu configuración.
  - q: ¿Atende funciona en el grupo de WhatsApp del edificio?
    a: >-
      No. Los mensajes de grupos nunca llegan a Atende, así que un reclamo hecho
      ahí no existe para el asistente ni para la bandeja.
---
Antes de conectar el WhatsApp de la administración, decidí qué pasa con una filtración a las once de la noche. Atende puede tomar ese mensaje a cualquier hora, mientras el servicio y tu WhatsApp estén conectados, pedir edificio y unidad y, conectado a tu sistema de reclamos, devolverle al vecino el número de reclamo en el mismo chat. Esa conexión [se arma a pedido](/integraciones) para tu administración. Sin ella, el asistente junta los datos y tu equipo registra el reclamo.

Lo que no hace nunca es llamar al plomero, despertar al encargado ni resolver quién paga. En un consorcio esa línea tiene que estar escrita antes de escanear el QR. Si además alquilás, la [guía para inmobiliarias](/blog/como-automatizar-whatsapp-inmobiliarias) cubre esa parte, y [atención automática por WhatsApp](/servicios/atencion-automatica-whatsapp) y los [casos de uso](/casos-de-uso) muestran el resto.

## La filtración de las once de la noche

Una derivación deja el chat en Necesita humano y nada más. No suena ningún teléfono. Si tu guardia depende de que alguien abra la bandeja, a la noche no hay guardia.

Por eso una urgencia se resuelve con un número de teléfono dentro de la respuesta. Escribí en el Contexto del asistente qué cuenta como urgencia en tus edificios (agua que corre, olor a gas, alguien encerrado en el ascensor, corte general de luz) y qué número tiene que dar en esos casos. Que lo dé primero y después pida los datos. No le pidas que mida la gravedad: que aplique tu lista y, ante la duda, dé el número igual.

A las 12 horas del último mensaje del vecino ese chat pasa a finalizado, aunque siga marcado. Si el vecino vuelve a escribir, le contesta el asistente otra vez, sin saber qué hizo tu equipo a la mañana. Lo que importa de un reclamo abierto tiene que quedar en tu registro de reclamos.

## Un reclamo con edificio, unidad y número

Ejemplo ilustrativo, con el sistema de reclamos de la administración conectado.

> Vecina: Se está filtrando agua por el techo del baño.
>
> Asistente: Si el agua corre sin parar, llamá ahora a la guardia: [tu número de guardia]. ¿En qué edificio y unidad estás?
>
> Vecina: Edificio Alvear, 4B. Gotea, no para pero es poco.
>
> Asistente: Registré tu reclamo 3380: filtración en el baño del 4B. La administración define el próximo paso y te escribe por acá.

Fijate lo que el asistente no dijo. No dijo “ya avisamos al plomero”, porque no pasó. Tampoco “viene del 5B”, aunque la vecina lo dé por hecho. Quién es responsable de una humedad lo define la administración después de ver el lugar, y un chat no debería dejar a un vecino señalado.

Para que un reclamo sirva, tiene que traer:

- Edificio y unidad, antes que nada. “No anda el ascensor” sin dirección no le sirve a nadie si administrás varios.
- Si pasa en la unidad o en una parte común, y dónde exactamente.
- Desde cuándo pasa.
- Quién escribe: propietario, inquilino o encargado.

La foto de la mancha es lo primero que manda cualquiera, y es justo lo que Atende no recibe. Imágenes, audios y videos nunca llegan: ni el asistente ni tu equipo los encuentran en la bandeja, y el texto que acompañe la imagen desaparece también. Pedí la descripción por texto. Si la imagen hace falta, que tu equipo la mire en el teléfono de la administración.

## Expensas: qué se le contesta a cualquiera

| Consulta | Quién puede saberlo | Qué hace el asistente |
| --- | --- | --- |
| Vencimiento, medios de pago, dónde ver la liquidación | Cualquiera del edificio | Contesta con lo que cargaste, según el edificio |
| Por qué aumentaron este mes | Los del edificio | Cuenta lo que hayas cargado y, si no alcanza, deriva |
| Saldo de mi unidad | Quien la administración identifique | Deriva; conectado, sólo si el número coincide con la unidad |
| Deuda de otra unidad | Nadie por este canal | No responde y deriva |
| “Ya pagué, te mando el comprobante” | Tesorería | Dice adónde mandarlo |

La tabla deja afuera esto:

**El número no prueba quién escribe.** Un WhatsApp puede ser del inquilino, de un hijo o del anterior dueño. Si conectás saldos, la regla de identificación la pone el administrador.

**Los comprobantes de pago no llegan.** Una foto de la transferencia es una imagen, y un PDF del banco también queda afuera. Si tu asistente no dice adónde se mandan, vas a tener vecinos convencidos de que informaron un pago que nadie recibió en Atende.

**Cada edificio tiene su vencimiento.** Con varios consorcios, el asistente tiene que preguntar el edificio antes de contestar, porque una respuesta cargada para uno es falsa para otro. La liquidación en PDF tampoco la puede adjuntar. Sí puede mandar el link donde la publicás.

## Encargados, proveedores y el grupo del edificio

Apenas escaneás el QR, el asistente le contesta a cualquiera que escriba a ese número: el vecino, el encargado, el ascensorista que avisa que terminó y el contador. No hay modo de prueba: probalo desde otro número, que usa créditos, con un reclamo sin edificio y una pregunta por la deuda del vecino.

Con los proveedores conviene una instrucción simple: preguntar de qué edificio y qué trabajo se trata, y derivar. Una factura en PDF o un presupuesto en foto no van a entrar, así que el asistente tiene que dar el mail de la administración. No debería confirmar un trabajo, una fecha de pago ni una autorización. La guía de [servicios técnicos](/blog/como-automatizar-whatsapp-servicios-tecnicos) muestra cómo trabaja del otro lado quien te repara el ascensor.

Y el grupo de vecinos queda afuera. Los mensajes de grupos nunca llegan a Atende, así que un reclamo que se discute ahí no existe para el asistente. Si en tus edificios todo pasa por el grupo, vale la pena avisar por ahí cuál es el número para reclamos.

## Una etiqueta por edificio

La bandeja compartida no sabe de edificios hasta que vos se lo decís. Armá una etiqueta por consorcio y filtrá por ella: es la manera de ver qué hay abierto en cada dirección, porque el buscador sólo trabaja con nombre y teléfono, nunca con lo que dice el mensaje. Un Responsable por cartera de edificios reparte el trabajo. Las Notas internas guardan lo que el vecino no tiene que ver, como “el 5B ya tuvo este problema”; el asistente no las lee.

Las etiquetas las pone tu equipo: el asistente no las asigna solo.

Si un vecino viene con un conflicto que no querés dejar en manos del asistente, marcá el chat como Necesita humano: mandarle un mensaje desde la bandeja no lo frena.

## Lo que decide el administrador

Hay temas que siempre van a una persona, y conviene escribirlos como lista en el Contexto del asistente:

- Quién paga una reparación y si se llama a un proveedor.
- Expensas extraordinarias y lo que se resolvió en asamblea.
- Peleas entre vecinos por ruidos, mascotas o cocheras.
- Multas, intimaciones y cualquier deuda que esté en manos de un abogado.

¿Y avisar un corte de agua a todo el edificio? Atende no hace difusiones masivas. Un recordatorio puntual, como el vencimiento para quien lo pidió, se puede armar a pedido, pero mandar mensajes que nadie pidió a una lista de propietarios desde un número vinculado por QR, fuera de la API oficial de Meta, puede traer restricciones. El cartel y el grupo siguen siendo mejores para eso.

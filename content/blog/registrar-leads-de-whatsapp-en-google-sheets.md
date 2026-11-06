---
title: 'Registrar leads de WhatsApp en Google Sheets: cómo lo hace un asistente y qué necesita'
seoTitle: 'WhatsApp y Google Sheets: registrar leads con un asistente'
description: >-
  Cómo un asistente de WhatsApp anota un interesado en Google Sheets: la demo real
  de Atende, qué necesita una conexión así y por qué puede duplicar filas.
summary: >-
  Un asistente de WhatsApp puede anotar un interesado en una planilla si tiene
  una herramienta conectada: junta nombre, número, modelo y comentarios, escribe
  la fila y recién ahí confirma. Atende tiene una demo real para una
  concesionaria de motos que lo hace en Google Sheets. Es una demo, no un
  conector que prendés desde el panel: cada conexión se arma a pedido para tu
  negocio y necesita autenticación. Hoy, si un proceso se repite, puede agregar
  una fila duplicada, así que una versión real tiene que controlarlo.
publishedAt: '2026-11-06'
updatedAt: '2026-11-06'
category: guias
tags:
  - Google Sheets
  - leads
  - integraciones
  - concesionarias
related:
  - agente-de-ia-para-whatsapp
  - como-automatizar-whatsapp-venta-de-motos
  - como-automatizar-whatsapp-concesionaria
  - cotizaciones-por-whatsapp-automaticas
faq:
  - q: ¿Atende se conecta con Google Sheets?
    a: >-
      Tenemos una demo real para una concesionaria de motos que consulta stock y
      financiación y registra interesados en Google Sheets. No es un conector
      genérico: una conexión para tu planilla se arma a pedido para tu negocio.
  - q: ¿Qué datos anota el asistente en la planilla?
    a: >-
      En la demo escribe nombre, número, modelo de interés, estado y comentarios
      del asistente. El estado siempre arranca como NO ATENDIDO y la columna
      Tomado por queda con un guion. En una conexión para tu negocio, las
      columnas se definen con vos.
  - q: ¿Puede duplicar filas?
    a: >-
      Sí. La demo agrega una fila cada vez que corre y no revisa si esa persona
      ya está. Si un proceso se repite después de un corte, o el contacto vuelve
      a consultar, puede aparecer otra fila. Una conexión real tiene que buscar
      antes de escribir.
  - q: ¿Qué pasa si no tengo la conexión armada?
    a: >-
      El asistente junta nombre, modelo y consulta en la conversación, y tu
      equipo los pasa a mano desde la bandeja. Si entran pocos interesados por
      semana, esa forma de trabajar puede alcanzarte.
sources:
  - title: 'Google for Developers: leer y escribir valores con la API de Sheets'
    url: 'https://developers.google.com/workspace/sheets/api/guides/values'
    checkedAt: '2026-11-06'
---

A las nueve de la noche alguien pregunta por una moto y deja su nombre. A la mañana, tu vendedor abre la planilla y ve una fila nueva: nombre, número, modelo, estado NO ATENDIDO y un comentario del asistente que resume lo que pidió. Nadie copió nada del celular.

Eso hace nuestra demo para una concesionaria de motos, conectada a una planilla de Google Sheets. La usamos para mostrar cómo funciona una acción real. Es una demo, no un cliente, y tampoco es un conector que prendés desde el panel. Abajo te contamos cómo está hecha, qué le faltaría para usarla en tu negocio y qué falla todavía.

## La fila que aparece en la planilla

La hoja de interesados de la demo tiene seis columnas, en este orden. El contenido es inventado:

| Nombre | Numero | Moto | Estado | Tomado por | comentarios del asistente |
| --- | --- | --- | --- | --- | --- |
| Marina | +54 351 000 0000 | 150 roja | NO ATENDIDO | - | Quiere ver cuotas. Pidió que la llamen a la tarde. |

Las dos columnas del medio son para tu equipo. La herramienta siempre escribe NO ATENDIDO y un guion, y no puede cambiarlos. Quien toma el interesado edita la planilla a mano, como ya hace cualquier vendedor con su lista.

## La conversación que escribe esa fila

Ejemplo ilustrativo, con la planilla de la demo conectada:

> Contacto: ¿Tienen la 150 en rojo?
>
> Asistente: Sí, quedan dos en rojo. ¿Querés que te calcule las cuotas?
>
> Contacto: Después. Prefiero que me llame un vendedor a la tarde
>
> Asistente: Dale. ¿Me pasás tu nombre?
>
> Contacto: Marina
>
> Asistente: Listo, Marina. Te anoté como interesada en la 150 roja y dejé el pedido de que te llamen a la tarde.

Fijate lo que no pasó: no le pidió el teléfono. Lo toma de la conversación, porque ya sabe desde qué número le escribieron. Y el último mensaje sale después de que la planilla devolvió la fila escrita. Si no la devuelve, el asistente no tiene nada que confirmar.

La misma demo trae otras cuatro herramientas: listar el stock, buscar una moto por modelo, marca o color, ver las formas de pago y calcular la financiación. Todas leen la planilla en cada consulta, así que un precio actualizado ahí vale desde la próxima respuesta. El cálculo de cuotas es una simulación comercial: no reemplaza una cotización financiera contractual.

## Las reglas que evitan una planilla sucia

El trabajo de una conexión está en lo que rechaza. La demo tiene estas reglas, y una versión para tu negocio debería tener las suyas:

- **Nada de nombres de relleno.** Si el asistente intenta guardar "Cliente interesado" o "sin dato", la herramienta lo rebota. Tiene que pedir el nombre real.
- **Teléfono con al menos seis dígitos.** Si el dato no alcanza, la fila no se escribe.
- **Texto crudo.** Los datos entran [sin interpretar](https://developers.google.com/workspace/sheets/api/guides/values), así que un mensaje que empiece con `=` no se ejecuta como fórmula.
- **Columnas controladas.** Antes de escribir, la herramienta revisa que las columnas sigan en su lugar. Si alguien las movió, falla en vez de escribir el teléfono en la columna de la moto.
- **Error honesto.** Cuando algo falla, la herramienta devuelve el error y el asistente está armado para no decir que anotó.

## Qué hace falta para una conexión así en tu negocio

1. **Una planilla con estructura fija.** Definís qué hojas y columnas existen, y quién las toca. Si tu equipo cambia encabezados cada semana, primero hay que ordenar eso.
2. **Un acceso propio.** La demo usa una cuenta de servicio de Google con permiso de edición sobre esa planilla. No hace falta darle a nadie tu contraseña.
3. **Un servidor que hable con la planilla.** Corre en un servidor y expone las herramientas que el asistente puede usar. Eso lo armamos nosotros.
4. **Autenticación.** La conexión se carga en tu espacio como herramienta conectada, con credenciales para que nadie más pueda usarla.
5. **Instrucciones claras.** En el contexto del asistente le decís cuándo un contacto cuenta como interesado. No todo el que pregunta un precio lo es.
6. **Alguien que mire la planilla.** La fila no le avisa a nadie. Si nadie filtra los NO ATENDIDO a la mañana, el interesado se enfría igual que antes.

Esa conexión se arma a pedido para tu negocio, con tus columnas y tus reglas. Mirá [el estado de cada acción](/integraciones).

## Lo que todavía falla, y que hay que resolver

**Puede duplicar filas.** La herramienta agrega una fila cada vez que corre, sin mirar si esa persona ya está. Pasa en dos casos. Un proceso puede repetirse después de un corte, y la herramienta no recibe ninguna señal de que ese trabajo ya se hizo. Y el mismo contacto puede volver a consultar otro día. Una conexión real tiene que buscar antes de escribir: si ya hay una fila con ese número y ese modelo, actualiza el comentario en vez de sumar otra.

**La demo no tiene autenticación propia.** Su dirección no pide credenciales y depende de restricciones de red. Sirve para mostrar el funcionamiento. Una conexión real necesita autenticación antes de ver un solo dato de tus clientes.

**Si la conexión no carga, no te enterás.** La conversación sigue sin esa herramienta, el asistente no puede anotar y hoy el panel no lo marca. Por eso conviene revisar la planilla contra la bandeja, sobre todo al principio. En la bandeja ves toda la conversación, pero todavía no muestra qué herramienta usó el asistente; lo tenemos planeado.

**Una planilla compartida tiene datos personales.** Nombres y teléfonos de personas reales quedan a la vista de quien tenga el enlace. Compartila solo con quien la necesita y no la dejes abierta a cualquiera que tenga el enlace.

## Si todavía no querés una conexión

Sin conexión no hay fila. El asistente junta nombre, modelo y consulta en la conversación, y tu equipo los pasa a mano desde la bandeja, con etiquetas para no perderlos. Si entran pocos interesados por semana, eso alcanza y no justifica armar nada.

Vale la pena pedirla cuando alguien pasa un rato todos los días copiando del celular a la planilla, o cuando los interesados de la noche se pierden hasta que alguien los carga. Si vendés vehículos o propiedades, mirá [concesionarias e inmobiliarias](/casos-de-uso/concesionarias-e-inmobiliarias). Si querés ver cómo se relaciona esto con el resto de las acciones, seguí con [qué es un agente de IA para WhatsApp](/blog/agente-de-ia-para-whatsapp).

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { estimateResponses, type EstimatePlan } from '@/lib/response-estimate';
import { buildWaLink } from '@/lib/wa';

const number = new Intl.NumberFormat('es-AR');
const inputStyle = 'mt-2 block min-h-12 w-full rounded-md border-2 border-ink bg-surface px-3 py-2 font-mono text-lg';

export function ResponseEstimator({ plans }: { plans: EstimatePlan[] }) {
  const [ready, setReady] = useState(false);
  const [chats, setChats] = useState('');
  const [replies, setReplies] = useState('');
  useEffect(() => setReady(true), []);

  const estimate = estimateResponses(Number(chats), Number(replies), plans);
  const message = estimate
    ? `Hola, quiero cotizar Atende. Estimo ${number.format(estimate.total)} respuestas del asistente al mes para ${number.format(Number(chats))} conversaciones.${estimate.match ? ` Vi el plan ${estimate.match.name}.` : ''} ¿Qué plan y conexión necesita mi negocio?`
    : 'Hola, quiero saber qué plan y qué conexión necesita mi negocio para atender por WhatsApp.';

  return (
    <section
      id="calculadora"
      aria-labelledby="titulo-calculadora"
      className="border-b-2 border-ink bg-forest py-14 text-bg md:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h2 id="titulo-calculadora" className="max-w-xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
            ¿Cuántas respuestas necesita tu negocio al mes?
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed">
            Multiplicá las conversaciones que atendería el asistente por las veces que contestaría en un chat típico. Cada respuesta usa una unidad del plan.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-bg/80">
            Por ejemplo, con la agenda conectada, ofrecer un horario y confirmar el turno lleva 2 respuestas. Si ese chat se repite 300 veces, estimá 600 respuestas al mes.
          </p>
        </div>
        <div className="min-w-0 rounded-lg border-2 border-ink bg-bg p-5 text-ink shadow-[var(--shadow-brut)] sm:p-7">
          <fieldset disabled={!ready} className="grid min-w-0 gap-4 sm:grid-cols-2">
            <legend className="sr-only">Calculadora de respuestas de WhatsApp</legend>
            <label className="font-semibold" htmlFor="chats-al-mes">
              Conversaciones al mes
              <input
                id="chats-al-mes"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                placeholder="Ej. 300"
                className={inputStyle}
                value={chats}
                onChange={(event) => setChats(event.target.value)}
              />
            </label>
            <label className="font-semibold" htmlFor="respuestas-por-chat">
              Respuestas por chat
              <input
                id="respuestas-por-chat"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                placeholder="Ej. 2"
                className={inputStyle}
                value={replies}
                onChange={(event) => setReplies(event.target.value)}
              />
            </label>
          </fieldset>
          <noscript><p className="mt-4">Activá JavaScript para calcular con tus números.</p></noscript>
          <div aria-live="polite" aria-atomic="true" className="mt-5 border-t border-ink/25 pt-4">
            {estimate ? (
              <>
                <p className="break-words font-display text-2xl font-semibold">{number.format(estimate.total)} respuestas por mes</p>
                {estimate.match ? (
                  <p className="mt-2 leading-relaxed">
                    El plan {estimate.match.name} cubre ese volumen con hasta {number.format(estimate.match.monthlyAgentResponseLimit)} respuestas mensuales incluidas. La conexión con tu sistema se cotiza aparte.
                  </p>
                ) : (
                  <p className="mt-2 leading-relaxed">
                    Consultanos cómo cubrir ese volumen con los planes y créditos disponibles para tu espacio.
                  </p>
                )}
              </>
            ) : (
              <p className="leading-relaxed text-mute">
                Ingresá dos números enteros mayores que cero para comparar tu estimación con los planes publicados.
              </p>
            )}
          </div>
          <Button
            href={buildWaLink(message)}
            data-cta="pricing-estimate-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 w-full sm:w-auto"
          >
            Consultar mi plan por WhatsApp ↗
          </Button>
        </div>
      </div>
    </section>
  );
}

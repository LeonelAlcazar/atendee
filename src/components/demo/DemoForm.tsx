'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, Plus } from 'lucide-react';
import { site } from '@/content/site';
import {
  buildLeadMessage,
  demoSystems,
  demoTasks,
  demoVolumes,
  getDemoContext,
} from '@/lib/leads';
import { buildWaLink, waRef } from '@/lib/wa';
import { trackConversion } from '@/lib/conversions';
import { recordDemoStarted, recordPreparedDemo } from '@/lib/metrics';
import { Button } from '@/components/ui/Button';

// Large, calm fields. Each label wraps its field, so the field resets the
// label's weight. :user-invalid marks a field only after the visitor touched
// it or tried to send; the browser still shows its own message.
const label = 'block text-[0.9375rem] font-semibold';
const control =
  'w-full rounded-xl bg-surface px-4 text-base font-normal text-ink ring-1 ring-inset ring-line-strong ' +
  'transition-shadow duration-200 placeholder:text-muted hover:ring-ink/30 ' +
  'user-invalid:ring-2 user-invalid:ring-coral-strong';
const field = `${control} mt-2 block h-14`;
// The chevron replaces the native arrow. A required select still on its empty
// choice reads as a placeholder.
const select = `${control} block h-14 appearance-none pr-12 invalid:text-muted [&>option]:text-ink`;
const chevron =
  'pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted';
const textLink =
  'inline-flex min-h-11 min-w-11 items-center gap-1.5 font-semibold text-coral-strong underline-offset-4 hover:underline';
// The draft's links keep one line on phones and grow to the large size above.
const draftButton = 'sm:min-h-13 sm:px-7 sm:text-[1.0625rem]';

export function DemoForm() {
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');
  const [task, setTask] = useState('');
  // The optional questions start folded. Folded fields stay in the form, so
  // whatever the visitor wrote is still sent.
  const [moreOpen, setMoreOpen] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const taskEdited = useRef(false);
  const source = useRef<string | undefined>(undefined);
  useEffect(() => {
    const context = getDemoContext(new URLSearchParams(window.location.search));
    if (context) {
      source.current = context.source;
      if (context.task && !taskEdited.current) setTask(context.task);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (message) preview.current?.focus();
  }, [message]);

  function openDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const company = String(form.get('company') ?? '').trim();
    const input = event.currentTarget.elements.namedItem(
      'company',
    ) as HTMLInputElement;
    input.setCustomValidity(company ? '' : 'Ingresá el nombre de tu negocio.');
    if (!event.currentTarget.reportValidity()) return;
    const draft = buildLeadMessage({
      company,
      task: String(form.get('task') ?? ''),
      system: String(form.get('system') ?? ''),
      volume: String(form.get('volume') ?? ''),
      notes: String(form.get('notes') ?? ''),
      source: source.current,
    });
    setMessage(draft);
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const destination =
      submitter instanceof HTMLButtonElement && submitter.value === 'email'
        ? 'email'
        : 'whatsapp';
    recordPreparedDemo(destination);
    trackConversion({
      event: 'atende_demo_prepared',
      page: '/demo',
      placement: 'demo-form',
    });
    trackConversion({
      event: 'atende_cta_click',
      page: '/demo',
      destination,
      placement: `demo-${destination}`,
    });
    window.location.assign(
      destination === 'whatsapp'
        ? buildWaLink(draft)
        : `mailto:${site.email}?subject=${encodeURIComponent('Demo de Atende para mi negocio')}&body=${encodeURIComponent(draft)}`,
    );
  }

  return (
    <div className="rounded-4xl bg-surface p-6 shadow-float md:p-9">
      <h2 className="text-title">Pedí una demo para tu negocio</h2>
      <p className="mt-3 leading-relaxed text-muted">
        Con el nombre de tu negocio y una tarea alcanza. Revisás y enviás el
        mensaje desde WhatsApp o email. Los campos con * son obligatorios.
      </p>
      <noscript>
        <div className="mt-5 rounded-2xl bg-bg p-4 leading-relaxed">
          <p>
            Si el formulario no se activa, escribinos directo por WhatsApp o
            email.
          </p>
          <div className="mt-1 flex flex-wrap gap-x-6">
            <a
              href={buildWaLink(
                'Hola, quiero pedir una demo de Atende para mi negocio',
                waRef('/demo', 'sin formulario'),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={textLink}
            >
              WhatsApp ↗
            </a>
            <a href={`mailto:${site.email}`} className={textLink}>
              Email
            </a>
          </div>
        </div>
      </noscript>
      <form
        onSubmit={openDraft}
        className="mt-7"
        onChange={(event) => {
          setMessage('');
          const input = event.target;
          if (
            event.nativeEvent.isTrusted &&
            ((input instanceof HTMLInputElement && input.name === 'company') ||
              (input instanceof HTMLSelectElement && input.name === 'task'))
          )
            recordDemoStarted();
        }}
      >
        <fieldset
          disabled={!ready}
          className="grid min-w-0 gap-5 disabled:opacity-60"
        >
          <legend className="sr-only">Datos para pedir una demo</legend>
          <label className={label} htmlFor="company">
            Tu negocio *
            <input
              id="company"
              name="company"
              autoComplete="organization"
              required
              maxLength={100}
              onInput={(event) => event.currentTarget.setCustomValidity('')}
              className={field}
            />
          </label>
          <label className={label} htmlFor="task">
            ¿Qué querés automatizar primero? *
            <span className="relative mt-2 block">
              <select
                id="task"
                name="task"
                required
                value={task}
                onChange={(event) => {
                  taskEdited.current = true;
                  setTask(event.currentTarget.value);
                }}
                className={select}
              >
                <option value="" disabled>
                  Elegí una tarea
                </option>
                {demoTasks.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <ChevronDown size={18} aria-hidden="true" className={chevron} />
            </span>
          </label>
          <div className="rounded-2xl bg-bg/70">
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-controls="demo-contexto"
              onClick={() => setMoreOpen((open) => !open)}
              className="group flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-4 text-left text-[0.9375rem] font-semibold"
            >
              Sumar contexto (opcional)
              <span
                className="grid size-8 shrink-0 place-items-center rounded-full bg-surface shadow-card transition-[transform,background-color,color] duration-300 ease-smooth group-aria-expanded:rotate-45 group-aria-expanded:bg-ink group-aria-expanded:text-white"
                aria-hidden="true"
              >
                <Plus size={16} strokeWidth={2} />
              </span>
            </button>
            <div
              id="demo-contexto"
              hidden={!moreOpen}
              className="grid gap-5 px-4 pb-5 pt-1"
            >
              <label className={label} htmlFor="system">
                ¿Dónde llevás esa tarea hoy?
                <span className="relative mt-2 block">
                  <select
                    id="system"
                    name="system"
                    defaultValue=""
                    className={select}
                  >
                    <option value="">Lo vemos juntos</option>
                    {demoSystems.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} aria-hidden="true" className={chevron} />
                </span>
              </label>
              <label className={label} htmlFor="volume">
                Consultas por WhatsApp al mes
                <span className="relative mt-2 block">
                  <select
                    id="volume"
                    name="volume"
                    defaultValue=""
                    className={select}
                  >
                    <option value="">Elegí un rango (opcional)</option>
                    {demoVolumes.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} aria-hidden="true" className={chevron} />
                </span>
              </label>
              <label className={label} htmlFor="notes">
                Algo más que debamos saber
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  maxLength={600}
                  className={`${control} mt-2 block min-h-28 py-3 leading-relaxed`}
                  aria-describedby="notes-help"
                />
                <span
                  id="notes-help"
                  className="mt-2 block text-sm font-normal leading-relaxed text-muted"
                >
                  Por ejemplo tu rubro, cómo se llama tu sistema o cuántas
                  personas atienden. Hasta 600 caracteres.
                </span>
              </label>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Revisá el borrador y envialo desde tu WhatsApp o email para que te contactemos.{' '}
            <Link
              href="/politica-de-privacidad"
              className="font-medium text-ink underline underline-offset-4 hover:text-coral-strong"
            >
              Política de privacidad
            </Link>
            .
          </p>
          <div className="grid gap-1">
            <button
              type="submit"
              name="channel"
              value="whatsapp"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-coral-fill px-7 py-3 text-center text-[1.0625rem] font-semibold leading-tight tracking-[-0.01em] text-white shadow-cta transition-[transform,background-color,box-shadow] duration-200 ease-smooth hover:bg-coral-strong active:scale-[0.97]"
            >
              Revisar en WhatsApp
            </button>
            <button
              type="submit"
              name="channel"
              value="email"
              className="min-h-11 justify-self-center rounded-full px-4 text-[0.9375rem] font-semibold text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:decoration-ink"
            >
              Prefiero usar email
            </button>
          </div>
        </fieldset>
      </form>
      {message && (
        <div
          ref={preview}
          tabIndex={-1}
          className="mt-8 rounded-3xl bg-forest-tint p-4 sm:p-6"
        >
          <h3 className="flex items-center gap-3 text-title">
            <span
              className="grid size-9 shrink-0 place-items-center rounded-full bg-coral text-white"
              aria-hidden="true"
            >
              <Check size={18} strokeWidth={3} />
            </span>
            Tu mensaje está listo para enviar
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            Si el borrador no se abrió, usá uno de estos enlaces. Revisá el
            mensaje y envialo desde el canal que elijas.
          </p>
          <p className="mt-4 whitespace-pre-wrap break-words rounded-2xl bg-surface p-4 text-sm leading-relaxed">
            {message}
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <Button
              href={buildWaLink(message)}
              data-cta="demo-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className={draftButton}
            >
              Volver a abrir WhatsApp
            </Button>
            <Button
              href={`mailto:${site.email}?subject=${encodeURIComponent('Demo de Atende para mi negocio')}&body=${encodeURIComponent(message)}`}
              data-cta="demo-email"
              variant="outline"
              className={draftButton}
            >
              Preparar email
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

import { describe, expect, it } from 'vitest';
import {
  buildDemoLink,
  buildLeadMessage,
  demoSystems,
  demoTaskForRubro,
  demoTasks,
  demoVolumes,
} from './leads';
import { rubros } from '@/content/rubros';
import { buildWaLink } from './wa';

describe('qualified sales inquiry', () => {
  it('prepares an honest draft with only the business and task', () => {
    expect(
      buildLeadMessage({ company: '  Mi comercio  ', task: demoTasks[2] }),
    ).toBe(
      [
        'Hola, quiero pedir una demo de Atende para mi negocio.',
        'Negocio: Mi comercio',
        `Tarea que quiero sacarme de encima: ${demoTasks[2]}`,
        'Origen: atende.com.ar/demo',
      ].join('\n'),
    );
  });

  it('leaves unanswered optional questions out of the draft', () => {
    const message = buildLeadMessage({
      company: 'Mi comercio',
      task: demoTasks[2],
      system: '  ',
      volume: '',
      notes: '\n ',
    });
    expect(message).not.toMatch(/Hoy la llevo|Consultas por WhatsApp|Contexto:/);
    expect(message).not.toMatch(/undefined|null/);
  });

  it('preserves Spanish text, business context and line breaks through WhatsApp encoding', () => {
    const message = buildLeadMessage({
      company: '  Muñoz & Hijos  ',
      task: 'Consultar stock y registrar pedidos',
      system: 'Una planilla',
      volume: 'Entre 100 y 500',
      notes: 'CRM: ¿se puede conectar?\nEquipo de 3 personas.',
    });
    const url = new URL(buildWaLink(message));
    expect(url.hostname).toBe('wa.me');
    expect(url.searchParams.get('text')).toBe(message);
    expect(message).toContain('Negocio: Muñoz & Hijos\n');
    expect(message).toContain(
      'Tarea que quiero sacarme de encima: Consultar stock y registrar pedidos\n',
    );
    expect(message).toContain('Hoy la llevo en: Una planilla\n');
    expect(message).toContain('Equipo de 3 personas.');
    expect(message).toContain('Origen: atende.com.ar/demo');
  });
  it('omits blank optional notes and limits free text in outbound URLs', () => {
    const details = {
      company: 'A'.repeat(150),
      task: 'Tomar reservas',
      system: 'Otro',
      volume: 'Todavía no lo sé',
      notes: '   ',
    };
    expect(buildLeadMessage(details)).not.toContain('Contexto:');
    expect(buildLeadMessage(details)).not.toContain('A'.repeat(101));
    expect(
      buildLeadMessage({ ...details, notes: 'B'.repeat(700) }),
    ).not.toContain('B'.repeat(601));
  });
  it('asks about tasks first, and offers an exit for undecided businesses', () => {
    expect(demoTasks[0]).toContain('turnos');
    expect(demoTasks).toContain('Todavía no lo sé');
    expect(demoVolumes).toContain('Todavía no lo sé');
    expect(demoSystems).toContain('Papel o de memoria');
  });
});

describe('rubro demo context', () => {
  it('offers an editable task preset for every published rubro', () => {
    for (const rubro of rubros) {
      const url = new URL(buildDemoLink(rubro.slug), 'https://www.atende.com.ar');
      expect(url.pathname).toBe('/demo');
      expect(url.searchParams.get('rubro')).toBe(rubro.slug);
      expect(demoTasks).toContain(demoTaskForRubro(rubro.slug));
    }
    expect(demoTaskForRubro('restaurantes-y-hoteles')).toBe('Tomar reservas');
    expect(demoTaskForRubro('clinicas-y-consultorios')).toBe(demoTasks[0]);
    expect(demoTaskForRubro('comercios-y-distribuidoras')).toBe(demoTasks[2]);
    expect(demoTaskForRubro('concesionarias-e-inmobiliarias')).toBe(demoTasks[3]);
    expect(demoTaskForRubro('servicios-profesionales')).toBe(demoTasks[4]);
  });

  it('includes only catalogued source pages and keeps the task the visitor chose', () => {
    const message = buildLeadMessage({
      company: 'Mi hotel',
      task: demoTasks[5],
      rubro: 'restaurantes-y-hoteles',
    });
    expect(message).toContain(
      `Tarea que quiero sacarme de encima: ${demoTasks[5]}`,
    );
    expect(message).toContain(
      'Caso de uso: atende.com.ar/casos-de-uso/restaurantes-y-hoteles',
    );
  });

  it('ignores unknown and inherited query values instead of copying them into drafts', () => {
    for (const rubro of [
      'otra-cosa',
      '__proto__',
      'constructor',
      'https://example.com/?email=persona@example.com',
    ]) {
      expect(demoTaskForRubro(rubro)).toBeUndefined();
      expect(buildDemoLink(rubro)).toBe('/demo');
      expect(
        buildLeadMessage({ company: 'Mi negocio', task: demoTasks[7], rubro }),
      ).not.toContain('Caso de uso:');
    }
    expect(demoTaskForRubro(null)).toBeUndefined();
  });
});

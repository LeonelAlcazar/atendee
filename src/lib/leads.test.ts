import { describe, expect, it } from 'vitest';
import { buildLeadMessage, demoSystems, demoTasks, demoVolumes } from './leads';
import { buildWaLink } from './wa';

describe('qualified sales inquiry', () => {
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

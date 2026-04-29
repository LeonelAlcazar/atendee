export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

// PLACEHOLDER NUMBERS — replace with real, defensible figures before launch.
// See spec section 12, item 1.
export const stats: Stat[] = [
  { value: 80, suffix: '%', prefix: '+', label: 'Consultas resueltas sin humano' },
  { value: 60, suffix: '%', prefix: '-', label: 'Tiempo promedio de respuesta' },
  { value: 24, suffix: '/7', label: 'Atención sin pausa' },
];

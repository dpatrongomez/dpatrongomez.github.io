/**
 * Fechas y duraciones calculadas en build time.
 *
 * Módulo puro: sin dependencias y sin `node:*`. Las fechas son meses en formato
 * `"YYYY-MM"` (p. ej. `"2025-01"`), y `null` como fin significa "actualidad".
 *
 * Convención de duración: meses naturales inclusivos en ambos extremos, es
 * decir, `ene. 2024 - ene. 2025` son 13 meses (1 año 1 mes). Es la misma
 * convención con la que estaban escritos a mano los textos originales.
 */

const MONTHS_ES = [
  "ene.", "feb.", "mar.", "abr.", "may.", "jun.",
  "jul.", "ago.", "sept.", "oct.", "nov.", "dic.",
];

/** Mes actual como `"YYYY-MM"`. Se evalúa en build time. */
export function currentYearMonth(now: Date = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function parseYearMonth(value: string): { year: number; month: number } {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

/** Meses naturales entre dos meses, ambos incluidos. */
export function monthsBetween(start: string, end: string): number {
  const s = parseYearMonth(start);
  const e = parseYearMonth(end);
  return (e.year - s.year) * 12 + (e.month - s.month) + 1;
}

/** `84` => `"7 años"`, `14` => `"1 año 2 meses"`, `1` => `"1 mes"`. */
export function formatDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} ${years === 1 ? "año" : "años"}`);
  if (months || parts.length === 0) parts.push(`${months} ${months === 1 ? "mes" : "meses"}`);
  return parts.join(" ");
}

/** `"2025-01"` => `"ene. 2025"`. */
export function formatMonthES(value: string): string {
  const { year, month } = parseYearMonth(value);
  return `${MONTHS_ES[month - 1]} ${year}`;
}

/** Rango con duración: `"ene. 2025 - actualidad · 1 año 10 meses"`. */
export function formatPeriodES(start: string, end: string | null, now: string = currentYearMonth()): string {
  const from = formatMonthES(start);
  const to = end ? formatMonthES(end) : "actualidad";
  return `${from} - ${to} · ${formatDuration(monthsBetween(start, end ?? now))}`;
}

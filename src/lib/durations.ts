/**
 * Fechas y duraciones calculadas en build time.
 *
 * Módulo puro, sin `node:*`. Las fechas son meses en formato
 * `"YYYY-MM"` (p. ej. `"2025-01"`), y `null` como fin significa "actualidad".
 *
 * Convención de duración: meses naturales inclusivos en ambos extremos, es
 * decir, `ene. 2024 - ene. 2025` son 13 meses (1 año 1 mes). Es la misma
 * convención con la que estaban escritos a mano los textos originales.
 */

import { defaultLang, type Lang } from "../i18n";

const months: Record<Lang, string[]> = {
  es: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const durationLabels = {
  es: { year: "año", years: "años", month: "mes", months: "meses", present: "actualidad" },
  en: { year: "year", years: "years", month: "month", months: "months", present: "present" },
};

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
export function formatDuration(totalMonths: number, lang: Lang = defaultLang): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const labels = durationLabels[lang];
  const parts: string[] = [];
  if (years) parts.push(`${years} ${years === 1 ? labels.year : labels.years}`);
  if (months || parts.length === 0) parts.push(`${months} ${months === 1 ? labels.month : labels.months}`);
  return parts.join(" ");
}

/** `"2025-01"` => `"ene. 2025"`. */
function formatMonth(value: string, lang: Lang): string {
  const { year, month } = parseYearMonth(value);
  return `${months[lang][month - 1]} ${year}`;
}

/** Rango con duración: `"ene. 2025 - actualidad · 1 año 10 meses"`. */
export function formatPeriod(start: string, end: string | null, lang: Lang = defaultLang, now: string = currentYearMonth()): string {
  const from = formatMonth(start, lang);
  const to = end ? formatMonth(end, lang) : durationLabels[lang].present;
  return `${from} - ${to} · ${formatDuration(monthsBetween(start, end ?? now), lang)}`;
}

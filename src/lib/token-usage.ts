/**
 * Consumo de tokens: formato es-ES, series completas y geometría del gráfico de
 * `#tokens`.
 *
 * Módulo puro: sin dependencias y sin `node:*`. La lectura del JSON (que solo
 * tiene sentido en build time) se queda en el frontmatter de
 * `TokenUsage.astro` y entra aquí ya parseada vía `parseUsageRows`.
 *
 * Reglas del contrato:
 * - Un único formateador (`compact`) para magnitudes, con la precisión atada a
 *   la magnitud y no al valor: dos cifras de la misma magnitud nunca se
 *   renderizan con distinta cantidad de decimales.
 * - Separadores U+00A0 (espacio duro) antes de las unidades y antes de `%`.
 * - Las series cubren todo el rango con datos, de `minDay` a `maxDay`: un día sin
 *   ninguna fila es un hueco (`missing`), nunca un cero, y no dibuja barra. La
 *   media móvil aplica el mismo contrato: una ventana sin nada que promediar
 *   rompe la línea (`Chart.line` son tramos), nunca la baja a la línea base.
 * - Todas las claves de día se comparan como cadenas en espacio UTC
 *   (`dayToMs`/`msToDay`); nada depende de la fecha de build.
 */

/* -------------------------------------------------------------------------- */
/* Tipos                                                                       */
/* -------------------------------------------------------------------------- */

export interface UsageRow {
  day: string;
  model: string;
  provider: string;
  requests: number;
  input: number;
  output: number;
  reasoning: number;
  cacheRead: number;
  cacheWrite: number;
}

/**
 * Punto de serie diaria o mensual.
 *
 * `missing` distingue "no hay ninguna fila ese día" de "hay filas y suman 0":
 * solo el segundo caso dibuja la barra mínima. Los tres campos de cobertura son
 * descriptivos: no alteran el valor, solo evitan que un periodo incompleto se
 * lea como una caída real.
 */
export interface SeriesPoint {
  key: string;
  label: string;
  longLabel: string;
  value: number;
  /** Sin ninguna fila en el periodo: hueco, no cero. */
  missing: boolean;
  /** Periodo incompleto: primer mes del rango o último mes sin cerrar. */
  partial: boolean;
  /** Días del periodo con al menos una fila de datos. */
  observedDays: number;
  /** Días naturales que dura el periodo. */
  daysInPeriod: number;
}

export interface Bar {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Hay filas en el periodo y suman 0 tokens: stub, no emptiness. */
  zero: boolean;
  title: string;
  /** Valor compacto (`38,3 M`) para la etiqueta de hover mensual. */
  hover: string;
}

export interface Gridline {
  y: number;
  label: string;
}

export interface AxisLabel {
  x: number;
  text: string;
}

/** Punto de la línea de media móvil, en coordenadas del `viewBox`. */
export interface LinePoint {
  x: number;
  y: number;
}

/**
 * Tramo de la línea de media móvil: puntos contiguos que un mismo `<path>` une.
 *
 * Una ventana centrada sin nada que promediar es un hueco, no un cero: no produce
 * punto y además corta el tramo, de modo que la vista itere `chart.line` y
 * dibuje un `<path>` por tramo. Sin ese corte, el hueco se leería como una caída
 * a la línea base (o, si el punto se perdiera, como una línea recta tendida de
 * marzo a mayo). Ambos mienten sobre el dato, así que el hueco se dibuja roto.
 *
 * Un tramo de un solo punto es legal (ventana con una única observación) y se
 * renderiza como un `<path>` de un solo comando `M`.
 */
export interface LineSegment {
  points: LinePoint[];
}

/** Anotación sobre la barra más alta: `38,3 M`. */
export interface PeakLabel {
  x: number;
  y: number;
  text: string;
}

/**
 * Marcador de periodo sin cerrar (reloj de arena). Se ancla sobre la última barra
 * `partial` de la serie y se dibuja en pantalla: `x`/`y` son coordenadas del
 * `viewBox`, así que la vista coloca el reloj sin recalcular geometría. `key`/
 * `label`/`coverage` son el texto que acompaña al marcador.
 */
export interface PartialMarker {
  /** Centro horizontal de la barra marcada. */
  x: number;
  /** Borde superior de la barra marcada. */
  y: number;
  /** Clave del periodo marcado (`2026-10`). */
  key: string;
  /** Nombre largo del periodo: `octubre de 2026`. */
  label: string;
  /** Cobertura observada: `3 de 31 días`. */
  coverage: string;
}

export interface Chart {
  width: number;
  height: number;
  plotLeft: number;
  plotRight: number;
  bars: Bar[];
  grid: Gridline[];
  labels: AxisLabel[];
  /**
   * Media móvil centrada, partida en tramos por los huecos; vacía cuando la vista
   * no la lleva (o cuando la serie es demasiado corta para una ventana).
   */
  line: LineSegment[];
  peakLabel: PeakLabel | null;
  partialMarker: PartialMarker | null;
}

export interface ChartOptions {
  /** Ventana de la media móvil centrada, en días (impar). */
  movingAverage?: number;
  /** Anota el valor de la barra más alta. */
  peak?: boolean;
}

export interface ModelRow {
  id: string;
  label: string;
  provider: string;
  tokens: number;
}

export interface TokenUsageModel {
  hasData: boolean;
  minDay: string;
  /** Último día presente en los datos: ancla de todas las ventanas. */
  maxDay: string;

  topModels: ModelRow[];
  /** Mayor `tokens` del Top 5: escala de las barras del ranking. */
  topTokens: number;

  /** Un punto por día natural entre `minDay` y `maxDay`. */
  dailySeries: SeriesPoint[];
  /** Un punto por mes natural entre `minDay` y `maxDay`. */
  monthlySeries: SeriesPoint[];
  /** `feb 26 – oct 26`, con año si el rango salta de año. */
  monthlyRangeLabel: string;

  dailyChart: Chart | null;
  monthlyChart: Chart | null;
  dailyAria: string;
  monthlyAria: string;

  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/* Saneado de datos                                                            */
/* -------------------------------------------------------------------------- */

const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function toNumber(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function toText(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

/**
 * Sanea el JSON ya parseado. Una fila inservible se descarta entera: relocar
 * sus tokens a otro día mentiría sobre el dato.
 *
 * Lanza si la forma no es un array; el llamador lo traduce a estado vacío.
 */
export function parseUsageRows(parsed: unknown): UsageRow[] {
  if (!Array.isArray(parsed)) {
    throw new Error("el JSON no es un array");
  }

  const rows: UsageRow[] = [];
  for (const raw of parsed) {
    if (raw === null || typeof raw !== "object") continue;
    const item = raw as Record<string, unknown>;
    if (typeof item.day !== "string" || !isValidDayKey(item.day)) continue;
    rows.push({
      day: item.day,
      model: toText(item.model, "modelo desconocido"),
      provider: toText(item.provider, "proveedor desconocido"),
      requests: toNumber(item.requests),
      input: toNumber(item.input),
      output: toNumber(item.output),
      reasoning: toNumber(item.reasoning),
      cacheRead: toNumber(item.cacheRead),
      cacheWrite: toNumber(item.cacheWrite),
    });
  }
  return rows;
}

/* -------------------------------------------------------------------------- */
/* Formato (es-ES)                                                            */
/* -------------------------------------------------------------------------- */

/** Espacio duro: separa número y unidad sin permitir un salto de línea. */
const NBSP = "\u00A0";

const integerFormatter = new Intl.NumberFormat("es-ES");
const decimalFormatters = new Map<number, Intl.NumberFormat>();

/** Decimal es-ES con un tope de decimales estable para toda la vista. */
function decimal(value: number, maxDigits: number): string {
  let formatter = decimalFormatters.get(maxDigits);
  if (!formatter) {
    formatter = new Intl.NumberFormat("es-ES", { maximumFractionDigits: maxDigits });
    decimalFormatters.set(maxDigits, formatter);
  }
  return formatter.format(Number.isFinite(value) ? value : 0);
}

interface Magnitude {
  limit: number;
  unit: string;
  digits: number;
}

/**
 * Escalera de magnitudes. La precisión depende solo de la magnitud, así que
 * `99 M` y `1,4 M` conviven en la misma fila sin contradecirse: nunca aparece
 * un mills con tres decimales junto a otro con uno.
 */
const MAGNITUDES: readonly Magnitude[] = [
  { limit: 1e12, unit: "B", digits: 2 },
  { limit: 1e9, unit: `mil${NBSP}M`, digits: 2 },
  { limit: 1e6, unit: "M", digits: 1 },
  { limit: 1e3, unit: "k", digits: 1 },
];

/** Compacta a `99 M` / `1,4 M` / `980 k` / `456`. */
export function compact(value: number): string {
  const amount = Number.isFinite(value) ? value : 0;
  const magnitude = MAGNITUDES.find((candidate) => Math.abs(amount) >= candidate.limit);
  if (!magnitude) return integerFormatter.format(Math.round(amount));
  return `${decimal(amount / magnitude.limit, magnitude.digits)}${NBSP}${magnitude.unit}`;
}

/** Entero con separador de miles es-ES: `99.003.567`. */
export function formatFull(value: number): string {
  return integerFormatter.format(Math.round(Number.isFinite(value) ? value : 0));
}

/** Cobertura observada de un periodo: `3 de 31 días`. */
export function formatCoverageES(observedDays: number, daysInPeriod: number): string {
  if (!(observedDays > 0)) return "sin actividad registrada";
  if (!(daysInPeriod > observedDays)) {
    return observedDays === 1 ? `1${NBSP}día con datos` : `${observedDays}${NBSP}días con datos`;
  }
  return `${observedDays} de ${formatFull(daysInPeriod)}${NBSP}días`;
}

/* -------------------------------------------------------------------------- */
/* Fechas (trabajo en espacio UTC para evitar desplazamientos de zona horaria) */
/* -------------------------------------------------------------------------- */

const DAY_MS = 86_400_000;

export function dayToMs(key: string): number {
  return Date.parse(`${key}T00:00:00Z`);
}

export function msToDay(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/** Hoy según el calendario local, expresado como clave UTC. */
export function todayKeyUTC(): string {
  const now = new Date();
  return msToDay(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

/**
 * Valida una clave `YYYY-MM-DD` contra el calendario real.
 *
 * `Date.parse` acepta `2026-02-30` y V8 la desplaza a `2026-03-02`, lo que
 * mudaría los tokens de una fila a un día que nadie escribió. Se rechaza la
 * fila en lugar de reubicarla.
 */
export function isValidDayKey(key: string): boolean {
  if (!DAY_PATTERN.test(key)) return false;
  const [year, month, day] = key.split("-").map(Number);
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const date = new Date(dayToMs(key));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function monthKey(key: string): string {
  return key.slice(0, 7);
}

export function daysInMonthKey(key: string): number {
  const [year, month] = key.split("-").map(Number);
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function monthEndKey(key: string): string {
  return `${key}-${String(daysInMonthKey(key)).padStart(2, "0")}`;
}

export function nextMonth(key: string): string {
  const [year, month] = key.split("-").map(Number);
  const next = month === 12 ? `${year + 1}-01` : `${year}-${String(month + 1).padStart(2, "0")}`;
  return next;
}

export function monthSpanKeys(firstKey: string, lastKey: string): string[] {
  const keys: string[] = [];
  for (let key = monthKey(firstKey); key <= monthKey(lastKey); key = nextMonth(key)) {
    keys.push(key);
  }
  return keys;
}

/** Todos los días naturales de `firstKey` a `lastKey`, ambos incluidos. */
export function dayRangeKeys(firstKey: string, lastKey: string): string[] {
  const firstMs = dayToMs(firstKey);
  const lastMs = dayToMs(lastKey);
  const keys: string[] = [];
  for (let ms = firstMs; ms <= lastMs; ms += DAY_MS) {
    keys.push(msToDay(ms));
  }
  return keys;
}

/** `true` si el rango cruza 31 de diciembre, en cuyo caso el año se muestra. */
export function crossesYearBoundary(firstKey: string, lastKey: string): boolean {
  return firstKey.slice(0, 4) !== lastKey.slice(0, 4);
}

export const MONTHS_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
export const MONTHS_SHORT_ES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function longDateES(key: string): string {
  const [year, month, day] = key.split("-").map(Number);
  return `${day} de ${MONTHS_ES[month - 1]} de ${year}`;
}

/**
 * `3 oct`, o `3 oct 26` cuando el rango cruza el año: fuera de ese caso el año
 * es ruido y lo aporta el pie ("Datos actualizados hasta el ...").
 */
export function shortDateES(key: string, includeYear = false): string {
  const [year, month, day] = key.split("-").map(Number);
  const short = `${day} ${MONTHS_SHORT_ES[month - 1]}`;
  return includeYear ? `${short} ${String(year).slice(2)}` : short;
}

/** Rango de días con el año solo si el rango salta de año: `22 dic 25 – 10 ene 26`. */
export function formatDayRangeES(firstKey: string, lastKey: string): string {
  const includeYear = crossesYearBoundary(firstKey, lastKey);
  return `${shortDateES(firstKey, includeYear)} – ${shortDateES(lastKey, includeYear)}`;
}

export function monthLabelES(key: string): string {
  const [year, month] = key.split("-").map(Number);
  return `${MONTHS_SHORT_ES[month - 1]} ${String(year).slice(2)}`;
}

export function monthLongES(key: string): string {
  const [year, month] = key.split("-").map(Number);
  return `${MONTHS_ES[month - 1]} de ${year}`;
}

/* -------------------------------------------------------------------------- */
/* Etiquetas (limpieza determinista, sin tabla de nombres por id)              */
/* -------------------------------------------------------------------------- */

/** Prefijos de familia: se capitalizan y se conserva el sufijo (`qwen3.5`). */
const FAMILY_LABELS: Record<string, string> = {
  glm: "GLM",
  qwen: "Qwen",
  gpt: "GPT",
  claude: "Claude",
  gemini: "Gemini",
  grok: "Grok",
  kimi: "Kimi",
  minimax: "Minimax",
  deepseek: "DeepSeek",
  union: "Union",
  muse: "Muse",
  space: "Space",
  big: "Big",
};

/**
 * Palabras con grafía propia (marcas) o acrónimos. Se indexan por token en
 * minúsculas, nunca por id completo: la tabla nombra palabras, no modelos.
 */
const WORD_LABELS: Record<string, string> = {
  opencode: "OpenCode",
  github: "GitHub",
  copilot: "Copilot",
  bunny: "Bunny",
  pickle: "Pickle",
  codex: "Codex",
  sonnet: "Sonnet",
  opus: "Opus",
  haiku: "Haiku",
  flash: "Flash",
  coder: "Coder",
  spark: "Spark",
  it: "IT",
  qat: "QAT",
  gguf: "GGUF",
};

/** Sufijos de nivel de servicio que no aportan a la etiqueta. */
const DROPPED_SEGMENTS = new Set(["free", "contributor"]);

/** `12b`, `8b`, `9d`: cifras seguidas de una unidad corta. */
const DIGITS_UNIT = /^(\d+(?:\.\d+)?)([a-z]{1,3})$/;
/** `v4`, `m3`, `k3`: letra de familia seguida de versión. */
const LETTER_DIGITS = /^([a-z])(\d+(?:\.\d+)?)$/;

function normalizeForCompare(token: string): string {
  return token.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function capitalize(token: string): string {
  return token.charAt(0).toLocaleUpperCase("es-ES") + token.slice(1);
}

/** Grafía de un token suelto, ya fuera del caso de la cabecera de familia. */
function tokenLabel(token: string): string {
  const known = WORD_LABELS[token];
  if (known) return known;

  const digitsUnit = DIGITS_UNIT.exec(token);
  if (digitsUnit) return digitsUnit[1] + digitsUnit[2].toUpperCase();

  const letterDigits = LETTER_DIGITS.exec(token);
  if (letterDigits) return letterDigits[1].toUpperCase() + letterDigits[2];

  // Marcadores de una o dos letras (`x`, `f`, `qa`): se leen como sigla.
  if (token.length <= 2 && /^[a-z]+$/.test(token)) return token.toUpperCase();

  return capitalize(token);
}

/**
 * Etiqueta legible a partir del id.
 *
 * Reglas: se quita el host de huggingface y se conserva el último segmento de
 * la ruta; se separan `-`, espacios y `:` (los `_` no, porque forman parte de
 * etiquetas de cuantización como `q4_0`); se descarta un `:tag` que ya aparece
 * en el nombre; y cada palabra recibe su grafía desde `FAMILY_LABELS`/`WORD_LABELS`.
 */
export function modelLabel(raw: string): string {
  const fallback = raw.trim() || "modelo";
  let id = raw.trim().toLowerCase();

  // Referencias de huggingface: `hf.co/org/model:tag` => `model`.
  id = id.replace(/^(?:hf\.co|huggingface\.co)[:/]+/, "");
  if (id.includes("/")) {
    const segments = id.split("/").filter(Boolean);
    id = segments[segments.length - 1] ?? id;
  }

  // `:tag` final (p. ej. `qwen3:8b`).
  const tagIndex = id.lastIndexOf(":");
  const tag = tagIndex === -1 ? "" : id.slice(tagIndex + 1);
  if (tag) id = id.slice(0, tagIndex);

  // Separadores: `-`, `:` y espacios; los puntos sobreviven entre dígitos (3.5).
  const split = (value: string): string[] =>
    value
      .replace(/\./g, (dot, offset: number, whole: string) => {
        const before = whole[offset - 1];
        const after = whole[offset + 1];
        return before && after && /\d/.test(before) && /\d/.test(after) ? dot : " ";
      })
      .split(/[\s\-:]+/)
      .filter(Boolean)
      .filter((part) => !DROPPED_SEGMENTS.has(part));

  const parts = split(id);
  if (parts.length === 0) return fallback;

  const tagParts = tag ? split(tag) : [];
  const present = new Set(parts.map(normalizeForCompare));
  const tagIsRedundant = tagParts.length > 0 && tagParts.every((part) => present.has(normalizeForCompare(part)));
  const all = tagIsRedundant ? parts : [...parts, ...tagParts];

  // Prefijo de familia conocido: se capitaliza y se conserva el resto.
  const family = Object.keys(FAMILY_LABELS).find(
    (key) => all[0] === key || all[0].startsWith(key),
  );
  const head = family
    ? FAMILY_LABELS[family] + all[0].slice(family.length)
    : tokenLabel(all[0]);
  const rest = all.slice(1).map(tokenLabel);

  return [head, ...rest].join(" ");
}

/** Etiqueta de proveedor: `opencode-go` => `OpenCode Go`. */
export function providerLabel(raw: string): string {
  const fallback = raw.trim() || "proveedor desconocido";
  const label = raw
    .split(/[\s\-_]+/)
    .filter(Boolean)
    .map((word) => WORD_LABELS[word.toLowerCase()] ?? capitalize(word))
    .join(" ");
  return label || fallback;
}

/* -------------------------------------------------------------------------- */
/* Agregados                                                                   */
/* -------------------------------------------------------------------------- */

const tokensOf = (row: UsageRow): number => row.input + row.output + row.reasoning;

/** Ventana de la línea de media móvil de la vista diaria. */
export const MOVING_AVERAGE_DAYS = 7;

/**
 * Deriva todo lo que la vista necesita a partir de las filas.
 *
 * `nowKey` solo se usa como ancla de reserva cuando no hay datos, para que el
 * estado vacío siga teniendo ejes con rótulos.
 */
export function buildTokenUsage(rows: UsageRow[], nowKey: string = todayKeyUTC()): TokenUsageModel {
  const hasData = rows.length > 0;

  /* Top 5 modelos por tokens (sin caché) sobre todo el histórico. */
  const byModel = new Map<string, { tokens: number; providers: Map<string, number> }>();
  for (const row of rows) {
    const entry = byModel.get(row.model) ?? { tokens: 0, providers: new Map<string, number>() };
    const value = tokensOf(row);
    entry.tokens += value;
    entry.providers.set(row.provider, (entry.providers.get(row.provider) ?? 0) + value);
    byModel.set(row.model, entry);
  }

  const topModels: ModelRow[] = [...byModel.entries()]
    .sort((a, b) => b[1].tokens - a[1].tokens)
    .slice(0, 5)
    .map(([id, entry]) => {
      const provider = [...entry.providers.entries()].sort((a, b) => b[1] - a[1])[0][0];
      return { id, label: modelLabel(id), provider: providerLabel(provider), tokens: entry.tokens };
    });

  const topTokens = topModels.reduce((acc, model) => Math.max(acc, model.tokens), 0);

  /* Totales por día y por mes, más los días observados de cada mes. Un día sin
   * filas no entra en ningún mapa: así `missing` y `observedDays` coinciden y
   * abril se lee como hueco, no como una caída. */
  const dailyTokens = new Map<string, number>();
  const monthlyTokens = new Map<string, number>();
  const monthlyObserved = new Map<string, Set<string>>();
  for (const row of rows) {
    const value = tokensOf(row);
    dailyTokens.set(row.day, (dailyTokens.get(row.day) ?? 0) + value);

    const month = monthKey(row.day);
    monthlyTokens.set(month, (monthlyTokens.get(month) ?? 0) + value);

    const seen = monthlyObserved.get(month) ?? new Set<string>();
    seen.add(row.day);
    monthlyObserved.set(month, seen);
  }

  let minDay = nowKey;
  let maxDay = nowKey;
  if (hasData) {
    minDay = "";
    maxDay = "";
    for (const day of dailyTokens.keys()) {
      if (minDay === "" || day < minDay) minDay = day;
      if (day > maxDay) maxDay = day;
    }
  }

  /* Serie diaria: todo el histórico, día natural a día natural. */
  const dailyKeys = dayRangeKeys(minDay, maxDay);
  const dailyIncludeYear = crossesYearBoundary(minDay, maxDay);
  const dailySeries: SeriesPoint[] = dailyKeys.map((key) => {
    const value = dailyTokens.get(key);
    return {
      key,
      label: shortDateES(key, dailyIncludeYear),
      longLabel: longDateES(key),
      value: value ?? 0,
      missing: value === undefined,
      partial: false,
      observedDays: value === undefined ? 0 : 1,
      daysInPeriod: 1,
    };
  });

  /* Serie mensual: un mes sin filas mantiene el hueco y se marca como
   * incompleto cuando el rango empieza o acaba ahí. */
  const monthlyKeys = monthSpanKeys(minDay, maxDay);
  const lastMonthEnd = monthEndKey(monthKey(maxDay));
  const monthlySeries: SeriesPoint[] = monthlyKeys.map((key, index) => {
    const value = monthlyTokens.get(key);
    const isFirst = index === 0;
    const isLast = index === monthlyKeys.length - 1;
    return {
      key,
      label: monthLabelES(key),
      longLabel: monthLongES(key),
      value: value ?? 0,
      missing: value === undefined,
      partial: isFirst || (isLast && maxDay < lastMonthEnd),
      observedDays: monthlyObserved.get(key)?.size ?? 0,
      daysInPeriod: daysInMonthKey(key),
    };
  });

  const dailyChart = hasData
    ? buildChart(dailySeries, { movingAverage: MOVING_AVERAGE_DAYS })
    : null;
  const monthlyChart = hasData ? buildChart(monthlySeries, { peak: true }) : null;

  /* La línea solo se anuncia si el chart la trae de verdad: en el estado vacío no
   * hay chart, y con datos insuficientes para una ventana tampoco habría línea. */
  const dailyAria = chartAriaLabel(
    "diario",
    dailySeries,
    (dailyChart?.line.length ?? 0) > 0 ? { line: "media móvil de 7 días" } : {},
  );

  return {
    hasData,
    minDay,
    maxDay,
    topModels,
    topTokens,
    dailySeries,
    monthlySeries,
    monthlyRangeLabel: `${monthLabelES(monthlyKeys[0])} – ${monthLabelES(monthlyKeys[monthlyKeys.length - 1])}`,
    dailyChart,
    monthlyChart,
    dailyAria,
    monthlyAria: chartAriaLabel("mensual", monthlySeries),
    updatedAt: longDateES(maxDay),
  };
}

/* -------------------------------------------------------------------------- */
/* Gráfico SVG (geometría calculada aquí, sin dependencias)                    */
/* -------------------------------------------------------------------------- */

export const CHART_W = 820;
export const CHART_H = 280;
export const PLOT_LEFT = 62;
export const PLOT_RIGHT = 12;
export const PLOT_TOP = 16;
export const PLOT_BOTTOM = 38;
export const PLOT_W = CHART_W - PLOT_LEFT - PLOT_RIGHT;
export const PLOT_H = CHART_H - PLOT_TOP - PLOT_BOTTOM;
const BASE_Y = PLOT_TOP + PLOT_H;
/** Contrato con la vista: 4 intervalos, 5 líneas de rejilla. */
export const GRID_TICKS = 4;
/** Stub de una barra con filas y 0 tokens: visible sin exagerar el valor. */
const MIN_BAR_H = 2;
const MAX_BAR_W = 30;
/** Hueco entre barras: 0,9 del slot, así que en 225 días la barra es ~3 px. */
const BAR_GAP_FACTOR = 0.9;
const MIN_BAR_W = 1;
/**
 * Ancho nominal de una etiqueta del eje X (`21 feb`), en unidades del `viewBox`.
 * Aquí no hay DOM ni métricas de fuente, así que es una constante: mide algo más
 * ancho que `3 oct` y algo más estrecho que `21 feb 26`.
 */
const LABEL_NOMINAL_W = 46;
/** Un ancho de etiqueta de separación: los rótulos nunca se tocan. */
const LABEL_GAP = LABEL_NOMINAL_W;

/**
 * Escala de pasos "bonitos". Saltar de 5 a 10 desperdiciaba un tercio del alto
 * del gráfico: con `8` la barra más alta llega al 82 % del área de trazado.
 */
const NICE_STEPS: readonly number[] = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];

/** Redondea hacia arriba a un múltiplo de 10^n, nunca por debajo del valor. */
export function niceCeil(value: number): number {
  if (!(value > 0) || !Number.isFinite(value)) return 1;
  const exponent = Math.floor(Math.log10(value));
  const base = 10 ** exponent;
  const fraction = value / base;
  const step = NICE_STEPS.find((candidate) => fraction <= candidate) ?? 10;
  return step * base;
}

const centerX = (index: number, slot: number): number => PLOT_LEFT + slot * index + slot / 2;

/** Alto dibujado: el del stub cuando hay filas y 0 tokens, si no el real. */
const barHeight = (value: number, max: number): number =>
  value > 0 ? Math.max(MIN_BAR_H, (value / max) * PLOT_H) : MIN_BAR_H;

const topY = (value: number, max: number): number => BASE_Y - barHeight(value, max);

/**
 * Geometría de un chart.
 *
 * Las barras solo existen donde hay datos: un hueco no dibuja nada. El paso de
 * etiquetas del eje X se calcula aquí (no lo fija la vista) a partir del ancho
 * nominal de una etiqueta más su margen.
 */
export function buildChart(series: SeriesPoint[], options: ChartOptions = {}): Chart {
  const observed = series.filter((point) => !point.missing);
  const peak = observed.reduce<SeriesPoint | null>(
    (acc, point) => (acc === null || point.value > acc.value ? point : acc),
    null,
  );
  const max = niceCeil(Math.max(peak?.value ?? 0, 1));
  const slot = PLOT_W / Math.max(series.length, 1);
  const barW = Math.max(MIN_BAR_W, Math.min(MAX_BAR_W, slot * BAR_GAP_FACTOR));

  const grid: Gridline[] = [];
  for (let i = 0; i <= GRID_TICKS; i++) {
    const value = (max / GRID_TICKS) * i;
    grid.push({ y: BASE_Y - (PLOT_H / GRID_TICKS) * i, label: compact(value) });
  }

  const bars: Bar[] = [];
  series.forEach((point, index) => {
    if (point.missing) return;
    const h = barHeight(point.value, max);
    // Un mes a medio cerrar se anuncia en el propio tooltip de la barra.
    const coverage = point.partial
      ? ` (parcial: ${formatCoverageES(point.observedDays, point.daysInPeriod)})`
      : "";
    bars.push({
      x: PLOT_LEFT + slot * index + (slot - barW) / 2,
      y: BASE_Y - h,
      w: barW,
      h,
      zero: point.value === 0,
      title: `${point.longLabel}${coverage}: ${formatFull(point.value)} tokens`,
      hover: compact(point.value),
    });
  });

  /* Una etiqueta por cada (ancho nominal + margen), más la última. La vista
   * mensual lleva `peak` y muestra todas sus etiquetas: con 9 meses el slot
   * (~83) supera el ancho nominal (46), así que no hay solape. La diaria
   * mantiene el thinning. */
  const labelStep = options.peak
    ? 1
    : Math.max(1, Math.ceil((LABEL_NOMINAL_W + LABEL_GAP) / slot));
  const labels: AxisLabel[] = series
    .map((point, index) => ({ point, index }))
    .filter(({ index }) => index % labelStep === 0 || index === series.length - 1)
    .map(({ point, index }) => ({ x: centerX(index, slot), text: point.label }));

  /* Media móvil centrada: el punto `i` promedia `i-half … i+half`, así que la
   * línea empieza en el índice `half`. Los huecos no dividen (suman 0 pero no
   * son observaciones). Rompe el tramo únicamente una ventana sin ninguna fila:
   * su media no es un dato, así que no emite punto. Al breakear hace falta cerrar
   * el tramo y abrir otro, porque un solo `<path>` cruzaría el hueco de un
   * extremo al otro, y dejar el hueco dentro de un tramo lo leería la vista como
   * una recta tendida por encima. En cambio una ventana observada emite punto
   * siempre: si las filas suman 0 la media es 0 y el punto cae sobre `BASE_Y`,
   * que es exactamente el stub `is-zero` que dibujan esas mismas barras. */
  const line: LineSegment[] = [];
  let segment: LinePoint[] = [];
  const closeSegment = (): void => {
    if (segment.length > 0) line.push({ points: segment });
    segment = [];
  };
  const window = Math.floor((options.movingAverage ?? 0) / 2);
  if (window > 0 && series.length > window * 2) {
    for (let i = window; i < series.length - window; i++) {
      let sum = 0;
      let observedDays = 0;
      for (let j = i - window; j <= i + window; j++) {
        const point = series[j];
        if (point.missing) continue;
        sum += point.value;
        observedDays++;
      }
      if (observedDays === 0) {
        closeSegment();
        continue;
      }
      segment.push({ x: centerX(i, slot), y: BASE_Y - (sum / observedDays / max) * PLOT_H });
    }
  }
  closeSegment();

  const peakIndex = peak ? series.indexOf(peak) : -1;
  const peakLabel: PeakLabel | null =
    options.peak && peak && peak.value > 0 && peakIndex >= 0
      ? { x: centerX(peakIndex, slot), y: topY(peak.value, max) - 8, text: compact(peak.value) }
      : null;

  /* El reloj de arena marca la última barra de un periodo sin cerrar. Se eleva
   * 7 px sobre el borde superior de la barra para que el glifo no toque la
   * barra ni quede recortado: `y` es la línea base del `<text>`, así que el
   * cuerpo del glifo queda 6–8 px por encima del borde. */
  const PARTIAL_MARKER_GAP = 7;
  const partialIndex = series.reduce(
    (acc, point, index) => (point.partial ? index : acc),
    -1,
  );
  const partialPoint = partialIndex >= 0 ? series[partialIndex] : undefined;
  const partialMarker: PartialMarker | null =
    partialPoint && !partialPoint.missing
      ? {
          x: centerX(partialIndex, slot),
          y: topY(partialPoint.value, max) - PARTIAL_MARKER_GAP,
          key: partialPoint.key,
          label: partialPoint.longLabel,
          coverage: formatCoverageES(partialPoint.observedDays, partialPoint.daysInPeriod),
        }
      : null;

  return {
    width: CHART_W,
    height: CHART_H,
    plotLeft: PLOT_LEFT,
    plotRight: PLOT_RIGHT,
    bars,
    grid,
    labels,
    line,
    peakLabel,
    partialMarker,
  };
}

export function chartAriaLabel(
  period: string,
  series: SeriesPoint[],
  options: { line?: string } = {},
): string {
  if (series.length === 0) return `Gráfico de consumo de tokens ${period}, sin datos`;
  const observed = series.filter((point) => !point.missing);
  const peak = observed.reduce<SeriesPoint | null>(
    (acc, point) => (acc === null || point.value > acc.value ? point : acc),
    null,
  );
  const total = observed.reduce((acc, point) => acc + point.value, 0);
  const gaps = series.length - observed.length;
  const parts = [
    `Gráfico de barras del consumo ${period} de tokens, de ${series[0].longLabel} a ${series[series.length - 1].longLabel}`,
    peak
      ? `pico de ${formatFull(peak.value)} tokens ${peak.daysInPeriod > 1 ? "en" : "el"} ${peak.longLabel}`
      : "sin consumo registrado en el periodo",
  ];
  // El llamador solo pasa `line` cuando el chart trae línea de verdad: sin ella no
  // se anuncia. El total y el pico se anuncian siempre: no se ven en pantalla y
  // son el resumen del periodo.
  if (options.line) parts.push(`con línea de ${options.line}`);
  parts.push(`total del periodo ${formatFull(total)} tokens`);
  if (gaps > 0) {
    const unit = series[0].daysInPeriod > 1 ? "mes" : "día";
    parts.push(`${formatFull(gaps)} ${gaps === 1 ? unit : `${unit}s`} sin datos`);
  }
  return parts.join(". ") + ".";
}

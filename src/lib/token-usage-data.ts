import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

import { buildTokenUsage, parseUsageRows, type TokenUsageModel, type UsageRow } from "./token-usage";

/* -------------------------------------------------------------------------- */
/* Carga de datos (build time). Cualquier fallo => estado vacío, nunca throw.  */
/* -------------------------------------------------------------------------- */

const DATA_RELATIVE_PATH = join("public", "data", "token-usage.json");
const PROJECT_ROOT_MARKERS = ["astro.config.mjs", "astro.config.ts", "astro.config.js"];

/**
 * Localiza el archivo de datos anclando en la raíz del proyecto Astro.
 *
 * No se puede anclar en la URL del módulo: en `astro build` Vite empaqueta
 * este componente dentro de `dist/`, así que `../../` apuntaría a
 * `dist/public/data/...`, que no existe (Astro copia `public/` a la raíz de
 * `dist/`). Se sube desde el cwd hasta encontrar `astro.config.*` o el propio
 * archivo, y si no se encuentra nada se cae a la ruta relativa al cwd.
 */
function findDataPath(): string {
  let dir = process.cwd();
  for (;;) {
    for (const marker of [...PROJECT_ROOT_MARKERS, DATA_RELATIVE_PATH]) {
      if (existsSync(join(dir, marker))) return join(dir, DATA_RELATIVE_PATH);
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return resolve(process.cwd(), DATA_RELATIVE_PATH);
}

function loadRows(): UsageRow[] {
  try {
    const parsed: unknown = JSON.parse(readFileSync(findDataPath(), "utf8"));
    return parseUsageRows(parsed);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`[TokenUsage] No se pudieron cargar los datos de consumo de tokens (${reason}). Se renderiza el estado vacío.`);
    return [];
  }
}

/** Lee `public/data/token-usage.json` y deriva el modelo de la vista. */
export function loadTokenUsage(): TokenUsageModel {
  return buildTokenUsage(loadRows());
}

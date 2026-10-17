import { ui, type Lang, type TranslationKey } from './ui';

export type { Lang, TranslationKey } from './ui';

export const defaultLang: Lang = 'es';

export const languages: Record<Lang, { name: string; ogLocale: string }> = {
  es: { name: 'Español', ogLocale: 'es_ES' },
  en: { name: 'English', ogLocale: 'en_US' },
};

export const locales = Object.keys(languages) as Lang[];

/** Texto de datos (experiencia, proyectos, formación) con su versión por idioma. */
export type Localized = Record<Lang, string>;

/** Atajo para declarar un texto de datos: si `en` se omite, vale lo mismo en ambos idiomas. */
export function localized(es: string, en: string = es): Localized {
  return { es, en };
}

/** Idioma del locale de Astro (`Astro.currentLocale`), con `es` como respaldo. */
export function resolveLang(locale: string | undefined): Lang {
  return locales.find((code) => code === locale) ?? defaultLang;
}

function interpolate(text: string, params?: Record<string, string | number>): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

/**
 * Helper de traducción. Uso en un componente o página:
 *
 *   const { lang, t } = useTranslations(Astro.currentLocale);
 *   t('nav.about');                       // "Sobre mí" / "About"
 *   t('about.ageValue', { age: 27 });     // "27 años" / "27 years old"
 */
export function useTranslations(locale: string | undefined) {
  const lang = resolveLang(locale);
  const t = (key: TranslationKey, params?: Record<string, string | number>): string =>
    interpolate(ui[lang][key], params);
  return { lang, t };
}

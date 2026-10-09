/**
 * Diccionarios de interfaz. Cada clave debe existir en `es` y en `en` (el tipo
 * `Dictionary` lo fuerza en compilación).
 *
 * Los valores pueden llevar marcado `<strong>` cuando se pintan con `set:html`
 * (solo contenido propio, nunca entrada de usuario). Los marcadores `{nombre}`
 * se sustituyen en `t()`.
 */

const es = {
  // Metadatos
  'meta.title': 'Daniel Patrón Gómez - Portfolio',
  'meta.description': 'Portfolio profesional de Daniel Patrón Gómez. Desarrollador de Aplicaciones Multiplataforma especializado en Flutter, Web y Android.',
  'meta.defaultTitle': 'Daniel Patrón Gómez - Desarrollador Web & Mobile',

  // Navegación
  'nav.home': 'Inicio',
  'nav.toggle': 'Alternar navegación',
  'nav.skip': 'Saltar al contenido',
  'nav.about': 'Sobre mí',
  'nav.experience': 'Experiencia',
  'nav.skills': 'Habilidades',
  'nav.tokens': 'Tokens',
  'nav.education': 'Formación',
  'nav.projects': 'Proyectos',
  'nav.contact': 'Contacto',
  'lang.label': 'Idioma',

  // Cabecera
  'header.headline': '& desarrollador de aplicaciones multiplataforma.',
  'header.word1': 'Front-End Developer',
  'header.word2': 'Desarrollador Flutter & Web',
  'header.word3': 'Especialista en Web Components',
  'header.word4': 'Técnico Superior DAM',
  'header.bio': 'Actualmente en <strong>BBVA Technology en Europa</strong>, construyendo interfaces para aplicaciones móviles de banca internacional con <strong>Lit, Web Components y Ember.js</strong>. Apasionado por la arquitectura frontend, la precisión visual y las buenas prácticas.',
  'header.viewProjects': 'Ver Proyectos',

  // Sobre mí
  'about.label': 'SOBRE MÍ',
  'about.title': 'Trayectoria & Enfoque',
  'about.photoAlt': 'Daniel Patrón Gómez - Foto de perfil',
  'about.statBbva': 'Años BBVA Tech',
  'about.statApps': 'Apps Creadas',
  'about.statDegree': 'Grado Superior',
  'about.heading': 'Desarrollador Front-End & Multiplataforma',
  'about.p1': 'Soy Daniel, desarrollador enfocado en crear productos digitales rápidos, accesibles e intuitivos. Me especializo en la construcción de interfaces de usuario robustas y aplicaciones móviles multiplataforma.',
  'about.p2': 'En mi rol como <strong>Front-end Developer en BBVA Technology en Europa</strong>, formo parte del equipo encargado de evolucionar la aplicación móvil de banca internacional en España, Italia y Alemania, utilizando <strong>Lit, Web Components y Ember.js</strong>.',
  'about.location': 'Ubicación',
  'about.locationValue': 'Guadalajara, España',
  'about.email': 'Email',
  'about.specialty': 'Especialidad',
  'about.specialtyValue': 'Front-end y apps multiplataforma',
  'about.qualification': 'Titulación',
  'about.qualificationValue': 'Técnico Superior DAM',

  // Experiencia
  'experience.label': 'EXPERIENCIA',
  'experience.title': 'Experiencia laboral',

  // Habilidades
  'skills.label': 'STACK TÉCNICO',
  'skills.title': 'Habilidades & Tecnologías',

  // Proyectos
  'projects.label': 'PROYECTOS',
  'projects.title': 'Proyectos Destacados & Apps',
  'projects.featured': 'Destacado',
  'projects.archived': 'Archivada',
  'projects.website': 'Ver Web',
  'projects.code': 'Código',

  // Formación
  'education.label': 'FORMACIÓN',
  'education.title': 'Formación Académica',

  // Consumo de tokens
  'tokens.label': 'CONSUMO DE TOKENS',
  'tokens.title': 'Consumo de Tokens de IA',
  'tokens.empty': 'Todavía no hay datos de consumo',
  'tokens.panelTitle': 'Tokens por periodo',
  'tokens.rangeLabel': 'Periodo del gráfico',
  'tokens.daily': 'Diario',
  'tokens.monthly': 'Mensual',
  'tokens.legendDaily': 'Tokens diarios',
  'tokens.legendAverage': 'Media de 7 días',
  'tokens.captionDaily': 'Histórico completo · {count} días naturales · {range}',
  'tokens.captionMonthly': 'Histórico completo · {count} meses · {range}',
  'tokens.topModels': 'Top 5 modelos',
  'tokens.updated': 'Datos actualizados hasta el {date}',
  'tokens.unknownModel': 'modelo desconocido',
  'tokens.unknownProvider': 'proveedor desconocido',
  'tokens.coverageNone': 'sin actividad registrada',
  'tokens.coverageOneDay': '1 día con datos',
  'tokens.coverageDays': '{count} días con datos',
  'tokens.coverageOf': '{observed} de {total} días',
  'tokens.partial': ' (parcial: {coverage})',
  'tokens.periodDaily': 'diario',
  'tokens.periodMonthly': 'mensual',
  'tokens.ariaEmpty': 'Gráfico de consumo de tokens {period}, sin datos',
  'tokens.ariaIntro': 'Gráfico de barras del consumo {period} de tokens, de {from} a {to}',
  'tokens.ariaPeakDay': 'pico de {tokens} tokens el {date}',
  'tokens.ariaPeakMonth': 'pico de {tokens} tokens en {date}',
  'tokens.ariaNoUsage': 'sin consumo registrado en el periodo',
  'tokens.ariaLine': 'con línea de media móvil de 7 días',
  'tokens.ariaTotal': 'total del periodo {total} tokens',
  'tokens.gapDay': '{count} día sin datos',
  'tokens.gapDays': '{count} días sin datos',
  'tokens.gapMonth': '{count} mes sin datos',
  'tokens.gapMonths': '{count} meses sin datos',

  // Formatos de fecha (plantillas; los nombres de mes están en src/lib/token-usage.ts)
  'date.long': '{day} de {month} de {year}',
  'date.short': '{day} {month}',
  'date.shortYear': '{day} {month} {yy}',
  'date.monthShort': '{month} {yy}',
  'date.monthLong': '{month} de {year}',

  // Contacto
  'contact.label': 'CONTACTO',
  'contact.title': '¿Hablamos?',
  'contact.subtitle': 'Si tienes alguna propuesta laboral, consulta o quieres colaborar en algún proyecto, no dudes en escribirme.',

  // Pie
  'footer.copyright': '© {year} Daniel Patrón Gómez. Todos los derechos reservados.',
  'footer.top': 'Subir arriba',
};

export type TranslationKey = keyof typeof es;
export type Dictionary = Record<TranslationKey, string>;

const en: Dictionary = {
  'meta.title': 'Daniel Patrón Gómez - Portfolio',
  'meta.description': 'Professional portfolio of Daniel Patrón Gómez. Multiplatform application developer specializing in Flutter, Web and Android.',
  'meta.defaultTitle': 'Daniel Patrón Gómez - Web & Mobile Developer',

  'nav.home': 'Home',
  'nav.toggle': 'Toggle navigation',
  'nav.skip': 'Skip to content',
  'nav.about': 'About',
  'nav.experience': 'Experience',
  'nav.skills': 'Skills',
  'nav.tokens': 'Tokens',
  'nav.education': 'Education',
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',
  'lang.label': 'Language',

  'header.headline': '& multiplatform application developer.',
  'header.word1': 'Front-End Developer',
  'header.word2': 'Flutter & Web Developer',
  'header.word3': 'Web Components Specialist',
  'header.word4': 'Higher Technician DAM',
  'header.bio': 'Currently at <strong>BBVA Technology in Europe</strong>, building interfaces for international mobile banking apps with <strong>Lit, Web Components and Ember.js</strong>. Passionate about frontend architecture, visual precision and good practices.',
  'header.viewProjects': 'View Projects',

  'about.label': 'ABOUT ME',
  'about.title': 'Background & Focus',
  'about.photoAlt': 'Daniel Patrón Gómez - Profile photo',
  'about.statBbva': 'Years at BBVA Tech',
  'about.statApps': 'Apps Built',
  'about.statDegree': 'Higher Vocational Degree',
  'about.heading': 'Front-End & Multiplatform Developer',
  'about.p1': 'I am Daniel, a developer focused on building fast, accessible and intuitive digital products. I specialize in building robust user interfaces and cross-platform mobile applications.',
  'about.p2': 'In my role as <strong>Front-end Developer at BBVA Technology in Europe</strong>, I am part of the team evolving the international mobile banking app in Spain, Italy and Germany, using <strong>Lit, Web Components and Ember.js</strong>.',
  'about.location': 'Location',
  'about.locationValue': 'Guadalajara, Spain',
  'about.email': 'Email',
  'about.specialty': 'Specialty',
  'about.specialtyValue': 'Front-end and cross-platform apps',
  'about.qualification': 'Qualification',
  'about.qualificationValue': 'Higher Technician DAM',

  'experience.label': 'EXPERIENCE',
  'experience.title': 'Work experience',

  'skills.label': 'TECH STACK',
  'skills.title': 'Skills & Technologies',

  'projects.label': 'PROJECTS',
  'projects.title': 'Featured Projects & Apps',
  'projects.featured': 'Featured',
  'projects.archived': 'Archived',
  'projects.website': 'Website',
  'projects.code': 'Code',

  'education.label': 'EDUCATION',
  'education.title': 'Academic Background',

  'tokens.label': 'TOKEN USAGE',
  'tokens.title': 'AI Token Usage',
  'tokens.empty': 'No usage data yet',
  'tokens.panelTitle': 'Tokens over time',
  'tokens.rangeLabel': 'Chart period',
  'tokens.daily': 'Daily',
  'tokens.monthly': 'Monthly',
  'tokens.legendDaily': 'Daily tokens',
  'tokens.legendAverage': '7-day average',
  'tokens.captionDaily': 'Full history · {count} calendar days · {range}',
  'tokens.captionMonthly': 'Full history · {count} months · {range}',
  'tokens.topModels': 'Top 5 models',
  'tokens.updated': 'Data updated through {date}',
  'tokens.unknownModel': 'unknown model',
  'tokens.unknownProvider': 'unknown provider',
  'tokens.coverageNone': 'no activity recorded',
  'tokens.coverageOneDay': '1 day with data',
  'tokens.coverageDays': '{count} days with data',
  'tokens.coverageOf': '{observed} of {total} days',
  'tokens.partial': ' (partial: {coverage})',
  'tokens.periodDaily': 'daily',
  'tokens.periodMonthly': 'monthly',
  'tokens.ariaEmpty': 'Token usage chart ({period}), no data',
  'tokens.ariaIntro': 'Bar chart of {period} token usage, from {from} to {to}',
  'tokens.ariaPeakDay': 'peak of {tokens} tokens on {date}',
  'tokens.ariaPeakMonth': 'peak of {tokens} tokens in {date}',
  'tokens.ariaNoUsage': 'no usage recorded in the period',
  'tokens.ariaLine': 'with a 7-day moving average line',
  'tokens.ariaTotal': 'total for the period: {total} tokens',
  'tokens.gapDay': '{count} day without data',
  'tokens.gapDays': '{count} days without data',
  'tokens.gapMonth': '{count} month without data',
  'tokens.gapMonths': '{count} months without data',

  'date.long': '{month} {day}, {year}',
  'date.short': '{month} {day}',
  'date.shortYear': '{month} {day} ’{yy}',
  'date.monthShort': '{month} {yy}',
  'date.monthLong': '{month} {year}',

  'contact.label': 'CONTACT',
  'contact.title': "Let's talk!",
  'contact.subtitle': 'If you have a job offer, a question, or would like to collaborate on a project, feel free to get in touch.',

  'footer.copyright': '© {year} Daniel Patrón Gómez. All rights reserved.',
  'footer.top': 'Back to top',
};

export type Lang = 'es' | 'en';

export const ui: Record<Lang, Dictionary> = { es, en };

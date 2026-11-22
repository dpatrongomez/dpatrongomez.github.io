/**
 * Experiencia laboral. Las fechas se guardan como meses `"YYYY-MM"` (`end: null`
 * = actualidad); duraciones y rangos se calculan en build con `durations.ts`.
 */
import { defaultLang, localized, type Lang, type Localized } from "../i18n";
import { currentYearMonth, formatDuration, monthsBetween } from "./durations";

export interface Role {
  title: Localized;
  start: string;
  end: string | null;
  workplace: Localized;
  description: Localized;
  skills: Localized[];
}

export interface Company {
  company: string;
  location: Localized;
  type: Localized;
  logo?: string;
  icon: string;
  /** `duration`: "4 años 11 meses" (desde el primer rol). `years`: "2018 - 2021". */
  periodStyle: "duration" | "years";
  roles: Role[];
}

export const experiences: Company[] = [
  {
    company: "BBVA Technology en Europa",
    location: localized("Madrid, Comunidad de Madrid, España", "Madrid, Community of Madrid, Spain"),
    type: localized("Jornada completa", "Full-time"),
    logo: "/assets/images/companies/bbva.webp",
    icon: "fa6-solid:building-columns",
    periodStyle: "duration",
    roles: [
      {
        title: localized("Front-end Developer"),
        start: "2025-01",
        end: null,
        workplace: localized("Híbrido", "Hybrid"),
        description: localized("Desarrollador front-end en la aplicación móvil de banca de BBVA Italia y Alemania.", "Front-end developer on the mobile banking app of BBVA Italy and Germany."),
        skills: [localized("Ember.js"), localized("JavaScript"), localized("Banca Móvil", "Mobile Banking")]
      },
      {
        title: localized("Front-end Developer"),
        start: "2024-01",
        end: "2025-01",
        workplace: localized("Híbrido", "Hybrid"),
        description: localized("Desarrollador front-end en la aplicación móvil de banca de BBVA España migrando la tecnología de la aplicación.", "Front-end developer on the mobile banking app of BBVA Spain, migrating the app's technology."),
        skills: [localized("Web Components"), localized("Lit"), localized("Migración Tecnológica", "Technology Migration")]
      },
      {
        title: localized("Front-end Developer"),
        start: "2021-12",
        end: "2024-01",
        workplace: localized("Híbrido", "Hybrid"),
        description: localized("Desarrollador front-end en la aplicación móvil de banca de BBVA España haciendo uso de Ember.js como framework.", "Front-end developer on the mobile banking app of BBVA Spain, using Ember.js as the framework."),
        skills: [localized("Ember.js"), localized("Metodologías Ágiles", "Agile Methodologies"), localized("Front-end")]
      }
    ]
  },
  {
    company: "Azonix Tec",
    location: localized("Guadalajara, España", "Guadalajara, Spain"),
    type: localized("Jornada parcial / Temporal", "Part-time / Temporary"),
    logo: "/assets/images/companies/azonix.webp",
    icon: "fa6-solid:network-wired",
    periodStyle: "years",
    roles: [
      {
        title: localized("Responsable de proyectos", "Project Manager"),
        start: "2021-11",
        end: "2021-12",
        workplace: localized("Jornada parcial", "Part-time"),
        description: localized("Gestión, coordinación y supervisión de proyectos informáticos y de telecomunicaciones.", "Management, coordination and supervision of IT and telecommunications projects."),
        skills: [localized("Gestión de Proyectos", "Project Management"), localized("Coordinación", "Coordination")]
      },
      {
        title: localized("Desarrollador y Técnico de Telecomunicaciones e Informática", "Developer and Telecommunications & IT Technician"),
        start: "2020-07",
        end: "2021-12",
        workplace: localized("Jornada parcial", "Part-time"),
        description: localized("Desarrollo de software y mantenimiento técnico de infraestructuras informáticas y de redes.", "Software development and technical maintenance of IT and network infrastructure."),
        skills: [localized("Desarrollo Software", "Software Development"), localized("Sistemas", "Systems"), localized("Redes", "Networking")]
      },
      {
        title: localized("Técnico de Telecomunicaciones e Informática", "Telecommunications & IT Technician"),
        start: "2019-05",
        end: "2019-09",
        workplace: localized("Contrato temporal", "Temporary contract"),
        description: localized("Mantenimiento e instalación de infraestructura de telecomunicaciones e informática.", "Maintenance and installation of telecommunications and IT infrastructure."),
        skills: [localized("Telecomunicaciones", "Telecommunications"), localized("Sistemas", "Systems")]
      },
      {
        title: localized("Técnico de Telecomunicaciones e Informática", "Telecommunications & IT Technician"),
        start: "2018-04",
        end: "2018-11",
        workplace: localized("Contrato temporal", "Temporary contract"),
        description: localized("Soporte técnico, configuración de equipos informáticos y mantenimiento de red.", "Technical support, IT equipment configuration and network maintenance."),
        skills: [localized("Soporte Técnico", "Technical Support"), localized("Redes", "Networking")]
      }
    ]
  }
];

/** Inicio más antiguo y fin más reciente de la empresa (`null` = sigue activo). */
export function companySpan(company: Company): { start: string; end: string | null } {
  const starts = company.roles.map((r) => r.start).sort();
  const ends = company.roles.map((r) => r.end);
  const end = ends.includes(null) ? null : ends.map((e) => e as string).sort().at(-1)!;
  return { start: starts[0], end };
}

/** Texto del periodo de la empresa, según su `periodStyle`. */
export function formatCompanyPeriod(company: Company, lang: Lang = defaultLang, now: string = currentYearMonth()): string {
  const { start, end } = companySpan(company);
  if (company.periodStyle === "years") {
    const startYear = start.slice(0, 4);
    const endYear = end ? end.slice(0, 4) : now.slice(0, 4);
    return `${startYear} - ${endYear}`;
  }
  return formatDuration(monthsBetween(start, end ?? now), lang);
}

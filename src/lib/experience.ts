/**
 * Experiencia laboral. Las fechas se guardan como meses `"YYYY-MM"` (`end: null`
 * = actualidad); duraciones y rangos se calculan en build con `durations.ts`.
 */
import { currentYearMonth, formatDuration, monthsBetween } from "./durations";

export interface Role {
  title: string;
  start: string;
  end: string | null;
  workplace: string;
  description: string;
  skills: string[];
}

export interface Company {
  company: string;
  location: string;
  type: string;
  logo?: string;
  icon: string;
  /** `duration`: "4 años 11 meses" (desde el primer rol). `years`: "2018 - 2021". */
  periodStyle: "duration" | "years";
  roles: Role[];
}

export const experiences: Company[] = [
  {
    company: "BBVA Technology en Europa",
    location: "Madrid, Comunidad de Madrid, España",
    type: "Jornada completa",
    logo: "/assets/images/companies/bbva.webp",
    icon: "fa-building-columns",
    periodStyle: "duration",
    roles: [
      {
        title: "Front-end Developer",
        start: "2025-01",
        end: null,
        workplace: "Híbrido",
        description: "Desarrollador front-end en la aplicación móvil de banca de BBVA Italia y Alemania.",
        skills: ["Ember.js", "JavaScript", "Banca Móvil"]
      },
      {
        title: "Front-end Developer",
        start: "2024-01",
        end: "2025-01",
        workplace: "Híbrido",
        description: "Desarrollador front-end en la aplicación móvil de banca de BBVA España migrando la tecnología de la aplicación.",
        skills: ["Web Components", "Lit", "Migración Tecnológica"]
      },
      {
        title: "Front-end Developer",
        start: "2021-12",
        end: "2024-01",
        workplace: "Híbrido",
        description: "Desarrollador front-end en la aplicación móvil de banca de BBVA España haciendo uso de Ember.js como framework.",
        skills: ["Ember.js", "Metodologías Ágiles", "Front-end"]
      }
    ]
  },
  {
    company: "Azonix Tec",
    location: "Guadalajara, España",
    type: "Jornada parcial / Temporal",
    logo: "/assets/images/companies/azonix.webp",
    icon: "fa-network-wired",
    periodStyle: "years",
    roles: [
      {
        title: "Responsable de proyectos",
        start: "2021-11",
        end: "2021-12",
        workplace: "Jornada parcial",
        description: "Gestión, coordinación y supervisión de proyectos informáticos y de telecomunicaciones.",
        skills: ["Gestión de Proyectos", "Coordinación"]
      },
      {
        title: "Desarrollador y Técnico de Telecomunicaciones e Informática",
        start: "2020-07",
        end: "2021-12",
        workplace: "Jornada parcial",
        description: "Desarrollo de software y mantenimiento técnico de infraestructuras informáticas y de redes.",
        skills: ["Desarrollo Software", "Sistemas", "Redes"]
      },
      {
        title: "Técnico de Telecomunicaciones e Informática",
        start: "2019-05",
        end: "2019-09",
        workplace: "Contrato temporal",
        description: "Mantenimiento e instalación de infraestructura de telecomunicaciones e informática.",
        skills: ["Telecomunicaciones", "Sistemas"]
      },
      {
        title: "Técnico de Telecomunicaciones e Informática",
        start: "2018-04",
        end: "2018-11",
        workplace: "Contrato temporal",
        description: "Soporte técnico, configuración de equipos informáticos y mantenimiento de red.",
        skills: ["Soporte Técnico", "Redes"]
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
export function formatCompanyPeriod(company: Company, now: string = currentYearMonth()): string {
  const { start, end } = companySpan(company);
  if (company.periodStyle === "years") {
    const startYear = start.slice(0, 4);
    const endYear = end ? end.slice(0, 4) : now.slice(0, 4);
    return `${startYear} - ${endYear}`;
  }
  return formatDuration(monthsBetween(start, end ?? now));
}

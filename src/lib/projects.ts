import pluggyImg from "../assets/projects/pluggy.png";
import urbanosImg from "../assets/projects/urbanosguadalajara.jpg";
import mercalistImg from "../assets/projects/mercalist.png";
import precioluzImg from "../assets/projects/precioluz.webp";
import tiempoappImg from "../assets/projects/tiempoapp.png";
import educamosclmImg from "../assets/projects/educamosclm.jpg";
import varesImg from "../assets/projects/vares.png";

/**
 * Proyectos (apps y webs) mostrados en Portfolio. También se usan para contar
 * las apps de About, así que la lista vive aquí y no dentro del componente.
 */
export const projects = [
  {
    name: "Pluggy",
    info: "Aplicación móvil para localizar y consultar puntos de recarga de vehículos eléctricos (EV) en tiempo real.",
    tags: ["Flutter", "Dart", "Android"],
    image: pluggyImg,
    web: "https://play.google.com/store/apps/details?id=com.dpatrongomez.pluggy",
    googleplay: true,
    github: "https://github.com/dpatrongomez/pluggy",
    featured: true
  },
  {
    name: "Urbanos Guadalajara",
    info: "Aplicación móvil para consultar los itinerarios y horarios de los autobuses urbanos de Guadalajara.",
    tags: ["Flutter", "Dart", "Android"],
    image: urbanosImg,
    web: "https://play.google.com/store/apps/details?id=com.dpatrongomez.urbanosguadalajara",
    googleplay: true,
    github: "https://github.com/dpatrongomez/urbanosguadalajara",
    featured: true
  },
  {
    name: "MercaList",
    info: "Aplicación interactiva para crear listas de la compra conectada con el catálogo oficial de Mercadona.",
    tags: ["Flutter", "REST API", "Android"],
    image: mercalistImg,
    web: "https://play.google.com/store/apps/details?id=com.dpatrongomez.mercalist",
    googleplay: true,
    github: "https://github.com/dpatrongomez/mercalist",
    featured: true
  },
  {
    name: "Precio Luz",
    info: "Aplicación móvil para consultar el precio de la electricidad por horas en España.",
    tags: ["Flutter", "REST API", "Android"],
    image: precioluzImg,
    web: "https://play.google.com/store/apps/details?id=com.dpatrongomez.precioluz",
    googleplay: true,
    github: "https://github.com/dpatrongomez/precioluz",
    featured: true
  },
  {
    name: "TiempoApp",
    info: "Aplicación web progresiva para consultar el tiempo meteorológico en municipios de España.",
    tags: ["Angular", "GitHub Actions", "Web"],
    image: tiempoappImg,
    web: "https://dpatrongomez.github.io/tiempoApp/",
    googleplay: false,
    github: "https://github.com/dpatrongomez/tiempoApp",
    featured: false
  },
  {
    name: "EducamosCLM",
    info: "Acceso móvil a módulos y avisos de la plataforma de educación de Castilla-La Mancha.",
    tags: ["Flutter", "Dart"],
    image: educamosclmImg,
    archived: true,
    github: "https://github.com/dpatrongomez/EducamosCLM",
    featured: false
  },
  {
    name: "Vares, con “V” de Visillo",
    info: "Plataforma para valorar establecimientos y bares en Guadalajara fomentando el comercio local.",
    tags: ["Flutter", "Firebase"],
    image: varesImg,
    archived: true,
    github: "https://github.com/dpatrongomez/vares",
    featured: false
  },
];

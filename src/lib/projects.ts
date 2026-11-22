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
    info: "Encuentra cargadores para tu coche eléctrico y planifica las paradas de recarga de un viaje.",
    implementation: "Integré los datos de OpenChargeMap en un mapa que permite filtrar estaciones por conector y potencia. La app también muestra los puntos cercanos en Android Auto.",
    tags: ["Flutter", "Dart", "Android"],
    image: pluggyImg,
    web: "https://play.google.com/store/apps/details?id=com.dpatrongomez.pluggy",
    googleplay: true,
    github: "https://github.com/dpatrongomez/pluggy",
    featured: true
  },
  {
    name: "Urbanos Guadalajara",
    info: "Consulta cuánto falta para que llegue el próximo autobús urbano en Guadalajara.",
    implementation: "Combiné las estimaciones de llegada con un mapa de paradas y guardé los favoritos en el dispositivo para que puedas volver a tus paradas habituales. La app ha alcanzado las 10.000 descargas en Google Play.",
    tags: ["Flutter", "Dart", "Android"],
    image: urbanosImg,
    web: "https://play.google.com/store/apps/details?id=com.dpatrongomez.urbanosguadalajara",
    googleplay: true,
    github: "https://github.com/dpatrongomez/urbanosguadalajara",
    featured: true
  },
  {
    name: "MercaList",
    info: "Organiza la compra desde una lista que puedes compartir con las personas de casa.",
    implementation: "Integré un catálogo con precios orientativos y combiné el almacenamiento local con la sincronización en la nube. Así puedes usar tus listas sin conexión y editar las compartidas en tiempo real cuando tienes cobertura.",
    tags: ["Flutter", "REST API", "Android"],
    image: mercalistImg,
    web: "https://play.google.com/store/apps/details?id=com.dpatrongomez.mercalist",
    googleplay: true,
    github: "https://github.com/dpatrongomez/mercalist",
    featured: true
  },
  {
    name: "Precio Luz",
    info: "Compara el precio de la luz por horas para decidir cuándo te conviene usar los electrodomésticos.",
    implementation: "Usé datos públicos de Red Eléctrica para visualizar el precio de la tarifa regulada (PVPC) y el reparto de la generación eléctrica por fuentes.",
    tags: ["Flutter", "REST API", "Android"],
    image: precioluzImg,
    web: "https://play.google.com/store/apps/details?id=com.dpatrongomez.precioluz",
    googleplay: true,
    github: "https://github.com/dpatrongomez/precioluz",
    featured: true
  },
  {
    name: "TiempoApp",
    info: "Busca un municipio español y consulta su previsión meteorológica desde el navegador.",
    implementation: "Desarrollé la web en Angular. Conecté el buscador y la previsión a la API de el-tiempo.net, y di a cada municipio una URL que se puede compartir.",
    tags: ["Angular", "GitHub Actions", "Web"],
    image: tiempoappImg,
    web: "https://dpatrongomez.github.io/tiempoApp/",
    googleplay: false,
    github: "https://github.com/dpatrongomez/tiempoApp",
    featured: false
  },
  {
    name: "EducamosCLM",
    info: "Acceso desde el móvil a servicios de la plataforma educativa de Castilla-La Mancha.",
    implementation: "Organicé los accesos para familias y personal de los centros e integré módulos como Seguimiento Educativo y Secretaría Virtual en un navegador dentro de la app.",
    tags: ["Flutter", "Dart"],
    image: educamosclmImg,
    archived: true,
    github: "https://github.com/dpatrongomez/EducamosCLM",
    featured: false
  },
  {
    name: "Vares, con “V” de Visillo",
    info: "Una app para descubrir y valorar bares de Guadalajara por barrio.",
    implementation: "Organicé los establecimientos por barrios e integré Firebase en la app Flutter, que reunía fichas de locales, mapas y valoraciones.",
    tags: ["Flutter", "Firebase"],
    image: varesImg,
    archived: true,
    github: "https://github.com/dpatrongomez/vares",
    featured: false
  },
];

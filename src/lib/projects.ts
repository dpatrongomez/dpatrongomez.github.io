import { localized } from "../i18n";
import pluggyImg from "../assets/projects/pluggy.png";
import urbanosImg from "../assets/projects/urbanosguadalajara.png";
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
    info: localized(
      "Encuentra cargadores para tu coche eléctrico y planifica las paradas de recarga de un viaje.",
      "Find EV charging stations and plan charging stops for a road trip."
    ),
    implementation: localized(
      "Integré los datos de OpenChargeMap en un mapa que permite filtrar estaciones por conector y potencia. La app también muestra los puntos cercanos en Android Auto.",
      "I integrated OpenChargeMap data into a map that lets you filter stations by connector type and charging power. The app also shows nearby stations in Android Auto."
    ),
    tags: ["Flutter", "Dart", "Android"],
    image: pluggyImg,
    web: "https://play.google.com/store/apps/details?id=com.dpatrongomez.pluggy",
    googleplay: true,
    github: "https://github.com/dpatrongomez/pluggy",
    featured: true
  },
  {
    name: "Urbanos Guadalajara",
    info: localized(
      "Consulta cuánto falta para que llegue el próximo autobús urbano en Guadalajara.",
      "Check when the next city bus arrives in Guadalajara."
    ),
    implementation: localized(
      "Combiné las estimaciones de llegada con un mapa de paradas y guardé los favoritos en el dispositivo para que puedas volver a tus paradas habituales. La app ha alcanzado las 10.000 descargas en Google Play.",
      "I combined arrival estimates with a map of bus stops and stored favorites on the device so you can quickly return to your usual stops. The app has reached 10,000 downloads on Google Play."
    ),
    tags: ["Flutter", "Dart", "Android"],
    image: urbanosImg,
    web: "https://play.google.com/store/apps/details?id=com.dpatrongomez.urbanosguadalajara",
    googleplay: true,
    github: "https://github.com/dpatrongomez/urbanosguadalajara",
    featured: true
  },
  {
    name: "MercaList",
    info: localized(
      "Organiza la compra desde una lista que puedes compartir con las personas de casa.",
      "Plan your grocery shopping with a list you can share with your household."
    ),
    implementation: localized(
      "Integré un catálogo con precios orientativos y combiné el almacenamiento local con la sincronización en la nube. Así puedes usar tus listas sin conexión y editar las compartidas en tiempo real cuando tienes cobertura.",
      "I integrated a product catalog with indicative prices and combined local storage with cloud sync. You can use lists offline and edit shared lists together in real time when connected."
    ),
    tags: ["Flutter", "REST API", "Android"],
    image: mercalistImg,
    web: "https://play.google.com/store/apps/details?id=com.dpatrongomez.mercalist",
    googleplay: true,
    github: "https://github.com/dpatrongomez/mercalist",
    featured: true
  },
  {
    name: "Precio Luz",
    info: localized(
      "Compara el precio de la luz por horas para decidir cuándo te conviene usar los electrodomésticos.",
      "Compare hourly electricity prices to decide when to run your appliances."
    ),
    implementation: localized(
      "Usé datos públicos de Red Eléctrica para visualizar el precio de la tarifa regulada (PVPC) y el reparto de la generación eléctrica por fuentes.",
      "I used public data from Red Eléctrica to visualize Spain's regulated electricity tariff (PVPC) and break down power generation by source."
    ),
    tags: ["Flutter", "REST API", "Android"],
    image: precioluzImg,
    web: "https://play.google.com/store/apps/details?id=com.dpatrongomez.precioluz",
    googleplay: true,
    github: "https://github.com/dpatrongomez/precioluz",
    featured: true
  },
  {
    name: "TiempoApp",
    info: localized(
      "Busca un municipio español y consulta su previsión meteorológica desde el navegador.",
      "Search for a town or city in Spain and check its weather forecast in your browser."
    ),
    implementation: localized(
      "Desarrollé la web en Angular. Conecté el buscador y la previsión a la API de el-tiempo.net, y di a cada municipio una URL que se puede compartir.",
      "I built the site with Angular, connected the search and forecast to the el-tiempo.net API, and gave each municipality its own shareable URL."
    ),
    tags: ["Angular", "GitHub Actions", "Web"],
    image: tiempoappImg,
    web: "https://dpatrongomez.github.io/tiempoApp/",
    googleplay: false,
    github: "https://github.com/dpatrongomez/tiempoApp",
    featured: false
  },
  {
    name: "EducamosCLM",
    info: localized(
      "Acceso desde el móvil a servicios de la plataforma educativa de Castilla-La Mancha.",
      "Access Castilla-La Mancha's education platform from your phone."
    ),
    implementation: localized(
      "Organicé los accesos para familias y personal de los centros e integré módulos como Seguimiento Educativo y Secretaría Virtual en un navegador dentro de la app.",
      "I organized access for families and school staff and integrated services such as student progress and the virtual school office into an in-app browser."
    ),
    tags: ["Flutter", "Dart"],
    image: educamosclmImg,
    archived: true,
    github: "https://github.com/dpatrongomez/EducamosCLM",
    featured: false
  },
  {
    name: "Vares, con “V” de Visillo",
    info: localized(
      "Una app para descubrir y valorar bares de Guadalajara por barrio.",
      "An app for discovering and rating bars by neighborhood in Guadalajara."
    ),
    implementation: localized(
      "Organicé los establecimientos por barrios e integré Firebase en la app Flutter, que reunía fichas de locales, mapas y valoraciones.",
      "I organized venues by neighborhood and integrated Firebase into the Flutter app, which brought together venue listings, maps, and ratings."
    ),
    tags: ["Flutter", "Firebase"],
    image: varesImg,
    archived: true,
    github: "https://github.com/dpatrongomez/vares",
    featured: false
  },
];

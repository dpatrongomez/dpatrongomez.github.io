export interface CaseStudyItem {
  title: string;
  items: string[];
}

export interface CaseStudyLink {
  label: string;
  url: string;
  icon: string;
}

export interface CaseStudyScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  summary: string;
  tags: string[];
  image: string;
  links: CaseStudyLink[];
  problem: string[];
  decisions: CaseStudyItem[];
  challenges: CaseStudyItem[];
  results: string[];
  screenshots: CaseStudyScreenshot[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "pluggy",
    name: "Pluggy",
    summary:
      "Localizador de estaciones de carga para vehículos eléctricos con datos abiertos de OpenChargeMap y OpenStreetMap.",
    tags: ["Flutter", "Dart", "Android"],
    image:
      "https://play-lh.googleusercontent.com/-HjHI8Wu9V1HEeDjHTo0HAWFQUChx-v7TQe36cN_adi2iv8ks-0pbtDTgAFKmj-gmhxqhSJH471toQjCZLMrng",
    links: [
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.dpatrongomez.pluggy",
        icon: "fa-brands fa-google-play",
      },
      {
        label: "Código",
        url: "https://github.com/dpatrongomez/pluggy",
        icon: "fa-brands fa-github",
      },
    ],
    problem: [
      "Quien conduce un coche eléctrico necesita saber dónde puede cargar, con qué conectores y potencia, si la estación figura como operativa y cuánto le costará la recarga. Esa información está dispersa y no siempre es fácil de filtrar desde el móvil.",
      "Pluggy reúne esos datos en una app: muestra los puntos de recarga cercanos en un mapa o en una lista, con sus operadores, conectores y estado, y permite filtrarlos por potencia, tipo de conector u operador.",
    ],
    decisions: [
      {
        title: "Estado",
        items: [
          "Riverpod 3 (flutter_riverpod) con Notifier y AsyncNotifier para el estado de cada funcionalidad.",
          "Providers globales para tema, idioma, preferencias y tarifas por operador, agrupados en core/providers.",
          "Estado inmutable, pensado para reconstruir solo las partes de la interfaz que cambian.",
        ],
      },
      {
        title: "Arquitectura",
        items: [
          "Clean Architecture organizada por funcionalidades (feature-first): core/ para infraestructura compartida y features/ para charging_stations, place_search, auth y settings.",
          "Cada funcionalidad separa presentación, dominio y datos; las capas de presentación y de datos dependen del dominio.",
          "Android Auto se implementa con un repositorio Kotlin propio, independiente de la actividad y del motor Flutter del móvil.",
        ],
      },
      {
        title: "APIs y fuentes de datos",
        items: [
          "OpenChargeMap API v3 para puntos de recarga, operadores, conectores y fotos comunitarias.",
          "Nominatim (OpenStreetMap) para la búsqueda de lugares y la geocodificación inversa.",
          "Valhalla y OSRM para calcular rutas con paradas de carga.",
          "Una API de respaldo alojada en Vercel que replica datos públicos de OpenChargeMap cuando la fuente principal no está disponible.",
          "Teselas de OpenStreetMap, CARTO, Esri y OpenFreeMap para el mapa.",
        ],
      },
      {
        title: "Mapa y caché",
        items: [
          "flutter_map sobre teselas de OpenStreetMap, con clustering de marcadores mediante fluster para grandes densidades de estaciones.",
          "Caché en disco con caducidad de 7 días para datos de referencia (operadores, conectores y estados).",
          "Caché de contención por cuadrículas geográficas ya consultadas, para reducir el consumo de datos móviles.",
        ],
      },
      {
        title: "Privacidad y seguridad",
        items: [
          "La ubicación solo se usa con la app abierta o con su pantalla visible en Android Auto. No hay rastreo en segundo plano.",
          "Sin publicidad ni SDKs de analítica. Los datos del usuario permanecen en el dispositivo.",
          "La sesión de OpenChargeMap se guarda en almacenamiento seguro (Keychain y Android Keystore) mediante flutter_secure_storage.",
        ],
      },
    ],
    challenges: [
      {
        title: "Jank al mover el mapa y con cada actualización de GPS",
        items: [
          "La lista se reordenaba dentro de build() con un comparador que recalculaba distancias, y el clustering se repetía en cada rebuild.",
          "Solución: memorizar los resultados con claves basadas en la identidad de los objetos y dividir MapScreen en widgets más pequeños que solo observan lo que pintan.",
        ],
      },
      {
        title: "Trabajo pesado en el hilo de interfaz",
        items: [
          "Hasta 500 puntos por consulta se decodificaban en el isolate de UI, y la caché en disco se leía con I/O síncrono.",
          "Esta incidencia figura en el audit de rendimiento del repositorio de Pluggy, que la marca como resuelta.",
        ],
      },
      {
        title: "Fugas de memoria y cachés sin límite",
        items: [
          "Un MapController sin dispose, un cliente http creado en cada consulta y cachés que solo crecían.",
          "Solución: liberar los recursos al salir de la pantalla y limitar el tamaño y la caducidad de las cachés.",
        ],
      },
      {
        title: "Regiones marcadas como cargadas por error",
        items: [
          "Una consulta cortada por el límite de 500 resultados se registraba como región completamente cargada, lo que dejaba zonas sin estaciones.",
          "Corregido en el commit 8517e27 (caso Madrid a Torrejón citado en el audit).",
        ],
      },
      {
        title: "Ajustes con todo desplegado",
        items: [
          "La primera versión de la pantalla de ajustes mostraba todas sus secciones desplegadas a la vez.",
          "Las capturas muestran la versión con todas las secciones abiertas y la versión con secciones plegables.",
        ],
      },
    ],
    results: [
      "Publicada en Google Play. El código del repositorio corresponde a la versión 2.0.0 (build 7).",
      "Interfaz disponible en español, inglés y gallego, con cambio de idioma en tiempo real.",
      "Integración con Android Auto para mostrar las estaciones cercanas en la pantalla del vehículo.",
      "Tiers 1 a 3 del audit de rendimiento completados; el tier 4 sigue pendiente según el propio audit.",
    ],
    screenshots: [
      {
        src: "/assets/images/pluggy/settings-before.png",
        alt: "Pantalla de ajustes de Pluggy con todas las secciones desplegadas",
        caption: "Ajustes con todas las secciones desplegadas",
      },
      {
        src: "/assets/images/pluggy/settings-after.png",
        alt: "Pantalla de ajustes de Pluggy con secciones plegables",
        caption: "Ajustes con secciones plegables",
      },
    ],
    // TODO(issue-6): añadir métricas de descargas y valoración de Google Play
    // cuando estén disponibles. No constan en el repositorio, así que no se publican.
    // TODO(issue-6): añadir capturas reales del mapa, la lista y la ficha de estación.
    // Las capturas del repositorio solo cubren la pantalla de ajustes.
  },
];

import { Component, OnInit } from "@angular/core";
import { Project } from "./interfaces/project.interface";

@Component({
  selector: "section-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.css"],
})
export class PortfolioComponent implements OnInit {
  projects: Project[] = [];

  constructor() {}

  ngOnInit(): void {
    this.projects = [
      {
        name: "Urbanos Guadalajara",
        info: "Aplicación para disponer de los itinerarios de los autobuses urbanos de Guadalajara.",
        technologies: "Flutter",
        image:
          "https://play-lh.googleusercontent.com/7vsRTxvaj9xDOhunhwzYwn_HlLQW4YwXcxBcQ4kvvSCfVFT01nCnAOIsJHPhV9fTyZg",
        googlePlay:
          "https://play.google.com/store/apps/details?id=com.dpatrongomez.urbanosguadalajara",
        github: "https://github.com/dpatrongomez/urbanosguadalajara",
      },
      {
        name: "MercaList",
        info: "Aplicación para realizar la lista de la compra con los productos de la API de Mercadona.",
        technologies: "Flutter",
        image:
          "https://play-lh.googleusercontent.com/FX_XrlIS2I68S2YULJxmfnozd5_AaiOcmMwAu44-hOYU0CPExCHeg13HYIztJoP2VAg",
        googlePlay:
          "https://play.google.com/store/apps/details?id=com.dpatrongomez.mercalist",
        github: "https://github.com/dpatrongomez/mercalist",
      },
      {
        name: "EducamosCLM",
        info: "Aplicación para acceder a los distintos módulos de la plataforma de educación utilizada en Castilla la Mancha.",
        technologies: "Flutter",
        image:
          "https://play-lh.googleusercontent.com/D3Qw9e43W_y9MSrHX42i5XCST_0WYxY9OfmOUJ6c6trVtte-JcST6HRT_0avVjG8Q4Y",
        googlePlay:
          "https://play.google.com/store/apps/details?id=es.dpatrongomez.papas",
        github: "https://github.com/dpatrongomez/EducamosCLM",
      },
      {
        name: "Vares, con “V” de Visillo",
        info: "Aplicación para valorar los bares de la ciudad de Guadalajara para incentivar el consumo en la ciudad.",
        technologies: "Flutter y Firebase",
        image:
          "https://play-lh.googleusercontent.com/G58ZEGH2yFBRHz6Wnetl8h4SQ7viSyFIj0-2hmOFB7185AShTa7RfzOV54MuYoCpmW0W",
        googlePlay:
          "https://play.google.com/store/apps/details?id=com.dpatrongomez.vares",
        github: "https://github.com/dpatrongomez/vares",
      },
      {
        name: "dpatrongomez.github.io",
        info: "Web creada para mostrar mi perfil profesional.",
        technologies: "Angular y GitHub Actions",
        image: "assets/images/logo.svg",
        github: "https://github.com/dpatrongomez/dpatrongomez.github.io",
      },
    ];
  }
}

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "section-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.css"],
})
export class EducationComponent implements OnInit {
  constructor() {}

  studies!: any[];

  ngOnInit() {
    this.studies = [
      {
        name: "Desarrollo de Aplicaciones Multiplataforma - Ciclo Formativo de Grado Superior",
        date: "2017 - 2020",
        color: "#FF9800",
        info: "I.E.S. Brianda de Mendoza",
        // infoExtended: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
      },
      {
        name: "Administración y Programación en Sistemas ERP-CRM",
        date: "2019 - 2019",
        color: "#FF9800",
        info: "Ayla Diseño y Tecnología",
      },
      {
        name: "Sistemas Microinformáticos y Redes - Ciclo Formativo de Grado Medio",
        date: "2015 - 2017",
        color: "#FF9800",
        info: "I.E.S. Brianda de Mendoza",
      },
    ];
  }
}

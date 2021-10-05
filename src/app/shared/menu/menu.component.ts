import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styles: [`
      p-menubar {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1;
      }
    `],
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: "Inicio",
        icon: "pi pi-fw pi-home",
        url: "#header",
      },
      {
        label: "Sobre mi",
        icon: "pi pi-fw pi-user",
        url: "#about",
      },
      {
        label: "Habilidades",
        icon: "pi pi-fw pi-list",
        url: "#skills",
      },
      {
        label: "Formación",
        icon: "pi pi-fw pi-briefcase",
        url: "#education",
      },
      {
        label: "Portfolio",
        icon: "pi pi-fw pi-folder",
        url: "#portfolio",
      },
      {
        label: "Contacto",
        icon: "pi pi-fw pi-envelope",
        url: "#contact",
      },
    ];
  }
}

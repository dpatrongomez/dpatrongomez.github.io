import { Component, OnInit } from '@angular/core';
import * as icon from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'section-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private _fecha = new Date('1998-06-16');
  mapMarker:any;
  building:any;
  mobile:any;
  email:any;
  birthday:any;
  badge:any;
  home:any;

  
  get edad() {
    const diferencia = Math.abs(Date.now() - this._fecha.getTime());
    const edad = Math.floor((diferencia / (1000 * 3600 * 24))/365.25);
    return `${edad} años`
  }

  constructor() { }

  ngOnInit(): void {
    this.mapMarker=icon.faMapMarker;
    this.building=icon.faCity;
    this.email=icon.faMailBulk;
    this.mobile=icon.faMobile;
    this.birthday=icon.faBirthdayCake;
    this.badge=icon.faGraduationCap;
    this.home=icon.faLaptopHouse;
  }

}

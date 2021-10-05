import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'section-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var options = {
      strings: ['','Web','Android'],
      typeSpeed: 120,
      backSpeed: 100,
      loop: true,
    };
    
    var typed = new Typed('.typed', options);
    typed.reset(true)
  }

}

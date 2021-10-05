import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  year = 2000


  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear()
  }

}

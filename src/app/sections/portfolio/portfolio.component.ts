import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'section-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  projects = ['1', '2', '3', '4', '5', '6', '7', '8']

  constructor() { }

  ngOnInit(): void {
  }

}

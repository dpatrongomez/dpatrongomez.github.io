import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SkillsComponent } from './skills/skills.component';
import { EducationComponent } from './education/education.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    HeaderComponent,
    AboutComponent,
    SkillsComponent,
    EducationComponent,
    PortfolioComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    AboutComponent,
    SkillsComponent,
    EducationComponent,
    PortfolioComponent,
    ContactComponent
  ]
})
export class SectionsModule { }

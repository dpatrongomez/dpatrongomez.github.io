import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import {FormsModule} from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule
  ],
  exports: [
    MenuComponent,
    FooterComponent
  ]
})
export class SharedModule { }

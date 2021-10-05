import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {DropdownModule} from 'primeng/dropdown';
import {DividerModule} from 'primeng/divider';
import {TimelineModule} from 'primeng/timeline';
import {CardModule} from 'primeng/card';
import {ProgressBarModule} from 'primeng/progressbar';




@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    DropdownModule,
    DividerModule,
    TimelineModule,
    CardModule,
    ProgressBarModule 
  ]
})
export class PrimeNgModule { }

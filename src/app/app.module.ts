import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SectionsModule } from './sections/sections.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SectionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

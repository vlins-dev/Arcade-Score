import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LogoComponent } from './components/logo/logo.component';
import { ModosComponent } from './components/modos/modos.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    ModosComponent,
    RegistrarComponent,
    RankingComponent,
    DetalhesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
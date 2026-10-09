import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModosComponent } from './components/modos/modos.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import { LogoComponent } from './components/logo/logo.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { RegistrarComponent } from './components/registrar/registrar.component';

@NgModule({
  declarations: [
    AppComponent,
    ModosComponent,
    DetalhesComponent,
    LogoComponent,
    RankingComponent,
    RegistrarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

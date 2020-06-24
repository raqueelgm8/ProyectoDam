import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdopcionesRoutingModule } from './adopciones-routing.module';
import { PerrosComponent } from './perros/perros.component';
import { GatosComponent } from './gatos/gatos.component';
import { OtrosComponent } from './otros/otros.component';
import { PerritoComponent } from './perros/perrito/perrito.component';


@NgModule({
  declarations: [PerrosComponent, GatosComponent, OtrosComponent, PerritoComponent],
  imports: [
    CommonModule,
    AdopcionesRoutingModule
  ]
})
export class AdopcionesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdopcionesRoutingModule } from './adopciones-routing.module';
import { AdopcionesComponent } from './adopciones.component';


@NgModule({
  declarations: [AdopcionesComponent],
  imports: [
    CommonModule,
    AdopcionesRoutingModule
  ]
})
export class AdopcionesModule { }

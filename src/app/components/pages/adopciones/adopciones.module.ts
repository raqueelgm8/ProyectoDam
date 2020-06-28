import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdopcionesRoutingModule } from './adopciones-routing.module';
import { PerrosComponent } from './perros/perros.component';
import { GatosComponent } from './gatos/gatos.component';
import { OtrosComponent } from './otros/otros.component';
import { PerritoComponent } from './perros/perrito/perrito.component';


@NgModule({
  declarations: [PerrosComponent, GatosComponent, OtrosComponent, PerritoComponent],
  imports: [
    CommonModule,
    AdopcionesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdopcionesModule { }

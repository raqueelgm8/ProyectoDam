import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdopcionesRoutingModule } from './adopciones-routing.module';
import { PerrosComponent } from './perros/perros.component';
import { GatosComponent } from './gatos/gatos.component';
import { OtrosComponent } from './otros/otros.component';
import { PerritoComponent } from './perros/perrito/perrito.component';
import { FichaAnimalComponent } from './ficha-animal/ficha-animal.component';
import { FormularioAdopcionComponent } from './formulario-adopcion/formulario-adopcion.component';


@NgModule({
  declarations: [PerrosComponent, GatosComponent, OtrosComponent, PerritoComponent, FichaAnimalComponent, FormularioAdopcionComponent],
  imports: [
    CommonModule,
    AdopcionesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdopcionesModule { }

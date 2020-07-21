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
import { ModalPrivacidadComponent } from './formulario-adopcion/modal-privacidad/modal-privacidad.component';


@NgModule({
  declarations: [PerrosComponent, GatosComponent, OtrosComponent, PerritoComponent, FichaAnimalComponent, FormularioAdopcionComponent, ModalPrivacidadComponent],
  imports: [
    CommonModule,
    AdopcionesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdopcionesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdopcionesRoutingModule } from './adopciones-routing.module';
import { PerrosComponent } from './perros/perros.component';
import { GatosComponent } from './gatos/gatos.component';
import { OtrosComponent } from './otros/otros.component';
import { FichaAnimalComponent } from './ficha-animal/ficha-animal.component';
import { FormularioAdopcionComponent } from './formulario-adopcion/formulario-adopcion.component';
import { ModalPrivacidadComponent } from './formulario-adopcion/modal-privacidad/modal-privacidad.component';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [PerrosComponent, GatosComponent, OtrosComponent, FichaAnimalComponent, FormularioAdopcionComponent, ModalPrivacidadComponent],
  imports: [
    CommonModule,
    AdopcionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    NgSelectModule
  ]
})
export class AdopcionesModule { }

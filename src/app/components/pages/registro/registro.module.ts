import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';


@NgModule({
  declarations: [RegistroComponent, InicioSesionComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistroModule { }

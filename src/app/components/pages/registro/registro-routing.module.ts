import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroComponent } from './registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';

const routes: Routes = [
  { path: '', component: RegistroComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }

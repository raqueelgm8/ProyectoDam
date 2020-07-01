import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerrosComponent } from './perros/perros.component';
import { GatosComponent } from './gatos/gatos.component';
import { OtrosComponent } from './otros/otros.component';
import { FichaAnimalComponent } from './ficha-animal/ficha-animal.component';
import { FormularioAdopcionComponent } from './formulario-adopcion/formulario-adopcion.component';


const routes: Routes = [
  { path: 'perros', component: PerrosComponent },
  { path: 'gatos', component: GatosComponent },
  { path: 'otros', component: OtrosComponent },
  { path: 'ficha-animal', component: FichaAnimalComponent },
  { path: 'ficha-animal/formulario-adopcion', component: FormularioAdopcionComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdopcionesRoutingModule { }

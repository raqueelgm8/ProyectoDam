import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerrosComponent } from './perros/perros.component';
import { GatosComponent } from './gatos/gatos.component';
import { OtrosComponent } from './otros/otros.component';
import { FichaAnimalComponent } from './ficha-animal/ficha-animal.component';


const routes: Routes = [
  { path: 'perros', component: PerrosComponent },
  { path: 'gatos', component: GatosComponent },
  { path: 'otros', component: OtrosComponent },
  { path: 'ficha-animal', component: FichaAnimalComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdopcionesRoutingModule { }

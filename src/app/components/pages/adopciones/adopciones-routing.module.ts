import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerrosComponent } from './perros/perros.component';
import { GatosComponent } from './gatos/gatos.component';
import { OtrosComponent } from './otros/otros.component';


const routes: Routes = [
  { path: 'perros', component: PerrosComponent },
  { path: 'gatos', component: GatosComponent },
  { path: 'otros', component: OtrosComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdopcionesRoutingModule { }

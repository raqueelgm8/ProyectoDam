import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdopcionesComponent } from './adopciones.component';

const routes: Routes = [{ path: '', component: AdopcionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdopcionesRoutingModule { }

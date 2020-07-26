import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosComponent } from './productos.component';
import { CestaComponent } from './cesta/cesta.component';

const routes: Routes = [
  { path: '', component: ProductosComponent },
  { path: 'cesta', component: CestaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }

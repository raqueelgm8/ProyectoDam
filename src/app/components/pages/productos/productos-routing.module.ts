import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosComponent } from './productos.component';
import { CestaComponent } from './cesta/cesta.component';
import { ConsultarPedidoComponent } from './consultar-pedido/consultar-pedido.component';

const routes: Routes = [
  { path: '', component: ProductosComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'consultar-pedido', component: ConsultarPedidoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }

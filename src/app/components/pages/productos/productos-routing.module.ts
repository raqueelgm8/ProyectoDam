import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosComponent } from './productos.component';
import { CestaComponent } from './cesta/cesta.component';
import { ConsultarPedidoComponent } from './consultar-pedido/consultar-pedido.component';
import { CompraRealizadaComponent } from './compra-realizada/compra-realizada.component';
import { GuardGuard } from 'src/app/shared/guard.guard';

const routes: Routes = [
  { path: '', component: ProductosComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'consultar-pedido', component: ConsultarPedidoComponent, canActivate: [GuardGuard] },
  { path: 'compra-realizada', component: CompraRealizadaComponent, canActivate: [GuardGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CestaComponent } from './cesta/cesta.component';
import { FichaProductoComponent } from './ficha-producto/ficha-producto.component';
import { ModalAnadidoComponent } from './cesta/modal-anadido/modal-anadido.component';
import { ConsultarPedidoComponent } from './consultar-pedido/consultar-pedido.component';
import { CompraRealizadaComponent } from './compra-realizada/compra-realizada.component';


@NgModule({
  declarations: [
    ProductosComponent, CestaComponent, FichaProductoComponent, ModalAnadidoComponent, ConsultarPedidoComponent,
    CompraRealizadaComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ], entryComponents: [
    FichaProductoComponent
  ], exports: [
  ]
})
export class ProductosModule { }

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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ProductosComponent, CestaComponent, FichaProductoComponent, ModalAnadidoComponent, ConsultarPedidoComponent,
    CompraRealizadaComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ], entryComponents: [
    FichaProductoComponent
  ], exports: [
  ]
})
export class ProductosModule { }

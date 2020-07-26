import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CestaComponent } from './cesta/cesta.component';
import { ModalCestaComponent } from './cesta/modal-cesta/modal-cesta.component';
import { FichaProductoComponent } from './ficha-producto/ficha-producto.component';
import { ModalAnadidoComponent } from './cesta/modal-anadido/modal-anadido.component';


@NgModule({
  declarations: [ProductosComponent, CestaComponent, ModalCestaComponent, FichaProductoComponent, ModalAnadidoComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ], entryComponents: [
    FichaProductoComponent
  ]
})
export class ProductosModule { }

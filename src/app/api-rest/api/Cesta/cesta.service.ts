import { Injectable } from '@angular/core';
import { Producto } from '../../models/Producto/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  items: Producto[] = [];

  constructor() { }

  addToCart(producto: Producto) {
    this.items.push(producto);
    console.log(this.items);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
  removeItem(producto: Producto) {
    const index  = this.items.findIndex(element => element.idProducto === producto.idProducto);
    this.items.splice(index, 1);
  }
}

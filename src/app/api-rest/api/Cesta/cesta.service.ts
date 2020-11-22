import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from '../../models/Producto/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  items: Producto[] = [];

  constructor(
    public sanitizer: DomSanitizer,
  ) { }

  addToCart(producto: Producto) {
    this.items.push(producto);
    localStorage.setItem('cesta', JSON.stringify(this.items));
  }

  getItems() {
    if (localStorage.getItem('cesta') !== undefined && localStorage.getItem('cesta') !== null) {
      this.items = JSON.parse(localStorage.getItem('cesta'));
      this.items.forEach(element => {
        const binaryString = window.atob(element.imagen);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
          const ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }
        const blob = new Blob([bytes], { type: 'application/png'});
        const fileUrl = URL.createObjectURL(blob);
        element.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
      });
    }
    return this.items;
  }

  clearCart() {
    this.items = [];
    localStorage.setItem('cesta', JSON.stringify(this.items));
    return this.items;
  }
  removeItem(producto: Producto) {
    const index  = this.items.findIndex(element => element.idProducto === producto.idProducto);
    this.items.splice(index, 1);
    localStorage.setItem('cesta', JSON.stringify(this.items));
  }
  actualizarCesta(cesta: Producto[]) {
    localStorage.setItem('cesta', JSON.stringify(cesta));
  }
}

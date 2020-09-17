import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Producto } from '../api-rest/models/Producto/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  getProductoCesta() {
    return JSON.parse(localStorage.getItem('cesta'));
  }
  eliminarProducto(producto: Producto) {
    return localStorage.removeItem('cesta');
  }
  addProductoCesta(producto: any) {
    localStorage.setItem('cesta', JSON.stringify(producto));
  }
  iniciarCesta() {
    localStorage.setItem('cesta', '[]')
  }
  limpiarCesta() {
    return localStorage.clear;
  }
  errorHandler (error: Response) {
    console.log(error);
    return throwError(error);
  }
}

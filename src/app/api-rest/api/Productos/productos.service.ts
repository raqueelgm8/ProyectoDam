import { Portal } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../../models/Producto/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    public httpClient: HttpClient
  ) { }

  async buscarProductos(categoria: string, tipoAnimal: string): Promise<Producto[]> {
    return new Promise<Producto[]>( async (resolve, reject) => {
      let productos: Producto[];
      let ruta = 'api/productos/buscarProductoFiltro/';
      if (categoria !== null) {
        ruta = ruta + '?categoria=' + categoria;
      }
      if (tipoAnimal !== null) {
        if (categoria !== null) {
          ruta = ruta + '&tipoAnimal=' + tipoAnimal;
        } else {
          ruta = ruta + '?tipoAnimal=' + tipoAnimal;
        }
      }
      this.httpClient.get<Producto[]>(ruta).subscribe((result) => {
        productos = result;
        resolve(productos);
      }, error => {
        reject(error);
      });
    });
  }
  async buscarTodosProductos(): Promise<Producto[]> {
    return new Promise<Producto[]>( async (resolve, reject) => {
      let productos: Producto[];
      const ruta = 'api/productos/productos';
      this.httpClient.get<Producto[]>(ruta).subscribe((result) => {
        productos = result;
        resolve(productos);
      }, error => {
        reject(error);
      });
    });
  }
}

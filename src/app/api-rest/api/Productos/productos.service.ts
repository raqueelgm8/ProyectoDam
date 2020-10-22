import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../../models/Producto/producto.model';
import Swal from 'sweetalert2';
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
  async crearProducto(producto: Producto): Promise<Producto> {
    return new Promise<Producto>( async (resolve, reject) => {
      const ruta = 'api/productos/guardarProducto';
      this.httpClient.post(ruta, producto).subscribe((result) => {
        producto = result as Producto;
        resolve(producto);
      }, error => {
        reject(error);
      });
    });
  }
  async editarProducto(id: number, producto: Producto): Promise<Producto> {
    return new Promise<Producto>( async (resolve, reject) => {
      const ruta = '/api/productos/editarProducto/' + id;
      this.httpClient.put(ruta, producto).subscribe((result) => {
        producto = result as Producto;
        Swal.fire('¡Éxito!', 'Animal editado con éxito', 'success');
        resolve(producto);
      }, error => {
        reject(error);
      });
    });
  }
  async eliminarProducto(idProducto: number): Promise<string> {
    return new Promise<string>( async (resolve, reject) => {
      this.httpClient.delete('/api/productos/eliminarProducto/' + idProducto).subscribe((result) => {
        Swal.fire('¡Éxito!', 'Animal eliminado con éxito', 'success');
        resolve('El Animal se ha eliminado correctamente');
      }, error => {
        reject(error);
      });
    });
  }
  async obtenerProductoId(id: number): Promise<Producto> {
    return new Promise<Producto>( async (resolve, reject) => {
      let producto: Producto;
      this.httpClient.get('api/productos/getProducto/' + id).subscribe((result) => {
        producto = result as Producto;
        resolve(producto);
      }, error => {
        reject(error);
      });
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetallePedido } from '../../models/DetallePedido/detalle-pedido.model';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  constructor(
    public httpClient: HttpClient
  ) { }

  async obtenerDetallePedidoPorId(idPedido: number, idProducto: number): Promise<DetallePedido> {
    return new Promise<DetallePedido>( async (resolve, reject) => {
      const ruta = '/api/detalles/detallesPedido/' + idPedido + '/' + idProducto;
      this.httpClient.get(ruta).subscribe((result) => {
        resolve(result as DetallePedido);
      }, error => {
        reject(error);
      });
    });
  }
  async obtenerDetallesPedidoPorPedido(idPedido: number): Promise<DetallePedido[]> {
    return new Promise<DetallePedido[]>( async (resolve, reject) => {
      const ruta = '/api/detalles/detallesPedidoPorPedido/' + '/' + idPedido;
      this.httpClient.get(ruta).subscribe((result) => {
        resolve(result as DetallePedido[]);
      }, error => {
        reject(error);
      });
    });
  }
  async obtenerTodosDetallesPedido(): Promise<DetallePedido[]> {
    return new Promise<DetallePedido[]>( async (resolve, reject) => {
      const ruta = '/api/detalles/detallesPedido/';
      this.httpClient.get(ruta).subscribe((result) => {
        resolve(result as DetallePedido[]);
      }, error => {
        reject(error);
      });
    });
  }
}

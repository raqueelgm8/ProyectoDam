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

  async obtenerDetallePedidoPorId(idUsuario: number, idPedido: number, idProducto: number): Promise<DetallePedido> {
    return new Promise<DetallePedido>( async (resolve, reject) => {
      const ruta = '/api/detalles/detallesPedido/' + idUsuario + '/' + idPedido + '/' + idProducto;
      this.httpClient.get(ruta).subscribe((result) => {
        resolve(result as DetallePedido);
      }, error => {
        reject(error);
      });
    });
  }
  async obtenerDetallesPedidoPorPedido(idUsuario: number, idPedido: number): Promise<DetallePedido[]> {
    return new Promise<DetallePedido[]>( async (resolve, reject) => {
      const ruta = '/api/detalles/detallesPedidoPorPedido/' + idUsuario + '/' + idPedido;
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

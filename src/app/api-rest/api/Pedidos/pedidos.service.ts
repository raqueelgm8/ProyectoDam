import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetallePedido } from '../../models/DetallePedido/detalle-pedido.model';
import { Pedido } from '../../models/Pedido/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    public httpClient: HttpClient
  ) { }

  async obtenerPedidoPorId(idUsuario: number, idPedido: number): Promise<Pedido> {
    return new Promise<Pedido>( async (resolve, reject) => {
      const ruta = '/api/pedidos/getPedido/' + idUsuario + '/' + idPedido;
      this.httpClient.get(ruta).subscribe((result) => {
        resolve(result as Pedido);
      }, error => {
        reject(error);
      });
    });
  }
  async obtenerTodosPedidosUsuario(idUsuario: number): Promise<Pedido[]> {
    return new Promise<Pedido[]>( async (resolve, reject) => {
      const ruta = '/api/pedidos/pedidosUsuario/' + idUsuario;
      this.httpClient.get(ruta).subscribe((result) => {
        resolve(result as Pedido[]);
      }, error => {
        reject(error);
      });
    });
  }
  async guardarPedido(idUsuario: number, pedido: Pedido): Promise<Pedido> {
    return new Promise<Pedido>( async (resolve, reject) => {
      const ruta = '/api/pedidos/guardarPedido/' + idUsuario;
      this.httpClient.post(ruta, pedido).subscribe((result) => {
        resolve(result as Pedido);
      }, error => {
        reject(error);
      });
    });
  }
  async guardarDetallesPedido(idUsuario: number, idPedido: number,detallesPedido: DetallePedido[]): Promise<DetallePedido[]> {
    return new Promise<DetallePedido[]>( async (resolve, reject) => {
      const ruta = '/api/detalles/guardarDetalles/' + idUsuario + '/' + idPedido;
      this.httpClient.post(ruta, detallesPedido).subscribe((result) => {
        resolve(result as DetallePedido[]);
      }, error => {
        reject(error);
      });
    });
  }
}

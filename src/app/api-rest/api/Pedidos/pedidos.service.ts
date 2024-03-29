import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetallePedido } from '../../models/DetallePedido/detalle-pedido.model';
import { Pedido } from '../../models/Pedido/pedido.model';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    public httpClient: HttpClient
  ) { }

  async obtenerPedidoPorId(idPedido: number): Promise<Pedido> {
    return new Promise<Pedido>( async (resolve, reject) => {
      const ruta = '/api/pedidos/getPedido/' + idPedido;
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
  async guardarDetallesPedido(idPedido: number,detallesPedido: DetallePedido[]): Promise<DetallePedido[]> {
    return new Promise<DetallePedido[]>( async (resolve, reject) => {
      const ruta = '/api/detalles/guardarDetalles/' + idPedido;
      this.httpClient.post(ruta, detallesPedido).subscribe((result) => {
        resolve(result as DetallePedido[]);
      }, error => {
        reject(error);
      });
    });
  }
  async eliminarPedido(idPedido: number): Promise<string> {
    return new Promise<string>( async (resolve, reject) => {
      this.httpClient.delete('/api/pedidos/eliminarPedido/' + idPedido).subscribe((result) => {
        Swal.fire('¡Éxito!', 'Usuario eliminado con éxito', 'success');
        resolve('El usuario se ha eliminado correctamente');
      }, error => {
        reject(error);
      });
    });
  }
  async todosPedidos(): Promise<Pedido[]> {
    return new Promise<Pedido[]>( async (resolve, reject) => {
      const ruta = '/api/pedidos/pedidos/';
      this.httpClient.get(ruta).subscribe((result) => {
        resolve(result as Pedido[]);
      }, error => {
        reject(error);
      });
    });
  }
  async editarEstadoPedido(idPedido: number, estadoPedido: string): Promise<Pedido> {
    return new Promise<Pedido>( async (resolve, reject) => {
      let pedido: Pedido;
      const ruta = '/api/pedidos/updateEstado/' + idPedido + '/' + estadoPedido + '/';
      this.httpClient.put(ruta, null).subscribe((result) => {
        pedido = result as Pedido;
        Swal.fire('¡Éxito!', 'Pedido editado con éxito', 'success');
        resolve(pedido);
      }, error => {
        reject(error);
      });
    });
  }
}

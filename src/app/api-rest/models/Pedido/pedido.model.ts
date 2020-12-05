import { EmailValidator } from '@angular/forms';
import { DetallePedido } from '../DetallePedido/detalle-pedido.model';

export class Pedido {
    idPedido: number;
    idUsuario: number;
    apellidos: string;
    codigoPostal: string;
    direccion: string;
    email: string;
    fechaPedido: Date;
    metodopago: string;
    nombre: string;
    provincia: string;
    telefono: string;
    detallePedidos: DetallePedido[];
    total: number;
    estadoPedido: string;
}

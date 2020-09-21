import { EmailValidator } from '@angular/forms';
import { DetallePedido } from '../DetallePedido/detalle-pedido.model';

export class Pedido {
    apellidos: string;
    codigoPostal: string;
    direccion: string;
    email: string;
    fechaPedido: Date;
    metodoPago: string;
    nombre: string;
    provincia: string;
    telefono: string;
    detallePedidos: DetallePedido[];
    id: {
        idUsuario: number;
        idPedido: number;
    };
    total: number;
    estadoPedido: string;
}

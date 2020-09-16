import { EmailValidator } from '@angular/forms';
import { DetallePedido } from '../DetallePedido/detalle-pedido.model';

export class Pedido {
    apellidos: string;
    codigoPostal: string;
    direccion: string;
    email: string;
    fechaPedido: Date;
    metodopPago: string;
    nombre: string;
    provincia: string;
    telefono: string;
    detallePedido: DetallePedido[];
    id: {
        idUsuario: number;
        idPedido: number;
    };
    total: number;
}

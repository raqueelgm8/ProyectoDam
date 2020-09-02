import { EmailValidator } from '@angular/forms';
import { DetallePedido } from '../DetallePedido/detalle-pedido.model';

export class Pedido {
    id: number;
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
    idUsuario: number;
}

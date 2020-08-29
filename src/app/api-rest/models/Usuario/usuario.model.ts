import { Pedido } from '../Pedido/pedido.model';
import { Solicitud } from '../Solicitud/solicitud.model';

export class Usuario {
    id_Usuario: number;
    apellidos: string;
    nombre: string;
    codigoPostal: string;
    direccion: string;
    email: string;
    dni: string;
    password: string;
    provincia: string;
    edad: number;
    sexo: string;
    telefono: string;
    pedidos: Pedido[];
    solicitudes: Solicitud[];
}

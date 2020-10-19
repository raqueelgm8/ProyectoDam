import { DetallePedido } from '../DetallePedido/detalle-pedido.model';

export class Producto {
    idProducto: number;
    precio: number;
    categoria: string;
    nombre: string;
    descripcion: string;
    imagen: any;
    stock: number;
    cantidad?: number;
    imagenSrc?: any;
    tipoAnimal: string;
    detallePedido?: DetallePedido[];
    archivoImagen?: string;
}

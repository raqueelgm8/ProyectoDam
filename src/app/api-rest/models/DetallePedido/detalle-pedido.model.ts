import { Producto } from '../Producto/producto.model';

export class DetallePedido {
    cantidad: number;
    precioUnidad: number;
    precioTotal: number;
    id: {
        idProducto: number;
        idUsuario: number;
        idPedido: number;
    };
    producto: Producto;
}

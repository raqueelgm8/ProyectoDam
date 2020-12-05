import { Producto } from '../Producto/producto.model';

export class DetallePedido {
    cantidad: number;
    precioUnidad: number;
    precioTotal: number;
    id: {
        idProducto: number;
        idPedido: number;
    };
    producto: Producto;
}

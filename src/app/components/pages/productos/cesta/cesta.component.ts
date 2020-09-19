import { Component, OnInit } from '@angular/core';
import { CestaService } from 'src/app/api-rest/api/Cesta/cesta.service';
import { PedidosService } from 'src/app/api-rest/api/Pedidos/pedidos.service';
import { Pedido } from 'src/app/api-rest/models/Pedido/pedido.model';
import { Producto } from 'src/app/api-rest/models/Producto/producto.model';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent implements OnInit {

  pedido: Pedido;
  cesta: Producto[];
  constructor(
    private cestaService: CestaService,
    private pedidoService: PedidosService
  ) { }

  ngOnInit(): void {
    this.cesta = this.cestaService.getItems();
    console.log(this.cesta);
  }
  realizarPedido() {
    const pedido: Pedido = {
      apellidos: null,
      codigoPostal: null,
      detallePedido: null,
      direccion: null,
      email: null,
      fechaPedido: null,
      id: null,
      metodopPago: null,
      nombre: null,
      provincia: null,
      telefono: null,
      total: null
    };
    this.pedidoService.guardarPedido(pedido).then((result) => {
      this.pedido = result;
    });
  }
}

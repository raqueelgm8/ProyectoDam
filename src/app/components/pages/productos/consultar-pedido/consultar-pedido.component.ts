import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from 'src/app/api-rest/api/Pedidos/pedidos.service';
import { Pedido } from 'src/app/api-rest/models/Pedido/pedido.model';

@Component({
  selector: 'app-consultar-pedido',
  templateUrl: './consultar-pedido.component.html',
  styleUrls: ['./consultar-pedido.component.css']
})
export class ConsultarPedidoComponent implements OnInit {

  idUsuario: number;
  idPedido: number;
  pedido: Pedido;
  constructor(
    public route: ActivatedRoute,
    private pedidoService: PedidosService
  ) {
      this.route.queryParams.subscribe(params => {
        this.idUsuario = Number(params.idUsuario);
        this.idPedido = Number(params.idPedido);
      });
  }

  ngOnInit(): void {
    this.consultarPedido();
  }
  consultarPedido() {
    this.pedidoService.obtenerPedidoPorId(this.idUsuario, this.idPedido).then((result) => {
      this.pedido = result;
    });
  }
}

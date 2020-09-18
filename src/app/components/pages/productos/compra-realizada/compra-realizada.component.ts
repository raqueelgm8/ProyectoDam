import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-compra-realizada',
  templateUrl: './compra-realizada.component.html',
  styleUrls: ['./compra-realizada.component.css']
})
export class CompraRealizadaComponent implements OnInit {

  idPedido: number;
  idUsuario: number;

  constructor(
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.idUsuario = Number(params.idUsuario);
    });
  }

  ngOnInit(): void {
  }
  clickSeguiComprando() {
    this.router.navigate(['/productos']);
  }
  clickVerPedido() {
    this.router.navigate(['/productos/consultar-pedido'], {queryParams: {
      idPedido: this.idPedido, idUsuario: this.idUsuario
    }});
  }
}

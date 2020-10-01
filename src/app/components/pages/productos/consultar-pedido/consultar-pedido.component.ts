import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallePedidoService } from 'src/app/api-rest/api/DetallePedido/detalle-pedido.service';
import { PedidosService } from 'src/app/api-rest/api/Pedidos/pedidos.service';
import { DetallePedido } from 'src/app/api-rest/models/DetallePedido/detalle-pedido.model';
import { Pedido } from 'src/app/api-rest/models/Pedido/pedido.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { CestaService } from 'src/app/api-rest/api/Cesta/cesta.service';
@Component({
  selector: 'app-consultar-pedido',
  templateUrl: './consultar-pedido.component.html',
  styleUrls: ['./consultar-pedido.component.css']
})
export class ConsultarPedidoComponent implements OnInit {

  idUsuario: number;
  idPedido: number;
  pedido: Pedido;

  detallesPedido: DetallePedido[];
  total: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSourcePedido = new MatTableDataSource();
  displayedColumnsSolicitudes = ['idProducto', 'producto', 'imagenProducto', 'cantidad', 'precioUnidad', 'precioTotal'];
  @ViewChild(MatPaginator) paginatorSolicitudes: MatPaginator;
  @ViewChild(MatSort) matSortSolicitudes: MatSort;


  ngAfterViewInit(): void {
    this.dataSourcePedido.paginator = this.paginatorSolicitudes;
    this.dataSourcePedido.sort = this.matSortSolicitudes;
  }

  constructor(
    public route: ActivatedRoute,
    private pedidoService: PedidosService,
    private detallesPedidoService: DetallePedidoService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private cestaService: CestaService
  ) {
      this.route.queryParams.subscribe(params => {
        this.idUsuario = Number(params.idUsuario);
        this.idPedido = Number(params.idPedido);
        if (params.limpiarCesta) {
          this.cestaService.clearCart();
        }
      });
  }

  ngOnInit(): void {
    this.consultarPedido();
    this.consultarDetallesPedido();
  }
  consultarPedido() {
    this.pedidoService.obtenerPedidoPorId(this.idUsuario, this.idPedido).then((result) => {
      this.pedido = result;
      this.total = result.total;
    });
  }
  consultarDetallesPedido() {
    this.detallesPedidoService.obtenerDetallesPedidoPorPedido(this.idUsuario, this.idPedido).then((result) => {
      this.detallesPedido = result;
      this.detallesPedido.forEach(element => {
        const binaryString = window.atob(element.producto.imagen);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
          const ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }
        const blob = new Blob([bytes], { type: 'application/png'});
        const fileUrl = URL.createObjectURL(blob);
        element.producto.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
      });
      this.dataSourcePedido = new MatTableDataSource<DetallePedido>(this.detallesPedido);
      this.dataSourcePedido.paginator = this.paginatorSolicitudes;
      this.dataSourcePedido.sort = this.matSortSolicitudes;
    });
  }
  volver() {
    this.router.navigate(['/registro/mi-perfil'], {queryParams: {idUsuario: this.idUsuario}});
  }
}

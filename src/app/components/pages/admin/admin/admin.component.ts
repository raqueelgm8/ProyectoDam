import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimalesService } from 'src/app/api-rest/api/Animales/animales.service';
import { PedidosService } from 'src/app/api-rest/api/Pedidos/pedidos.service';
import { ProductosService } from 'src/app/api-rest/api/Productos/productos.service';
import { SolicitudesService } from 'src/app/api-rest/api/Solicitudes/solicitudes.service';
import { UsuarioService } from 'src/app/api-rest/api/Usuario/usuario.service';
import { Animal } from 'src/app/api-rest/models/Animal/animal.model';
import { Pedido } from 'src/app/api-rest/models/Pedido/pedido.model';
import { Producto } from 'src/app/api-rest/models/Producto/producto.model';
import { Solicitud } from 'src/app/api-rest/models/Solicitud/solicitud.model';
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  listaProductos: Producto[];
  listaPedidos: Pedido[];
  listaAnimales: Animal[];
  listaUsuario: Usuario[];
  listaSolicitud: Solicitud[];

  constructor(
    private fb: FormBuilder,
    private modal: NgbModal,
    public sanitizer: DomSanitizer,
    private productosService: ProductosService,
    private pedidosService: PedidosService,
    private animalesService: AnimalesService,
    private usuariosService: UsuarioService,
    private solicitudesService: SolicitudesService
  ) { }

  ngOnInit(): void {
    this.consultarProductos();
    this.consultarPedidos();
    this.consultarAnimales();
    this.consultarUsuarios();
    this.consultarSolicitudes();
  }
  consultarProductos() {
    this.productosService.buscarTodosProductos().then((result) => {
      this.listaProductos = result;
      this.listaProductos.forEach(element => {
        const binaryString = window.atob(element.imagen);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
          const ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }
        const blob = new Blob([bytes], { type: 'application/png'});
        const fileUrl = URL.createObjectURL(blob);
        element.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
      });
    });
  }
  consultarPedidos() {
    this.pedidosService.todosPedidos().then((result) => {
      this.listaPedidos = result;
    });
  }
  consultarAnimales() {
    this.animalesService.obtenerTodosAnimales().then((result) => {
      this.listaAnimales = result;
    });
  }
  consultarUsuarios() {
    this.usuariosService.obtenerTodosLosUsuarios().then((result) => {
      this.listaUsuario = result;
    });
  }
  consultarSolicitudes() {
    this.solicitudesService.obtenerTodasSolicitudes().then((result) => {
      this.listaSolicitud = result;
    });
  }
}

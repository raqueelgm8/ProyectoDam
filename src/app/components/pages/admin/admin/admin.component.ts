import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/api-rest/models/Pedido/pedido.model';
import { Solicitud } from 'src/app/api-rest/models/Solicitud/solicitud.model';
import { UsuarioService } from 'src/app/api-rest/api/Usuario/usuario.service';
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';
import Swal from 'sweetalert2';
import { SolicitudesService } from 'src/app/api-rest/api/Solicitudes/solicitudes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PedidosService } from 'src/app/api-rest/api/Pedidos/pedidos.service';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Producto } from 'src/app/api-rest/models/Producto/producto.model';
import { Animal } from 'src/app/api-rest/models/Animal/animal.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductosService } from 'src/app/api-rest/api/Productos/productos.service';
import { AnimalesService } from 'src/app/api-rest/api/Animales/animales.service';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // Animales
  listaAnimales: Animal[];
  displayedColumnsAnimales = ['id', 'animal', 'tipoAnimal', 'edad', 'raza', 'acciones'];
  sindatosAnimales: boolean;
  dataSourceAnimales = new MatTableDataSource();
  @ViewChild('MatSortAnimales', {read: MatPaginator}) matSortAnimales: MatSort;
  @ViewChild('MatPaginatorAnimales', {read: MatPaginator}) paginatorAnimales: MatPaginator;

  // Productos
  listaProductos: Producto[];
  displayedColumnsProductos = ['idProducto', 'nombre', 'precio', 'stock', 'categoria', 'animal', 'acciones'];
  sindatosProductos: boolean;
  dataSourceProductos= new MatTableDataSource();
  @ViewChild('MatSortProductos', {read: MatPaginator}) matSortProductos: MatSort;
  @ViewChild('MatPaginatorProductos', {read: MatPaginator}) paginatorProductos: MatPaginator;

  // Usuarios
  listaUsuario: Usuario[];
  displayedColumnsUsuario = ['id', 'nombre', 'apellidos', 'provincia', 'acciones'];
  sindatosUsuario: boolean;
  dataSourceUsuarios = new MatTableDataSource();
  @ViewChild('MatSortUsuarios', {read: MatPaginator}) matSortUsuarios: MatSort;
  @ViewChild('MatPaginatorUsuarios', {read: MatPaginator}) paginatorUsuarios: MatPaginator;

  // Solicitudes
  listaSolicitud: Solicitud[];
  displayedColumnsSolicitudes = ['idSolicitud', 'animal', 'tipoAnimal', 'estado', 'acciones'];
  sinDatosSolicitudes: boolean;
  dataSourceSolicitudes = new MatTableDataSource();
  @ViewChild('MatSortSolicitudes', {read: MatPaginator}) matSortSolicitudes: MatSort;
  @ViewChild('MatPaginatorSolicitudes', {read: MatPaginator}) paginatorSolicitudes: MatPaginator;

  // Pedidos
  listaPedidos: Pedido[];
  displayedColumnsPedidos = ['idPedido', 'estado', 'total', 'fechaPedido', 'metodoPago', 'acciones'];
  sinDatosPedidos: boolean;
  dataSourcePedidos = new MatTableDataSource();
  @ViewChild('MatPaginatorPedidos', {read: MatPaginator}) paginatorPedidos: MatPaginator;
  @ViewChild('MatSortPedidos', {read: MatPaginator}) matSortPedidos: MatSort;


  pageSizeOptions: number[] = [5, 10, 25, 100];
  comboProvincias: Combo[];
  constructor(
    public sanitizer: DomSanitizer,
    private productosService: ProductosService,
    private pedidosService: PedidosService,
    private animalesService: AnimalesService,
    private usuariosService: UsuarioService,
    private solicitudesService: SolicitudesService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private paginator: MatPaginatorIntl,
    public combos: ComboService,
  ) { 
    this.combos.obtenerComboTipo('Provincia').then((result) => {
      this.comboProvincias = result;
    });
  }
  ngAfterViewInit(): void {
    this.dataSourceSolicitudes.paginator = this.paginatorSolicitudes;
    this.dataSourceSolicitudes.sort = this.matSortSolicitudes;
    this.dataSourcePedidos.paginator = this.paginatorPedidos;
    this.dataSourcePedidos.sort = this.matSortPedidos;
    this.dataSourceAnimales.paginator = this.paginatorAnimales;
    this.dataSourceAnimales.sort = this.matSortAnimales;
    this.dataSourceProductos.paginator = this.paginatorProductos;
    this.dataSourceProductos.sort = this.matSortProductos;
    this.dataSourceUsuarios.paginator = this.paginatorUsuarios;
    this.dataSourceUsuarios.sort = this.matSortUsuarios;
  }
  ngOnInit(): void {
    this.paginator.itemsPerPageLabel = "Registros por página";
    this.consultarProductos();
    this.consultarPedidos();
    this.consultarAnimales();
    this.consultarUsuarios();
    this.consultarSolicitudes();
    this.dataSourceSolicitudes.paginator = this.paginatorSolicitudes;
    this.dataSourceSolicitudes.sort = this.matSortSolicitudes;
    this.dataSourcePedidos.paginator = this.paginatorPedidos;
    this.dataSourcePedidos.sort = this.matSortPedidos;
    this.dataSourceAnimales.paginator = this.paginatorAnimales;
    this.dataSourceAnimales.sort = this.matSortAnimales;
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
      this.dataSourceProductos = new MatTableDataSource<Producto>(this.listaProductos);
      if (result.length === 0) {
        this.sindatosProductos = false;
      } else {
        this.sindatosProductos = true;
      }
      this.dataSourceProductos.paginator = this.paginatorProductos;
      this.dataSourceProductos.sort = this.matSortProductos;
    });
  }
  consultarPedidos() {
    this.pedidosService.todosPedidos().then((result) => {
      this.listaPedidos = result;
      this.dataSourcePedidos = new MatTableDataSource<Pedido>(this.listaPedidos);
      if (result.length === 0) {
        this.sinDatosPedidos = false;
      } else {
        this.sinDatosPedidos = true;
      }
      this.dataSourcePedidos.paginator = this.paginatorPedidos;
      this.dataSourcePedidos.sort = this.matSortPedidos;
    });
  }
  verPedido(pedido: Pedido) {
    this.router.navigate(['/productos/consultar-pedido', ], {queryParams: {
      idPedido: pedido.id.idPedido, idUsuario: pedido.id.idUsuario
    }});
  }
  consultarAnimales() {
    this.animalesService.obtenerTodosAnimales().then((result) => {
      this.listaAnimales = result;
      this.dataSourceAnimales = new MatTableDataSource<Animal>(this.listaAnimales);
      if (result.length === 0) {
        this.sindatosAnimales = false;
      } else {
        this.sindatosAnimales = true;
      }
      this.dataSourceAnimales.paginator = this.paginatorAnimales;
      this.dataSourceAnimales.sort = this.matSortAnimales;
    });
  }
  consultarUsuarios() {
    this.usuariosService.obtenerTodosLosUsuarios().then((result) => {
      this.listaUsuario = result;
      this.dataSourceUsuarios = new MatTableDataSource<Usuario>(this.listaUsuario);
      this.dataSourceUsuarios.paginator = this.paginatorUsuarios;
      this.dataSourceUsuarios.sort = this.matSortUsuarios;
      this.listaUsuario.forEach(element => {
        element.provincia = this.comboProvincias.find(combo => combo.id === element.provincia).descripcion;
      });
      if (result.length === 0) {
        this.sindatosUsuario = false;
      } else {
        this.sindatosUsuario = true;
      }
    });
  }
  consultarSolicitudes() {
    this.solicitudesService.obtenerTodasSolicitudes().then((result) => {
      this.listaSolicitud = result;
      this.dataSourceSolicitudes = new MatTableDataSource<Solicitud>(this.listaSolicitud);
      this.dataSourceSolicitudes.paginator = this.paginatorSolicitudes;
      this.dataSourceSolicitudes.sort = this.matSortSolicitudes;
      if (result.length === 0) {
        this.sinDatosSolicitudes = false;
      } else {
        this.sinDatosSolicitudes = true;
      }
    });
  }
  eliminarSolicitud(solicitud: Solicitud) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar la solicitud?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar solicitud'
    }).then((mensaje) => {
      if (mensaje.value) {
        this.solicitudesService.eliminarSolicitud(solicitud.id.idUsuario, solicitud.id.idSolicitud, solicitud.id.idAnimal);
        const index = this.listaSolicitud.findIndex(element => element.id.idUsuario === solicitud.id.idUsuario
                                  && element.id.idSolicitud === solicitud.id.idSolicitud
                                  && element.id.idAnimal === solicitud.id.idAnimal);
        this.listaSolicitud.splice(index, 1);
        this.dataSourceSolicitudes =  new MatTableDataSource(this.listaSolicitud);
        this.dataSourceSolicitudes.paginator = this.paginatorSolicitudes;
        this.dataSourceSolicitudes.sort = this.matSortSolicitudes;
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  editarSolicitud(solicitud: Solicitud) {
    this.router.navigate(['/adopciones/ficha-animal/formulario-adopcion', ], {queryParams: {
      idSolicitud: solicitud.id.idSolicitud, animalId: solicitud.id.idAnimal, modoEditar: 'editar'
    }});
  }
  verSolicitud(solicitud: Solicitud) {
    this.router.navigate(['/adopciones/ficha-animal/formulario-adopcion', ], {queryParams: {
      idSolicitud: solicitud.id.idSolicitud, animalId: solicitud.id.idAnimal, modoConsulta: 'consulta'
    }});
  }
  eliminarPedido(pedido: Pedido) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este pedido?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar pedido'
    }).then((mensaje) => {
      if (mensaje.value) {
        this.pedidosService.eliminarPedido(pedido.id.idUsuario, pedido.id.idPedido);
        const index = this.listaPedidos.findIndex(element => element.id === pedido.id);
        this.listaPedidos.splice(index, 1);
        this.dataSourcePedidos =  new MatTableDataSource(this.listaPedidos);
        this.dataSourcePedidos.paginator = this.paginatorPedidos;
        this.dataSourcePedidos.sort = this.matSortPedidos;
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  eliminarAnimal(animal: Animal) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este animal?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar animal'
    }).then((mensaje) => {
      if (mensaje.value) {
        this.animalesService.eliminarAnimal(animal.idAnimal);
        const index = this.listaAnimales.findIndex(element => element.idAnimal === animal.idAnimal);
        this.listaAnimales.splice(index, 1);
        this.dataSourceAnimales =  new MatTableDataSource(this.listaAnimales);
        this.dataSourceAnimales.paginator = this.paginatorAnimales;
        this.dataSourceAnimales.sort = this.matSortAnimales;
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  verAnimal(animal: Animal) {

  }
  editarAnimal(animal: Animal) {

  }
  eliminarUsuario(usuario: Usuario) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar la cuenta de usuario?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar cuenta'
    }).then((mensaje) => {
      if (mensaje.value) {
        this.usuariosService.eliminarUsuario(usuario.idUsuario).then((result) => {
          const index = this.listaUsuario.findIndex(element => element.idUsuario === usuario.idUsuario);
          this.listaUsuario.splice(index, 1);
          this.dataSourceUsuarios =  new MatTableDataSource(this.listaUsuario);
          this.dataSourceUsuarios.paginator = this.paginatorUsuarios;
          this.dataSourceUsuarios.sort = this.matSortUsuarios;
          this.changeDetectorRefs.detectChanges();
        }, error => {
          Swal.fire('¡ERROR!', error, 'error');
        });
      }
    });
  }
  editarUsuario(usuario: Usuario) {

  }
  verUsuario(usuario: Usuario) {

  }
  verProducto(producto: Producto) {

  }
  editarProducto(producto: Producto) {

  }
  eliminarProducto(producto: Producto) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este producto?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar producto'
    }).then((mensaje) => {
      if (mensaje.value) {
        this.productosService.eliminarProducto(producto.idProducto);
        const index = this.listaProductos.findIndex(element => element.idProducto === producto.idProducto);
        this.listaProductos.splice(index, 1);
        this.dataSourceProductos =  new MatTableDataSource(this.listaProductos);
        this.dataSourceProductos.paginator = this.paginatorProductos;
        this.dataSourceProductos.sort = this.matSortProductos;
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
}

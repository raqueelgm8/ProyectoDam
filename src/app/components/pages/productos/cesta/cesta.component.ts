import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CestaService } from 'src/app/api-rest/api/Cesta/cesta.service';
import { PedidosService } from 'src/app/api-rest/api/Pedidos/pedidos.service';
import { UsuarioService } from 'src/app/api-rest/api/Usuario/usuario.service';
import { DetallePedido } from 'src/app/api-rest/models/DetallePedido/detalle-pedido.model';
import { Pedido } from 'src/app/api-rest/models/Pedido/pedido.model';
import { Producto } from 'src/app/api-rest/models/Producto/producto.model';
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent implements OnInit {

  pedido: Pedido;
  cesta: Producto[];
  formCesta: FormGroup;
  idUsuario: number;
  detallesPedido: DetallePedido[] = [];
  total = 0;
  displayedColumns = ['imagenProducto', 'nombreProducto', 'precio', 'cantidad', 'acciones'];
  usuario: Usuario;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSource = new MatTableDataSource();
  comboProvincias: Combo[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  constructor(
    private cestaService: CestaService,
    private pedidoService: PedidosService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    public combos: ComboService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.idUsuario = Number(params.idUsuario);
    });
  }

  ngOnInit(): void {
    this.recuperarCombos();
    this.recuperarCesta();
    this.iniciarGrupo();
    this.recuperarPerfil();
    this.cesta.forEach(element => {
      const detallePedido: DetallePedido = {
        cantidad: element.cantidad,
        id: {
          idProducto: element.idProducto,
          idUsuario: this.idUsuario,
          idPedido: null
        },
        precioTotal: element.cantidad * element.precio,
        precioUnidad: element.precio,
        producto: element
      };
      this.total = this.total + detallePedido.precioTotal;
    });
  }
  recuperarCombos() {
    this.combos.obtenerComboTipo('Provincia').then((result) => {
      this.comboProvincias = result;
    });
  }
  iniciarGrupo() {
    this.formCesta = this.fb.group({
      nombre: { value: null, disabled: true },
      apellidos: { value: null, disabled: true },
      direccion: { value: null, disabled: true },
      email: { value: null, disabled: true },
      provincia: { value: null, disabled: true },
      codigoPostal: { value: null, disabled: true },
      telefono: { value: null, disabled: true },
      metodoPago: { value: 'PayPal', disabled: false },
    });
  }
  realizarPedido() {
    this.pedido = {
      apellidos: this.formCesta.controls.apellidos.value,
      codigoPostal: this.formCesta.controls.codigoPostal.value,
      direccion: this.formCesta.controls.direccion.value,
      email: this.formCesta.controls.email.value,
      //  moment(new Date(), 'DD/MM/yy').toDate(),
      fechaPedido: moment(new Date(), 'DD/MM/yy').toDate(),
      id: null,
      metodopago: this.formCesta.controls.metodoPago.value,
      nombre: this.formCesta.controls.nombre.value,
      provincia: this.formCesta.controls.provincia.value,
      telefono: this.formCesta.controls.telefono.value,
      total: null,
      detallePedidos: null,
      estadoPedido: 'Pendiente'
    };
    this.cesta.forEach(element => {
      const detallePedido: DetallePedido = {
        cantidad: element.cantidad,
        id: {
          idProducto: element.idProducto,
          idUsuario: this.idUsuario,
          idPedido: null
        },
        precioTotal: element.cantidad * element.precio,
        precioUnidad: element.precio,
        producto: element
      };
      this.detallesPedido.push(detallePedido);
      this.total = this.total + detallePedido.precioTotal;
    });
    // this.pedido.detallePedidos = this.detallesPedido;
    this.pedido.total = this.total;
  }
  recuperarCesta() {
    this.cesta = this.cestaService.getItems();
    this.dataSource = new MatTableDataSource<Producto>(this.cesta);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
    if (this.cesta === undefined || this.cesta === null || this.cesta.length === 0 || this.cesta === []) {
      this.router.navigate(['']);
    }
  }
  clickEliminar(producto: Producto) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar el producto de la cesta?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar producto'
    }).then((mensaje) => {
      if (mensaje.value) {
        this.cestaService.removeItem(producto);
        this.cesta = this.cestaService.getItems();
        this.dataSource = new MatTableDataSource<Producto>(this.cesta);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        this.total = 0;
        Swal.fire('¡ÉXITO!', 'Producto eliminado de la cesta', 'success');
        if (this.cesta === undefined || this.cesta === null || this.cesta.length === 0 || this.cesta === []) {
          this.router.navigate(['']);
        }
      }
    });
  }
  recuperarPerfil() {
    this.usuarioService.obtenerUsuarioPorId(this.idUsuario).then((result) => {
      this.usuario = result;
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      localStorage.setItem('usuarioIniciadoSesion', 'true');
      this.formCesta.controls.nombre.setValue(result.nombre);
      this.formCesta.controls.apellidos.setValue(result.apellidos);
      this.formCesta.controls.direccion.setValue(result.direccion);
      this.formCesta.controls.email.setValue(result.email);
      this.formCesta.controls.provincia.setValue(result.provincia);
      this.formCesta.controls.codigoPostal.setValue(result.codigoPostal);
      this.formCesta.controls.telefono.setValue(result.telefono);
    }, error => {
      Swal.fire('¡ERROR!', error, 'error');
    });
  }
  guardarPedido() {
    this.total = 0;
    this.pedido = {
      apellidos: this.formCesta.controls.apellidos.value,
      codigoPostal: this.formCesta.controls.codigoPostal.value,
      direccion: this.formCesta.controls.direccion.value,
      email: this.formCesta.controls.email.value,
      //  moment(new Date(), 'DD/MM/yy').toDate(),
      fechaPedido: moment(new Date(), 'DD/MM/yy').toDate(),
      id: null,
      metodopago: this.formCesta.controls.metodoPago.value,
      nombre: this.formCesta.controls.nombre.value,
      provincia: this.formCesta.controls.provincia.value,
      telefono: this.formCesta.controls.telefono.value,
      total: null,
      detallePedidos: null,
      estadoPedido: 'Pendiente'
    };
    this.cesta.forEach(element => {
      const detallePedido: DetallePedido = {
        cantidad: element.cantidad,
        id: {
          idProducto: element.idProducto,
          idUsuario: this.idUsuario,
          idPedido: null
        },
        precioTotal: element.cantidad * element.precio,
        precioUnidad: element.precio,
        producto: element
      };
      this.detallesPedido.push(detallePedido);
      this.total = this.total + detallePedido.precioTotal;
    });
    this.pedido.detallePedidos = this.detallesPedido;
    this.pedido.total = this.total;
    this.pedidoService.guardarPedido(this.idUsuario, this.pedido).then((result) => {
      this.pedido = result;
      if (result !== null) {
        this.pedidoService.guardarDetallesPedido(this.idUsuario, result.id.idPedido, this.detallesPedido).then((detalles) => {
          this.detallesPedido = [];
          this.total = 0;
          this.cestaService.clearCart();
          Swal.fire('¡ÉXITO!', 'El pedido se ha realizado correctamente', 'success');
          this.router.navigate(['/productos/consultar-pedido', ], {queryParams: {
            idPedido: this.pedido.id.idPedido, idUsuario: this.pedido.id.idUsuario, limpiarCesta: 'true'
          }});
        });
      }
    });
  }
}

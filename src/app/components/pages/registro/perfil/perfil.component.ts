import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
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
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  idUsuario: number;
  formPerfil: FormGroup;
  comboProvincias: Combo[];
  pedidos: Pedido[];
  solicitudes: Solicitud[] = [];
  displayedColumnsSolicitudes = ['idSolicitud', 'animal', 'tipoAnimal', 'estado', 'acciones'];
  displayedColumnsPedidos = ['idPedido', 'estado', 'total', 'fechaPedido', 'metodoPago', 'acciones'];
  sinDatosSolicitudes: boolean;
  sinDatosPedidos: boolean;
  usuario: Usuario;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSourceSolicitudes = new MatTableDataSource();
  dataSourcePedidos = new MatTableDataSource();

  @ViewChild('MatPaginatorSolicitudes', {read: MatPaginator}) paginatorSolicitudes: MatPaginator;
  @ViewChild('MatPaginatorPedidos', {read: MatPaginator}) paginatorPedidos: MatPaginator;
  @ViewChild('MatSortPedidos') matSortPedidos: MatSort;
  @ViewChild('MatSortSolicitudes') matSortSolicitudes: MatSort;

  constructor(
    public route: ActivatedRoute,
    public fb: FormBuilder,
    public combos: ComboService,
    public usuarioService: UsuarioService,
    public solicitudesService: SolicitudesService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private pedidosService: PedidosService
  ) {
    this.route.queryParams.subscribe(params => {
      this.idUsuario = Number(params.idUsuario);
    });
  }
  ngAfterViewInit(): void {
    this.dataSourceSolicitudes.paginator = this.paginatorSolicitudes;
    this.dataSourceSolicitudes.sort = this.matSortSolicitudes;
    this.dataSourcePedidos.paginator = this.paginatorPedidos;
    this.dataSourcePedidos.sort = this.matSortPedidos;
  }
  ngOnInit(): void {
    this.iniciarForm();
    this.recuperarCombos();
    this.recuperarPerfil();
    this.recuperarSolicitudes();
    this.recuperarPedidos();
  }
  iniciarForm() {
    this.formPerfil = this.fb.group({
      nombre: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email, Validators.required]],
      sexo: ['H', [Validators.required]],
      dni: [null, [Validators.required]],
      edad: [null, [Validators.required, Validators.compose([Validators.min(18), Validators.max(130)])]],
      direccion: [null, [Validators.required]],
      provincia: [null, [Validators.required]],
      codigoPostal: [null, [Validators.required]],
      telefono: [null, [Validators.required]],
      pass1: [null, [Validators.required]],
      pass2: [null, [Validators.required]],
    });
  }
  recuperarPerfil() {
    this.usuarioService.obtenerUsuarioPorId(this.idUsuario).then((result) => {
      this.usuario = result;
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      localStorage.setItem('usuarioIniciadoSesion', 'true');
      this.formPerfil.controls.nombre.setValue(result.nombre);
      this.formPerfil.controls.apellidos.setValue(result.apellidos);
      this.formPerfil.controls.email.setValue(result.email);
      this.formPerfil.controls.sexo.setValue(result.sexo);
      this.formPerfil.controls.dni.setValue(result.dni);
      this.formPerfil.controls.edad.setValue(result.edad);
      this.formPerfil.controls.direccion.setValue(result.direccion);
      this.formPerfil.controls.provincia.setValue(result.provincia);
      this.formPerfil.controls.codigoPostal.setValue(result.codigoPostal);
      this.formPerfil.controls.telefono.setValue(result.telefono);
      this.formPerfil.controls.pass1.setValue(result.password);
      this.formPerfil.controls.pass2.setValue(result.password);
    }, error => {
      Swal.fire('¡ERROR!', error, 'error');
    });
  }
  recuperarCombos() {
    this.combos.obtenerComboTipo('Provincia').then((result) => {
      this.comboProvincias = result;
    });
  }
  recuperarSolicitudes() {
    this.solicitudesService.obtenerSolicitudesPorIdUsuario(this.idUsuario).then((result) => {
      this.solicitudes = result;
      this.dataSourceSolicitudes = new MatTableDataSource<Solicitud>(this.solicitudes);
      if (result.length === 0) {
        this.sinDatosSolicitudes = false;
      } else {
        this.sinDatosSolicitudes = true;
      }
      this.dataSourceSolicitudes.paginator = this.paginatorSolicitudes;
      this.dataSourceSolicitudes.sort = this.matSortSolicitudes;
    });
  }
  recuperarPedidos() {
    this.pedidosService.obtenerTodosPedidosUsuario(this.idUsuario).then((result) => {
      this.pedidos = result;
      this.dataSourcePedidos = new MatTableDataSource<Pedido>(this.pedidos);
      console.log(result);
      if (result.length === 0) {
        this.sinDatosPedidos = false;
      } else {
        this.sinDatosPedidos = true;
      }
      this.dataSourcePedidos.paginator = this.paginatorPedidos;
      this.dataSourcePedidos.sort = this.matSortPedidos;
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
        const index = this.solicitudes.findIndex(element => element.id.idUsuario === solicitud.id.idUsuario
                                  && element.id.idSolicitud === solicitud.id.idSolicitud
                                  && element.id.idAnimal === solicitud.id.idAnimal);
        this.solicitudes.splice(index, 1);
        this.dataSourceSolicitudes =  new MatTableDataSource(this.solicitudes);
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  editarSolicitud() {
  }
  verSolicitud(solicitud: Solicitud) {
    this.router.navigate(['/adopciones/ficha-animal/formulario-adopcion', ], {queryParams: {
      idSolicitud: solicitud.id.idSolicitud, animalId: solicitud.id.idAnimal, modoConsulta: 'consulta'
    }});
  }
  eliminarCuenta() {
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
        this.usuarioService.eliminarUsuario(this.idUsuario).then((result) => {
          localStorage.clear();
          localStorage.setItem('usuarioIniciadoSesion', 'false');
          this.router.navigate(['/home']);
        }, error => {
          Swal.fire('¡ERROR!', error, 'error');
        });
      }
    });
  }
  clickEditar() {
    const usuario: Usuario = {
      apellidos: this.formPerfil.controls.apellidos.value,
      nombre: this.formPerfil.controls.nombre.value,
      codigoPostal: this.formPerfil.controls.codigoPostal.value,
      direccion: this.formPerfil.controls.direccion.value,
      dni: this.formPerfil.controls.dni.value,
      edad: Number(this.formPerfil.controls.edad.value),
      email: this.formPerfil.controls.email.value,
      password: this.formPerfil.controls.pass1.value,
      provincia: this.formPerfil.controls.provincia.value,
      sexo: this.formPerfil.controls.sexo.value,
      telefono: this.formPerfil.controls.telefono.value,
      idUsuario: null,
      pedidos: this.pedidos,
      solicitudes: this.solicitudes
    };
    if (this.formPerfil.invalid) {
      Swal.fire('ERROR!', 'Debe de rellenar todos los campos', 'error');
    } else if (this.formPerfil.controls.pass1.value !== this.formPerfil.controls.pass2.value) {
      Swal.fire('ERROR!', 'Las contraseñas no coinciden', 'error');
    } else if (this.formPerfil.controls.edad.value < 18) {
      Swal.fire('ERROR!', 'La edad debe ser mayor de 18', 'error');
    }else {
      this.usuarioService.editarUsuario(this.idUsuario, usuario).then((result) => {
        this.usuario = result;
      }, error => {
        Swal.fire('ERROR!', 'Error', 'error');
      });
    }
  }
  clickReestablecer() {
    this.formPerfil.controls.nombre.setValue(this.usuario.nombre);
    this.formPerfil.controls.apellidos.setValue(this.usuario.apellidos);
    this.formPerfil.controls.email.setValue(this.usuario.email);
    this.formPerfil.controls.sexo.setValue(this.usuario.sexo);
    this.formPerfil.controls.dni.setValue(this.usuario.dni);
    this.formPerfil.controls.edad.setValue(this.usuario.edad);
    this.formPerfil.controls.direccion.setValue(this.usuario.direccion);
    this.formPerfil.controls.provincia.setValue(this.usuario.provincia);
    this.formPerfil.controls.codigoPostal.setValue(this.usuario.codigoPostal);
    this.formPerfil.controls.telefono.setValue(this.usuario.telefono);
  }
  verPedido(pedido: Pedido) {

  }
}

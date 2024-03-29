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
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  barLabel = 'Fuerza de la contraseña:';
  tipoPass1EsPassword = false;
  tipoPass2EsPassword = false;
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

  @ViewChild('paginatorSolicitudes', {read: MatPaginator}) paginatorSolicitudes: MatPaginator;
  @ViewChild('paginatorPedidos', {read: MatPaginator}) paginatorPedidos: MatPaginator;
  @ViewChild('sorter1') sorter1: MatSort;
  @ViewChild('sorter2') sorter2: MatSort;
  provinciaSeleccionada: Combo;
  constructor(
    public route: ActivatedRoute,
    public fb: FormBuilder,
    public combos: ComboService,
    public usuarioService: UsuarioService,
    public solicitudesService: SolicitudesService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private pedidosService: PedidosService,
    private paginator: MatPaginatorIntl,
  ) {
    this.route.queryParams.subscribe(params => {
      const usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
      this.idUsuario = Number(params.idUsuario);
      if (params.idUsuario === undefined) {
        this.idUsuario = JSON.parse(localStorage.getItem('usuarios')).idUsuario;
      }
    });
  }
  ngAfterViewInit(): void {
    this.recuperarSolicitudes();
    this.recuperarPedidos();
    this.dataSourceSolicitudes.paginator = this.paginatorSolicitudes;
    this.dataSourcePedidos.paginator = this.paginatorPedidos;
    this.dataSourceSolicitudes.sort = this.sorter1;
    this.dataSourceSolicitudes.sort = this.sorter2;
  }
  ngOnInit(): void {
    this.paginator.itemsPerPageLabel = "Registros por página";
    this.iniciarForm();
    this.recuperarPerfil();

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
      // this.formPerfil.controls.provincia.setValue(result.provincia);
      this.formPerfil.controls.codigoPostal.setValue(result.codigoPostal);
      this.formPerfil.controls.telefono.setValue(result.telefono);
      this.formPerfil.controls.pass1.setValue(result.password);
      this.formPerfil.controls.pass2.setValue(result.password);
      this.recuperarCombos(result.provincia);
    }, error => {
      Swal.fire('¡ERROR!', error, 'error');
    });
  }
  recuperarCombos(idProvincia: string) {
    this.combos.obtenerComboTipo('Provincia').then((result) => {
      this.comboProvincias = result;
      this.provinciaSeleccionada = this.comboProvincias.find(element => element.id === idProvincia);
    });
  }
  recuperarSolicitudes() {
    this.solicitudesService.obtenerSolicitudesPorIdUsuario(this.idUsuario).then((result) => {
      this.solicitudes = result;
      this.dataSourceSolicitudes = new MatTableDataSource<Solicitud>(this.solicitudes);
      this.dataSourceSolicitudes.paginator = this.paginatorSolicitudes;
      this.dataSourceSolicitudes.sort = this.sorter1;
      if (result.length === 0) {
        this.sinDatosSolicitudes = false;
      } else {
        this.sinDatosSolicitudes = true;
      }
    });
  }
  recuperarPedidos() {
    this.pedidosService.obtenerTodosPedidosUsuario(this.idUsuario).then((result) => {
      this.pedidos = result;
      this.dataSourcePedidos = new MatTableDataSource<Pedido>(this.pedidos);
      if (result.length === 0) {
        this.sinDatosPedidos = false;
      } else {
        this.sinDatosPedidos = true;
      }
      this.dataSourcePedidos.paginator = this.paginatorPedidos;
      this.dataSourceSolicitudes.sort = this.sorter2;
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
        this.solicitudesService.eliminarSolicitud(solicitud.idSolicitud);
        const index = this.solicitudes.findIndex(element => element.idSolicitud === solicitud.idSolicitud);
        this.solicitudes.splice(index, 1);
        this.dataSourceSolicitudes =  new MatTableDataSource(this.solicitudes);
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  editarSolicitud(solicitud: Solicitud) {
    this.router.navigate(['/adopciones/ficha-animal/formulario-adopcion', ], {queryParams: {
      idSolicitud: solicitud.idSolicitud, animalId: solicitud.idAnimal, modoEditar: 'editar'
    }});
  }
  verSolicitud(solicitud: Solicitud) {
    this.router.navigate(['/adopciones/ficha-animal/formulario-adopcion', ], {queryParams: {
      idSolicitud: solicitud.idSolicitud, animalId: solicitud.idAnimal, modoConsulta: 'consulta'
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
          Swal.fire('¡ERROR!', 'No puede eliminar una cuenta con solicitudes o pedidos', 'error');
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
      provincia: this.provinciaSeleccionada.id,
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
    this.provinciaSeleccionada = this.comboProvincias.find(element => element.id === this.usuario.provincia);
    this.formPerfil.controls.codigoPostal.setValue(this.usuario.codigoPostal);
    this.formPerfil.controls.telefono.setValue(this.usuario.telefono);
  }
  verPedido(pedido: Pedido) {
    this.router.navigate(['/productos/consultar-pedido', ], {queryParams: {
      idPedido: pedido.idPedido, idUsuario: pedido.idUsuario
    }});
  }
  verPass1() {
    this.tipoPass1EsPassword = !this.tipoPass1EsPassword;
  }
  verPass2() {
    this.tipoPass2EsPassword = !this.tipoPass2EsPassword;
  }
}

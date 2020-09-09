import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  sinDatosSolicitudes: boolean;
  usuario: Usuario;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSourceSolicitudes = new MatTableDataSource();

  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  setDataSourceAttributes() {
    this.dataSourceSolicitudes.paginator = this.paginator;
    this.dataSourceSolicitudes.sort = this.sort;
  }

  constructor(
    public route: ActivatedRoute,
    public fb: FormBuilder,
    public combos: ComboService,
    public usuarioService: UsuarioService,
    public solicitudesService: SolicitudesService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.idUsuario = Number(params.idUsuario);
    });
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.formPerfil.disable();
    this.recuperarCombos();
    this.recuperarPerfil();
    this.recuperarSolicitudes();
    this.setDataSourceAttributes();
  }
  iniciarForm() {
    this.formPerfil = this.fb.group({
      nombre: null,
      apellidos: null,
      email: null,
      sexo: null,
      dni: null,
      edad: null,
      direccion: null,
      provincia: null,
      codigoPostal: null,
      telefono: null,
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
      this.setDataSourceAttributes();
      if (result.length === 0) {
        this.sinDatosSolicitudes = false;
      } else {
        this.sinDatosSolicitudes = true;
      }
    });
  }
  recuperarPedidos() {

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
        this.setDataSourceAttributes();
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
}

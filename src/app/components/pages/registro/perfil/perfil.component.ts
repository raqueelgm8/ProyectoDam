import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
import { Pedido } from 'src/app/api-rest/models/Pedido/pedido.model';
import { Solicitud } from 'src/app/api-rest/models/Solicitud/solicitud.model';
import { UsuarioService } from 'src/app/api-rest/api/Usuario/usuario.service';
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';
import Swal from 'sweetalert2';
import { SolicitudesService } from 'src/app/api-rest/api/Solicitudes/solicitudes.service';
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
  solicitudes: Solicitud[];
  displayedColumnsSolicitudes = ['idSolicitud', 'animal', 'tipoAnimal', 'estado', 'acciones'];
  sinDatosSolicitudes: boolean;
  usuario: Usuario;
  constructor(
    public route: ActivatedRoute,
    public fb: FormBuilder,
    public combos: ComboService,
    public usuarioService: UsuarioService,
    public solicitudesService: SolicitudesService
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
      console.log(this.usuario);
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
    this.sinDatosSolicitudes = true;
    this.solicitudesService.obtenerSolicitudesPorIdUsuario(this.idUsuario).then((result) => {
      this.solicitudes = result;
      console.log(this.solicitudes);
      if (result !== undefined && result !== null && result !== []) {
        this.sinDatosSolicitudes = false;
      }
    });
  }
  recuperarPedidos() {

  }
}

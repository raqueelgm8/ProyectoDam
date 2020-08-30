import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
import { Pedido } from 'src/app/api-rest/models/Pedido/pedido.model';
import { Solicitud } from 'src/app/api-rest/models/Solicitud/solicitud.model';
import { UsuarioService } from 'src/app/api-rest/api/Usuario/usuario.service';
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';

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
    public usuarioService: UsuarioService
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
  recuperarCombos() {
    this.combos.obtenerComboTipo('Provincia').then((result) => {
      this.comboProvincias = result;
    });
  }
  recuperarPerfil() {
    this.usuarioService.obtenerUsuarioPorId(this.idUsuario).then((result) => {
      this.usuario = result;
      console.log(this.usuario);
    }, error => {

    });
  }
  recuperarSolicitudes() {
    this.sinDatosSolicitudes = false;
  }
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
import { UsuarioService } from 'src/app/api-rest/api/Usuario/usuario.service';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  usuario: Usuario;
  idUsuario: number;
  formPerfil: FormGroup;
  modoEditar: boolean;
  comboProvincias: Combo[];
  provinciaSeleccionada: Combo;
  constructor(
    private route: ActivatedRoute,
    public usuarioService: UsuarioService,
    public fb: FormBuilder,
    public combos: ComboService,
    private location: Location
  ) {
    this.route.queryParams.subscribe(params => {
      this.idUsuario = Number(params.idUsuario);
      this.modoEditar = params.modoEditar as boolean;
      this.consultarUsuario();
    });
  }

  ngOnInit(): void {
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
    if (this.modoEditar.toString() === 'false') {
      this.formPerfil.disable();
    }
  }
  recuperarCombos() {
    this.combos.obtenerComboTipo('Provincia').then((result) => {
      this.comboProvincias = result;
    });
  }
  consultarUsuario() {
    this.usuarioService.obtenerUsuarioPorId(this.idUsuario).then((result) => {
      this.usuario = result;
      this.formPerfil = this.fb.group({
        nombre: [result.nombre, [Validators.required]],
        apellidos: [result.apellidos, [Validators.required]],
        email: [result.email, [Validators.required, Validators.email, Validators.required]],
        sexo: [result.sexo, [Validators.required]],
        dni: [result.dni, [Validators.required]],
        edad: [result.edad, [Validators.required, Validators.compose([Validators.min(18), Validators.max(130)])]],
        direccion: [result.direccion, [Validators.required]],
        provincia: [result.provincia, [Validators.required]],
        codigoPostal: [result.codigoPostal, [Validators.required]],
        telefono: [result.telefono, [Validators.required]],
        pass1: [result.password, [Validators.required]],
        pass2: [result.password, [Validators.required]],
      });
      this.combos.obtenerComboTipo('Provincia').then((combos) => {
        this.comboProvincias = combos;
        this.provinciaSeleccionada = combos.find(element => element.id === result.provincia);
      });
      if (this.modoEditar.toString() === 'false') {
        this.formPerfil.disable();
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
  volver() {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
import { UsuarioService } from 'src/app/api-rest/api/Usuario/usuario.service';
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';
import { Router } from '@angular/router';
let usuario = JSON.parse(localStorage.getItem('usuario'));
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegistro: FormGroup;
  comboProvincias: Combo[];
  constructor(
    public fb: FormBuilder,
    public combo: ComboService,
    public registro: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    this.iniciarForm();
    this.recuperarCombos();
  }
  recuperarCombos() {
    this.combo.obtenerComboTipo('Provincia').then((result) => {
      this.comboProvincias = result;
    });
  }
  iniciarForm() {
    this.formRegistro = this.fb.group({
      nombre: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email, Validators.required]],
      // usuario: [null, [Validators.required]],
      pass1: [null, [Validators.required]],
      pass2: [null, [Validators.required]],
      sexo: ['H', [Validators.required]],
      apellidos: [null, [Validators.required]],
      provincia: [null, [Validators.required]],
      dni: [null, [Validators.required]],
      edad: [null, [Validators.required, Validators.compose([Validators.min(18), Validators.max(130)])]],
      direccion: [null, [Validators.required]],
      codigoPostal: [null, [Validators.required]],
      telefono: [null, [Validators.required]]
    });
  }
  registrarse() {
    console.log(this.formRegistro.value);
    console.log(this.formRegistro.invalid);
    if (this.formRegistro.invalid) {
      Swal.fire('ERROR!', 'Debe de rellenar todos los campos', 'error');
    } else if (this.formRegistro.controls.pass1.value !== this.formRegistro.controls.pass2.value) {
      Swal.fire('ERROR!', 'Las contraseñas no coinciden', 'error');
    } else if (this.formRegistro.controls.edad.value < 18) {
      Swal.fire('ERROR!', 'La edad debe ser mayor de 18', 'error');
    }else {
      const user: Usuario = {
        apellidos: this.formRegistro.controls.apellidos.value,
        nombre: this.formRegistro.controls.nombre.value,
        codigoPostal: this.formRegistro.controls.codigoPostal.value,
        direccion: this.formRegistro.controls.direccion.value,
        dni: this.formRegistro.controls.dni.value,
        edad: Number(this.formRegistro.controls.edad.value),
        email: this.formRegistro.controls.email.value,
        password: this.formRegistro.controls.pass1.value,
        provincia: this.formRegistro.controls.provincia.value,
        sexo: this.formRegistro.controls.sexo.value,
        telefono: this.formRegistro.controls.telefono.value,
        idUsuario: null,
        pedidos: null,
        solicitudes: null
      };
      this.registro.registrarUsuario(user).then((result) => {
        Swal.fire({
          title: '¡El registro se ha realizado con éxito!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ir a mi perfil!'
        }).then((mensaje) => {
          if (mensaje.value) {
            // rederigir a mi perfil, cambiar iconos menú
            this.router.navigate(['/registro/mi-perfil'], {queryParams: {
              idUsuario: result.idUsuario
            }});
          }
        });
      }, error => {
        Swal.fire('ERROR!', 'Error', 'error');
      });
    }
  }
}

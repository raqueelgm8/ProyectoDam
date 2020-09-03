import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';
import { UsuarioService } from 'src/app/api-rest/api/Usuario/usuario.service';
import { Router } from '@angular/router';
let usuario = JSON.parse(localStorage.getItem('usuario'));
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})

export class InicioSesionComponent implements OnInit {

  formInicioSesion: FormGroup;

  constructor(
    public fb: FormBuilder,
    public usuarioService: UsuarioService,
    public route: Router
  ) { }

  ngOnInit() {
    this.iniciarForm();
  }
  iniciarForm() {
    this.formInicioSesion = this.fb.group({
      email: null,
      pass1: null,
    });
  }
  iniciarSesion() {
    const email = this.formInicioSesion.controls.email.value;
    const pass = this.formInicioSesion.controls.pass1.value;
    this.usuarioService.obtenerUsuariosPorEmailPass(email, pass).then((result) => {
      if (result.length > 0) {
        Swal.fire('¡ÉXITO!', 'Usuario encontrado', 'success');
        let usuario = localStorage.setItem('usuario', JSON.stringify(result[0]));
        this.route.navigate(['/registro/mi-perfil'], {queryParams: {idUsuario: result[0].idUsuario}});
      } else {
        Swal.fire('ERROR!', 'El email o contraseña indicados no es correcto.', 'error');
      }
    }, error => {
      Swal.fire('ERROR!', 'Error', 'error');
    });
  }
}

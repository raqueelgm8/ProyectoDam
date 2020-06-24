import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  formInicioSesion: FormGroup;

  constructor(
    public fb: FormBuilder
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
    // conexión bd
    const email = this.formInicioSesion.controls.email.value;
    const pass = this.formInicioSesion.controls.pass1.value;
  }
}

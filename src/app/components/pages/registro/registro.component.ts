import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegistro: FormGroup;

  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.iniciarForm();
  }
  iniciarForm() {
    this.formRegistro = this.fb.group({
      nombre: null,
      email: null,
      usuario: null,
      pass1: null,
      pass2: null,
      sexo: null,
      apellidos: null
    });
  }
  registrarse() {
    Swal.fire('¡Éxito!', 'Registro realizado correctamente', 'success');
  }
}

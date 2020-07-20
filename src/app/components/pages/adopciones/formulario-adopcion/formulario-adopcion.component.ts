import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formulario-adopcion',
  templateUrl: './formulario-adopcion.component.html',
  styleUrls: ['./formulario-adopcion.component.css']
})
export class FormularioAdopcionComponent implements OnInit {

  formAdopcion: FormGroup;
  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.iniciarGrupoAdopcion();
  }
  iniciarGrupoAdopcion() {
    this.formAdopcion = this.fb.group({
      nombre: null,
      apellidos: null,
      direccion: null,
      poblacion: null,
      codPostal: null,
      telefonoMovil: null,
      razon: null
    });
  }
}

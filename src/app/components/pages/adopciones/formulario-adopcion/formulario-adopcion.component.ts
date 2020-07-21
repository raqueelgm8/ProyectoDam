import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Perro } from '../perros/perros.component';

@Component({
  selector: 'app-formulario-adopcion',
  templateUrl: './formulario-adopcion.component.html',
  styleUrls: ['./formulario-adopcion.component.css']
})
export class FormularioAdopcionComponent implements OnInit {

  animal: Perro;
  formAdopcion: FormGroup;
  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.animal = JSON.parse(params.animal);
    });
   }

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
      razon: null,
      mascotas: null,
      terraza: null,
      jardin: null,
      horarioTrabajo: null,
      miembrosFamilia: null,
      politicaPrivacidad: null,
    });
  }
  abrirModal() {
    
  }
}

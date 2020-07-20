import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
export interface CodeDescription {
  id: string;
  description: string;
}
export interface Otro {
  id: string;
  description: string;
  imagen: string;
  raza: string;
  edad: number;
  tipoEdad: string;
  nombre: string;
  sexo: string;
}
@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.css']
})
export class OtrosComponent implements OnInit {

  // MOCKEADOS

  animales: CodeDescription[] = [
    {id: '1', description: 'Pájaro'},
    {id: '2', description: 'Tortuga'},
    {id: '3', description: 'Conejo'},
    {id: '4', description: 'Hámster'},
  ];
  otros: Otro[] = [
    {id: '23', description: 'Tortuga maja', edad: 10, raza: 'Tortuga siberiana', tipoEdad: 'Adulta', nombre: 'Crush', sexo: 'Macho',
     imagen: 'https://cdn.pixabay.com/photo/2014/08/06/16/52/terrapin-411853_1280.jpg'},
     {id: '24', description: 'Hámster agradable', edad: 1, raza: 'Mestizo', tipoEdad: 'Joven', nombre: 'Lily', sexo: 'Hembra',
     imagen: 'https://cdn.pixabay.com/photo/2016/10/26/22/00/hamster-1772742_1280.jpg'},
     {id: '25', description: 'Conejo como Bugs Bunny', edad: 5, raza: 'Conejo Común', tipoEdad: 'Adulto', nombre: 'Jackie', sexo: 'Macho',
     imagen: 'https://cdn.pixabay.com/photo/2020/04/07/20/36/bunny-5014814_1280.jpg'},
     {id: '26', description: 'Pájaro', edad: 1, raza: 'Loro', tipoEdad: 'Joven',  nombre: 'Merlín', sexo: 'Macho',
     imagen: 'https://cdn.pixabay.com/photo/2014/04/09/10/31/parrot-320006_1280.jpg'}
  ];

  valorSlider = '10';
  formCabecera: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.iniciarGrupos();
  }
  iniciarGrupos() {
    this.formCabecera = this.fb.group({
      disponible: null,
      edad: 10,
      // sexo: null
      // tipoEdad: null
      raza: null
    });
  }
  cambiaValorSlider() {
    this.valorSlider = this.formCabecera.controls.edad.value;
  }
  clickCard(otro: Otro) {
    console.log(otro);
    this.router.navigate(['/adopciones/ficha-animal', ], {queryParams: {
      perro: JSON.stringify(otro), animal: 'Perro'
    }});
  }

}

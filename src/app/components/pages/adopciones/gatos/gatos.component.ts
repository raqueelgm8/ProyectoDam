import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

export interface CodeDescription {
  id: string;
  description: string;
}
export interface Gato {
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
  selector: 'app-gatos',
  templateUrl: './gatos.component.html',
  styleUrls: ['./gatos.component.css']
})
export class GatosComponent implements OnInit {

  // MOCKEADOS

  razas: CodeDescription[] = [
    {id: '1', description: 'British Shorthair'},
    {id: '2', description: 'Ragdoll'},
    {id: '3', description: 'Maine Coon'},
    {id: '4', description: 'Gato himalayo'},
    {id: '5', description: 'Gato exótico'},
    {id: '6', description: 'Mestizo'},
  ];
  gatos: Gato[] = [
    {id: '23', description: 'Gato más bonico del mundo', edad: 6, raza: 'British Shorthair', tipoEdad: 'Adulto', nombre: 'Don Gato', sexo: 'Macho',
     imagen: 'https://www.miwuki.com/wp-content/uploads/2018/08/British-Shorthair.jpg'},
     {id: '24', description: 'Gato doble de bonico', edad: 2, raza: 'Ragdoll', tipoEdad: 'Joven', nombre: 'Miau miau', sexo: 'Macho',
     imagen: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Ragdoll_from_Gatil_Ragbelas.jpg'},
     {id: '25', description: 'Gato triple de bonico', edad: 5, raza: 'Estrella', tipoEdad: 'Joven', nombre: 'Tami', sexo: 'Hembra',
     imagen: 'https://www.zooplus.es/magazine/wp-content/uploads/2018/08/maine-coon-3-768x658.jpg'},
     {id: '26', description: 'Gato más bonico aún', edad: 4, raza: 'Gato himalayo', tipoEdad: 'Joven',  nombre: 'Bigotes', sexo: 'Macho',
     imagen: 'https://www.zooplus.es/magazine/wp-content/uploads/2019/10/featured-768x614.jpg'}
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
      disponible: true,
      edad: 10,
      // sexo: null
      // tipoEdad: null
      raza: null
    });
  }
  cambiaValorSlider() {
    this.valorSlider = this.formCabecera.controls.edad.value;
  }
  clickCard(gato: Gato) {
    this.router.navigate(['/adopciones/ficha-animal', ], {queryParams: {
      gato: JSON.stringify(gato), animal: 'Gato'
    }});
  }

}

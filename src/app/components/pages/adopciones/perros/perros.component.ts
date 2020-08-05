import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


export interface CodeDescription {
  id: string;
  description: string;
}
export interface Perro {
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
  selector: 'app-perros',
  templateUrl: './perros.component.html',
  styleUrls: ['./perros.component.css']
})

export class PerrosComponent implements OnInit {

  // MOCKEADOS

  razas: CodeDescription[] = [
    {id: '1', description: 'Golden Retriever'},
    {id: '2', description: 'Mestizo'},
    {id: '3', description: 'Pastor Alemán'},
    {id: '4', description: 'Mastín'},
    {id: '5', description: 'Beagle'},
    {id: '6', description: 'Cocker'},
  ];
  perros: Perro[] = [
    {id: '23', description: 'Perro más bonico del mundo', edad: 0, raza: 'Golden Retriever', tipoEdad: 'Cachorro', nombre: 'Selene', sexo: 'Hembra',
     imagen: 'https://cdn.redcanina.es/wp-content/uploads/2019/02/12102930/golden-cachorro-e1549967733842-1024x650.jpg'},
     {id: '24', description: 'Perro doble de  bonico', edad: 2, raza: 'Mestizo', tipoEdad: 'Joven', nombre: 'José Luis', sexo: 'Macho',
     imagen: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/04/12185602/Lagotto-Romangolo-Tongue-Out.jpg'},
     {id: '25', description: 'Perro triple de bonico', edad: 5, raza: 'Cocker', tipoEdad: 'Joven', nombre: 'Tami', sexo: 'Hembra',
     imagen: 'https://blog.mascotaysalud.com/wp-content/uploads/2019/09/cocker-spaniel-ingles-corriendo.jpg'},
     {id: '26', description: 'Perro más bonico aún', edad: 4, raza: 'Pastor Alemán', tipoEdad: 'Joven',  nombre: 'Thor', sexo: 'Macho',
     imagen: 'https://t1.ea.ltmcdn.com/es/images/3/2/9/curiosidades_del_pastor_aleman_23923_600.jpg'}
  ];

  valorSlider = '10';
  formCabecera: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.iniciarGrupos();
    this.httpClient.get('api/combos/combos').subscribe((res) => {
      console.log(res);
  });
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
  clickCard(perro: Perro) {
    console.log(perro);
    this.router.navigate(['/adopciones/ficha-animal', ], {queryParams: {
      perro: JSON.stringify(perro), animal: 'Perro'
    }});
  }
}

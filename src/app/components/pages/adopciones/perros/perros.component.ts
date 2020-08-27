import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'angular-webstorage-service';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
import { AnimalesService } from 'src/app/api-rest/api/Animales/animales.service';
import { Animal } from 'src/app/api-rest/models/Animal/animal.model';
import { ArchivosService } from 'src/app/api-rest/api/Archivos/archivos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';


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
  comboRazas: Combo[];
  animales: Animal[];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private combo: ComboService,
    private animalesService: AnimalesService,
    public sanitizer: DomSanitizer,
    private archivosService: ArchivosService,
  ) { }

  ngOnInit() {
    this.iniciarGrupos();
    this.recuperarCombos();
    this.recuperarPerros();
  }
  recuperarCombos() {
    this.combo.obtenerComboTipo('Perro').then((result) => {
      this.comboRazas = result;
    });
  }
  recuperarPerros() {
    this.animalesService.obtenerAnimalesTipo('Perro').then((result) => {
      this.animales = result;
      console.log(this.animales);
      this.animales.forEach(element => {
        const binaryString = window.atob(element.imagen);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
          const ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }
        const blob = new Blob([bytes], { type: 'application/png'});
        const fileUrl = URL.createObjectURL(blob);
        element.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
      });
    });
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
  clickCard(perro: Animal) {
    console.log(perro);
    this.router.navigate(['/adopciones/ficha-animal', ], {queryParams: {
      idAnimal: perro.idAnimal
    }});
  }
}

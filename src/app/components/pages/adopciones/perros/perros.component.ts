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
      this.animales = result as Animal[];
      console.log(this.animales);
      this.animales.forEach(element => {
        element.sexo = element.sexo === 'H' ? 'Hembra' : 'Macho';
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

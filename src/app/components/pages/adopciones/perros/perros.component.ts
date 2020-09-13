import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'angular-webstorage-service';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
import { AnimalesService } from 'src/app/api-rest/api/Animales/animales.service';
import { Animal } from 'src/app/api-rest/models/Animal/animal.model';
import { DomSanitizer } from '@angular/platform-browser';

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

  valorSlider = '1';
  formCabecera: FormGroup;
  comboRazas: Combo[];
  animales: Animal[];
  buscarPerros: Animal[];
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
      edad: 1,
      sexo: 'null',
      raza: null,
      tipoEdad: 'null',
    });
  }
  cambiaValorSlider() {
    this.valorSlider = this.formCabecera.controls.edad.value;
  }
  clickCard(perro: Animal) {
    this.router.navigate(['/adopciones/ficha-animal', ], {queryParams: {
      idAnimal: perro.idAnimal
    }});
  }
  buscar() {
    const raza: Combo = this.comboRazas.find(element => element.id === this.formCabecera.controls.raza.value);
    const perro: Animal = {
      idAnimal: null,
      // adoptado: this.formCabecera.controls.disponible.value,
      adoptado: this.formCabecera.controls.disponible.value,
      descripcion: null,
      edad: this.formCabecera.controls.edad.value,
      imagen: null,
      nombre: null,
      raza: raza !== undefined ? raza.descripcion : null,
      // sexo: this.formCabecera.controls.sexo.value,
      sexo: this.formCabecera.controls.sexo.value !== null && this.formCabecera.controls.sexo.value !== 'null' ?
      this.formCabecera.controls.sexo.value : null,
      tipoAnimal: 'Perro',
      tipoEdad: this.formCabecera.controls.tipoEdad.value !== null &&
      this.formCabecera.controls.tipoEdad.value !== 'null' ? this.formCabecera.controls.tipoEdad.value : null,
    };
    this.animalesService.buscarAnimales('Perro', perro).then((result) => {
      this.animales = result;
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
}

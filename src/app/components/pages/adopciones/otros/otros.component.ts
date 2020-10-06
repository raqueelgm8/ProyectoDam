import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Animal } from 'src/app/api-rest/models/Animal/animal.model';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
import { AnimalesService } from 'src/app/api-rest/api/Animales/animales.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.css']
})
export class OtrosComponent implements OnInit {

  valorSlider = '1';
  formCabecera: FormGroup;
  otros: Animal[];
  razas: Combo[];
  razaSeleccionada: Combo;
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
    this.recuperarOtros();
  }
  iniciarGrupos() {
    this.formCabecera = this.fb.group({
      // disponible: true,
      edad: 1,
      sexo: 'null',
      raza: null,
      tipoEdad: 'null',
    });
  }
  recuperarCombos() {
    this.combo.obtenerComboTipo('Otro').then((result) => {
      this.razas = result;
    });
  }
  recuperarOtros() {
    this.animalesService.obtenerAnimalesTipo('Otro').then((result) => {
      this.otros = result as Animal[];
      this.otros.forEach(element => {
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
  cambiaValorSlider() {
    this.valorSlider = this.formCabecera.controls.edad.value;
  }
  clickCard(otro: Animal) {
    this.router.navigate(['/adopciones/ficha-animal', ], {queryParams: {
      idAnimal: otro.idAnimal
    }});
  }
  buscar() {
    const perro: Animal = {
      idAnimal: null,
      // adoptado: this.formCabecera.controls.disponible.value,
      adoptado: true,
      descripcion: null,
      edad: this.formCabecera.controls.edad.value,
      imagen: null,
      nombre: null,
      raza: this.razaSeleccionada.descripcion,
      // sexo: this.formCabecera.controls.sexo.value,
      sexo: this.formCabecera.controls.sexo.value !== null && this.formCabecera.controls.sexo.value !== 'null' ?
      this.formCabecera.controls.sexo.value : null,
      tipoAnimal: 'Otro',
      tipoEdad: this.formCabecera.controls.tipoEdad.value !== null &&
      this.formCabecera.controls.tipoEdad.value !== 'null' ? this.formCabecera.controls.tipoEdad.value : null,
    };
    this.animalesService.buscarAnimales('Otro', perro).then((result) => {
      this.otros = result;
      this.otros.forEach(element => {
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

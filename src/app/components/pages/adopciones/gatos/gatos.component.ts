import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Animal } from 'src/app/api-rest/models/Animal/animal.model';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AnimalesService } from 'src/app/api-rest/api/Animales/animales.service';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/api-rest/api/Usuario/usuario.service';
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-gatos',
  templateUrl: './gatos.component.html',
  styleUrls: ['./gatos.component.css']
})
export class GatosComponent implements OnInit {

  valorSlider = '1';
  formCabecera: FormGroup;
  gatos: Animal[];
  comboRazasGato: Combo[];
  razaSeleccionada: Combo;
  usuario: Usuario;
  idUsuario: number;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private combo: ComboService,
    private animalesService: AnimalesService,
    public sanitizer: DomSanitizer,
    private cd_: ChangeDetectorRef,
    private usuarioService: UsuarioService,
    private location: Location
  ) {
    this.consultarUsuario();
   }

  ngOnInit() {
    this.iniciarGrupos();
    this.recuperarCombos();
    this.recuperarGatos();
  }
  consultarUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.idUsuario = this.usuario.idUsuario;
  }
  iniciarGrupos() {
    this.formCabecera = this.fb.group({
      edad: 1,
      sexo: 'null',
      raza: null,
      tipoEdad: 'null',
    });
  }
  recuperarCombos() {
    this.combo.obtenerComboTipo('Gato').then((result) => {
      this.comboRazasGato = result;
    });
  }
  recuperarGatos() {
    this.animalesService.obtenerAnimalesTipo('Gato').then((result) => {
      this.gatos = result as Animal[];
      this.gatos.forEach(element => {
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
  clickCard(gato: Animal) {
    this.router.navigate(['/adopciones/ficha-animal', ], {queryParams: {
      idAnimal: gato.idAnimal
    }});
  }
  buscar() {
    const gato: Animal = {
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
      tipoAnimal: 'Perro',
      tipoEdad: this.formCabecera.controls.tipoEdad.value !== null &&
      this.formCabecera.controls.tipoEdad.value !== 'null' ? this.formCabecera.controls.tipoEdad.value : null,
    };
    this.animalesService.buscarAnimales('Gato', gato).then((result) => {
      this.gatos = result;
      this.gatos.forEach(element => {
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
  eliminarAnimal(animal: Animal) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este animal?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar animal'
    }).then((mensaje) => {
      if (mensaje.value) {
        this.animalesService.eliminarAnimal(animal.idAnimal);
        const index = this.gatos.findIndex(element => element.idAnimal === animal.idAnimal);
        this.gatos.splice(index, 1);
        this.cd_.detectChanges();
        this.location.back();
      }
    });
  }
}

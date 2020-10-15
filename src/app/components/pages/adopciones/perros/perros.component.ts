import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
import { AnimalesService } from 'src/app/api-rest/api/Animales/animales.service';
import { Animal } from 'src/app/api-rest/models/Animal/animal.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';
import { UsuarioService } from 'src/app/api-rest/api/Usuario/usuario.service';
@Component({
  selector: 'app-perros',
  templateUrl: './perros.component.html',
  styleUrls: ['./perros.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PerrosComponent implements OnInit {

  valorSlider = '1';
  formCabecera: FormGroup;
  comboRazas: Combo[] = [];
  animales: Animal[];
  buscarPerros: Animal[];
  selectedRaza: string;
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
    private usuarioService: UsuarioService
  ) {
    this.consultarUsuario();
  }

  ngOnInit() {
    this.iniciarGrupos();
    this.recuperarCombos();
    this.recuperarPerros();
  }
  consultarUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.idUsuario = this.usuario.idUsuario;
  }
  recuperarCombos() {
    this.combo.obtenerComboTipo('Perro').then((result) => {
      this.comboRazas = [...result];
      this.cd_.detectChanges();
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
      // disponible: true,
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
        const index = this.animales.findIndex(element => element.idAnimal === animal.idAnimal);
        this.animales.splice(index, 1);
        this.cd_.detectChanges();
      }
    });
  }
}

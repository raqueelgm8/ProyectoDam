import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/api-rest/models/Animal/animal.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AnimalesService } from 'src/app/api-rest/api/Animales/animales.service';
import Swal from 'sweetalert2';
let usuario = JSON.parse(localStorage.getItem('usuario'));
@Component({
  selector: 'app-ficha-animal',
  templateUrl: './ficha-animal.component.html',
  styleUrls: ['./ficha-animal.component.css']
})
export class FichaAnimalComponent implements OnInit {

  animal: Animal = {
    idAnimal: 0,
    adoptado: false,
    descripcion: '',
    imagen: '',
    imagenSrc: '',
    nombre: '',
    edad: 0,
    raza: '',
    tipoAnimal: '',
    tipoEdad: '',
    sexo: ''
  };
  idAnimal: number;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public sanitizer: DomSanitizer,
    private animalesService: AnimalesService
  ) {
    this.route.queryParams.subscribe(params => {
      this.idAnimal = Number(params.idAnimal);
    });
  }
  ngOnInit() {
    this.consultarAnimal(this.idAnimal);
  }
  clickAdoptame(){
    if (localStorage.getItem('usuario') !== undefined && localStorage.getItem('usuario') !== null) {
      this.router.navigate(['/adopciones/ficha-animal/formulario-adopcion'], {queryParams: {
        animalId: this.idAnimal
      }});
    } else {
      Swal.fire('Registro necesario', 'Para poder enviar una solicitud debe de estar registrado', 'warning');
      this.router.navigate(['/registro/inicio-sesion']);
    }

  }
  consultarAnimal(idAnimal: number) {
    this.animalesService.obtenerAnimalPorId(idAnimal).then((result) => {
      this.animal = result as Animal;
      let imagen;
      if (this.animal.archivoImagen !== undefined && this.animal.archivoImagen !== null) {
        imagen = this.animal.archivoImagen;
        var splitted = imagen.split(',', 3);
        const binaryString = window.atob(splitted[1]);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
          const ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }
        const blob = new Blob([bytes], { type: 'application/png'});
        const fileUrl = URL.createObjectURL(blob);
        this.animal.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
      } else {
        imagen = this.animal.imagen;
        const binaryString = window.atob(imagen);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
          const ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }
        const blob = new Blob([bytes], { type: 'application/png'});
        const fileUrl = URL.createObjectURL(blob);
        this.animal.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
      }
    });
  }
}

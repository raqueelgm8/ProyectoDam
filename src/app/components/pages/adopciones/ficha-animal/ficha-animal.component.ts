import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Perro } from '../perros/perros.component';
import { Animal } from 'src/app/api-rest/models/Animal/animal.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ficha-animal',
  templateUrl: './ficha-animal.component.html',
  styleUrls: ['./ficha-animal.component.css']
})
export class FichaAnimalComponent implements OnInit {

  animal: Animal;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public sanitizer: DomSanitizer,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.animal === 'Perro') {
        this.animal = JSON.parse(params.perro);
      } else if (params.animal === 'Gato') {
        this.animal = JSON.parse(params.gato);
      } else if (params.animal === 'Otro') {
        // this.animal = JSON.parse(params.otro);
      }
    });
    this.recuperarImagen();
  }

  ngOnInit(
  ): void {
  }
  clickAdoptame(){
    this.router.navigate(['/adopciones/ficha-animal/formulario-adopcion'], {queryParams: {
      animal: JSON.stringify(this.animal)
    }});
  }
  recuperarImagen() {
    const binaryString = window.atob(this.animal.imagen);
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
}

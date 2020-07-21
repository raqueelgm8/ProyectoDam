import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Perro } from '../perros/perros.component';

@Component({
  selector: 'app-ficha-animal',
  templateUrl: './ficha-animal.component.html',
  styleUrls: ['./ficha-animal.component.css']
})
export class FichaAnimalComponent implements OnInit {

  animal: any;
  constructor(
    public route: ActivatedRoute,
    public router: Router
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
  }

  ngOnInit(
  ): void {
  }
  clickAdoptame(){
    console.log(JSON.stringify(this.animal));
    this.router.navigate(['/adopciones/ficha-animal/formulario-adopcion'], {queryParams: {
      animal: JSON.stringify(this.animal)
    }});
  }
}

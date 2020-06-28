import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Perro } from '../perros/perros.component';

@Component({
  selector: 'app-ficha-animal',
  templateUrl: './ficha-animal.component.html',
  styleUrls: ['./ficha-animal.component.css']
})
export class FichaAnimalComponent implements OnInit {

  perro: Perro;
  // gato: Gato;
  // otro: Otro;
  constructor(
    public route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.animal === 'Perro') {
        this.perro = JSON.parse(params.perro);
        console.log(this.perro);
      } else if(params.animal === 'Gato') {

      } else if(params.animal === 'Otro') {

      } 
    });
  }

  ngOnInit(): void {
  }

}

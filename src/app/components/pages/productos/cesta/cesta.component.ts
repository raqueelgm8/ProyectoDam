import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/api-rest/models/Producto/producto.model';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent implements OnInit {

  cesta: Producto[];
  constructor() { }

  ngOnInit(): void {
    this.cesta = JSON.parse(localStorage.getItem('cesta'));
  }

}

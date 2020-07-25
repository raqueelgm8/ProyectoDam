import { Component, OnInit } from '@angular/core';
import { CodeDescription } from '../adopciones/perros/perros.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  // MOCKEADOS
  animales: CodeDescription[] = [
    {id: '1', description: 'Perro'},
    {id: '2', description: 'Gato'},
    {id: '3', description: 'Otros'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { CodeDescription } from '../adopciones/perros/perros.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FichaProductoComponent } from './ficha-producto/ficha-producto.component';
import * as R from 'ramda';
export interface Producto {
  id: string;
  nombre: string;
  description: string;
  imagen: string;
  precio: number;
  tipoAnimal: string;
  tipoProducto: string;
  cantidad?: number;
}
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
  productos: Producto[] = [
    {id: '1', description: 'Pienso Pet shop 15 kg', precio: 19.99, tipoAnimal: 'Perro',
    imagen: 'https://www.kiwoko.com/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw1d83046b/images/pienso_perros_start_adulto_pollo_KWK114_M.jpg' , tipoProducto: 'Comida', nombre: 'Pienso adelgazador'},
    {id: '2', description: 'Producto 2', precio: 5, tipoAnimal: 'Todos',
    imagen: 'https://www.terranovacnc.com/wp-content/uploads/2020/05/the-company-of-animals-collar-halty-color-rojo-para-perros.jpg', tipoProducto: 'Accesorios', nombre: 'Collar rojo'},
    {id: '3', description: 'Bozal para perros', precio: 2, tipoAnimal: 'Perro',
    imagen: 'https://myanimals.com/es/wp-content/uploads/2015/11/bozal-para-perros.jpg' , tipoProducto: 'Accesorios', nombre: 'Bozal canino'},
    {id: '4', description: 'Producto 4', precio: 10, tipoAnimal: 'Otros',
    imagen: '', tipoProducto: 'Comida', nombre: 'Producto 3'},
    {id: '5', description: 'Producto 5', precio: 10, tipoAnimal: 'Perro',
    imagen: '' , tipoProducto: 'Comida', nombre: 'Producto 3'},
    {id: '6', description: 'Producto 6', precio: 10, tipoAnimal: 'Todos',
    imagen: '', tipoProducto: 'Comida', nombre: 'Producto 4'},
  ];
  formCabecera: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.formCabecera = this.fb.group({
      animal: null,
      juguetes: null,
      accesorios: null,
      comida: null
    });
  }
  clickCard(producto: Producto) {
    const modalRef = this.modal.open(FichaProductoComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.producto = producto;
    modalRef.result.then((result) => {
      if (!R.isNil(result)) {
        
      }
    });
  }
}

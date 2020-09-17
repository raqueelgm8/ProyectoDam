import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FichaProductoComponent } from './ficha-producto/ficha-producto.component';
import * as R from 'ramda';
import { ProductosService } from 'src/app/api-rest/api/Productos/productos.service';
import { Producto } from 'src/app/api-rest/models/Producto/producto.model';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  @Output() cestaEvent = new EventEmitter<any>();
  formCabecera: FormGroup;
  cesta: Producto[];
  constructor(
    private fb: FormBuilder,
    private modal: NgbModal,
    private productosService: ProductosService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.formCabecera = this.fb.group({
      animal: null,
      categoria: null
    });
    this.buscarAlLPedidos();
  }
  buscarAlLPedidos() {
    this.productosService.buscarTodosProductos().then((result) => {
      this.productos = result;
      this.productos.forEach(element => {
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
  clickCard(producto: Producto) {
    const modalRef = this.modal.open(FichaProductoComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.producto = producto;
    modalRef.componentInstance.cesta = this.cesta;
    modalRef.result.then((result) => {
      if (!R.isNil(result)) {
        this.cesta = result;
        console.log(this.cesta);
        this.cestaEvent.emit(this.cesta);
      }
    });
  }
  buscar() {
    const tipoAnimal = this.formCabecera.controls.animal.value;
    const categoria = this.formCabecera.controls.categoria.value !== null && this.formCabecera.controls.categoria.value !== 'null' ?
    this.formCabecera.controls.categoria.value : null;
    this.productosService.buscarProductos(categoria, tipoAnimal).then((result) => {
      this.productos = result;
      this.productos.forEach(element => {
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

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as R from 'ramda';
import { ModalAnadidoComponent } from '../cesta/modal-anadido/modal-anadido.component';
import { Router } from '@angular/router';
import { Producto } from 'src/app/api-rest/models/Producto/producto.model';
import { CestaService } from 'src/app/api-rest/api/Cesta/cesta.service';
@Component({
  selector: 'app-ficha-producto',
  templateUrl: './ficha-producto.component.html',
  styleUrls: ['./ficha-producto.component.css']
})
export class FichaProductoComponent implements OnInit {
  @Input() producto: Producto;
  @Output() cestaEvent = new EventEmitter<any>();
  formCantidad: FormGroup;
  @Input() cesta: Producto[];
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private modalNgb: NgbModal,
    private route: Router,
    private cartService: CestaService
  ) { }

  ngOnInit(): void {
    this.formCantidad = this.fb.group({
      cantidad: 1
    });
  }

  clickCerrar() {
    this.modal.close(this.cesta);
  }
  abrirModal() {
    const modalRef = this.modalNgb.open(ModalAnadidoComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.nombre = this.producto.nombre;
    modalRef.result.then((result) => {
      if (!R.isNil(result)) {
        if (result === 'cesta'){
        this.route.navigate(['/productos/cesta']);
        this.modal.close();
        }
      }
    });
  }
  addToCart() {
    this.producto.cantidad = this.formCantidad.controls.cantidad.value;
    const cesta: Producto[]= this.cartService.getItems();
    const index = cesta.findIndex(element => element.idProducto === this.producto.idProducto);
    if (index >= 0) {
      cesta[index].cantidad = this.producto.cantidad + cesta[index].cantidad;
      this.cartService.actualizarCesta(cesta);
    } else {
      this.cartService.addToCart(this.producto);
    }
    this.abrirModal();
    this.modal.close();
  }
}

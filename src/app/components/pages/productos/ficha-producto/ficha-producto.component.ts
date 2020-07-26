import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Producto } from '../productos.component';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as R from 'ramda';
import { ModalAnadidoComponent } from '../cesta/modal-anadido/modal-anadido.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
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
    private cestaServicio: ProductoServiceService,
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private modalNgb: NgbModal,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.formCantidad = this.fb.group({
      cantidad: 1
    });
    this.cestaServicio.iniciarCesta();
    // this.cesta = this.cestaServicio.getProductoCesta();
    console.log(this.cesta);
  }
  clickAdd() {
    if (this.cesta === undefined) this.cesta = [];
    this.producto.cantidad = Number(this.formCantidad.controls.cantidad.value);
    this.cesta.push(this.producto);
    this.cestaServicio.addProductoCesta(this.cesta);
    console.log(this.cestaServicio.getProductoCesta());
    this.cestaEvent.emit(this.cesta);
    // Swal.fire('¡Éxito!', 'El producto ' + this.producto.nombre + ' ha sido añadido correctamente', 'success');
    this.abrirModal();
  }
  clickCerrar() {
    this.modal.close(this.cesta);
    // this.cestaServicio.limpiarCesta();
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
}

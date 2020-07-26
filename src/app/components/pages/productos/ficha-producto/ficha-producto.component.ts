import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../productos.component';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ficha-producto',
  templateUrl: './ficha-producto.component.html',
  styleUrls: ['./ficha-producto.component.css']
})
export class FichaProductoComponent implements OnInit {
  @Input() producto: Producto;
  formCantidad: FormGroup;
  cesta: Producto[];
  constructor(
    private cestaServicio: ProductoServiceService,
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.formCantidad = this.fb.group({
      cantidad: 1
    });
    this.cestaServicio.iniciarCesta();
    this.cesta = this.cestaServicio.getProductoCesta();
    console.log(this.cesta);
  }
  clickAdd() {
    this.producto.cantidad = Number(this.formCantidad.controls.cantidad.value);
    this.cesta.push(this.producto);
    console.log(this.cesta);
    this.cestaServicio.addProductoCesta(this.cesta);
    console.log(this.cestaServicio.getProductoCesta());
  }
  clickCerrar() {
    this.modal.close();
    // this.cestaServicio.limpiarCesta();
  }
}

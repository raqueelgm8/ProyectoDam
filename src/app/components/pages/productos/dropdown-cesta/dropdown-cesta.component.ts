import { Component, OnInit } from '@angular/core';
import { CestaService } from 'src/app/api-rest/api/Cesta/cesta.service';
import { Producto } from 'src/app/api-rest/models/Producto/producto.model';

@Component({
  selector: 'app-dropdown-cesta',
  templateUrl: './dropdown-cesta.component.html',
  styleUrls: ['./dropdown-cesta.component.css']
})
export class DropdownCestaComponent implements OnInit {

  productos: Producto[];
  constructor(
    private cestaService: CestaService
  ) { }

  ngOnInit() {
    this.productos = this.cestaService.getItems();
  }
  clickEliminar(producto: Producto) {
    this.cestaService.removeItem(producto);
  }
}

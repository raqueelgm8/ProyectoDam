import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../productos.component';

@Component({
  selector: 'app-ficha-producto',
  templateUrl: './ficha-producto.component.html',
  styleUrls: ['./ficha-producto.component.css']
})
export class FichaProductoComponent implements OnInit {
  @Input() producto: Producto;
  constructor() { }

  ngOnInit(): void {
    console.log(this.producto);
  }
}

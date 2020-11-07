import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FichaProductoComponent } from './ficha-producto/ficha-producto.component';
import * as R from 'ramda';
import { ProductosService } from 'src/app/api-rest/api/Productos/productos.service';
import { Producto } from 'src/app/api-rest/models/Producto/producto.model';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/api-rest/api/Usuario/usuario.service';
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';
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
  tiposAnimales = [
    {descripcion: 'Perro'}, {descripcion: 'Gato'}, {descripcion: 'Otro'}
  ];
  animalSeleccionado: any;
  usuario: Usuario;
  idUsuario: number;
  constructor(
    private fb: FormBuilder,
    private modal: NgbModal,
    private productosService: ProductosService,
    public sanitizer: DomSanitizer,
    private usuarioService: UsuarioService,
    private cd_: ChangeDetectorRef,
  ) { 
      this.consultarUsuario();
  }

  ngOnInit(): void {
    this.formCabecera = this.fb.group({
      animal: null,
      categoria: null
    });
    this.buscarAlLPedidos();
  }
  consultarUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    if (this.usuario) {
      this.idUsuario = this.usuario.idUsuario;
    }
  }
  buscarAlLPedidos() {
    this.productosService.buscarTodosProductos().then((result) => {
      this.productos = result;
      this.productos.forEach(element => {
        let imagen;
        if (element.archivoImagen !== undefined && element.archivoImagen !== null) {
          imagen = element.archivoImagen;
          const splitted = imagen.split(',', 3);
          const binaryString = window.atob(splitted[1]);
          const binaryLen = binaryString.length;
          const bytes = new Uint8Array(binaryLen);
          for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
          }
          const blob = new Blob([bytes], { type: 'application/png'});
          const fileUrl = URL.createObjectURL(blob);
          element.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
        } else {
          imagen = element.imagen;
          const binaryString = window.atob(imagen);
          const binaryLen = binaryString.length;
          const bytes = new Uint8Array(binaryLen);
          for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
          }
          const blob = new Blob([bytes], { type: 'application/png'});
          const fileUrl = URL.createObjectURL(blob);
          element.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
        }
      });
    });
  }
  clickCard(producto: Producto) {
    if (producto.stock > 0) {
      const modalRef = this.modal.open(FichaProductoComponent, {
        centered: true,
        size: 'lg'
      });
      modalRef.componentInstance.producto = producto;
      modalRef.componentInstance.cesta = this.cesta;
      modalRef.result.then((result) => {
        if (!R.isNil(result)) {
          this.cesta = result;
          this.cestaEvent.emit(this.cesta);
        }
      });
    } else {
      Swal.fire('¡SIN STOCK!', 'El producto seleccionado no tiene stock disponible.', 'error');
    }
  }
  buscar() {
    const tipoAnimal = this.animalSeleccionado.descripcion;
    const categoria = this.formCabecera.controls.categoria.value !== null && this.formCabecera.controls.categoria.value !== 'null' ?
    this.formCabecera.controls.categoria.value : null;
    this.productosService.buscarProductos(categoria, tipoAnimal).then((result) => {
      this.productos = result;
      this.productos.forEach(element => {
        let imagen;
        if (element.archivoImagen !== undefined && element.archivoImagen !== null) {
          imagen = element.archivoImagen;
          const splitted = imagen.split(',', 3);
          const binaryString = window.atob(splitted[1]);
          const binaryLen = binaryString.length;
          const bytes = new Uint8Array(binaryLen);
          for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
          }
          const blob = new Blob([bytes], { type: 'application/png'});
          const fileUrl = URL.createObjectURL(blob);
          element.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
        } else {
          imagen = element.imagen;
          const binaryString = window.atob(imagen);
          const binaryLen = binaryString.length;
          const bytes = new Uint8Array(binaryLen);
          for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
          }
          const blob = new Blob([bytes], { type: 'application/png'});
          const fileUrl = URL.createObjectURL(blob);
          element.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
        }
      });
    });
  }
  eliminarProducto(producto: Producto) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este producto?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar producto'
    }).then((mensaje) => {
      if (mensaje.value) {
        this.productosService.eliminarProducto(producto.idProducto);
        const index = this.productos.findIndex(element => element.idProducto === producto.idProducto);
        this.productos.splice(index, 1);
        this.cd_.detectChanges();
      }
    });
  }
}

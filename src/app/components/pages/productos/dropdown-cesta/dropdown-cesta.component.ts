import { Component, Input, OnInit, SimpleChanges, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeInterval } from 'rxjs';

import { CestaService } from 'src/app/api-rest/api/Cesta/cesta.service';
import { Producto } from 'src/app/api-rest/models/Producto/producto.model';
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dropdown-cesta',
  templateUrl: './dropdown-cesta.component.html',
  styleUrls: ['./dropdown-cesta.component.css']
})
export class DropdownCestaComponent implements OnInit {

  productos: Producto[];
  interval: any;
  constructor(
    private cestaService: CestaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnDestroy() {
    if (this.interval) {
        clearInterval(this.interval);
    }
   }
  ngOnInit() {
    this.interval = setInterval(() => {
      this.productos = this.cestaService.getItems();
  }, 1000);
 }
  clickEliminar(producto: Producto) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar el producto de la cesta?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar producto'
    }).then((mensaje) => {
      if (mensaje.value) {
        this.cestaService.removeItem(producto);
        this.productos = this.cestaService.getItems();
        Swal.fire('¡ÉXITO!', 'Producto eliminado de la cesta', 'success');
        const url = '/productos/cesta?idUsuario=';
        if (this.router.url.includes(url)) {
          this.router.navigate(['']);
        }
      }
    });
  }
  clickCesta() {
    const usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      this.router.navigate(['/productos/cesta'], {queryParams: {idUsuario: usuario.idUsuario}});
    } else {
      Swal.fire('Registro necesario', 'Para poder realizar un pedido debe de estar registrado', 'warning');
      this.router.navigate(['/registro/inicio-sesion']);
    }

  }
  recibirCesta() {
    this.productos = this.cestaService.getItems();
  }
  limpiarCesta() {
    Swal.fire({
      title: '¿Estás seguro de que deseas limpiar la cesta?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((mensaje) => {
      if (mensaje.value) {
        this.cestaService.clearCart();
        this.productos = this.cestaService.getItems();
        Swal.fire('¡ÉXITO!', 'La cesta se ha limpiado correctamente', 'success');
        const url = '/productos/cesta?idUsuario=';
        if (this.router.url.includes(url)) {
          this.router.navigate(['']);
        }
      }
    });
  }
}

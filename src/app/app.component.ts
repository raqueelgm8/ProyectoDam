import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CestaService } from './api-rest/api/Cesta/cesta.service';
import { Producto } from './api-rest/models/Producto/producto.model';
import { Usuario } from './api-rest/models/Usuario/usuario.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-web';
  navbarCollapsed = true;
  cesta: Producto[];
  usuarioIniciadoSesion = false;
  productos: Producto[];
  numProductos: number;
  constructor(
    private route: Router,
    private cd: ChangeDetectorRef,
    private cestaService: CestaService,
    private activatedRoute: ActivatedRoute
  ) {
   }
  clickHome() {
    this.route.navigate(['/home']);
  }
  clickProductos() {
    this.route.navigate(['/productos']);
  }
  clickPerros() {
    this.route.navigate(['/adopciones/perros']);
  }
  clickGatos() {
    this.route.navigate(['/adopciones/gatos']);
  }
  clickOtros() {
    this.route.navigate(['/adopciones/otros']);
  }
  clickRegistro() {
    this.route.navigate(['/registro']);
  }
  clickInicioSesion() {
    this.route.navigate(['/registro/inicio-sesion']);
  }
  clickPerfil() {
    const usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
    const idUsuario = usuario.idUsuario;
    this.route.navigate(['/registro/mi-perfil'], {queryParams: {idUsuario: idUsuario}});
  }
  recibirUsuario() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario !== null) {
      this.usuarioIniciadoSesion = true;
      localStorage.setItem('usuarioIniciadoSesion', 'true');
    } else {
      this.usuarioIniciadoSesion = false;
      localStorage.setItem('usuarioIniciadoSesion', 'false');
    }
  }
  cerrarSesion() {
    localStorage.clear();
    console.log(this.route.url);
    const url = '/registro/mi-perfil?idUsuario=';
    if (this.route.url.includes(url)) {
      this.clickHome();
    } else {
      window.location.reload();
    }
  }
  clickCesta() {
    this.route.navigate(['/productos/cesta']);
  }
  recibirCesta() {
    this.cestaService.getItems();
    this.numProductos = this.cestaService.items.length;
  }
}

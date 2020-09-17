import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from './api-rest/models/Producto/producto.model';
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
  constructor(
    private route: Router,
    private cd: ChangeDetectorRef
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
    this.route.navigate(['/registro/mi-perfil']);
  }
  recibirCesta(event: any) {
    if (event.cesta !== undefined && event.cesta !== null && event.cesta !== []) {
      this.cesta = event.cesta;
      console.log(this.cesta);
    }
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
    window.location.reload();
  }
  clickCesta() {

  }
}

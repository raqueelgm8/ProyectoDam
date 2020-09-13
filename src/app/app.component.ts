import { Component, ChangeDetectorRef } from '@angular/core';
import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { Producto } from './components/pages/productos/productos.component';
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
  productos: Producto[] = [
    {id: '1', description: 'Pienso Pet shop 15 kg', precio: 19.99, tipoAnimal: 'Perro',
    imagen: 'https://cdn.pixabay.com/photo/2019/08/05/15/08/dog-4386211_960_720.png' , tipoProducto: 'Comida', nombre: 'Pienso adelgazador'},
    {id: '2', description: 'Producto 2', precio: 5, tipoAnimal: 'Todos',
    imagen: 'https://www.terranovacnc.com/wp-content/uploads/2020/05/the-company-of-animals-collar-halty-color-rojo-para-perros.jpg', tipoProducto: 'Accesorios', nombre: 'Collar rojo'},
    {id: '3', description: 'Bozal para perros', precio: 2, tipoAnimal: 'Perro',
    imagen: 'https://myanimals.com/es/wp-content/uploads/2015/11/bozal-para-perros.jpg' , tipoProducto: 'Accesorios', nombre: 'Bozal canino'},
  ];
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

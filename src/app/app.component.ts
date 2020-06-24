import { Component } from '@angular/core';
import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-web';
  navbarCollapsed = true;
  constructor(
    private route: Router,
  ) {
    // this.route.navigate(['/home']);
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
}

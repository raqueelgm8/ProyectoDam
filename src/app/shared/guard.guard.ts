import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Usuario } from '../api-rest/models/Usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  usuario: Usuario;
  constructor (private router: Router) {

  }
  canActivate(): boolean {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    if (this.usuario) {
      return true;
    } else {
      this.router.navigate(['/registro/inicio-sesion']);
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Usuario } from '../api-rest/models/Usuario/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  usuario: Usuario;
  constructor (private router: Router) {

  }
  canActivate(): boolean {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    if (this.usuario && this.usuario.idUsuario === 1) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}

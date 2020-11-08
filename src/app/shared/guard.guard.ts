import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { Usuario } from '../api-rest/models/Usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  usuario: Usuario;
  idUsuario: number;
  constructor(private router: Router, private activateRouter: ActivatedRoute) {
  }
  canActivate(): boolean {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.activateRouter.queryParams.subscribe(params => {
      if (params.idUsuario) {
        this.idUsuario = Number(params.idUsuario);
      }
    });
    if (this.usuario && (this.idUsuario === this.usuario.idUsuario || this.idUsuario === undefined)) {
      return true;
    } else {
      this.router.navigate(['/registro/inicio-sesion']);
      return false;
    }
  }
}

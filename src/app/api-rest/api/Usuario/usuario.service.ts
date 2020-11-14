import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/Usuario/usuario.model';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public httpClient: HttpClient
  ) { }
  async obtenerUsuarioPorId(id: number): Promise<Usuario> {
    return new Promise<Usuario>( async (resolve, reject) => {
      let usuario: Usuario;
      this.httpClient.get('/api/usuarios/' + id).subscribe((result) => {
        usuario = result as Usuario;
        resolve(usuario);
      }, error => {
        reject(error);
      });
    });
  }
  async obtenerTodosLosUsuarios(): Promise<Usuario[]> {
    return new Promise<Usuario[]>( async (resolve, reject) => {
      let usuarios: Usuario[];
      this.httpClient.get('/api/usuarios/usuarios').subscribe((result) => {
        usuarios = result as Usuario[];
        resolve(usuarios);
      }, error => {
        reject(error);
      });
    });
  }
  async obtenerUsuariosPorEmailPass(email: string, pass: string): Promise<Usuario[]> {
    return new Promise<Usuario[]>( async (resolve, reject) => {
      let usuarios: Usuario[];
      // getUsuarios/{email}/{pass}
      const ruta = '/api/usuarios/getUsuarios/' + email + '/' + pass;
      this.httpClient.get(ruta).subscribe((result) => {
        usuarios = result as Usuario[];
        resolve(usuarios);
      }, error => {
        reject(error);
      });
    });
  }
  async guardarUsuario(usuario: Usuario): Promise<Usuario> {
    return new Promise<Usuario>( async (resolve, reject) => {
      const ruta = '/api/usuarios/guardarUsuario/';
      this.httpClient.post(ruta, usuario).subscribe((result) => {
        usuario = result as Usuario;
        resolve(usuario);
      }, error => {
        reject(error);
      });
    });
  }
  async eliminarUsuario(idUsuario: number): Promise<string> {
    return new Promise<string>( async (resolve, reject) => {
      this.httpClient.delete('api/usuarios/eliminarUsuario/' + idUsuario).subscribe((result) => {
        Swal.fire('¡Éxito!', 'Usuario eliminado con éxito', 'success');
        resolve('El usuario se ha eliminado correctamente');
      }, error => {
        reject(error);
      });
    });
  }
  async editarUsuario(id: number, usuario: Usuario): Promise<Usuario> {
    return new Promise<Usuario>( async (resolve, reject) => {
      const ruta = '/api/usuarios/editarUsuario/' + id;
      this.httpClient.put(ruta, usuario).subscribe((result) => {
        usuario = result as Usuario;
        Swal.fire('¡Éxito!', 'Usuario editado con éxito', 'success');
        resolve(usuario);
      }, error => {
        reject(error);
      });
    });
  }
}

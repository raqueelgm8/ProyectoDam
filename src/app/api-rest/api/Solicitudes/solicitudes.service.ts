import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Solicitud } from '../../models/Solicitud/solicitud.model';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(
    public httpClient: HttpClient
  ) { }

  async obtenerSolicitudesPorIdUsuario(idUsuario: number): Promise<Solicitud[]> {
    return new Promise<Solicitud[]>( async (resolve, reject) => {
      this.httpClient.get('/api/solicitudes/obtenerSolicitudesIdUsuario/' + idUsuario).subscribe((result) => {
        resolve(result as Solicitud[]);
      }, error => {
        reject(error);
      });
    });
  }
  async obtenerSolicitudPorId(idUsuario: number, idSolicitud: number, idAnimal: number): Promise<Solicitud> {
    return new Promise<Solicitud>( async (resolve, reject) => {
      const ruta = '/api/solicitudes/obtenerSolicitudPorId/' + idUsuario + '/' + idSolicitud + '/' + idAnimal;
      this.httpClient.get(ruta).subscribe((result) => {
        resolve(result as Solicitud);
      }, error => {
        reject(error);
      });
    });
  }
  eliminarSolicitud(idUsuario: number, idSolicitud: number, idAnimal: number){
    const ruta = '/api/solicitudes/eliminarSolicitud/' + idUsuario + '/' + idSolicitud + '/' + idAnimal;
    this.httpClient.delete(ruta, ).subscribe((result) => {
      Swal.fire('¡Éxito!', 'Solicitud eliminada con éxito', 'success');
    }, error => {
      Swal.fire('¡ERROR!', error, 'error');
    });
  }
  async guardarSolicitud(solicitud: Solicitud): Promise<Solicitud> {
    return new Promise<Solicitud>( async (resolve, reject) => {
      const ruta = '/api/solicitudes/guardarSolicitud/';
      this.httpClient.post(ruta, solicitud).subscribe((result) => {
        resolve(result as Solicitud);
      }, error => {
        reject(error);
      });
    });
  }
  async editarSolicitud(solicitud: Solicitud): Promise<Solicitud> {
    console.log(solicitud);
    return new Promise<Solicitud>( async (resolve, reject) => {
      const ruta = '/api/solicitudes/editarSolicitud/';
      this.httpClient.put(ruta, solicitud).subscribe((result) => {
        resolve(result as Solicitud);
      }, error => {
        reject(error);
      });
    });
  }
  async obtenerTodasSolicitudes(): Promise<Solicitud[]> {
    return new Promise<Solicitud[]>( async (resolve, reject) => {
      let solicitudes: Solicitud[];
      this.httpClient.get('/api/solicitudes/solicitudes').subscribe((result) => {
        solicitudes = result as Solicitud[];
        resolve(solicitudes);
      }, error => {
        reject(error);
      });
    });
  }
}

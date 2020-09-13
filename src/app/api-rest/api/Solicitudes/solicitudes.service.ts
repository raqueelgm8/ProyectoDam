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
    // http://localhost:8080/api/solicitudes/eliminarSolicitud/1/1/1
    const ruta = '/api/solicitudes/eliminarSolicitud/' + idUsuario + '/' + idSolicitud + '/' + idAnimal;
    this.httpClient.delete(ruta, ).subscribe((result) => {
      Swal.fire('¡Éxito!', 'Solicitud eliminada con éxito', 'success');
    }, error => {
      Swal.fire('¡ERROR!', error, 'error');
    });
  }
}
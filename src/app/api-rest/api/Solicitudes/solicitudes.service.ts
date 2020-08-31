import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Solicitud } from '../../models/Solicitud/solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(
    public httpClient: HttpClient
  ) { }

  async obtenerSolicitudesPorIdUsuario(idUsuario: number): Promise<Solicitud[]> {
    return new Promise<Solicitud[]>( async (resolve, reject) => {
      this.httpClient.get('/api/solicitudes//obtenerSolicitudesIdUsuario/' + idUsuario).subscribe((result) => {
        resolve(result as Solicitud[]);
      }, error => {
        reject(error);
      });
    });
  }
}

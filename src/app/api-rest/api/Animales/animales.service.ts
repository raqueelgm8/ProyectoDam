import { Injectable } from '@angular/core';
import { Animal } from '../../models/Animal/animal.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OptionsGeneric } from '@popperjs/core';

@Injectable({
  providedIn: 'root'
})
export class AnimalesService {

  constructor(
    public httpClient: HttpClient
  ) { }

  async obtenerAnimalesTipo(tipo: string): Promise<Animal[]> {
    return new Promise<Animal[]>( async (resolve, reject) => {
      let animales: Animal[];
      this.httpClient.get('api/animales/getTiposAnimales/' + tipo).subscribe((result) => {
        animales = result as Animal[];
        resolve(animales);
      }, error => {
        reject(error);
      });
    });
  }
  async obtenerAnimalPorId(id: number): Promise<Animal> {
    return new Promise<Animal>( async (resolve, reject) => {
      let animal: Animal;
      this.httpClient.get('api/animales/getAnimalById/' + id).subscribe((result) => {
        animal = result as Animal;
        resolve(animal);
      }, error => {
        reject(error);
      });
    });
  }
  async buscarAnimales(tipoAnimal: string, animal: Animal): Promise<Animal[]> {
    return new Promise<Animal[]>( async (resolve, reject) => {
      let animales: Animal[];
      let ruta = 'api/animales/buscarAnimalFiltro/' + tipoAnimal + '?';
      if (animal.raza !== null) {
        ruta = ruta + '&raza=' + animal.raza;
      }
      if (animal.edad !== null) {
        ruta = ruta + '&edad=' + animal.edad;
      }
      if (animal.tipoEdad !== null) {
        ruta = ruta + '&tipoEdad=' + animal.tipoEdad;
      }
      if (animal.adoptado !== null) {
        ruta = ruta + '&adoptado=' + (animal.adoptado === true ? '0' : '1');
      }
      if (animal.sexo) {
        ruta = ruta + '&sexo=' + animal.sexo;
      }
      this.httpClient.get<Animal[]>(ruta).subscribe((result) => {
        animales = result;
        resolve(animales);
      }, error => {
        reject(error);
      });
    });
  }
}

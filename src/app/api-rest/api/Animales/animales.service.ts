import { Injectable } from '@angular/core';
import { Animal } from '../../models/Animal/animal.model';
import { HttpClient } from '@angular/common/http';

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
}

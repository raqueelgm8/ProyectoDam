import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Combo } from '../../models/Combo/combo.model';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  constructor(
    public httpClient: HttpClient
  ) { }

  async obtenerComboTipo(tipo: string): Promise<Combo[]> {
    return new Promise<Combo[]>( async (resolve, reject) => {
      let combo: Combo[];
      this.httpClient.get('api/combos/tipo/' + tipo).subscribe((result) => {
        combo = result as Combo[];
        resolve(combo);
      }, error => {
        reject(error);
      });
    });
  }
}

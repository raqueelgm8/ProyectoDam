import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  constructor(
    public sanitizer: DomSanitizer,
  ) {}

   convertirImagen(imagen: string) {
    const binaryString = window.atob(imagen);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    const blob = new Blob([bytes], { type: 'application/png'});
    const fileUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(fileUrl);
   }

  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  saveByteArray(reportName, byte) {
    const blob = new Blob([byte], { type: 'application/png'});
    const fileUrl = URL.createObjectURL(new Blob([byte] , {type:'text/plain'}));
    return fileUrl;
  }
  async cargarImagen(archivo: File): Promise<any> {
    return new Promise<any> ( async (resolve, reject) => {
      const documento: Array<string> = await this.fileReadContent(archivo);
      console.log(documento);
      resolve(documento);
    });
  }
  fileReadContent(event): Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject) => {
      if (!event) {
        resolve(null);
      }
      const file: File = event;
      const blob = file as Blob;
      const reader = new FileReader();
      const base64 = reader.readAsDataURL(blob);
      reader.onload = (ev) => {
        const arrayBuffer = reader.result.toString();
        const arrayString = arrayBuffer.toString().split(';')[1].split(',')[1];
        resolve([arrayString]);
      };
    });
  }
}

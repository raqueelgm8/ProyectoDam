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
    const fileUrl = URL.createObjectURL(blob);
    return fileUrl;
  }
}

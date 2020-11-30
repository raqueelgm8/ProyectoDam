import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AnimalesService } from 'src/app/api-rest/api/Animales/animales.service';
import { ArchivosService } from 'src/app/api-rest/api/Archivos/archivos.service';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
import { Animal } from 'src/app/api-rest/models/Animal/animal.model';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-animal-nuevo',
  templateUrl: './animal-nuevo.component.html',
  styleUrls: ['./animal-nuevo.component.css']
})
export class AnimalNuevoComponent implements OnInit {

  miFile: File;
  formAnimal: FormGroup;
  razaSeleccionada: Combo;
  comboRazas: Combo[];
  tiposAnimales = [
    {descripcion: 'Perro'}, {descripcion: 'Gato'}, {descripcion: 'Otro'}
  ];
  animalSeleccionado: any;
  tiposEdad = [
    {descripcion: 'Cachorro'}, {descripcion: 'Adulto'}, {descripcion: 'Joven'}
  ];
  tipoEdadSeleccionado: any;
  tipoSexo = [
    {descripcion: 'Macho'}, {descripcion: 'Hembra'}
  ];
  sexoSeleccionado: any;
  base64textString: string;
  idAnimal = null;
  modoEditar = false;
  modoVer = false;
  animal: Animal;
  imagenSrc: any;
  constructor(
    private fb: FormBuilder,
    private comboService: ComboService,
    private animalService: AnimalesService,
    private cd: ChangeDetectorRef,
    private location: Location,
    private route: ActivatedRoute,
    private combo: ComboService,
    public sanitizer: DomSanitizer,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.idAnimal) {
        this.idAnimal = Number(params.idAnimal);
      }
      if (params.modoEditar) {
        this.modoEditar = true;
      }
      if (params.modoVer) {
        this.modoVer = true;
      }
    });
  }

  ngOnInit(): void {
    this.iniciarGrupo();
    if (this.modoEditar || this.modoVer) {
      this.consultarAnimal(this.idAnimal);
    }
  }
  consultarAnimal(idAnimal: number) {
    this.animalService.obtenerAnimalPorId(idAnimal).then((result) => {
      this.animal = result as Animal;
      this.formAnimal.controls.nombre.setValue(result.nombre);
      this.formAnimal.controls.descripcion.setValue(result.descripcion);
      this.formAnimal.controls.raza.setValue(result.raza);
      this.formAnimal.controls.tipoAnimal.setValue(result.tipoAnimal);
      this.formAnimal.controls.edad.setValue(result.edad);
      if (result.archivoImagen) {
        this.base64textString = result.archivoImagen;
      } else {
        this.base64textString = result.imagen;
      }
      this.animalSeleccionado = { descripcion: result.tipoAnimal};
      this.formAnimal.controls.sexo.setValue(result.sexo === 'H' ? 'Hembra' : 'Macho');
      this.sexoSeleccionado = {descripcion: this.formAnimal.controls.sexo.value};
      this.formAnimal.controls.tipoEdad.setValue(result.tipoEdad);
      this.tipoEdadSeleccionado = {descripcion: this.formAnimal.controls.tipoEdad.value};
      if (this.modoVer) {
        this.formAnimal.disable();
      }
      this.combo.obtenerComboTipo(result.tipoAnimal).then((combo) => {
        this.comboRazas = [...combo];
        this.razaSeleccionada = this.comboRazas.find(element => element.descripcion === result.raza);
        this.cd.detectChanges();
      });
      const binaryString = window.atob(result.imagen);
      const binaryLen = binaryString.length;
      const bytes = new Uint8Array(binaryLen);
      for (let i = 0; i < binaryLen; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      const blob = new Blob([bytes], { type: 'application/png'});
      const fileUrl = URL.createObjectURL(blob);
      result.imagenSrc = this.sanitizer.bypassSecurityTrustUrl(fileUrl);
      this.animal = result as Animal;
      this.imagenSrc = result.imagenSrc;
    });
  }
  iniciarGrupo() {
    this.formAnimal = this.fb.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      raza: [null, [Validators.required]],
      tipoAnimal: [null, [Validators.required]],
      tipoEdad: [null, [Validators.required]],
      edad: [null, [Validators.required, Validators.compose([Validators.min(0), Validators.max(50)])]],
      imagen: null,
      sexo: [null, [Validators.required]],
    });

  }
  cargarComboRazas() {
    const tipo = this.animalSeleccionado.descripcion;
    this.comboService.obtenerComboTipo(tipo).then((result) => {
      this.comboRazas = [...result];
      this.cd.detectChanges();
    });
  }
  guardarAnimal() {
    if (this.formAnimal.invalid || (this.base64textString === null || this.base64textString === undefined )) {
      Swal.fire('ERROR!', 'Debe de rellenar todos los campos', 'error');
    } else {
      const animal: Animal = {
        idAnimal: this.idAnimal,
        adoptado: false,
        descripcion: this.formAnimal.controls.descripcion.value,
        edad: Number(this.formAnimal.controls.edad.value),
        imagen: null,
        nombre: this.formAnimal.controls.nombre.value,
        raza: this.razaSeleccionada !== undefined && this.razaSeleccionada !== null ? this.razaSeleccionada.descripcion : this.animal.raza,
        sexo: this.sexoSeleccionado.descripcion[0],
        tipoAnimal: this.animalSeleccionado.descripcion,
        tipoEdad: this.tipoEdadSeleccionado.descripcion,
        archivoImagen: this.base64textString
      };
      this.animalService.crearAnimal(animal).then((result) => {
        Swal.fire('¡ÉXITO!', '¡Animal guardado con éxito!', 'success');
      }, error => {
        Swal.fire('ERROR!', 'Error', 'error');
      });
    }
  }
  volver() {
    this.location.back();
  }
  onFileChange(event) {
    this.miFile = event.target.files[0];
    const me = this;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.base64textString = reader.result.toString();
      var splitted = me.base64textString.split(',', 3);
      const binaryString = window.atob(splitted[1]);
      const binaryLen = binaryString.length;
      const bytes = new Uint8Array(binaryLen);
      for (let i = 0; i < binaryLen; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      const blob = new Blob([bytes], { type: 'application/png'});
      const fileUrl = URL.createObjectURL(blob);
      me.imagenSrc = me.sanitizer.bypassSecurityTrustUrl(fileUrl);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
   }
  // arrastrar imagenes
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.miFile = files[0];
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.base64textString = null;
  }

  /**
   * Simulate the upload process
   */
  /*uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }*/

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    // this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals?) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(
    private fb: FormBuilder,
    private comboService: ComboService,
    private animalService: AnimalesService,
    private cd: ChangeDetectorRef,
    private _archivosService: ArchivosService
  ) { }

  ngOnInit(): void {
    this.iniciarGrupo();
  }
  iniciarGrupo() {
    this.formAnimal = this.fb.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      raza: [null, [Validators.required]],
      tipoAnimal: [null, [Validators.required]],
      tipoEdad: [null, [Validators.required]],
      edad: [null, [Validators.required, Validators.compose([Validators.min(0), Validators.max(50)])]],
      imagen: [null, [Validators.required]],
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
    /*if (this.formAnimal.invalid) {
      Swal.fire('ERROR!', 'Debe de rellenar todos los campos', 'error');
    } else {*/
      const file: File = this.formAnimal.controls.imagen.value as File;
      this._archivosService.cargarImagen(this.miFile).then((resultado) => {
        console.log(resultado);
        const animal: Animal = {
          idAnimal: null,
          adoptado: false,
          descripcion: this.formAnimal.controls.descripcion.value,
          edad: Number(this.formAnimal.controls.edad.value),
          imagen: resultado,
          nombre: this.formAnimal.controls.nombre.value,
          raza: this.razaSeleccionada.descripcion,
          sexo: this.sexoSeleccionado.descripcion[0],
          tipoAnimal: this.animalSeleccionado.descripcion,
          tipoEdad: this.tipoEdadSeleccionado.descripcion
        };
        console.log(animal);
        this.animalService.crearAnimal(animal).then((result) => {
          Swal.fire({
            title: '¡El registro se ha realizado con éxito!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ir a mi perfil!'
          }).then((mensaje) => {
            if (mensaje.value) {
              Swal.fire('¡ÉXITO!', '¡Animal guardado con éxito!', 'success');
            }
          });
        }, error => {
          Swal.fire('ERROR!', 'Error', 'error');
        });
      });
    // }
  }
  onFileChange(event) {
    //this.mifile = event;
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

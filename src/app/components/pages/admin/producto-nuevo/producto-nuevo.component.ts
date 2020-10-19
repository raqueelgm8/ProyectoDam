import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArchivosService } from 'src/app/api-rest/api/Archivos/archivos.service';
import { ProductosService } from 'src/app/api-rest/api/Productos/productos.service';
import { Producto } from 'src/app/api-rest/models/Producto/producto.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.css']
})
export class ProductoNuevoComponent implements OnInit {

  formProducto: FormGroup;
  tiposAnimales = [
    {descripcion: 'Perro'}, {descripcion: 'Gato'}, {descripcion: 'Otro'}
  ];
  animalSeleccionado: any;
  categoriaSeleccionada: any;
  categorias = [
    {descripcion: 'Juguetes'}, {descripcion: 'Accesorios'}, {descripcion: 'Cuidado'}
  ];
  miFile: File;
  base64textString: string;
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private archivosService: ArchivosService,
    private productosService: ProductosService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.iniciarGrupo();
  }
  iniciarGrupo() {
    this.formProducto  = this.fb.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      precio: [null, [Validators.required, Validators.compose([Validators.min(0)])]],
      stock: [null, [Validators.required, Validators.compose([Validators.min(0)])]],
      categoria: [null, [Validators.required]],
      tipoAnimal: [null, [Validators.required]],
      imagen: [null, [Validators.required]],
    });
  }
  guardarProducto() {
    if (this.formProducto.invalid) {
      Swal.fire('ERROR!', 'Debe de rellenar todos los campos', 'error');
    } else {
      const producto: Producto = {
        categoria: this.categoriaSeleccionada.descripcion,
        descripcion: this.formProducto.controls.descripcion.value,
        idProducto: 1,
        nombre: this.formProducto.controls.nombre.value,
        precio: Number(this.formProducto.controls.precio.value),
        stock: Number(this.formProducto.controls.stock.value),
        tipoAnimal: this.animalSeleccionado.descripcion,
        imagen: null,
        archivoImagen: this.base64textString
      };
      this.productosService.crearProducto(producto).then((result) => {
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

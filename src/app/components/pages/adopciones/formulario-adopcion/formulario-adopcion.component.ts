import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Perro } from '../perros/perros.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPrivacidadComponent } from './modal-privacidad/modal-privacidad.component';
import * as R from 'ramda';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { AnimalesService } from 'src/app/api-rest/api/Animales/animales.service';
import { Animal } from 'src/app/api-rest/models/Animal/animal.model';
import { Solicitud } from 'src/app/api-rest/models/Solicitud/solicitud.model';
@Component({
  selector: 'app-formulario-adopcion',
  templateUrl: './formulario-adopcion.component.html',
  styleUrls: ['./formulario-adopcion.component.css']
})
export class FormularioAdopcionComponent implements OnInit {

  animal: Animal;
  formAdopcion: FormGroup;
  privacidad = false;
  idAnimal: number;
  nombreAnimal: string;
  animalSrc: string;
  idUsuario: number;
  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    private modal: NgbModal,
    public router: Router,
    public sanitizer: DomSanitizer,
    private animalesService: AnimalesService
  ) {
    this.route.queryParams.subscribe(params => {
      this.idAnimal = Number(params.animalId);
    });
   }

  ngOnInit() {
    this.iniciarGrupoAdopcion();
    this.consultarAnimal(this.idAnimal);
  }
  iniciarGrupoAdopcion() {
    this.formAdopcion = this.fb.group({
      nombre: null,
      apellidos: null,
      direccion: null,
      poblacion: null,
      codPostal: null,
      telefonoMovil: null,
      razon: null,
      mascotas: null,
      terraza: null,
      jardin: null,
      horarioTrabajo: null,
      miembrosFamilia: null,
      politicaPrivacidad: null,
    });
  }
  abrirModal() {
    const modalRef = this.modal.open(ModalPrivacidadComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.result.then((result) => {
      if (!R.isNil(result)) {
        if (result === true) {
          this.privacidad = true;
        } else {
          this.privacidad = false;
        }
      }
    });
  }
  cambiarCheck() {
    this.privacidad = this.privacidad ? false : true;
  }
  clickEnviar() {
    const solicitud: Solicitud = {
      estado: 'Pendiente',
      horarioTrabajo: this.formAdopcion.controls.horarioTrabajo.value,
      jardin: this.formAdopcion.controls.jardin.value,
      mascotasCasa: this.formAdopcion.controls.mascotas.value,
      miembrosFamilia: this.formAdopcion.controls.miembrosFamilia.value,
      nombreAnimal: this.nombreAnimal,
      razonAdopcion: this.formAdopcion.controls.razon.value,
      terraza: this.formAdopcion.controls.terraza.value,
      tipoAnimal: this.animal.tipoAnimal,
      id: {
        idAnimal: this.idAnimal,
        idUsuario: this.idUsuario,
        idSolicitud: 0
      }
    };
    console.log(solicitud);
    /*
    ombre: null,
      apellidos: null,
      direccion: null,
      poblacion: null,
      codPostal: null,
      telefonoMovil: null,
      politicaPrivacidad: null,
    */
    Swal.fire('¡Éxito!', 'Solicitud enviada correctamente', 'success');
  }
  consultarAnimal(idAnimal: number) {
    this.animalesService.obtenerAnimalPorId(idAnimal).then((result) => {
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
      this.nombreAnimal = this.animal.nombre;
      this.animalSrc = this.animal.imagenSrc;
    });
  }
}

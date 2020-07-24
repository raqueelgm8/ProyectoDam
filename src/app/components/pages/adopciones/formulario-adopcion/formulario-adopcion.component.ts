import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Perro } from '../perros/perros.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPrivacidadComponent } from './modal-privacidad/modal-privacidad.component';
import * as R from 'ramda';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-formulario-adopcion',
  templateUrl: './formulario-adopcion.component.html',
  styleUrls: ['./formulario-adopcion.component.css']
})
export class FormularioAdopcionComponent implements OnInit {

  animal: Perro;
  formAdopcion: FormGroup;
  privacidad = false;

  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    private modal: NgbModal
  ) {
    this.route.queryParams.subscribe(params => {
      this.animal = JSON.parse(params.animal);
    });
   }

  ngOnInit(): void {
    this.iniciarGrupoAdopcion();
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
        console.log(result);
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
    Swal.fire('¡Éxito!', 'Solicitud enviada correctamente', 'success');
  }
}

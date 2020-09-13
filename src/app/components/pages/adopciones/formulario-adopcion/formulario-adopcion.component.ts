import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { Usuario } from 'src/app/api-rest/models/Usuario/usuario.model';
import { SolicitudesService } from 'src/app/api-rest/api/Solicitudes/solicitudes.service';
import { UsuarioService } from 'src/app/api-rest/api/Usuario/usuario.service';
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
  idSolicitud: number;
  modoConsulta = false;
  usuario: Usuario;
  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    private modal: NgbModal,
    public router: Router,
    public sanitizer: DomSanitizer,
    private animalesService: AnimalesService,
    private solicitudService: SolicitudesService,
    private usuariosService: UsuarioService
  ) {
    this.route.queryParams.subscribe(params => {
      this.idAnimal = Number(params.animalId);
      if (params.modoConsulta === 'consulta') {
        this.modoConsulta = true;
        const usuario: Usuario = JSON.parse( localStorage.getItem('usuario'));
        this.idUsuario = usuario.idUsuario;
        this.idSolicitud = Number(params.idSolicitud);
      }
    });
   }

  ngOnInit() {
    this.iniciarGrupoAdopcion();
    this.consultarAnimal(this.idAnimal);
    this.consultarUsuario();
    if (this.modoConsulta) {
      this.consultarSolicitud();
      this.formAdopcion.disable();
    }
  }
  iniciarGrupoAdopcion() {
    this.formAdopcion = this.fb.group({
      nombre: [{ value: null, disabled: true }, { validators: Validators.compose([Validators.required]) }],
      apellidos: [{ value: null, disabled: true }, { validators: Validators.compose([Validators.required]) }],
      direccion: [{ value: null, disabled: true }, { validators: Validators.compose([Validators.required]) }],
      // poblacion: null,
      codPostal: [{ value: null, disabled: true }, { validators: Validators.compose([Validators.required]) }],
      telefonoMovil: [{ value: null, disabled: true }, { validators: Validators.compose([Validators.required]) }],
      razon: [{ value: null, disabled: false }, { validators: Validators.compose([Validators.required]) }],
      mascotas: [{ value: null, disabled: false }, { validators: Validators.compose([Validators.required]) }],
      terraza: [{ value: null, disabled: false }, { validators: Validators.compose([Validators.required]) }],
      jardin: [{ value: null, disabled: false }, { validators: Validators.compose([Validators.required]) }],
      horarioTrabajo: [{ value: null, disabled: false }, { validators: Validators.compose([Validators.required]) }],
      miembrosFamilia: [{ value: null, disabled: false }, { validators: Validators.compose([Validators.required]) }],
      politicaPrivacidad: [{ value: null, disabled: false }, { validators: Validators.compose([Validators.required]) }]
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
      jardin: this.formAdopcion.controls.jardin.value,
      mascotasCasa: this.formAdopcion.controls.mascotas.value,
      miembrosfamilia: this.formAdopcion.controls.miembrosFamilia.value,
      nombreAnimal: this.nombreAnimal,
      razonAdopcion: this.formAdopcion.controls.razon.value,
      terraza: this.formAdopcion.controls.terraza.value,
      tipoAnimal: this.animal.tipoAnimal,
      id: {
        idAnimal: this.idAnimal,
        idUsuario: this.idUsuario,
        idSolicitud: null
      },
      horariotrabajo: this.formAdopcion.controls.horarioTrabajo.value,
    };
    console.log(solicitud);
    if (this.formAdopcion.invalid) {
      Swal.fire('ERROR!', 'Debe de rellenar todos los campos', 'error');
    } else {
      this.solicitudService.guardarSolicitud(solicitud).then((result) => {
      Swal.fire('¡Éxito!', 'Solicitud enviada correctamente', 'success');
      this.router.navigate(['/registro/mi-perfil'], {queryParams: {
        idUsuario: this.idUsuario
      }});
      }, error => {
        Swal.fire('¡ERROR!', error, 'error');
      });
    }

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
    }, error => {
      Swal.fire('¡ERROR!', error, 'error');
    });
  }
  // Consultar solicitud
  consultarSolicitud() {
    this.solicitudService.obtenerSolicitudPorId(this.idUsuario, this.idSolicitud, this.idAnimal).then((result) => {
      this.formAdopcion = this.fb.group({
        nombre: null,
        apellidos: null,
        direccion: null,
        // poblacion: null,
        codPostal: null,
        telefonoMovil: null,
        razon: result.razonAdopcion,
        mascotas: result.mascotasCasa === 0 ? '0' : '1',
        terraza: result.terraza === 0 ? '0' : '1',
        jardin: result.jardin === 0 ? '0' : '1',
        horarioTrabajo: result.horariotrabajo,
        miembrosFamilia: result.miembrosfamilia,
        politicaPrivacidad: true,
      });
    });
  }
  consultarUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(this.usuario);
    this.idUsuario = this.usuario.idUsuario;
    this.formAdopcion.controls.nombre.setValue(this.usuario.nombre);
    this.formAdopcion.controls.apellidos.setValue(this.usuario.apellidos);
    this.formAdopcion.controls.direccion.setValue(this.usuario.direccion);
    this.formAdopcion.controls.codPostal.setValue(this.usuario.codigoPostal);
    this.formAdopcion.controls.telefonoMovil.setValue(this.usuario.telefono);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudesService } from 'src/app/api-rest/api/Solicitudes/solicitudes.service';
import { Solicitud } from 'src/app/api-rest/models/Solicitud/solicitud.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-estado-solicitud',
  templateUrl: './cambiar-estado-solicitud.component.html',
  styleUrls: ['./cambiar-estado-solicitud.component.css']
})
export class CambiarEstadoSolicitudComponent implements OnInit {

  formCambioEstado: FormGroup;
  tipoEstados = [
    {descripcion: 'Pendiente'}, {descripcion: 'Aceptada'}, {descripcion: 'Denegada'}
  ];
  estadoSeleccionado: any;
  @Input() idSolicitud: number;
  @Input() idUsuario: number;
  @Input() idAnimal: number;
  solicitud: Solicitud;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private solicitudService: SolicitudesService
  ) {
  }

  ngOnInit(): void {
    this.iniciarGrupo();
    if (this.idUsuario && this.idSolicitud && this.idAnimal) {
      this.consultarSolicitud();
    }
  }
  consultarSolicitud() {
    this.solicitudService.obtenerSolicitudPorId(this.idSolicitud).then((result) => {
      this.solicitud = result;
      this.formCambioEstado.controls.cambioEstado.setValue(result.estado);
      this.estadoSeleccionado = { descripcion: result.estado };
    });
  }
  iniciarGrupo() {
    this.formCambioEstado = this.fb.group({
      cambioEstado: [null, [Validators.required]],
    });
  }
  cancelar() {
    this.modal.close();
  }
  guardar() {
    this.solicitudService.editarEstadoSolicitud(this.idSolicitud, this.estadoSeleccionado.descripcion).then((result) => {
      Swal.fire('¡ÉXITO!', 'Solicitud editada con éxito!', 'success');
      this.modal.close(true);
    }, error => {
      Swal.fire('ERROR!', 'Error', 'error');
    });
  }
}

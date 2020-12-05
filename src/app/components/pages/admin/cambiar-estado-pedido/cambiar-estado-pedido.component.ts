import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidosService } from 'src/app/api-rest/api/Pedidos/pedidos.service';
import { Pedido } from 'src/app/api-rest/models/Pedido/pedido.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cambiar-estado-pedido',
  templateUrl: './cambiar-estado-pedido.component.html',
  styleUrls: ['./cambiar-estado-pedido.component.css']
})
export class CambiarEstadoPedidoComponent implements OnInit {

  formCambioEstado: FormGroup;
  tipoEstados = [
    {descripcion: 'En tránsito'}, {descripcion: 'Enviado'}, {descripcion: 'En reparto'}, {descripcion: 'Incidencia'},
    {descripcion: 'Entregado'}
  ];
  estadoSeleccionado: any;
  @Input() idPedido: number;
  @Input() idUsuario: number;
  pedido: Pedido;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private pedidoService: PedidosService,
    public modal: NgbActiveModal,
  ) {
  }

  ngOnInit(): void {
    this.iniciarGrupo();
    if (this.idUsuario && this.idPedido) {
      this.consultarPedido();
    }
  }
  consultarPedido() {
    this.pedidoService.obtenerPedidoPorId(this.idPedido).then((result) => {
      this.pedido = result;
      this.formCambioEstado.controls.cambioEstado.setValue(result.estadoPedido);
      this.estadoSeleccionado = { descripcion: result.estadoPedido };
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
    this.pedidoService.editarEstadoPedido(this.idPedido, this.estadoSeleccionado.descripcion).then((result) => {
      Swal.fire('¡ÉXITO!', 'Pedido editado con éxito!', 'success');
      this.modal.close(true);
    }, error => {
      Swal.fire('ERROR!', 'Error', 'error');
    });
  }
}

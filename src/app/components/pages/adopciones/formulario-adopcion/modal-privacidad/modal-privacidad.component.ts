import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-privacidad',
  templateUrl: './modal-privacidad.component.html',
  styleUrls: ['./modal-privacidad.component.css']
})
export class ModalPrivacidadComponent implements OnInit {

  constructor(
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }
  clickAceptar(resultado: boolean) {
    this.modal.close(resultado);
  }
}

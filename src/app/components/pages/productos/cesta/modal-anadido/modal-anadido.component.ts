import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-anadido',
  templateUrl: './modal-anadido.component.html',
  styleUrls: ['./modal-anadido.component.css']
})
export class ModalAnadidoComponent implements OnInit {
  @Input() nombre: string;
  constructor(
    private modal: NgbActiveModal,
    private route: Router
  ) { }

  ngOnInit(): void {
  }
  clickAceptar() {
    this.modal.close();
  }
  clickCesta() {
    this.modal.close('cesta');
  }
}

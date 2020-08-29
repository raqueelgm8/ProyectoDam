import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Combo } from 'src/app/api-rest/models/Combo/combo.model';
import { ComboService } from 'src/app/api-rest/api/Combo/combo.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegistro: FormGroup;
  comboProvincias: Combo[];
  constructor(
    public fb: FormBuilder,
    public combo: ComboService
  ) { }

  ngOnInit() {
    this.iniciarForm();
    this.recuperarCombos();
  }
  recuperarCombos() {
    this.combo.obtenerComboTipo('Provincia').then((result) => {
      this.comboProvincias = result;
    });
  }
  iniciarForm() {
    this.formRegistro = this.fb.group({
      nombre: null,
      email: null,
      usuario: null,
      pass1: null,
      pass2: null,
      sexo: null,
      apellidos: null,
      provincia: null,
      dni: null,
      edad: null,
      direccion: null,
      codigoPostal: null,
      telefono: null
    });
  }
  registrarse() {
    Swal.fire('¡Éxito!', 'Registro realizado correctamente', 'success');
  }
}

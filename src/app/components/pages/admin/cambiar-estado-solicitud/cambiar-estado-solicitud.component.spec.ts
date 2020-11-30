import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarEstadoSolicitudComponent } from './cambiar-estado-solicitud.component';

describe('CambiarEstadoSolicitudComponent', () => {
  let component: CambiarEstadoSolicitudComponent;
  let fixture: ComponentFixture<CambiarEstadoSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarEstadoSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarEstadoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

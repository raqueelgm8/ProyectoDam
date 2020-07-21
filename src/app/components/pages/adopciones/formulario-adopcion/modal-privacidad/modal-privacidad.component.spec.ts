import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPrivacidadComponent } from './modal-privacidad.component';

describe('ModalPrivacidadComponent', () => {
  let component: ModalPrivacidadComponent;
  let fixture: ComponentFixture<ModalPrivacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPrivacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

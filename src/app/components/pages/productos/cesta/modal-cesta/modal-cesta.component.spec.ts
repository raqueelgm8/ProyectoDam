import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCestaComponent } from './modal-cesta.component';

describe('ModalCestaComponent', () => {
  let component: ModalCestaComponent;
  let fixture: ComponentFixture<ModalCestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

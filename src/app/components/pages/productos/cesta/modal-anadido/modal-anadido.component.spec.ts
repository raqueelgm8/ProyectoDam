import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnadidoComponent } from './modal-anadido.component';

describe('ModalAnadidoComponent', () => {
  let component: ModalAnadidoComponent;
  let fixture: ComponentFixture<ModalAnadidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAnadidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAnadidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopcionesComponent } from './adopciones.component';

describe('AdopcionesComponent', () => {
  let component: AdopcionesComponent;
  let fixture: ComponentFixture<AdopcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalNuevoComponent } from './animal-nuevo.component';

describe('AnimalNuevoComponent', () => {
  let component: AnimalNuevoComponent;
  let fixture: ComponentFixture<AnimalNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCestaComponent } from './dropdown-cesta.component';

describe('DropdownCestaComponent', () => {
  let component: DropdownCestaComponent;
  let fixture: ComponentFixture<DropdownCestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownCestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownCestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

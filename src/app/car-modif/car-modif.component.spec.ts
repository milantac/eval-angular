import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModifComponent } from './car-modif.component';

describe('CarModifComponent', () => {
  let component: CarModifComponent;
  let fixture: ComponentFixture<CarModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

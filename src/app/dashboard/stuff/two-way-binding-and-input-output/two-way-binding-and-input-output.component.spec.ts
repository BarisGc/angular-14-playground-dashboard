import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayBindingAndInputOutputComponent } from './two-way-binding-and-input-output.component';

describe('TwoWayBindingAndInputOutputComponent', () => {
  let component: TwoWayBindingAndInputOutputComponent;
  let fixture: ComponentFixture<TwoWayBindingAndInputOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoWayBindingAndInputOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoWayBindingAndInputOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

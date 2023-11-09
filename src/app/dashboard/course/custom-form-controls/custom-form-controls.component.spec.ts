import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormControlsComponent } from './custom-form-controls.component';

describe('CustomFormControlsComponent', () => {
  let component: CustomFormControlsComponent;
  let fixture: ComponentFixture<CustomFormControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFormControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

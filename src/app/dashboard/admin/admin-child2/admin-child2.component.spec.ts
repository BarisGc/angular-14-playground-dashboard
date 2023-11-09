import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChild2Component } from './admin-child2.component';

describe('AdminChild2Component', () => {
  let component: AdminChild2Component;
  let fixture: ComponentFixture<AdminChild2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChild2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

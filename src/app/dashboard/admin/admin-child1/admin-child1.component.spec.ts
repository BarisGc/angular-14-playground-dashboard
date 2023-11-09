import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChild1Component } from './admin-child1.component';

describe('AdminChild1Component', () => {
  let component: AdminChild1Component;
  let fixture: ComponentFixture<AdminChild1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChild1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChild1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

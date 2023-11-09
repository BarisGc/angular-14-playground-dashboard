import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChild1Grandchild1Component } from './admin-child1-grandchild1.component';

describe('AdminChild1Grandchild1Component', () => {
  let component: AdminChild1Grandchild1Component;
  let fixture: ComponentFixture<AdminChild1Grandchild1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChild1Grandchild1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChild1Grandchild1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

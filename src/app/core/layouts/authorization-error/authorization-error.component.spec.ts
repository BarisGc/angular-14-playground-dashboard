import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationErrorComponent } from './authorization-error.component';

describe('AuthorizationErrorComponent', () => {
  let component: AuthorizationErrorComponent;
  let fixture: ComponentFixture<AuthorizationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

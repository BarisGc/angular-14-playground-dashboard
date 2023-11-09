import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTestPracticeComponent } from './angular-test-practice.component';

describe('AngularTestPracticeComponent', () => {
  let component: AngularTestPracticeComponent;
  let fixture: ComponentFixture<AngularTestPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularTestPracticeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularTestPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // pending()
    // fail()
    console.log('AngularTestPracticeComponent truthy test');

    expect(component).toBeTruthy();
  });
});

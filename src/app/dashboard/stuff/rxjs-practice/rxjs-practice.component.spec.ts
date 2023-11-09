import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsPracticeComponent } from './rxjs-practice.component';

describe('RxjsPracticeComponent', () => {
  let component: RxjsPracticeComponent;
  let fixture: ComponentFixture<RxjsPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsPracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

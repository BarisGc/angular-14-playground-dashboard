import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsAndTsPracticeComponent } from './js-and-ts-practice.component';

describe('JsAndTsPracticeComponent', () => {
  let component: JsAndTsPracticeComponent;
  let fixture: ComponentFixture<JsAndTsPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsAndTsPracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsAndTsPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

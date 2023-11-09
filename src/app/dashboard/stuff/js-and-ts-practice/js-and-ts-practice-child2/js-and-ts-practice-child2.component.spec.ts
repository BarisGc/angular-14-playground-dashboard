import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsAndTsPracticeChild2Component } from './js-and-ts-practice-child2.component';

describe('JsAndTsPracticeChild2Component', () => {
  let component: JsAndTsPracticeChild2Component;
  let fixture: ComponentFixture<JsAndTsPracticeChild2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsAndTsPracticeChild2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsAndTsPracticeChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

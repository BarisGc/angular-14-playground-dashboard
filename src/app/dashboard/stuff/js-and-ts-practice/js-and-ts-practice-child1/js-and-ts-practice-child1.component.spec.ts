import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsAndTsPracticeChild1Component } from './js-and-ts-practice-child1.component';

describe('JsAndTsPracticeChild1Component', () => {
  let component: JsAndTsPracticeChild1Component;
  let fixture: ComponentFixture<JsAndTsPracticeChild1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsAndTsPracticeChild1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsAndTsPracticeChild1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

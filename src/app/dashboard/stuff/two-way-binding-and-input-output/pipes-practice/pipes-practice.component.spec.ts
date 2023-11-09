import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesPracticeComponent } from './pipes-practice.component';

describe('PipesPracticeComponent', () => {
  let component: PipesPracticeComponent;
  let fixture: ComponentFixture<PipesPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipesPracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipesPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

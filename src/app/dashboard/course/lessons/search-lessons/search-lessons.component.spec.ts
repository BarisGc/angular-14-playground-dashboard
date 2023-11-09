import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLessonsComponent } from './search-lessons.component';

describe('SearchLessonsComponent', () => {
  let component: SearchLessonsComponent;
  let fixture: ComponentFixture<SearchLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchLessonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

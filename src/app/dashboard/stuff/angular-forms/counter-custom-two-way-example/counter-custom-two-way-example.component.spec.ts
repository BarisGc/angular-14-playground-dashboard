import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterCustomTwoWayExampleComponent } from './counter-custom-two-way-example.component';

describe('CounterCustomTwoWayExampleComponent', () => {
  let component: CounterCustomTwoWayExampleComponent;
  let fixture: ComponentFixture<CounterCustomTwoWayExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterCustomTwoWayExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterCustomTwoWayExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

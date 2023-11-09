import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEasyBoxComponent } from './my-easy-box.component';

describe('MyEasyBoxComponent', () => {
  let component: MyEasyBoxComponent;
  let fixture: ComponentFixture<MyEasyBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEasyBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyEasyBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

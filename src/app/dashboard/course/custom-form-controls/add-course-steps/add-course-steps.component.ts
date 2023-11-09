import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-add-course-steps',
  templateUrl: './add-course-steps.component.html',
  styleUrls: ['./add-course-steps.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AddCourseStepsComponent implements OnInit {
  @ViewChild('step2') step2: any;
  @ViewChild('stepper') stepper!: MatStepper;
  constructor() {}

  ngOnInit(): void {}
  validityCheckByNextStep() {
    this.step2.form.controls.thumbnail.touched = true;
  }

  submit(step1: any, step2: any, step3: any) {
    console.log('submit', step1, step2, step3);
  }


}

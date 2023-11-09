import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AddCourseStepsComponent } from './add-course-steps/add-course-steps.component';

@Component({
  selector: 'app-custom-form-controls',
  templateUrl: './custom-form-controls.component.html',
  styleUrls: ['./custom-form-controls.component.scss'],
})
export class CustomFormControlsComponent implements OnInit {
  @ViewChild(AddCourseStepsComponent)
  addCourseStepsComponent!: AddCourseStepsComponent;
  constructor() {}

  //pendingchanges
  @HostListener('window:beforeunload', ['$event'])
  canReload(e: any) {
    if (!this.hasUnsavedChanges()) e.returnValue = true;
  }

  hasUnsavedChanges() {
    if (!this.areAllStepsDirty()) {
      return true;
    }
    return false;
  }

  areAllStepsDirty() {
    let steps = this.addCourseStepsComponent.stepper.steps;
    let anyStepDirty = false;
    let counter = 0;
    for (const step of steps) {
      // note: step geçisi olursa kaydediyor
      // if (step.interacted) {
      //   allStepsDirty = true;
      //   break;
      // }
      // note: step2 default olarak dirty yaptığım için deactivate false döner
      // if(step.stepControl.dirty) { tüm stepleri kontrol eder
      if (steps.first.stepControl.dirty) { // sadece step1'i kontrol eder(test amaçlı)
        anyStepDirty = true;
        break;
      }
    }

    return anyStepDirty;
  }

  ngOnInit(): void {}
}

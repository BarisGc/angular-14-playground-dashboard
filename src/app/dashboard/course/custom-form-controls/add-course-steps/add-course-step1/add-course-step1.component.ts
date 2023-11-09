import { filter, map, Observable, Subscription } from 'rxjs';
import { CourseCategory } from './model/course-category';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormControlDirective,
  FormGroupDirective,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { conditionalValidator } from 'src/app/validators/conditionalValidator';
import { CoursesService } from '../../../services/courses.service';
import { courseTitleValidator } from 'src/app/validators/course-title.validator';

/**
 * This component is step 1 form to be used to add a new course
 *
 * Keywords: reactive forms, asyncValidator, conditionalValidator, pitfall
 *
 */

@UntilDestroy()
@Component({
  selector: 'app-add-course-step1',
  templateUrl: './add-course-step1.component.html',
  styleUrls: ['./add-course-step1.component.scss'],
})
export class AddCourseStep1Component implements OnInit, OnDestroy {
  // pitfall: defining type here as formGroup is a pitfall so form value assignments should be handled here, not in the onInit
  form = this.formBuilder.group({
    title: [
      '',
      {
        validators: [
          // note: all validation errors are shown at the same time if the validation rules are violated
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
          // Validators.pattern(/.+@.+\..+/),
        ],
        asyncValidators: [courseTitleValidator(this.coursesService)],
        updateOn: 'blur',
      },
    ],
    setDate: [false],
    releasedAt: [
      '',
      [
        conditionalValidator(
          (): any => this.form.get('setDate')?.value,
          Validators.required,
          'releasedAtMandatoryError'
        ),
      ],
    ],
    category: ['BEGINNER', [Validators.required]],
    downloadsAllowed: [
      false,
      {
        validators: [Validators.requiredTrue],
      },
    ],
    longDescription: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      },
    ],
    address: [null, [Validators.required]],
    noCvaAddress: this.formBuilder.group({
      street: [null, [Validators.required]],
      number: [null, [Validators.required]],
      postal: [null, [Validators.required]],
      company: [null],
    }),
    basicInfo: this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      age: [null, [Validators.required]],
    }),
    colors: this.formBuilder.array(['red', 'green', 'blue']),
  });

  // getters of formControls
  get _title() {
    return this.form.get('title') as FormControl;
  }
  get _setDate() {
    return this.form.get('setDate') as FormControl;
  }
  get _releasedAt() {
    return this.form.get('releasedAt') as FormControl;
  }
  get _category() {
    return this.form.get('category') as FormControl;
  }
  get _downloadsAllowed() {
    return this.form.get('downloadsAllowed') as FormControl;
  }
  get _longDescription() {
    return this.form.get('longDescription') as FormControl;
  }

  // Obs$
  courseCategories$!: Observable<CourseCategory[]>;
  // Subs$
  private ageValueChanges!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService
  ) {}

  // Tip: You can implement ControlValueAccessor, but might not want to re-implement the methods for the native input. In order to do that, you can use the FormControlDirective to get access to valueAccessor.
  // If we want to make a custom form component that’s compatible with Reactive Form, we need to implement ControlValueAccessor. However, if the custom form component is compositing an existing native form element or another existing custom form component that has already implemented ControlValueAccessor, it is possible and preferred to reuse existing ControlValueAccessor without implementing ControlValueAccessor from scratch again.
  // https://medium.com/angular-in-depth/dont-reinvent-the-wheel-when-implementing-controlvalueaccessor-a0ed4ad0fafd
  // Caution: Bu projede bu yöntem kullanılmadı
  @ViewChild('cva', { static: true }) cvaFormControl!: FormControlDirective;
  // registerOnChange(fn: any): void {
  //   this.formControlDirective.valueAccessor.registerOnChange(fn);
  // }

  ngOnInit(): void {
    this.courseCategories$ = this.coursesService.findCourseCategories();
    this.downloadsAllowed_formControl_mandatoryConfirm_validator();
    this.setDate_and_releasedAt_formControls_crossFieldValidator();
    this.formDraftHandler();
    this.basicInfo_age_formControl_crossFieldValidator();
  }

  // case: downloadsAllowed(controlForm) is mandatory to be checked if other fields are valid, otherwise it should be free to be unchecked or checked except submission attempt. If there is a submission attempt, the downloadsAllowed(controlForm) should be invalid and the error should be shown
  downloadsAllowed_formControl_mandatoryConfirm_validator() {
    this.form.statusChanges.pipe(untilDestroyed(this)).subscribe(() => {
      // case: gather all formControls
      let formControlsValidities = {};
      Object.entries(this.form.controls).forEach(([key, formControl]) => {
        formControlsValidities = {
          ...formControlsValidities,
          [key]: formControl.valid,
        };
      });
      // case: check if all formControls are valid except downloadsAllowed(controlForm)
      let isFormValidExceptDownloadsAllowed = Object.entries(
        formControlsValidities
      ).every(([key, value]) => {
        if (key === 'downloadsAllowed') return true;
        return value;
      });

      // state: downloadsAllowed(controlForm) is checked and has errors, the rest is not important
      // Action: remove errors from downloadsAllowed(controlForm)
      if (
        this._downloadsAllowed.value === true &&
        this._downloadsAllowed.errors
      ) {
        this._downloadsAllowed.setErrors(null);
      } else if (
        // state: downloadsAllowed(controlForm) is unchecked, has no obligatoryConfirmError, other fields are valid
        // action: set obligatoryConfirmError to downloadsAllowed(controlForm)
        this._downloadsAllowed.value === false &&
        this._downloadsAllowed.errors?.obligatoryConfirmError === undefined &&
        isFormValidExceptDownloadsAllowed === true
      ) {
        this._downloadsAllowed.setErrors({ obligatoryConfirmError: true });
      } else if (
        // state: downloadsAllowed(controlForm) is unchecked, has obligatoryConfirmError, other fields are valid
        // action: do nothing
        this._downloadsAllowed.value === false &&
        this._downloadsAllowed.errors?.obligatoryConfirmError === true &&
        isFormValidExceptDownloadsAllowed === true
      ) {
        return;
      } else if (
        // state: downloadsAllowed(controlForm) is unchecked, has obligatoryConfirmError, other fields are invalid
        // action: set required to downloadsAllowed(controlForm)
        this._downloadsAllowed.value === false &&
        isFormValidExceptDownloadsAllowed === false &&
        this._downloadsAllowed.errors?.obligatoryConfirmError
      ) {
        this._downloadsAllowed.setErrors({ required: true });
      } else if (
        // state: downloadsAllowed(controlForm) is unchecked, has no obligatoryConfirmError, other fields are invalid
        // action: do nothing
        this._downloadsAllowed.value === false &&
        isFormValidExceptDownloadsAllowed === false &&
        this._downloadsAllowed.errors?.obligatoryConfirmError
      ) {
        return;
      }
    });
  }

  // case: if setDate is checked, releasedAt(formControl)'s validity should be updated and also its value should be reset
  setDate_and_releasedAt_formControls_crossFieldValidator() {
    this.form.controls.setDate.valueChanges
      .pipe(untilDestroyed(this))
      // advice: as a last resort, use distinctUntilChanged to prevent Maximum call stack size exceeded when using valueChanges
      .subscribe((value) => {
        if (value) this._releasedAt.reset();
        this.form.controls.releasedAt.updateValueAndValidity();
      });
  }

  formDraftHandler() {
    const draft = localStorage.getItem('courseFormDraft-Step1');
    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        filter(() => this.form.valid)
      )
      .subscribe((value) => {
        localStorage.setItem('courseFormDraft-Step1', JSON.stringify(value));
      });

    // advice
    // The issue is that if you have your form already saved on localstorage and then change the title, the new title is not saved on draft (not updated on local storage). This only happens with the title. I guess that is why Vimal concluded this issue is related to the async validator. I think he is right.

    // combineLatest([
    //   this.form.valueChanges,
    //   this.form.statusChanges
    // ]).pipe(
    //   filter(([val, status]) => status === 'VALID'),
    //   map(([val, status]) => val),
    //   distinctUntilChanged(),
    // ).subscribe((val) => {
    //   localStorage.setItem('STEP_1', JSON.stringify(val));
    // });
  }

  basicInfo_age_formControl_crossFieldValidator() {
    const companyFormControl = this.form.get('noCvaAddress.company');

    this.ageValueChanges = this.form
      .get('basicInfo.age')!
      .valueChanges.subscribe((age) => {
        if (age && age > 18) {
          companyFormControl?.setValidators(Validators.required);
        } else {
          companyFormControl?.clearValidators();
        }
        companyFormControl?.updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    this.ageValueChanges?.unsubscribe();
  }
}

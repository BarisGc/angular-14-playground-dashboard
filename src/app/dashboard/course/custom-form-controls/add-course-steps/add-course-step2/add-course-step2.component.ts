import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { createPromoDateRangeValidator } from 'src/app/validators/promo-date-range.validator';

/**
 * #keywords: cross field validation, custom form control
 *
 * @export
 * @class AddCourseStep2Component
 * @implements {OnInit}
 */
@UntilDestroy()
@Component({
  selector: 'app-add-course-step2',
  templateUrl: './add-course-step2.component.html',
  styleUrls: ['./add-course-step2.component.scss'],
})
export class AddCourseStep2Component implements OnInit {
  instructor = "Peace's";
  form = this.formBuilder.group(
    {
      courseType: ['free', Validators.required],
      // caution: When a form control is disabled, validation is not applied to that control.
      price: [
        null,
        {
          validators: [
            Validators.required,
            Validators.min(1),
            Validators.max(9999),
            Validators.pattern('[0-9]+'),
          ],
        },
      ],
      thumbnail: [null],
      promoStartAt: [null],
      promoEndAt: [null],
      freeExpectation: [{ value: 3, disabled: false }],
      freePlusPremiumExpectations: [{ value: 5, disabled: true }],
    },
    {
      validators: [createPromoDateRangeValidator()],
    }
    // additional info:
    // { validator: (group) => {
    //   if (group.controls.user.value !== 'Admin') {
    //     return Validators.required((group.controls.role);
    //   }
    //   return null;
    // }
  );

  // getters of formControls
  get _courseType() {
    return this.form.get('courseType') as FormControl;
  }
  get _price() {
    return this.form.get('price') as FormControl;
  }

  get _thumbnail() {
    return this.form.get('thumbnail') as FormControl;
  }

  get _promoStartAt() {
    return this.form.get('promoStartAt') as FormControl;
  }
  get _promoEndAt() {
    return this.form.get('promoEndAt') as FormControl;
  }
  get _freeExpectation() {
    return this.form.get('freeExpectation') as FormControl;
  }
  get _freePlusPremiumExpectations() {
    return this.form.get('freePlusPremiumExpectations') as FormControl;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.courseType_and_price_controls_crossField_disability_controller();
  }

  courseType_and_price_controls_crossField_disability_controller() {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      // caution: && this._price?.enabled is a must to prevent infinite loop
      if (value.courseType === 'free' && this._price?.enabled) {
        this._price?.disable({ emitEvent: false });
        this._price?.reset(null, { emitEvent: false });
        this.form
          .get('freePlusPremiumExpectations')
          ?.disable({ emitEvent: false });
      } else if (value.courseType === 'premium' && this._price?.disabled) {
        this._price?.enable({ emitEvent: false });
        this.form
          .get('freePlusPremiumExpectations')
          ?.enable({ emitEvent: false });
      }
    });
  }

  // example method to send the star component dynamic messaging

  ratingMessage(ratingName: string) {
    let messages: any = {};
    messages['freeExpectation'] = [
      `${this.instructor} course was gross!`,
      `${this.instructor} course was pretty bad.`,
      `${this.instructor} course was acceptable.`,
      `${this.instructor} course was pretty good.`,
      `${this.instructor} course was great!`,
    ];
    messages['freePlusPremiumExpectations'] = [
      `${this.instructor} course was unacceptable!`,
      `I couldn't learn the course at ${this.instructor}.`,
      `${this.instructor} course was acceptable.`,
      `${this.instructor} course was yummy.`,
      `${this.instructor} course is great!`,
    ];
    return messages[ratingName];
  }


}

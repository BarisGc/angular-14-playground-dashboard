import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { noop, Subscription } from 'rxjs';

/**
 * Keywords: nested forms, custom form controls
 *
 * hint: registerOnChange(onChange: any) {
    this.onChangeSub = this.form.valueChanges.subscribe(onChange); // alternative: subscribe(value=>onChange(value))
  }
 */
@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressFormComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AddressFormComponent,
    },
  ],
})
export class AddressFormComponent
  implements ControlValueAccessor, OnDestroy, Validator
{
  @Input()
  legend!: string;

  onChangeSub!: Subscription;

  form: FormGroup = this.formBuilder.group({
    addressLine1: [null, [Validators.required]],
    addressLine2: [null, [Validators.required]],
    zipCode: [null, [Validators.required]],
    city: [null, [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnDestroy() {
    this.onChangeSub.unsubscribe();
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value);
    }
  }

  registerOnChange(onChange: any) {
    this.onChangeSub = this.form.valueChanges.subscribe(onChange); // alternative: subscribe(value=>onChange(value))
  }

  _onTouched = () => {};
  registerOnTouched(onTouched: any) {
    this._onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.form.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'Custom error message',
          },
        };
  }
}

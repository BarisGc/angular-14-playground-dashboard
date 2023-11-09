import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Directive({
  selector: '[appPasswordStrength]',
  // we need to inform Angular that this is not only a normal Angular directive but that this is specifically a form filled validation directive. Dependency Injection is needed to make this directive work.
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true, // meaning that this validation key is meant to contain multiple values so the directive is going to be added to the array of known form filled validators instead of replacing the whole array with a single value.
    },
  ],
})
export class PasswordStrengthDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return createPasswordStrengthValidator()(control);
  }
}

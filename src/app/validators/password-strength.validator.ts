import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// This function is goint to return a validator function so this is not the evaluator function itself. It's a factory function that returns a function
export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    if (!password) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const hasNumeric = /[0-9]+/.test(password);
    // const hasNonalphas = /\W/.test(password);
    const isPasswordValid = hasUpperCase && hasLowerCase && hasNumeric;
    return !isPasswordValid ? { passwordStrength: true } : null;
  };
}

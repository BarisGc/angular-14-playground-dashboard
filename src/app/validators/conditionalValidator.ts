import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

// This function is goint to return a validator function so this is not the evaluator function itself. It's a factory function that returns a function
export interface BooleanFn {
  (): boolean;
}
// It accepts a FormGroup as a parameter and it has the access to the value of the whole group on each change.
// Validation Syntax In Form:
// {
//   validators: [conditionalValidator], // No need to pass the formGroup as a parameter because it's available in the context of the validator function
// },
// If you want to pass a parameter to the validator function, you can use like example below:
// Validation Syntax In Form:
// {
//   validators: [conditionalValidator], // pass the bla bla as a parameter
// },
export function conditionalValidator(
  predicate: BooleanFn,
  validator: ValidatorFn,
  errorNamespace?: string
): ValidatorFn {
  return (formControl: AbstractControl): ValidationErrors | null => {
    let error = null;

    if (!formControl.parent) {
      return null;
    }

    if (predicate()) {
      error = validator(formControl);
    }

    if (errorNamespace && error) {
      const customError: any = {};
      customError[errorNamespace] = error;
      error = customError;
    }
    return error;
  };
}

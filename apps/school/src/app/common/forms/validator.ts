import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidator {
  static atLeast(minItems: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = (control as FormArray).length >= minItems;
      return isValid ? null : { atLeast: true };
    };
  }
}

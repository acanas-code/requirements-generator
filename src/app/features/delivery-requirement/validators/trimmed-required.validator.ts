import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function trimmedRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string') {
      return { requiredTrimmed: true };
    }

    return value.trim().length > 0 ? null : { requiredTrimmed: true };
  };
}

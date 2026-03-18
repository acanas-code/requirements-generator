import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { StackId } from '../models/delivery-requirement.model';

export function atLeastOneStackValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as StackId[] | null | undefined;

    if (!Array.isArray(value)) {
      return { minSelected: true };
    }

    return value.length > 0 ? null : { minSelected: true };
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

interface RollbackLikeControl {
  rollbackPlan?: string;
  notApplicableJustification?: string;
}

export function rollbackPlanValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as RollbackLikeControl | null | undefined;

    if (!value) {
      return { rollbackRequired: true };
    }

    const hasRollbackPlan = !!value.rollbackPlan?.trim();
    const hasJustification = !!value.notApplicableJustification?.trim();

    return hasRollbackPlan || hasJustification ? null : { rollbackRequired: true };
  };
}

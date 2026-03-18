import { FormControl, FormGroup } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import { StackId } from '../models/delivery-requirement.model';
import { atLeastOneStackValidator } from './at-least-one-stack.validator';
import { rollbackPlanValidator } from './rollback-plan.validator';
import { trimmedRequiredValidator } from './trimmed-required.validator';

describe('delivery requirement validators', () => {
  it('validates trimmed required strings', () => {
    const control = new FormControl('   ', { nonNullable: true, validators: [trimmedRequiredValidator()] });
    expect(control.invalid).toBe(true);

    control.setValue('Cambio de checkout');
    expect(control.valid).toBe(true);
  });

  it('requires at least one selected stack', () => {
    const control = new FormControl<StackId[]>([], {
      nonNullable: true,
      validators: [atLeastOneStackValidator()]
    });
    expect(control.invalid).toBe(true);

    control.setValue(['angular']);
    expect(control.valid).toBe(true);
  });

  it('requires rollback plan or justification', () => {
    const group = new FormGroup(
      {
        rollbackPlan: new FormControl('', { nonNullable: true }),
        notApplicableJustification: new FormControl('', { nonNullable: true })
      },
      { validators: [rollbackPlanValidator()] }
    );

    expect(group.invalid).toBe(true);

    group.patchValue({ rollbackPlan: 'Revertir release y restablecer variables.' });
    expect(group.valid).toBe(true);
  });
});

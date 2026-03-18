import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  FunctionalRequirementItemFormGroup
} from '../../../state/delivery-requirement-form.model';
import { trimmedRequiredValidator } from '../../../validators/trimmed-required.validator';
import { SectionShellComponent } from '../../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-functional-section',
  standalone: true,
  imports: [ReactiveFormsModule, SectionShellComponent],
  templateUrl: './functional-section.component.html',
  styleUrl: './functional-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunctionalSectionComponent {
  readonly requirements = input.required<FormArray<FunctionalRequirementItemFormGroup>>();

  constructor(private readonly formBuilder: FormBuilder) {}

  addRequirement(): void {
    this.requirements().push(this.createRequirementGroup());
    this.requirements().markAsDirty();
    this.requirements().markAsTouched();
  }

  rfCode(index: number): string {
    return `RF-${`${index + 1}`.padStart(2, '0')}`;
  }

  isInvalid(group: FunctionalRequirementItemFormGroup, controlName: 'businessNeed' | 'expectedResult'): boolean {
    const control = group.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  private createRequirementGroup(): FunctionalRequirementItemFormGroup {
    const builder = this.formBuilder.nonNullable;
    return builder.group({
      title: builder.control(''),
      businessNeed: builder.control('', {
        validators: [trimmedRequiredValidator()]
      }),
      expectedResult: builder.control('', {
        validators: [trimmedRequiredValidator()]
      })
    });
  }
}

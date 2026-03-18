import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { STACK_OPTIONS } from '../../../models/delivery-requirement.constants';
import { StackId } from '../../../models/delivery-requirement.model';
import { StackTechnicalRequirementsFormModel } from '../../../state/delivery-requirement-form.model';
import { SectionShellComponent } from '../../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-stacks-section',
  standalone: true,
  imports: [ReactiveFormsModule, SectionShellComponent],
  templateUrl: './stacks-section.component.html',
  styleUrl: './stacks-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StacksSectionComponent {
  readonly stacksControl = input.required<FormControl<StackId[]>>();
  readonly stackGroups = input.required<FormGroup<StackTechnicalRequirementsFormModel>>();

  readonly stackOptions = STACK_OPTIONS;

  toggleStack(stackId: StackId): void {
    const current = this.stacksControl().value;

    if (current.includes(stackId)) {
      this.stacksControl().setValue(current.filter((item) => item !== stackId));
      this.stacksControl().markAsTouched();
      return;
    }

    this.stacksControl().setValue([...current, stackId]);
    this.stacksControl().markAsTouched();
  }

  isSelected(stackId: StackId): boolean {
    return this.stacksControl().value.includes(stackId);
  }
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryTestPlanFormModel } from '../../../state/delivery-requirement-form.model';
import { SectionShellComponent } from '../../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-test-plan-section',
  standalone: true,
  imports: [ReactiveFormsModule, SectionShellComponent],
  templateUrl: './test-plan-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPlanSectionComponent {
  readonly group = input.required<import('@angular/forms').FormGroup<DeliveryTestPlanFormModel>>();

  isInvalid(controlName: keyof DeliveryTestPlanFormModel): boolean {
    const control = this.group().controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }
}

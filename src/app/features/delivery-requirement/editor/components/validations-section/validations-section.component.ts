import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryValidationsFormModel } from '../../../state/delivery-requirement-form.model';
import { SectionShellComponent } from '../../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-validations-section',
  standalone: true,
  imports: [ReactiveFormsModule, SectionShellComponent],
  templateUrl: './validations-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationsSectionComponent {
  readonly group = input.required<import('@angular/forms').FormGroup<DeliveryValidationsFormModel>>();

  isInvalid(controlName: keyof DeliveryValidationsFormModel): boolean {
    const control = this.group().controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }
}

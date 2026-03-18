import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryDeploymentFormModel } from '../../../state/delivery-requirement-form.model';
import { SectionShellComponent } from '../../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-deployment-section',
  standalone: true,
  imports: [ReactiveFormsModule, SectionShellComponent],
  templateUrl: './deployment-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeploymentSectionComponent {
  readonly group = input.required<import('@angular/forms').FormGroup<DeliveryDeploymentFormModel>>();

  isInvalid(controlName: keyof DeliveryDeploymentFormModel): boolean {
    const control = this.group().controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }
}

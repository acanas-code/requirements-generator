import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  DeliveryObservabilityFormModel,
  DeliveryRollbackFormModel
} from '../../../state/delivery-requirement-form.model';
import { SectionShellComponent } from '../../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-risk-rollback-section',
  standalone: true,
  imports: [ReactiveFormsModule, SectionShellComponent],
  templateUrl: './risk-rollback-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RiskRollbackSectionComponent {
  readonly rollbackGroup = input.required<FormGroup<DeliveryRollbackFormModel>>();
  readonly observabilityGroup = input.required<FormGroup<DeliveryObservabilityFormModel>>();
  readonly notesControl = input.required<FormControl<string>>();

  get rollbackInvalid(): boolean {
    const group = this.rollbackGroup();
    return group.invalid && (group.touched || group.dirty);
  }
}

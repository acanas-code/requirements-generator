import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CHANGE_TYPES } from '../../../models/delivery-requirement.model';
import { DeliveryMetadataFormModel } from '../../../state/delivery-requirement-form.model';
import { SectionShellComponent } from '../../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-general-info-section',
  standalone: true,
  imports: [ReactiveFormsModule, SectionShellComponent],
  templateUrl: './general-info-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralInfoSectionComponent {
  readonly group = input.required<import('@angular/forms').FormGroup<DeliveryMetadataFormModel>>();
  readonly changeTypes = CHANGE_TYPES;

  isInvalid(controlName: keyof DeliveryMetadataFormModel): boolean {
    const control = this.group().controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }
}

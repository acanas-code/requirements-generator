import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryFunctionalFormModel } from '../../../state/delivery-requirement-form.model';
import { SectionShellComponent } from '../../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-functional-section',
  standalone: true,
  imports: [ReactiveFormsModule, SectionShellComponent],
  templateUrl: './functional-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunctionalSectionComponent {
  readonly group = input.required<import('@angular/forms').FormGroup<DeliveryFunctionalFormModel>>();

  isInvalid(controlName: keyof DeliveryFunctionalFormModel): boolean {
    const control = this.group().controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }
}

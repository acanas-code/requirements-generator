import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryContextFormModel } from '../../../state/delivery-requirement-form.model';
import { SectionShellComponent } from '../../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-context-section',
  standalone: true,
  imports: [ReactiveFormsModule, SectionShellComponent],
  templateUrl: './context-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextSectionComponent {
  readonly group = input.required<import('@angular/forms').FormGroup<DeliveryContextFormModel>>();

  isInvalid(controlName: keyof DeliveryContextFormModel): boolean {
    const control = this.group().controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }
}

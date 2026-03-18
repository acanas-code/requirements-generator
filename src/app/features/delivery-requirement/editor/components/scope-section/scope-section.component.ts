import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryScopeFormModel } from '../../../state/delivery-requirement-form.model';
import { SectionShellComponent } from '../../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-scope-section',
  standalone: true,
  imports: [ReactiveFormsModule, SectionShellComponent],
  templateUrl: './scope-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScopeSectionComponent {
  readonly group = input.required<import('@angular/forms').FormGroup<DeliveryScopeFormModel>>();

  isInvalid(controlName: keyof DeliveryScopeFormModel): boolean {
    const control = this.group().controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }
}

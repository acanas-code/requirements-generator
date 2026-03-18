import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryTechnicalFormModel } from '../../../state/delivery-requirement-form.model';
import { SectionShellComponent } from '../../../../../shared/components/section-shell/section-shell.component';

@Component({
  selector: 'app-technical-section',
  standalone: true,
  imports: [ReactiveFormsModule, SectionShellComponent],
  templateUrl: './technical-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicalSectionComponent {
  readonly group = input.required<import('@angular/forms').FormGroup<DeliveryTechnicalFormModel>>();
}

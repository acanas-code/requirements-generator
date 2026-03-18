import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DeliveryRequirementPreview } from '../../models/delivery-requirement-preview.model';

@Component({
  selector: 'app-preview-document',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './preview-document.component.html',
  styleUrl: './preview-document.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewDocumentComponent {
  readonly preview = input.required<DeliveryRequirementPreview>();
}

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { startWith } from 'rxjs';
import { DeliveryRequirementDocumentBuilderService } from '../services/delivery-requirement-document-builder.service';
import { DeliveryRequirementEditorStateService } from '../state/delivery-requirement-editor-state.service';
import { PreviewDocumentComponent } from './components/preview-document.component';

@Component({
  selector: 'app-delivery-requirement-preview',
  standalone: true,
  imports: [RouterLink, PreviewDocumentComponent],
  templateUrl: './delivery-requirement-preview.component.html',
  styleUrl: './delivery-requirement-preview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryRequirementPreviewComponent {
  private readonly state = inject(DeliveryRequirementEditorStateService);
  private readonly builder = inject(DeliveryRequirementDocumentBuilderService);

  private readonly formValueSignal = toSignal(
    this.state.form.valueChanges.pipe(startWith(this.state.form.getRawValue()))
  );

  readonly preview = computed(() => {
    this.formValueSignal();
    return this.builder.build(this.state.buildDocument());
  });

  print(): void {
    window.print();
  }
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-shell',
  standalone: true,
  templateUrl: './section-shell.component.html',
  styleUrl: './section-shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionShellComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly helper = input<string>('');
}

import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { DeliveryRequirementFormFactory } from '../../../state/delivery-requirement-form.factory';
import { StacksSectionComponent } from './stacks-section.component';

@Component({
  selector: 'app-stack-host',
  standalone: true,
  imports: [ReactiveFormsModule, StacksSectionComponent],
  template: `
    <app-stacks-section
      [stacksControl]="form.controls.impactedStacks"
      [stackGroups]="form.controls.stackTechnicalRequirements"
    ></app-stacks-section>
  `
})
class StackHostComponent {
  readonly form;

  constructor(private readonly formFactory: DeliveryRequirementFormFactory) {
    this.form = this.formFactory.create();
  }
}

describe('StacksSectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackHostComponent]
    }).compileComponents();
  });

  it('renders conditional stack blocks based on selected stacks', () => {
    const fixture = TestBed.createComponent(StackHostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-testid="stack-angular"]')).toBeNull();

    const angularButton = Array.from(
      fixture.nativeElement.querySelectorAll('.stack-chip')
    ).find((element) => (element as HTMLElement).textContent?.includes('Angular')) as HTMLElement;

    angularButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-testid="stack-angular"]')).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { DeliveryRequirementFormFactory } from '../../../state/delivery-requirement-form.factory';
import { FunctionalSectionComponent } from './functional-section.component';

@Component({
  selector: 'app-functional-host',
  standalone: true,
  imports: [ReactiveFormsModule, FunctionalSectionComponent],
  template: `
    <app-functional-section
      [requirements]="form.controls.functionalRequirements"
    ></app-functional-section>
  `
})
class FunctionalHostComponent {
  readonly form;

  constructor(private readonly formFactory: DeliveryRequirementFormFactory) {
    this.form = this.formFactory.create();
  }
}

describe('FunctionalSectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunctionalHostComponent]
    }).compileComponents();
  });

  it('adds incremental RF blocks', () => {
    const fixture = TestBed.createComponent(FunctionalHostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('RF-01');

    const addButton = fixture.nativeElement.querySelector('.rf-add') as HTMLButtonElement;
    addButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('RF-02');
  });
});

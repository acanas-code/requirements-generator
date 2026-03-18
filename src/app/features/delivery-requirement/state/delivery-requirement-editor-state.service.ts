import { Injectable, computed, signal } from '@angular/core';
import { debounceTime } from 'rxjs';
import { DELIVERY_SECTIONS } from '../models/delivery-requirement.constants';
import { createEmptyDeliveryRequirementDocument } from '../models/delivery-requirement.defaults';
import { DeliveryRequirementDocument, StackId } from '../models/delivery-requirement.model';
import { DeliveryRequirementMapperService } from '../services/delivery-requirement-mapper.service';
import { DeliveryRequirementStorageService } from '../services/delivery-requirement-storage.service';
import { DeliveryRequirementFormFactory } from './delivery-requirement-form.factory';

type DraftStatus = 'none' | 'recovered' | 'corrupt';

@Injectable({ providedIn: 'root' })
export class DeliveryRequirementEditorStateService {
  readonly sections = DELIVERY_SECTIONS;
  readonly currentSectionIndex = signal(0);
  readonly draftStatus = signal<DraftStatus>('none');

  readonly form;

  readonly sectionCompletion = computed(() => {
    const document = this.currentDocument();

    return {
      general:
        this.hasText(document.metadata.deliveryName) &&
        this.hasText(document.metadata.author) &&
        this.hasText(document.metadata.date),
      context: this.hasText(document.context.objective),
      scope: this.hasText(document.scope.inScope),
      stacks: document.impactedStacks.length > 0,
      functional: this.hasText(document.functionalRequirements.requirements),
      technical:
        this.hasText(document.technicalRequirements.architectureNotes) ||
        this.hasText(document.technicalRequirements.dependencies),
      validations: this.hasText(document.validations.keyValidations),
      testPlan: this.hasText(document.testPlan.minimumPlan),
      deployment: this.hasText(document.deploymentPlan.deploymentSteps),
      risks:
        this.hasText(document.rollbackPlan.rollbackPlan) ||
        this.hasText(document.rollbackPlan.notApplicableJustification),
      preview: true
    };
  });

  readonly completionPercentage = computed(() => {
    const completion = this.sectionCompletion();
    const progressKeys = Object.keys(completion) as Array<keyof typeof completion>;
    const completed = progressKeys.filter((key) => completion[key]).length;
    return Math.round((completed / progressKeys.length) * 100);
  });

  constructor(
    private readonly formFactory: DeliveryRequirementFormFactory,
    private readonly mapper: DeliveryRequirementMapperService,
    private readonly storage: DeliveryRequirementStorageService
  ) {
    const draftResult = this.storage.loadDraft();
    const initialDocument =
      draftResult.status === 'loaded' && draftResult.document
        ? draftResult.document
        : createEmptyDeliveryRequirementDocument();

    this.form = this.formFactory.create(initialDocument);

    if (draftResult.status === 'loaded') {
      this.draftStatus.set('recovered');
    }

    if (draftResult.status === 'corrupt') {
      this.draftStatus.set('corrupt');
      this.storage.clearDraft();
    }

    this.form.valueChanges.pipe(debounceTime(250)).subscribe(() => {
      if (this.form.pristine) {
        return;
      }
      this.persistDraft();
    });
  }

  goToSection(index: number): void {
    if (index < 0 || index >= this.sections.length) {
      return;
    }

    this.currentSectionIndex.set(index);
  }

  nextSection(): void {
    this.goToSection(this.currentSectionIndex() + 1);
  }

  previousSection(): void {
    this.goToSection(this.currentSectionIndex() - 1);
  }

  isStackSelected(stackId: StackId): boolean {
    return this.form.controls.impactedStacks.value.includes(stackId);
  }

  toggleStack(stackId: StackId): void {
    const current = this.form.controls.impactedStacks.value;

    if (current.includes(stackId)) {
      this.form.controls.impactedStacks.setValue(current.filter((id) => id !== stackId));
      this.form.controls.impactedStacks.markAsTouched();
      return;
    }

    this.form.controls.impactedStacks.setValue([...current, stackId]);
    this.form.controls.impactedStacks.markAsTouched();
  }

  buildDocument(): DeliveryRequirementDocument {
    return this.mapper.toDocument(this.form.getRawValue() as DeliveryRequirementDocument);
  }

  clearTemplate(): void {
    const empty = createEmptyDeliveryRequirementDocument();
    this.form.reset(empty);
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.currentSectionIndex.set(0);
    this.draftStatus.set('none');
    this.storage.clearDraft();
  }

  persistDraft(): void {
    this.storage.saveDraft(this.buildDocument());
  }

  private currentDocument(): DeliveryRequirementDocument {
    return this.form.getRawValue() as DeliveryRequirementDocument;
  }

  private hasText(value: string): boolean {
    return value.trim().length > 0;
  }
}

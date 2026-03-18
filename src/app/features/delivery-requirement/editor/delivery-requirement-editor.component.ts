import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { startWith } from 'rxjs';
import { DeliveryRequirementDocumentBuilderService } from '../services/delivery-requirement-document-builder.service';
import { DeliveryRequirementEditorStateService } from '../state/delivery-requirement-editor-state.service';
import { ContextSectionComponent } from './components/context-section/context-section.component';
import { DeploymentSectionComponent } from './components/deployment-section/deployment-section.component';
import { FunctionalSectionComponent } from './components/functional-section/functional-section.component';
import { GeneralInfoSectionComponent } from './components/general-info-section/general-info-section.component';
import { RiskRollbackSectionComponent } from './components/risk-rollback-section/risk-rollback-section.component';
import { ScopeSectionComponent } from './components/scope-section/scope-section.component';
import { StacksSectionComponent } from './components/stacks-section/stacks-section.component';
import { TechnicalSectionComponent } from './components/technical-section/technical-section.component';
import { TestPlanSectionComponent } from './components/test-plan-section/test-plan-section.component';
import { ValidationsSectionComponent } from './components/validations-section/validations-section.component';
import { PreviewDocumentComponent } from '../preview/components/preview-document.component';

@Component({
  selector: 'app-delivery-requirement-editor',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    GeneralInfoSectionComponent,
    ContextSectionComponent,
    ScopeSectionComponent,
    StacksSectionComponent,
    FunctionalSectionComponent,
    TechnicalSectionComponent,
    ValidationsSectionComponent,
    TestPlanSectionComponent,
    DeploymentSectionComponent,
    RiskRollbackSectionComponent,
    PreviewDocumentComponent
  ],
  templateUrl: './delivery-requirement-editor.component.html',
  styleUrl: './delivery-requirement-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryRequirementEditorComponent {
  readonly state = inject(DeliveryRequirementEditorStateService);
  private readonly builder = inject(DeliveryRequirementDocumentBuilderService);

  readonly sections = this.state.sections;
  readonly completion = this.state.sectionCompletion;
  readonly completionPercentage = this.state.completionPercentage;

  private readonly formValueSignal = toSignal(
    this.state.form.valueChanges.pipe(startWith(this.state.form.getRawValue()))
  );

  readonly activeSection = computed(
    () => this.sections[this.state.currentSectionIndex()] ?? this.sections[0]
  );
  readonly activeSectionId = computed(() => this.activeSection().id);

  readonly preview = computed(() => {
    this.formValueSignal();
    return this.builder.build(this.state.buildDocument());
  });

  readonly mandatoryMissing = computed(() => {
    const document = this.state.buildDocument();
    const missing: string[] = [];

    if (!document.metadata.deliveryName.trim()) {
      missing.push('Nombre de la entrega');
    }
    if (!document.metadata.author.trim()) {
      missing.push('Autor');
    }
    if (!document.metadata.date.trim()) {
      missing.push('Fecha');
    }
    if (!document.context.objective.trim()) {
      missing.push('Objetivo del cambio');
    }
    if (!document.scope.inScope.trim()) {
      missing.push('Alcance');
    }
    if (document.impactedStacks.length === 0) {
      missing.push('Al menos un stack impactado');
    }
    if (!document.functionalRequirements.requirements.trim()) {
      missing.push('Requerimientos funcionales');
    }
    if (!document.validations.keyValidations.trim()) {
      missing.push('Validaciones clave');
    }
    if (!document.testPlan.minimumPlan.trim()) {
      missing.push('Plan mínimo de pruebas');
    }
    if (!document.deploymentPlan.deploymentSteps.trim()) {
      missing.push('Plan de despliegue');
    }
    if (
      !document.rollbackPlan.rollbackPlan.trim() &&
      !document.rollbackPlan.notApplicableJustification.trim()
    ) {
      missing.push('Rollback o justificación');
    }

    return missing;
  });

  sectionCompleted(sectionId: string): boolean {
    const completion = this.completion();
    return completion[sectionId as keyof typeof completion] ?? false;
  }

  jumpTo(index: number): void {
    this.state.goToSection(index);
  }

  previousSection(): void {
    this.state.previousSection();
  }

  nextSection(): void {
    this.touchCurrentSection();
    this.state.nextSection();
  }

  clearTemplate(): void {
    const confirmClear = window.confirm(
      'Se limpiará toda la plantilla y también el borrador guardado localmente. ¿Deseas continuar?'
    );

    if (!confirmClear) {
      return;
    }

    this.state.clearTemplate();
  }

  private touchCurrentSection(): void {
    switch (this.activeSectionId()) {
      case 'general':
        this.state.form.controls.metadata.markAllAsTouched();
        break;
      case 'context':
        this.state.form.controls.context.markAllAsTouched();
        break;
      case 'scope':
        this.state.form.controls.scope.markAllAsTouched();
        break;
      case 'stacks':
        this.state.form.controls.impactedStacks.markAsTouched();
        break;
      case 'functional':
        this.state.form.controls.functionalRequirements.markAllAsTouched();
        break;
      case 'validations':
        this.state.form.controls.validations.markAllAsTouched();
        break;
      case 'testPlan':
        this.state.form.controls.testPlan.markAllAsTouched();
        break;
      case 'deployment':
        this.state.form.controls.deploymentPlan.markAllAsTouched();
        break;
      case 'risks':
        this.state.form.controls.rollbackPlan.markAllAsTouched();
        break;
      default:
        break;
    }
  }
}

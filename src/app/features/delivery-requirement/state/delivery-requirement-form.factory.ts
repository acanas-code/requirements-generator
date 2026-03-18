import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { createEmptyDeliveryRequirementDocument } from '../models/delivery-requirement.defaults';
import {
  DeliveryRequirementDocument,
  FunctionalRequirementItem
} from '../models/delivery-requirement.model';
import { atLeastOneStackValidator } from '../validators/at-least-one-stack.validator';
import { rollbackPlanValidator } from '../validators/rollback-plan.validator';
import { trimmedRequiredValidator } from '../validators/trimmed-required.validator';
import {
  DeliveryRequirementForm,
  FunctionalRequirementItemFormGroup
} from './delivery-requirement-form.model';

@Injectable({ providedIn: 'root' })
export class DeliveryRequirementFormFactory {
  constructor(private readonly formBuilder: FormBuilder) {}

  create(document: DeliveryRequirementDocument = createEmptyDeliveryRequirementDocument()): DeliveryRequirementForm {
    const builder = this.formBuilder.nonNullable;
    const functionalRequirements = this.normalizeFunctionalRequirements(
      document.functionalRequirements
    ).map((item) => this.createFunctionalRequirementGroup(item));

    return builder.group({
      schemaVersion: builder.control(document.schemaVersion),
      metadata: builder.group({
        deliveryName: builder.control(document.metadata.deliveryName, {
          validators: [trimmedRequiredValidator()]
        }),
        author: builder.control(document.metadata.author, {
          validators: [trimmedRequiredValidator()]
        }),
        date: builder.control(document.metadata.date, {
          validators: [trimmedRequiredValidator()]
        }),
        changeType: builder.control(document.metadata.changeType),
        ticket: builder.control(document.metadata.ticket),
        summary: builder.control(document.metadata.summary)
      }),
      context: builder.group({
        background: builder.control(document.context.background),
        objective: builder.control(document.context.objective, {
          validators: [trimmedRequiredValidator()]
        }),
        successCriteria: builder.control(document.context.successCriteria)
      }),
      scope: builder.group({
        inScope: builder.control(document.scope.inScope, {
          validators: [trimmedRequiredValidator()]
        }),
        outOfScope: builder.control(document.scope.outOfScope),
        assumptions: builder.control(document.scope.assumptions)
      }),
      impactedStacks: builder.control(document.impactedStacks, {
        validators: [atLeastOneStackValidator()]
      }),
      functionalRequirements: builder.array(functionalRequirements),
      technicalRequirements: builder.group({
        architectureNotes: builder.control(document.technicalRequirements.architectureNotes),
        dependencies: builder.control(document.technicalRequirements.dependencies)
      }),
      stackTechnicalRequirements: builder.group({
        php: builder.group({
          legacyModules: builder.control(document.stackTechnicalRequirements.php.legacyModules),
          scriptsOrProcesses: builder.control(document.stackTechnicalRequirements.php.scriptsOrProcesses),
          validations: builder.control(document.stackTechnicalRequirements.php.validations),
          routesOrFiles: builder.control(document.stackTechnicalRequirements.php.routesOrFiles),
          compatibility: builder.control(document.stackTechnicalRequirements.php.compatibility)
        }),
        shopify: builder.group({
          sectionsSnippetsTemplates: builder.control(
            document.stackTechnicalRequirements.shopify.sectionsSnippetsTemplates
          ),
          checkoutCartCustomerFlows: builder.control(
            document.stackTechnicalRequirements.shopify.checkoutCartCustomerFlows
          ),
          webhooks: builder.control(document.stackTechnicalRequirements.shopify.webhooks),
          appsIntegrations: builder.control(document.stackTechnicalRequirements.shopify.appsIntegrations),
          metafieldsObjects: builder.control(document.stackTechnicalRequirements.shopify.metafieldsObjects)
        }),
        angular: builder.group({
          impactedPagesOrModules: builder.control(
            document.stackTechnicalRequirements.angular.impactedPagesOrModules
          ),
          impactedComponents: builder.control(document.stackTechnicalRequirements.angular.impactedComponents),
          formsAndValidations: builder.control(document.stackTechnicalRequirements.angular.formsAndValidations),
          apiContracts: builder.control(document.stackTechnicalRequirements.angular.apiContracts),
          uxChanges: builder.control(document.stackTechnicalRequirements.angular.uxChanges),
          responsiveAndStates: builder.control(
            document.stackTechnicalRequirements.angular.responsiveAndStates
          )
        }),
        nodeNest: builder.group({
          impactedEndpoints: builder.control(
            document.stackTechnicalRequirements.nodeNest.impactedEndpoints
          ),
          dtosAndContracts: builder.control(document.stackTechnicalRequirements.nodeNest.dtosAndContracts),
          impactedServices: builder.control(document.stackTechnicalRequirements.nodeNest.impactedServices),
          middlewareGuardsInterceptors: builder.control(
            document.stackTechnicalRequirements.nodeNest.middlewareGuardsInterceptors
          ),
          errorHandling: builder.control(document.stackTechnicalRequirements.nodeNest.errorHandling),
          externalIntegrations: builder.control(
            document.stackTechnicalRequirements.nodeNest.externalIntegrations
          )
        }),
        n8n: builder.group({
          workflowType: builder.control(document.stackTechnicalRequirements.n8n.workflowType),
          trigger: builder.control(document.stackTechnicalRequirements.n8n.trigger),
          keyNodes: builder.control(document.stackTechnicalRequirements.n8n.keyNodes),
          requiredCredentials: builder.control(document.stackTechnicalRequirements.n8n.requiredCredentials),
          retriesAndErrors: builder.control(document.stackTechnicalRequirements.n8n.retriesAndErrors),
          externalDependencies: builder.control(document.stackTechnicalRequirements.n8n.externalDependencies)
        }),
        infrastructure: builder.group({
          envVariables: builder.control(document.stackTechnicalRequirements.infrastructure.envVariables),
          domainsDns: builder.control(document.stackTechnicalRequirements.infrastructure.domainsDns),
          servicesProcesses: builder.control(document.stackTechnicalRequirements.infrastructure.servicesProcesses),
          restarts: builder.control(document.stackTechnicalRequirements.infrastructure.restarts),
          persistentStorage: builder.control(
            document.stackTechnicalRequirements.infrastructure.persistentStorage
          ),
          backups: builder.control(document.stackTechnicalRequirements.infrastructure.backups),
          rollback: builder.control(document.stackTechnicalRequirements.infrastructure.rollback),
          providers: builder.control(document.stackTechnicalRequirements.infrastructure.providers)
        })
      }),
      validations: builder.group({
        keyValidations: builder.control(document.validations.keyValidations, {
          validators: [trimmedRequiredValidator()]
        }),
        nonFunctionalValidations: builder.control(document.validations.nonFunctionalValidations),
        evidenceExpected: builder.control(document.validations.evidenceExpected)
      }),
      testPlan: builder.group({
        minimumPlan: builder.control(document.testPlan.minimumPlan, {
          validators: [trimmedRequiredValidator()]
        }),
        testData: builder.control(document.testPlan.testData),
        qaNotes: builder.control(document.testPlan.qaNotes)
      }),
      deploymentPlan: builder.group({
        prerequisites: builder.control(document.deploymentPlan.prerequisites),
        deploymentSteps: builder.control(document.deploymentPlan.deploymentSteps, {
          validators: [trimmedRequiredValidator()]
        }),
        postDeploymentChecks: builder.control(document.deploymentPlan.postDeploymentChecks)
      }),
      rollbackPlan: builder.group(
        {
          rollbackPlan: builder.control(document.rollbackPlan.rollbackPlan),
          notApplicableJustification: builder.control(document.rollbackPlan.notApplicableJustification)
        },
        { validators: [rollbackPlanValidator()] }
      ),
      observability: builder.group({
        risks: builder.control(document.observability.risks),
        monitoring: builder.control(document.observability.monitoring),
        alerts: builder.control(document.observability.alerts)
      }),
      notes: builder.control(document.notes),
      updatedAt: builder.control(document.updatedAt)
    });
  }

  private createFunctionalRequirementGroup(
    requirement: FunctionalRequirementItem
  ): FunctionalRequirementItemFormGroup {
    const builder = this.formBuilder.nonNullable;
    return builder.group({
      title: builder.control(requirement.title),
      businessNeed: builder.control(requirement.businessNeed, {
        validators: [trimmedRequiredValidator()]
      }),
      expectedResult: builder.control(requirement.expectedResult, {
        validators: [trimmedRequiredValidator()]
      })
    });
  }

  private normalizeFunctionalRequirements(
    requirements: FunctionalRequirementItem[]
  ): FunctionalRequirementItem[] {
    if (requirements.length > 0) {
      return requirements;
    }

    return [
      {
        title: '',
        businessNeed: '',
        expectedResult: ''
      }
    ];
  }
}

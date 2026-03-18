import { FormControl, FormGroup } from '@angular/forms';
import {
  AngularTechnicalRequirements,
  ChangeType,
  InfrastructureTechnicalRequirements,
  N8nTechnicalRequirements,
  NodeNestTechnicalRequirements,
  PhpTechnicalRequirements,
  ShopifyTechnicalRequirements,
  StackId
} from '../models/delivery-requirement.model';

export interface DeliveryMetadataFormModel {
  deliveryName: FormControl<string>;
  author: FormControl<string>;
  date: FormControl<string>;
  changeType: FormControl<ChangeType>;
  ticket: FormControl<string>;
  summary: FormControl<string>;
}

export interface DeliveryContextFormModel {
  background: FormControl<string>;
  objective: FormControl<string>;
  successCriteria: FormControl<string>;
}

export interface DeliveryScopeFormModel {
  inScope: FormControl<string>;
  outOfScope: FormControl<string>;
  assumptions: FormControl<string>;
}

export interface DeliveryFunctionalFormModel {
  requirements: FormControl<string>;
  acceptanceCriteria: FormControl<string>;
  businessRules: FormControl<string>;
}

export interface DeliveryTechnicalFormModel {
  architectureNotes: FormControl<string>;
  dependencies: FormControl<string>;
}

export interface DeliveryValidationsFormModel {
  keyValidations: FormControl<string>;
  nonFunctionalValidations: FormControl<string>;
  evidenceExpected: FormControl<string>;
}

export interface DeliveryTestPlanFormModel {
  minimumPlan: FormControl<string>;
  testData: FormControl<string>;
  qaNotes: FormControl<string>;
}

export interface DeliveryDeploymentFormModel {
  prerequisites: FormControl<string>;
  deploymentSteps: FormControl<string>;
  postDeploymentChecks: FormControl<string>;
}

export interface DeliveryRollbackFormModel {
  rollbackPlan: FormControl<string>;
  notApplicableJustification: FormControl<string>;
}

export interface DeliveryObservabilityFormModel {
  risks: FormControl<string>;
  monitoring: FormControl<string>;
  alerts: FormControl<string>;
}

export interface PhpTechnicalRequirementsFormModel {
  legacyModules: FormControl<string>;
  scriptsOrProcesses: FormControl<string>;
  validations: FormControl<string>;
  routesOrFiles: FormControl<string>;
  compatibility: FormControl<string>;
}

export interface ShopifyTechnicalRequirementsFormModel {
  sectionsSnippetsTemplates: FormControl<string>;
  checkoutCartCustomerFlows: FormControl<string>;
  webhooks: FormControl<string>;
  appsIntegrations: FormControl<string>;
  metafieldsObjects: FormControl<string>;
}

export interface AngularTechnicalRequirementsFormModel {
  impactedPagesOrModules: FormControl<string>;
  impactedComponents: FormControl<string>;
  formsAndValidations: FormControl<string>;
  apiContracts: FormControl<string>;
  uxChanges: FormControl<string>;
  responsiveAndStates: FormControl<string>;
}

export interface NodeNestTechnicalRequirementsFormModel {
  impactedEndpoints: FormControl<string>;
  dtosAndContracts: FormControl<string>;
  impactedServices: FormControl<string>;
  middlewareGuardsInterceptors: FormControl<string>;
  errorHandling: FormControl<string>;
  externalIntegrations: FormControl<string>;
}

export interface N8nTechnicalRequirementsFormModel {
  workflowType: FormControl<string>;
  trigger: FormControl<string>;
  keyNodes: FormControl<string>;
  requiredCredentials: FormControl<string>;
  retriesAndErrors: FormControl<string>;
  externalDependencies: FormControl<string>;
}

export interface InfrastructureTechnicalRequirementsFormModel {
  envVariables: FormControl<string>;
  domainsDns: FormControl<string>;
  servicesProcesses: FormControl<string>;
  restarts: FormControl<string>;
  persistentStorage: FormControl<string>;
  backups: FormControl<string>;
  rollback: FormControl<string>;
  providers: FormControl<string>;
}

export interface StackTechnicalRequirementsFormModel {
  php: FormGroup<PhpTechnicalRequirementsFormModel>;
  shopify: FormGroup<ShopifyTechnicalRequirementsFormModel>;
  angular: FormGroup<AngularTechnicalRequirementsFormModel>;
  nodeNest: FormGroup<NodeNestTechnicalRequirementsFormModel>;
  n8n: FormGroup<N8nTechnicalRequirementsFormModel>;
  infrastructure: FormGroup<InfrastructureTechnicalRequirementsFormModel>;
}

export interface DeliveryRequirementFormModel {
  schemaVersion: FormControl<number>;
  metadata: FormGroup<DeliveryMetadataFormModel>;
  context: FormGroup<DeliveryContextFormModel>;
  scope: FormGroup<DeliveryScopeFormModel>;
  impactedStacks: FormControl<StackId[]>;
  functionalRequirements: FormGroup<DeliveryFunctionalFormModel>;
  technicalRequirements: FormGroup<DeliveryTechnicalFormModel>;
  stackTechnicalRequirements: FormGroup<StackTechnicalRequirementsFormModel>;
  validations: FormGroup<DeliveryValidationsFormModel>;
  testPlan: FormGroup<DeliveryTestPlanFormModel>;
  deploymentPlan: FormGroup<DeliveryDeploymentFormModel>;
  rollbackPlan: FormGroup<DeliveryRollbackFormModel>;
  observability: FormGroup<DeliveryObservabilityFormModel>;
  notes: FormControl<string>;
  updatedAt: FormControl<string>;
}

export type DeliveryRequirementForm = FormGroup<DeliveryRequirementFormModel>;

export type StackTechnicalRequirementValueById = {
  php: PhpTechnicalRequirements;
  shopify: ShopifyTechnicalRequirements;
  angular: AngularTechnicalRequirements;
  nodeNest: NodeNestTechnicalRequirements;
  n8n: N8nTechnicalRequirements;
  infrastructure: InfrastructureTechnicalRequirements;
};

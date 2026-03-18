export const DELIVERY_REQUIREMENT_SCHEMA_VERSION = 1;

export const STACK_IDS = [
  'php',
  'shopify',
  'angular',
  'nodeNest',
  'n8n',
  'infrastructure'
] as const;

export type StackId = (typeof STACK_IDS)[number];

export const CHANGE_TYPES = [
  'proyecto',
  'característica',
  'mejora',
  'corrección de error',
  'corrección de emergencia',
  'mantenimiento'
] as const;

export type ChangeType = (typeof CHANGE_TYPES)[number];

export interface DeliveryRequirementMetadata {
  deliveryName: string;
  author: string;
  date: string;
  changeType: ChangeType;
  ticket: string;
  summary: string;
}

export interface DeliveryRequirementContext {
  background: string;
  objective: string;
  successCriteria: string;
}

export interface DeliveryRequirementScope {
  inScope: string;
  outOfScope: string;
  assumptions: string;
}

export interface DeliveryRequirementFunctional {
  requirements: string;
  acceptanceCriteria: string;
  businessRules: string;
}

export interface DeliveryRequirementTechnical {
  architectureNotes: string;
  dependencies: string;
}

export interface DeliveryRequirementValidations {
  keyValidations: string;
  nonFunctionalValidations: string;
  evidenceExpected: string;
}

export interface DeliveryRequirementTestPlan {
  minimumPlan: string;
  testData: string;
  qaNotes: string;
}

export interface DeliveryRequirementDeploymentPlan {
  prerequisites: string;
  deploymentSteps: string;
  postDeploymentChecks: string;
}

export interface DeliveryRequirementRollbackPlan {
  rollbackPlan: string;
  notApplicableJustification: string;
}

export interface DeliveryRequirementObservability {
  risks: string;
  monitoring: string;
  alerts: string;
}

export interface PhpTechnicalRequirements {
  legacyModules: string;
  scriptsOrProcesses: string;
  validations: string;
  routesOrFiles: string;
  compatibility: string;
}

export interface ShopifyTechnicalRequirements {
  sectionsSnippetsTemplates: string;
  checkoutCartCustomerFlows: string;
  webhooks: string;
  appsIntegrations: string;
  metafieldsObjects: string;
}

export interface AngularTechnicalRequirements {
  impactedPagesOrModules: string;
  impactedComponents: string;
  formsAndValidations: string;
  apiContracts: string;
  uxChanges: string;
  responsiveAndStates: string;
}

export interface NodeNestTechnicalRequirements {
  impactedEndpoints: string;
  dtosAndContracts: string;
  impactedServices: string;
  middlewareGuardsInterceptors: string;
  errorHandling: string;
  externalIntegrations: string;
}

export interface N8nTechnicalRequirements {
  workflowType: string;
  trigger: string;
  keyNodes: string;
  requiredCredentials: string;
  retriesAndErrors: string;
  externalDependencies: string;
}

export interface InfrastructureTechnicalRequirements {
  envVariables: string;
  domainsDns: string;
  servicesProcesses: string;
  restarts: string;
  persistentStorage: string;
  backups: string;
  rollback: string;
  providers: string;
}

export interface StackTechnicalRequirements {
  php: PhpTechnicalRequirements;
  shopify: ShopifyTechnicalRequirements;
  angular: AngularTechnicalRequirements;
  nodeNest: NodeNestTechnicalRequirements;
  n8n: N8nTechnicalRequirements;
  infrastructure: InfrastructureTechnicalRequirements;
}

export interface DeliveryRequirementDocument {
  schemaVersion: number;
  metadata: DeliveryRequirementMetadata;
  context: DeliveryRequirementContext;
  scope: DeliveryRequirementScope;
  impactedStacks: StackId[];
  functionalRequirements: DeliveryRequirementFunctional;
  technicalRequirements: DeliveryRequirementTechnical;
  stackTechnicalRequirements: StackTechnicalRequirements;
  validations: DeliveryRequirementValidations;
  testPlan: DeliveryRequirementTestPlan;
  deploymentPlan: DeliveryRequirementDeploymentPlan;
  rollbackPlan: DeliveryRequirementRollbackPlan;
  observability: DeliveryRequirementObservability;
  notes: string;
  updatedAt: string;
}

export interface PersistedDeliveryRequirementDraft {
  schemaVersion: number;
  savedAt: string;
  data: DeliveryRequirementDocument;
}

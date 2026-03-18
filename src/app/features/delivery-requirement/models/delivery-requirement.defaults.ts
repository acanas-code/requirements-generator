import {
  DELIVERY_REQUIREMENT_SCHEMA_VERSION,
  DeliveryRequirementDocument
} from './delivery-requirement.model';

function toLocalDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function createEmptyDeliveryRequirementDocument(now: Date = new Date()): DeliveryRequirementDocument {
  const nowIso = now.toISOString();

  return {
    schemaVersion: DELIVERY_REQUIREMENT_SCHEMA_VERSION,
    metadata: {
      deliveryName: '',
      author: '',
      date: toLocalDateISO(now),
      changeType: 'característica',
      ticket: '',
      summary: ''
    },
    context: {
      background: '',
      objective: '',
      successCriteria: ''
    },
    scope: {
      inScope: '',
      outOfScope: '',
      assumptions: ''
    },
    impactedStacks: [],
    functionalRequirements: {
      requirements: '',
      acceptanceCriteria: '',
      businessRules: ''
    },
    technicalRequirements: {
      architectureNotes: '',
      dependencies: ''
    },
    stackTechnicalRequirements: {
      php: {
        legacyModules: '',
        scriptsOrProcesses: '',
        validations: '',
        routesOrFiles: '',
        compatibility: ''
      },
      shopify: {
        sectionsSnippetsTemplates: '',
        checkoutCartCustomerFlows: '',
        webhooks: '',
        appsIntegrations: '',
        metafieldsObjects: ''
      },
      angular: {
        impactedPagesOrModules: '',
        impactedComponents: '',
        formsAndValidations: '',
        apiContracts: '',
        uxChanges: '',
        responsiveAndStates: ''
      },
      nodeNest: {
        impactedEndpoints: '',
        dtosAndContracts: '',
        impactedServices: '',
        middlewareGuardsInterceptors: '',
        errorHandling: '',
        externalIntegrations: ''
      },
      n8n: {
        workflowType: '',
        trigger: '',
        keyNodes: '',
        requiredCredentials: '',
        retriesAndErrors: '',
        externalDependencies: ''
      },
      infrastructure: {
        envVariables: '',
        domainsDns: '',
        servicesProcesses: '',
        restarts: '',
        persistentStorage: '',
        backups: '',
        rollback: '',
        providers: ''
      }
    },
    validations: {
      keyValidations: '',
      nonFunctionalValidations: '',
      evidenceExpected: ''
    },
    testPlan: {
      minimumPlan: '',
      testData: '',
      qaNotes: ''
    },
    deploymentPlan: {
      prerequisites: '',
      deploymentSteps: '',
      postDeploymentChecks: ''
    },
    rollbackPlan: {
      rollbackPlan: '',
      notApplicableJustification: ''
    },
    observability: {
      risks: '',
      monitoring: '',
      alerts: ''
    },
    notes: '',
    updatedAt: nowIso
  };
}

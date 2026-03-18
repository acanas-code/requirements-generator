import { Injectable } from '@angular/core';
import { STACK_OPTIONS } from '../models/delivery-requirement.constants';
import {
  DeliveryRequirementDocument,
  StackId,
  StackTechnicalRequirements
} from '../models/delivery-requirement.model';
import {
  DeliveryRequirementPreview,
  PreviewLineItem,
  PreviewSection
} from '../models/delivery-requirement-preview.model';

@Injectable({ providedIn: 'root' })
export class DeliveryRequirementDocumentBuilderService {
  build(document: DeliveryRequirementDocument): DeliveryRequirementPreview {
    return {
      title: document.metadata.deliveryName || 'Requerimiento de entrega sin título',
      subtitle: `Autor: ${document.metadata.author || 'No definido'} | Fecha: ${document.metadata.date || 'No definida'}`,
      generatedAt: new Date().toISOString(),
      sections: [
        this.section('Información general', [
          this.item('Tipo de cambio', document.metadata.changeType),
          this.item('Ticket / referencia', document.metadata.ticket),
          this.item('Resumen ejecutivo', document.metadata.summary)
        ]),
        this.section('Contexto y objetivo', [
          this.item('Contexto', document.context.background),
          this.item('Objetivo del cambio', document.context.objective),
          this.item('Criterios de éxito', document.context.successCriteria)
        ]),
        this.section('Alcance y fuera de alcance', [
          this.item('En alcance', document.scope.inScope),
          this.item('Fuera de alcance', document.scope.outOfScope),
          this.item('Supuestos', document.scope.assumptions)
        ]),
        this.section('Stacks impactados', [
          this.item(
            'Stacks seleccionados',
            document.impactedStacks
              .map((stackId) => STACK_OPTIONS.find((stack) => stack.id === stackId)?.label ?? stackId)
              .join(', ')
          )
        ]),
        this.section('Requerimientos funcionales', [
          this.item('Requerimientos', document.functionalRequirements.requirements),
          this.item('Criterios de aceptación', document.functionalRequirements.acceptanceCriteria),
          this.item('Reglas de negocio', document.functionalRequirements.businessRules)
        ]),
        this.section('Requerimientos técnicos', [
          this.item('Arquitectura y decisiones', document.technicalRequirements.architectureNotes),
          this.item('Dependencias técnicas', document.technicalRequirements.dependencies)
        ]),
        this.section('Validaciones', [
          this.item('Validaciones clave', document.validations.keyValidations),
          this.item('Validaciones no funcionales', document.validations.nonFunctionalValidations),
          this.item('Evidencia esperada', document.validations.evidenceExpected)
        ]),
        this.section('Plan de pruebas', [
          this.item('Plan mínimo', document.testPlan.minimumPlan),
          this.item('Datos de prueba', document.testPlan.testData),
          this.item('Notas QA', document.testPlan.qaNotes)
        ]),
        this.section('Despliegue y prerequisitos', [
          this.item('Prerequisitos', document.deploymentPlan.prerequisites),
          this.item('Pasos de despliegue', document.deploymentPlan.deploymentSteps),
          this.item('Chequeos post-despliegue', document.deploymentPlan.postDeploymentChecks)
        ]),
        this.section('Riesgos, monitoreo y rollback', [
          this.item('Riesgos', document.observability.risks),
          this.item('Monitoreo', document.observability.monitoring),
          this.item('Alertas', document.observability.alerts),
          this.item('Plan de rollback', document.rollbackPlan.rollbackPlan),
          this.item('Justificación de no aplicar rollback', document.rollbackPlan.notApplicableJustification)
        ]),
        ...this.stackSections(document.impactedStacks, document.stackTechnicalRequirements),
        this.section('Notas', [this.item('Notas adicionales', document.notes)])
      ]
    };
  }

  private section(title: string, items: PreviewLineItem[]): PreviewSection {
    return {
      title,
      items: items.filter((item) => item.value.trim().length > 0)
    };
  }

  private item(label: string, value: string): PreviewLineItem {
    return { label, value: value ?? '' };
  }

  private stackSections(
    stacks: StackId[],
    stackRequirements: StackTechnicalRequirements
  ): PreviewSection[] {
    return stacks.map((stackId) => {
      switch (stackId) {
        case 'php':
          return this.section('Detalle técnico - PHP', [
            this.item('Módulos legacy', stackRequirements.php.legacyModules),
            this.item('Scripts o procesos', stackRequirements.php.scriptsOrProcesses),
            this.item('Validaciones', stackRequirements.php.validations),
            this.item('Rutas o archivos', stackRequirements.php.routesOrFiles),
            this.item('Compatibilidad', stackRequirements.php.compatibility)
          ]);
        case 'shopify':
          return this.section('Detalle técnico - Shopify', [
            this.item('Sections / snippets / templates', stackRequirements.shopify.sectionsSnippetsTemplates),
            this.item(
              'Checkout / cart / customer flows',
              stackRequirements.shopify.checkoutCartCustomerFlows
            ),
            this.item('Webhooks', stackRequirements.shopify.webhooks),
            this.item('Apps o integraciones', stackRequirements.shopify.appsIntegrations),
            this.item('Metafields / objetos', stackRequirements.shopify.metafieldsObjects)
          ]);
        case 'angular':
          return this.section('Detalle técnico - Angular', [
            this.item('Páginas o módulos', stackRequirements.angular.impactedPagesOrModules),
            this.item('Componentes', stackRequirements.angular.impactedComponents),
            this.item('Formularios y validaciones', stackRequirements.angular.formsAndValidations),
            this.item('Contratos API', stackRequirements.angular.apiContracts),
            this.item('Cambios visuales o UX', stackRequirements.angular.uxChanges),
            this.item('Responsive y estados especiales', stackRequirements.angular.responsiveAndStates)
          ]);
        case 'nodeNest':
          return this.section('Detalle técnico - Node.js / NestJS', [
            this.item('Endpoints', stackRequirements.nodeNest.impactedEndpoints),
            this.item('DTOs o contratos', stackRequirements.nodeNest.dtosAndContracts),
            this.item('Servicios', stackRequirements.nodeNest.impactedServices),
            this.item(
              'Middlewares / guards / interceptors',
              stackRequirements.nodeNest.middlewareGuardsInterceptors
            ),
            this.item('Manejo de errores', stackRequirements.nodeNest.errorHandling),
            this.item('Integraciones externas', stackRequirements.nodeNest.externalIntegrations)
          ]);
        case 'n8n':
          return this.section('Detalle técnico - n8n', [
            this.item('Workflow', stackRequirements.n8n.workflowType),
            this.item('Trigger', stackRequirements.n8n.trigger),
            this.item('Nodos clave', stackRequirements.n8n.keyNodes),
            this.item('Credenciales requeridas', stackRequirements.n8n.requiredCredentials),
            this.item('Reintentos y errores', stackRequirements.n8n.retriesAndErrors),
            this.item('Dependencias externas', stackRequirements.n8n.externalDependencies)
          ]);
        case 'infrastructure':
          return this.section('Detalle técnico - Infraestructura', [
            this.item('Variables de entorno', stackRequirements.infrastructure.envVariables),
            this.item('Dominios / DNS', stackRequirements.infrastructure.domainsDns),
            this.item('Servicios / procesos', stackRequirements.infrastructure.servicesProcesses),
            this.item('Reinicios', stackRequirements.infrastructure.restarts),
            this.item('Almacenamiento persistente', stackRequirements.infrastructure.persistentStorage),
            this.item('Backups', stackRequirements.infrastructure.backups),
            this.item('Rollback', stackRequirements.infrastructure.rollback),
            this.item('DigitalOcean / Cloudways', stackRequirements.infrastructure.providers)
          ]);
        default:
          return this.section('Detalle técnico', []);
      }
    });
  }
}

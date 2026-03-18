import { Injectable } from '@angular/core';
import { createEmptyDeliveryRequirementDocument } from '../models/delivery-requirement.defaults';
import {
  DELIVERY_REQUIREMENT_SCHEMA_VERSION,
  DeliveryRequirementDocument,
  FunctionalRequirementItem,
  StackId
} from '../models/delivery-requirement.model';

@Injectable({ providedIn: 'root' })
export class DeliveryRequirementMapperService {
  toDocument(source: DeliveryRequirementDocument): DeliveryRequirementDocument {
    return {
      ...source,
      schemaVersion: DELIVERY_REQUIREMENT_SCHEMA_VERSION,
      functionalRequirements: this.normalizeFunctionalRequirements(source.functionalRequirements),
      impactedStacks: this.normalizeStacks(source.impactedStacks),
      updatedAt: new Date().toISOString()
    };
  }

  mergeWithDefaults(raw: unknown): DeliveryRequirementDocument | null {
    if (!this.isRecord(raw)) {
      return null;
    }

    const defaults = createEmptyDeliveryRequirementDocument();
    const data = raw as Partial<DeliveryRequirementDocument>;

    return {
      ...defaults,
      schemaVersion: DELIVERY_REQUIREMENT_SCHEMA_VERSION,
      metadata: { ...defaults.metadata, ...this.getRecord(data.metadata) },
      context: { ...defaults.context, ...this.getRecord(data.context) },
      scope: { ...defaults.scope, ...this.getRecord(data.scope) },
      impactedStacks: this.normalizeStacks(data.impactedStacks),
      functionalRequirements: this.normalizeFunctionalRequirements(data.functionalRequirements),
      technicalRequirements: {
        ...defaults.technicalRequirements,
        ...this.getRecord(data.technicalRequirements)
      },
      stackTechnicalRequirements: {
        php: {
          ...defaults.stackTechnicalRequirements.php,
          ...this.getRecord(data.stackTechnicalRequirements?.php)
        },
        shopify: {
          ...defaults.stackTechnicalRequirements.shopify,
          ...this.getRecord(data.stackTechnicalRequirements?.shopify)
        },
        angular: {
          ...defaults.stackTechnicalRequirements.angular,
          ...this.getRecord(data.stackTechnicalRequirements?.angular)
        },
        nodeNest: {
          ...defaults.stackTechnicalRequirements.nodeNest,
          ...this.getRecord(data.stackTechnicalRequirements?.nodeNest)
        },
        n8n: {
          ...defaults.stackTechnicalRequirements.n8n,
          ...this.getRecord(data.stackTechnicalRequirements?.n8n)
        },
        infrastructure: {
          ...defaults.stackTechnicalRequirements.infrastructure,
          ...this.getRecord(data.stackTechnicalRequirements?.infrastructure)
        }
      },
      validations: { ...defaults.validations, ...this.getRecord(data.validations) },
      testPlan: { ...defaults.testPlan, ...this.getRecord(data.testPlan) },
      deploymentPlan: { ...defaults.deploymentPlan, ...this.getRecord(data.deploymentPlan) },
      rollbackPlan: { ...defaults.rollbackPlan, ...this.getRecord(data.rollbackPlan) },
      observability: { ...defaults.observability, ...this.getRecord(data.observability) },
      notes: typeof data.notes === 'string' ? data.notes : defaults.notes,
      updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : defaults.updatedAt
    };
  }

  private normalizeStacks(value: unknown): StackId[] {
    if (!Array.isArray(value)) {
      return [];
    }

    const allowed: StackId[] = ['php', 'shopify', 'angular', 'nodeNest', 'n8n', 'infrastructure'];
    return value.filter((item): item is StackId => allowed.includes(item as StackId));
  }

  private normalizeFunctionalRequirements(value: unknown): FunctionalRequirementItem[] {
    const defaultRequirements = createEmptyDeliveryRequirementDocument().functionalRequirements;

    if (Array.isArray(value)) {
      const normalized = value
        .filter((item) => this.isRecord(item))
        .map((item) => ({
          title: typeof item['title'] === 'string' ? item['title'] : '',
          businessNeed:
            typeof item['businessNeed'] === 'string' ? item['businessNeed'] : '',
          expectedResult:
            typeof item['expectedResult'] === 'string' ? item['expectedResult'] : ''
        }));

      return normalized.length > 0 ? normalized : defaultRequirements;
    }

    // Backward compatibility with previous schema
    if (this.isRecord(value)) {
      const legacyBusinessNeed =
        typeof value['requirements'] === 'string' ? value['requirements'] : '';
      const legacyExpectedResult =
        typeof value['acceptanceCriteria'] === 'string' ? value['acceptanceCriteria'] : '';

      if (legacyBusinessNeed || legacyExpectedResult) {
        return [
          {
            title: '',
            businessNeed: legacyBusinessNeed,
            expectedResult: legacyExpectedResult
          }
        ];
      }
    }

    return defaultRequirements;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private getRecord(value: unknown): Record<string, unknown> {
    return this.isRecord(value) ? value : {};
  }
}

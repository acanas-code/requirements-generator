import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { createEmptyDeliveryRequirementDocument } from '../models/delivery-requirement.defaults';
import { DeliveryRequirementDocumentBuilderService } from './delivery-requirement-document-builder.service';
import { DeliveryRequirementMapperService } from './delivery-requirement-mapper.service';

describe('DeliveryRequirementDocumentBuilderService', () => {
  let builder: DeliveryRequirementDocumentBuilderService;
  let mapper: DeliveryRequirementMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    builder = TestBed.inject(DeliveryRequirementDocumentBuilderService);
    mapper = TestBed.inject(DeliveryRequirementMapperService);
  });

  it('builds preview sections including selected stacks', () => {
    const document = createEmptyDeliveryRequirementDocument();
    document.metadata.deliveryName = 'Checkout refactor';
    document.metadata.author = 'TI';
    document.impactedStacks = ['angular', 'nodeNest'];
    document.stackTechnicalRequirements.angular.impactedComponents = 'CheckoutSummaryComponent';
    document.stackTechnicalRequirements.nodeNest.impactedEndpoints = 'POST /api/checkout';

    const preview = builder.build(document);

    expect(preview.title).toBe('Checkout refactor');
    expect(preview.sections.some((section) => section.title.includes('Angular'))).toBe(true);
    expect(preview.sections.some((section) => section.title.includes('Node.js / NestJS'))).toBe(true);
  });

  it('normalizes and maps raw data to the document schema', () => {
    const merged = mapper.mergeWithDefaults({
      metadata: { deliveryName: 'Entrega parcial' },
      impactedStacks: ['angular', 'invalid']
    });

    expect(merged).not.toBeNull();
    expect(merged?.metadata.deliveryName).toBe('Entrega parcial');
    expect(merged?.impactedStacks).toEqual(['angular']);
    expect(merged?.schemaVersion).toBe(1);
  });
});

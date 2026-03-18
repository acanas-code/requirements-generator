import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { createEmptyDeliveryRequirementDocument } from '../models/delivery-requirement.defaults';
import { DeliveryRequirementStorageService } from './delivery-requirement-storage.service';

describe('DeliveryRequirementStorageService', () => {
  let service: DeliveryRequirementStorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryRequirementStorageService);
  });

  it('saves and loads draft data', () => {
    const document = createEmptyDeliveryRequirementDocument();
    document.metadata.deliveryName = 'Entrega 1';

    service.saveDraft(document);
    const result = service.loadDraft();

    expect(result.status).toBe('loaded');
    expect(result.document?.metadata.deliveryName).toBe('Entrega 1');
  });

  it('handles corrupted draft safely', () => {
    localStorage.setItem('delivery-requirement-draft-v1', '{ not-json');

    const result = service.loadDraft();

    expect(result.status).toBe('corrupt');
    expect(result.document).toBeNull();
  });

  it('merges incomplete draft with defaults', () => {
    localStorage.setItem(
      'delivery-requirement-draft-v1',
      JSON.stringify({
        schemaVersion: 1,
        savedAt: new Date().toISOString(),
        data: {
          metadata: {
            deliveryName: 'Entrega parcial'
          }
        }
      })
    );

    const result = service.loadDraft();

    expect(result.status).toBe('loaded');
    expect(result.document?.metadata.deliveryName).toBe('Entrega parcial');
    expect(result.document?.context.objective).toBe('');
  });

  it('rejects drafts with outdated schema version', () => {
    localStorage.setItem(
      'delivery-requirement-draft-v1',
      JSON.stringify({
        schemaVersion: 999,
        savedAt: new Date().toISOString(),
        data: {
          metadata: { deliveryName: 'Entrega vieja' }
        }
      })
    );

    const result = service.loadDraft();

    expect(result.status).toBe('corrupt');
    expect(result.document).toBeNull();
  });
});

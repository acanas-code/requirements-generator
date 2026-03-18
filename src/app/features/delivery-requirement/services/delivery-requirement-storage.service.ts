import { Injectable } from '@angular/core';
import {
  DELIVERY_REQUIREMENT_SCHEMA_VERSION,
  DeliveryRequirementDocument,
  PersistedDeliveryRequirementDraft
} from '../models/delivery-requirement.model';
import { DeliveryRequirementMapperService } from './delivery-requirement-mapper.service';

type DraftLoadStatus = 'empty' | 'loaded' | 'corrupt';

export interface DraftLoadResult {
  status: DraftLoadStatus;
  document: DeliveryRequirementDocument | null;
}

@Injectable({ providedIn: 'root' })
export class DeliveryRequirementStorageService {
  private static readonly STORAGE_KEY = 'delivery-requirement-draft-v1';

  constructor(private readonly mapper: DeliveryRequirementMapperService) {}

  saveDraft(document: DeliveryRequirementDocument): void {
    const payload: PersistedDeliveryRequirementDraft = {
      schemaVersion: DELIVERY_REQUIREMENT_SCHEMA_VERSION,
      savedAt: new Date().toISOString(),
      data: document
    };

    localStorage.setItem(
      DeliveryRequirementStorageService.STORAGE_KEY,
      JSON.stringify(payload)
    );
  }

  loadDraft(): DraftLoadResult {
    const rawDraft = localStorage.getItem(DeliveryRequirementStorageService.STORAGE_KEY);

    if (!rawDraft) {
      return { status: 'empty', document: null };
    }

    try {
      const parsed = JSON.parse(rawDraft) as Partial<PersistedDeliveryRequirementDraft>;

      if (parsed?.schemaVersion !== DELIVERY_REQUIREMENT_SCHEMA_VERSION) {
        return { status: 'corrupt', document: null };
      }

      const merged = this.mapper.mergeWithDefaults(parsed?.data);

      if (!merged) {
        return { status: 'corrupt', document: null };
      }

      return { status: 'loaded', document: merged };
    } catch {
      return { status: 'corrupt', document: null };
    }
  }

  clearDraft(): void {
    localStorage.removeItem(DeliveryRequirementStorageService.STORAGE_KEY);
  }
}

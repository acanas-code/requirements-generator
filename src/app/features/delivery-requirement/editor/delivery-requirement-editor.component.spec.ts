import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createEmptyDeliveryRequirementDocument } from '../models/delivery-requirement.defaults';
import { DeliveryRequirementEditorComponent } from './delivery-requirement-editor.component';

describe('DeliveryRequirementEditorComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [DeliveryRequirementEditorComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('clears form and local draft when user confirms clean action', () => {
    const draft = createEmptyDeliveryRequirementDocument();
    draft.metadata.deliveryName = 'Entrega guardada';

    localStorage.setItem(
      'delivery-requirement-draft-v1',
      JSON.stringify({
        schemaVersion: 1,
        savedAt: new Date().toISOString(),
        data: draft
      })
    );

    const fixture = TestBed.createComponent(DeliveryRequirementEditorComponent);
    fixture.detectChanges();

    vi.spyOn(window, 'confirm').mockReturnValue(true);

    const clearButton = Array.from(
      fixture.nativeElement.querySelectorAll('button')
    ).find((button) => (button as HTMLElement).textContent?.includes('Limpiar plantilla')) as HTMLElement;

    clearButton.click();
    fixture.detectChanges();

    const document = fixture.componentInstance.state.buildDocument();
    expect(document.metadata.deliveryName).toBe('');
    expect(localStorage.getItem('delivery-requirement-draft-v1')).toBeNull();
  });

  it('recovers existing draft on startup', () => {
    const draft = createEmptyDeliveryRequirementDocument();
    draft.metadata.deliveryName = 'Entrega recuperada';

    localStorage.setItem(
      'delivery-requirement-draft-v1',
      JSON.stringify({
        schemaVersion: 1,
        savedAt: new Date().toISOString(),
        data: draft
      })
    );

    const fixture = TestBed.createComponent(DeliveryRequirementEditorComponent);
    fixture.detectChanges();

    const document = fixture.componentInstance.state.buildDocument();
    expect(document.metadata.deliveryName).toBe('Entrega recuperada');
    expect(fixture.nativeElement.textContent).toContain('Se recuperó un borrador');
  });

  it('updates section status when required fields are completed', () => {
    const fixture = TestBed.createComponent(DeliveryRequirementEditorComponent);
    fixture.detectChanges();

    fixture.componentInstance.state.form.controls.metadata.patchValue({
      deliveryName: 'Entrega UI',
      author: 'Equipo TI'
    });
    fixture.detectChanges();

    const firstSectionButton = fixture.nativeElement.querySelector('.section-nav__button') as HTMLElement;
    expect(firstSectionButton.textContent).toContain('Completa');
  });

  it('hides next button on final preview section', () => {
    const fixture = TestBed.createComponent(DeliveryRequirementEditorComponent);
    fixture.detectChanges();

    fixture.componentInstance.state.goToSection(fixture.componentInstance.sections.length - 1);
    fixture.detectChanges();

    const nextButton = Array.from(fixture.nativeElement.querySelectorAll('button')).find((button) =>
      (button as HTMLElement).textContent?.includes('Siguiente')
    );
    const footer = fixture.nativeElement.querySelector('.editor-footer') as HTMLElement;

    expect(nextButton).toBeUndefined();
    expect(footer.textContent).toContain('Anterior');
    expect(footer.textContent).toContain('Abrir vista printable');
  });
});

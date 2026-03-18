import { Routes } from '@angular/router';
import { DeliveryRequirementEditorComponent } from './features/delivery-requirement/editor/delivery-requirement-editor.component';
import { DeliveryRequirementPreviewComponent } from './features/delivery-requirement/preview/delivery-requirement-preview.component';
import { DeliveryRequirementPrintComponent } from './features/delivery-requirement/print/delivery-requirement-print.component';

export const routes: Routes = [
  {
    path: '',
    component: DeliveryRequirementEditorComponent
  },
  {
    path: 'preview',
    component: DeliveryRequirementPreviewComponent
  },
  {
    path: 'print',
    component: DeliveryRequirementPrintComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

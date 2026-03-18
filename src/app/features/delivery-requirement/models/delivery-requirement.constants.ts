import { StackId } from './delivery-requirement.model';

export interface StackOption {
  id: StackId;
  label: string;
  description: string;
}

export interface DeliverySectionDefinition {
  id: string;
  title: string;
  subtitle: string;
}

export const STACK_OPTIONS: StackOption[] = [
  {
    id: 'php',
    label: 'PHP',
    description: 'Módulos legacy, scripts, validaciones y compatibilidad.'
  },
  {
    id: 'shopify',
    label: 'Shopify',
    description: 'Themes, checkout/cart, webhooks, apps y metafields.'
  },
  {
    id: 'angular',
    label: 'Angular + TypeScript',
    description: 'Módulos, componentes, formularios, API y UX.'
  },
  {
    id: 'nodeNest',
    label: 'Node.js / NestJS',
    description: 'Endpoints, DTOs, servicios, middlewares e integraciones.'
  },
  {
    id: 'n8n',
    label: 'n8n',
    description: 'Workflows, nodos, credenciales y manejo de errores.'
  },
  {
    id: 'infrastructure',
    label: 'Infraestructura',
    description: 'Variables, DNS, procesos, backups y rollback.'
  }
];

export const DELIVERY_SECTIONS: DeliverySectionDefinition[] = [
  {
    id: 'general',
    title: '1. Información general',
    subtitle: 'Identidad del requerimiento y responsables.'
  },
  {
    id: 'context',
    title: '2. Contexto y objetivo',
    subtitle: 'Problema, objetivo y criterios de éxito.'
  },
  {
    id: 'scope',
    title: '3. Alcance y fuera de alcance',
    subtitle: 'Qué cubre y qué no cubre esta entrega.'
  },
  {
    id: 'stacks',
    title: '4. Sistemas / stacks impactados',
    subtitle: 'Selección de stacks y detalle técnico condicionado.'
  },
  {
    id: 'functional',
    title: '5. Requerimientos funcionales',
    subtitle: 'Comportamiento esperado del cambio.'
  },
  {
    id: 'technical',
    title: '6. Requerimientos técnicos',
    subtitle: 'Decisiones técnicas transversales.'
  },
  {
    id: 'validations',
    title: '7. Validaciones',
    subtitle: 'Verificaciones clave para aprobar la entrega.'
  },
  {
    id: 'testPlan',
    title: '8. Plan de pruebas',
    subtitle: 'Casos mínimos de prueba y datos.'
  },
  {
    id: 'deployment',
    title: '9. Despliegue y prerequisitos',
    subtitle: 'Plan operativo de publicación.'
  },
  {
    id: 'risks',
    title: '10. Riesgos, monitoreo y rollback',
    subtitle: 'Contención, monitoreo y recuperación.'
  },
  {
    id: 'preview',
    title: '11. Vista previa final',
    subtitle: 'Documento consolidado para revisión y exportación.'
  }
];

# Generador de Requerimiento de Entrega

Aplicación interna en Angular + TypeScript para construir requerimientos de entrega técnica de forma guiada, consistente y exportable a PDF.

## Qué hace la app

- Guía el diligenciamiento del requerimiento en 11 secciones.
- Muestra campos condicionales por stack: PHP, Shopify, Angular, Node/Nest, n8n e Infraestructura.
- Valida progresivamente campos obligatorios mínimos.
- Calcula completitud por sección y completitud total.
- Genera vista previa consolidada del documento final.
- Permite exportación a PDF con impresión del navegador (`window.print()`).
- Guarda borrador automático en `localStorage` y lo recupera al recargar.
- Permite limpiar plantilla con confirmación y borrado del borrador persistido.

## Cómo correr

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en desarrollo:
```bash
npm start
```

3. Build de producción:
```bash
npm run build
```

4. Ejecutar pruebas:
```bash
npm test -- --watch=false
```

## Estructura del proyecto

```text
src/app/
  core/
  shared/
    components/
      section-shell/
  features/
    delivery-requirement/
      editor/
        components/
          general-info-section/
          context-section/
          scope-section/
          stacks-section/
          functional-section/
          technical-section/
          validations-section/
          test-plan-section/
          deployment-section/
          risk-rollback-section/
      preview/
        components/
      print/
      state/
      services/
      validators/
      models/
```

## Decisiones técnicas clave

- Angular standalone components.
- Formularios reactivos tipados como fuente de verdad.
- Separación clara entre editor, preview printable y persistencia local.
- Signals para estado local de UI (sección activa, progreso, preview reactiva).
- Validadores reutilizables para:
  - campos requeridos con trim,
  - selección mínima de stacks,
  - rollback obligatorio o justificación.
- Servicios pequeños y específicos:
  - `DeliveryRequirementFormFactory`
  - `DeliveryRequirementEditorStateService`
  - `DeliveryRequirementStorageService`
  - `DeliveryRequirementMapperService`
  - `DeliveryRequirementDocumentBuilderService`

## Autosave local

- Se guarda automáticamente en `localStorage` en cada cambio relevante (`debounceTime(250ms)`).
- Clave de almacenamiento: `delivery-requirement-draft-v1`.
- El payload incluye `schemaVersion` y `savedAt`.
- Al iniciar:
  - si hay borrador válido: se recupera,
  - si está corrupto: se descarta de forma segura,
  - si está incompleto: se fusiona con defaults tipados.

## Exportación a PDF

- La exportación se realiza con `window.print()`.
- Existe vista separada de preview y vista printable.
- Se aplican estilos de impresión:
  - `@page` A4,
  - `@media print`,
  - ocultamiento de controles interactivos (`.no-print`),
  - preservación de jerarquía del documento y bloques por sección.

## Testing incluido

- Unit tests de validadores.
- Unit tests de persistencia local.
- Unit tests de builder/mapper del documento final.
- Test de render condicional por stack.
- Test de flujo de limpiar plantilla.
- Test de recuperación automática de borrador.

## Siguientes pasos sugeridos

1. Exportar también a `.md` o `.docx` desde el mismo modelo.
2. Incorporar plantillas predefinidas por tipo de cambio.
3. Añadir historial local de versiones del borrador.
4. Incorporar validaciones de calidad más estrictas por stack.

# AGENTS.md

## Contexto del producto
Este repositorio contiene una aplicación interna en Angular + TypeScript para generar requerimientos de entrega técnica. El objetivo es estandarizar cómo el equipo documenta cambios, pruebas, despliegue y riesgos.

## Reglas de implementación
- Usa Angular moderno con standalone components
- Usa reactive forms tipados
- Usa Signals solo para estado local de UI, no para reemplazar reactive forms
- No uses Signal Forms experimentales
- Mantén una arquitectura orientada a feature
- Prefiere componentes pequeños
- Evita lógica compleja en templates
- Separa editor, preview, print y persistencia
- Usa nombres claros y consistentes
- No agregues backend en el MVP
- No uses librerías pesadas si Angular y el navegador ya resuelven el problema

## Reglas de UX
- La app debe guiar al usuario
- Debe mostrar campos condicionales por stack
- Debe ayudar a usuarios que no dominan todo el stack
- Debe tener validación progresiva
- Debe sentirse como una herramienta interna seria y útil

## Reglas de exportación
- El PDF debe resolverse con vista printable + window.print
- Usa @media print y @page
- Oculta elementos interactivos en impresión
- Mantén formato A4 limpio y profesional

## Reglas de calidad
- Mantén tipado fuerte
- Agrega pruebas base
- Revisa accesibilidad básica
- El flujo principal debe funcionar de punta a punta
- El README debe reflejar la arquitectura y decisiones técnicas reales
# Security Policy

## Reportar vulnerabilidades

No publiques detalles explotables de una vulnerabilidad en un issue público. Contacta al mantenedor por un canal privado cuando se designe uno.

## Reglas básicas

- Nunca subir claves API, tokens, archivos `.env`, proyectos `.aep` ni material privado.
- Los modelos deben producir acciones estructuradas, no scripts libres para ejecutar.
- Validar acciones mediante una lista permitida de tipos y parámetros.
- Solicitar confirmación antes de cambios con impacto significativo.
- Tratar toda respuesta de un modelo y todo contenido importado como datos no confiables.
- Mantener las credenciales fuera del frontend y del código compartido con ExtendScript.
- Revisar dependencias, permisos y rutas antes de añadir nuevas capacidades.

Este documento es una política inicial, no una auditoría de seguridad.

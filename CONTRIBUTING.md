# Contributing

Gracias por contribuir a AE Agent.

## Principios de desarrollo

1. Mantener separados el razonamiento del modelo y la ejecución de acciones.
2. Toda acción que modifique un proyecto debe validarse antes de ejecutarse.
3. No ejecutar código arbitrario producido por un modelo.
4. Las acciones destructivas o de alcance amplio requieren confirmación explícita.
5. Preferir operaciones reversibles y agrupar cambios con los mecanismos de Undo de After Effects.
6. No registrar prompts, rutas, nombres de proyecto ni contenido sensible por defecto.
7. Añadir pruebas para cada regla de validación y cada nuevo tipo de acción.

## Flujo recomendado

- Crear una rama por cambio.
- Explicar el problema y el comportamiento esperado en el PR.
- Ejecutar `node --test`.
- Documentar cualquier cambio de seguridad, privacidad o compatibilidad.
- No incluir credenciales, archivos de proyecto ni medios privados.

## Estado del proyecto

Este repositorio es una reconstrucción inicial. No asumir que la arquitectura propuesta ya está integrada con After Effects.

# Integración con After Effects

## Enfoque inicial

La primera hipótesis es una extensión CEP con un panel HTML/JavaScript y un puente a ExtendScript. La compatibilidad debe verificarse con las versiones de After Effects que se decida soportar.

## Contrato del adaptador

El resto de la aplicación no debería llamar a APIs de After Effects directamente. Debe usar un adaptador con operaciones explícitas, por ejemplo:

- `getActiveCompSummary()`
- `createTextLayer({ name, text })`
- `setLayerTransform({ layerId, property, value })`

Estos nombres son ejemplos de diseño; todavía no están conectados a After Effects.

## Reglas

- Verificar que exista una composición activa.
- Validar IDs y propiedades antes de actuar.
- Usar Undo Groups para agrupar cambios cuando la API lo permita.
- Evitar operaciones destructivas en el primer prototipo.
- No construir código ejecutable concatenando texto del usuario o del modelo.
- Normalizar unidades y rangos.
- Devolver errores estructurados al núcleo.

## Prueba de humo futura

1. Abrir After Effects con un proyecto de prueba.
2. Abrir el panel.
3. Consultar un resumen de la composición activa.
4. Proponer crear una capa de texto con un contenido de prueba.
5. Mostrar la propuesta y pedir confirmación.
6. Ejecutar la acción.
7. Comprobar la capa y deshacer el cambio.

Hasta implementar y ejecutar esta prueba en una instalación real, la integración debe considerarse no verificada.

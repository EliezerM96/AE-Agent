# Arquitectura propuesta

## Objetivo

Separar la interfaz y el contexto de After Effects del proveedor de IA y de las acciones que modifican el proyecto.

## Capas

1. **UI / Panel:** conversación, selección de contexto, vista previa de acciones, confirmación y resultados.
2. **Agent Core:** interpreta solicitudes, gestiona contexto mínimo, pide acciones estructuradas y coordina validación.
3. **Model Router:** selecciona un proveedor según configuración. Debe permitir modelos locales y proveedores externos.
4. **Policy & Validator:** comprueba esquema, parámetros, permisos, confirmación requerida y límites.
5. **AE Adapter:** traduce acciones permitidas a llamadas compatibles con After Effects.
6. **Host Bridge:** comunicación entre panel y entorno de scripting de After Effects.
7. **Settings:** preferencias y referencias a credenciales; nunca guardar secretos en el repositorio.

## Flujo de una acción

```text
Usuario
  -> UI
  -> Agent Core
  -> Model Router
  -> acción estructurada
  -> Policy & Validator
  -> vista previa / confirmación
  -> AE Adapter
  -> After Effects
  -> resultado
```

El modelo no debe tener acceso directo al sistema de archivos ni ejecutar scripts arbitrarios. El núcleo debe convertir su salida en una acción conocida y validada.

## Decisiones provisionales

- **CEP + ExtendScript** es una hipótesis inicial para el primer prototipo, no una decisión de compatibilidad definitiva. Confirmar versiones de After Effects y limitaciones de CEP/UXP antes de construir el panel.
- Usar JavaScript para el núcleo compartido inicialmente.
- Definir un contrato interno de acciones independiente del proveedor.
- Mantener las funciones del adaptador pequeñas, explícitas y con pruebas.
- Registrar eventos técnicos sin contenido sensible por defecto.

## Interfaces previstas

- `ModelProvider.generateAction(request, context) -> ActionProposal`
- `Policy.validate(proposal, context) -> ValidationResult`
- `AEAdapter.execute(action) -> ActionResult`
- `Settings.getProviderConfig() -> ProviderConfig`

Estas interfaces son objetivos de diseño; no todos los adaptadores están implementados.

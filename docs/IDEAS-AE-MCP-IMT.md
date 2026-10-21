# Ideas de AE-MCP-IMT para AE Agent

Revisión: 2026-10-20 · Fuente: https://github.com/Immersive-Media-Technologies/aftereffects-mcp-imt (v0.5.5, 2026-10-11)

> **Ojo con la licencia.** AE-MCP-IMT es **CC BY-NC 4.0 + atribución obligatoria**: no se puede usar en un producto pagado ni en trabajo comercial para clientes sin licencia aparte. Este documento solo toma **ideas de diseño** (que no tienen copyright); **no copiar código, textos del skill ni el catálogo de efectos**. Si alguna vez querés partir de código ajeno, su base upstream `kumoproductions/mcp-aftereffects` es **MIT** (verificar antes).

## Qué es, en una línea
Un servidor MCP que deja a un agente (Claude, Cursor, ChatGPT) trabajar dentro de After Effects con ~270 operaciones atómicas detrás de solo dos herramientas (`ae_catalog` + `ae_do`), dry run, un undo group por llamada, checkpoints del .aep y bloqueo de proyecto.

## Ideas que encajan con AE Agent (por prioridad)

### 1. Pocas herramientas, catálogo grande (encaja con `action-schema.js`)
- En vez de exponer 50 "tools" al modelo, exponer **2**: `catalog` (lista de operaciones con sus parámetros) y `do` (ejecuta una por nombre).
- Para AE Agent: `ACTION_TYPES` se vuelve un **registro** (`{ name, category, params, destructive, undoable }`) y el modelo pide el catálogo filtrado por categoría. Menos tokens, contrato estable.
- Cada operación declara sus parámetros y se **valida antes de tocar AE** (ya lo hacés; generalizarlo al registro).

### 2. Dry run real (encaja con "vista previa / confirmación")
- `do({ dryRun: true })` devuelve lo que *haría* (el script generado o un resumen legible) **sin contactar AE**.
- Para el vertical slice: la vista previa del panel = el resultado del dry run. Confirmar = ejecutar la misma propuesta sin `dryRun`.

### 3. Un undo group por llamada, y lotes atómicos
- Toda llamada se envuelve en **un** `app.beginUndoGroup/endUndoGroup` desde el adaptador (el modelo nunca lo abre).
- `batch` = varias operaciones en un solo Cmd+Z. Modo `atomic`: si un paso falla, se deshace todo y se **verifica** el rollback.
- Encaja con Fase 3 "Acciones por lotes" y "Deshacer/revertir".

### 4. Checkpoints del proyecto (lo que Undo no cubre)
- `project.checkpoint`: guarda una copia del .aep al lado del proyecto antes de una tarea grande; `project.revert` la restaura tras un crash o un mal resultado.
- Barato de implementar en ExtendScript (`app.project.save(File)` a una copia) y da mucha confianza al usuario.

### 5. Clasificar operaciones por reversibilidad (encaja con `policy.js`)
- Lista explícita de lo que **Cmd+Z no revierte**: ejecutar script libre, abrir/nuevo/revertir proyecto, purge/consolidate, cambiar preferencias, iniciar render.
- En `policy.js`: `requiresConfirmation` siempre para esas; las demás pueden auto-ejecutarse cuando el usuario lo active.
- Modos de seguridad por configuración: **solo lectura** (primera sesión), **lista de categorías permitidas**, y **project lock** (solo puede tocar un .aep concreto).

### 6. Verificar barato: snapshot → editar → diff
- `comp.snapshot` antes y `comp.diff` después: qué capas se añadieron, quitaron o cambiaron. Verificación en pocas decenas de tokens, sin leer todo el proyecto.
- Luego, si hace falta, **renderizar un frame a PNG** y compararlo con uno anterior ("¿cambió la imagen y dónde?").
- Orden de trabajo que proponen y vale copiar como regla del agente: **conocer el estado → checkpoint → operar → verificar por valores → verificar por frame**.

### 7. Errores honestos con código
- Cada error con un código fijo (`DIALOG_OPEN`, `TIMEOUT`, `INVALID_ARGS`, `OPERATION_FAILED`, `NO_ACTIVE_COMP`…) + una pista. En un lote, decir qué paso falló.
- **Detectar diálogos modales** (guardar, footage faltante, aviso de plugin): bloquean el scripting y parecen un timeout. Reportarlos como `DIALOG_OPEN` con el texto del diálogo.

### 8. Contexto ambiental en cada respuesta
- Cada resultado devuelve un mini contexto: comp activa, capas seleccionadas, tiempo actual. El agente no necesita volver a preguntar el estado tras cada paso.

### 9. Herramientas de diagnóstico útiles desde el día 1
- `project.audit`: footage faltante, fuentes faltantes, errores de expresión.
- `expression.validate`: probar una expresión antes de aplicarla.
- Son de solo lectura, ideales para la primera demo segura.

### 10. Conocimiento del agente como "skill" con recetas
- Separan el servidor (qué *puede* hacer) del conocimiento (qué *debe saber*): un `SKILL.md` corto que enruta a recetas (motion graphics editable, render, máscaras, tracking) y una tabla de **"lo que un script no puede hacer en AE" + el workaround seguro**.
- Para AE Agent: una carpeta `knowledge/` con recetas propias (por ejemplo, lower thirds con rig de CONTROLS, easing real, Essential Graphics). Escribirlas desde tu experiencia, no copiarlas.

### 11. Instalador que diagnostica
- El instalador comprueba AE, Node y permisos y **nombra el problema** (p. ej. "Allow Scripts to Write Files and Access Network" desactivado, permiso de Automatización en macOS).
- Para Fase 4: un "self-test" en el panel que corra la prueba de humo de `AFTER_EFFECTS_INTEGRATION.md`.

## Una decisión de arquitectura a considerar
AE-MCP-IMT **no instala nada dentro de AE**: habla desde fuera (`osascript` en macOS, `AfterFX.exe -r` en Windows) con un buzón de archivos temporales. Tu plan actual es **CEP + ExtendScript** (panel dentro de AE).
- Ventaja de su enfoque: cero instalación, sirve para cualquier cliente MCP.
- Ventaja del tuyo: UI propia dentro de AE, vista previa y confirmación integradas, local-first.
- Opción híbrida: núcleo + adaptador comunes; el panel CEP como UI, y más adelante un modo MCP opcional que exponga el mismo catálogo a Claude/Cursor.

## Siguiente paso sugerido (vertical slice)
1. Convertir `ACTION_TYPES` en un registro con `destructive/undoable`.
2. Añadir `dryRun` a `evaluateProposal` → vista previa.
3. Adaptador: envolver cada ejecución en un undo group y devolver errores con código.
4. Primera operación: `create_text_layer` + `comp.snapshot/diff` para verificarla.

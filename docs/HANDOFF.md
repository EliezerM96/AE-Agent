# Handoff — AE Agent

## Qué es

AE Agent es un agente modular para Adobe After Effects. La idea central es permitir que el usuario describa una tarea en lenguaje natural y que el agente proponga y ejecute acciones verificables dentro de After Effects.

## Decisiones y objetivos conservados

- Arquitectura local-first, consciente de la privacidad.
- No depender de un único proveedor de modelos.
- Poder alternar entre modelos locales y proveedores externos.
- Herramientas de After Effects limitadas, explícitas y validadas.
- Mantener la interfaz, el núcleo, los proveedores y el adaptador de After Effects separados.
- No ejecutar código arbitrario producido por el modelo.
- Priorizar operaciones reversibles, confirmaciones y grupos de Undo.

## Estado real de este handoff

Este material es una **reconstrucción nueva** basada en la información de diseño conservada. No se recuperó el código fuente anterior, un historial Git ni los archivos de compilación originales. No afirmar que esta carpeta sea idéntica a una versión previa.

## Qué contiene

- Documentación de arquitectura, seguridad, integración y roadmap.
- Núcleo de JavaScript de referencia.
- Validación mínima de propuestas de acción.
- Pruebas ejecutables con Node.js.
- Archivos básicos para preparar un repositorio Git.

## Qué no contiene todavía

- Extensión CEP/UXP instalable.
- Código ExtendScript conectado a After Effects.
- Adaptadores reales de proveedores de IA.
- Interfaz de chat.
- Instalador o paquete de distribución.
- Pruebas en After Effects real.

## Primeras tareas recomendadas

1. Crear un repositorio GitHub privado o público según la preferencia del usuario.
2. Subir esta base.
3. Confirmar versión de After Effects, sistema operativo y método de extensión compatible.
4. Implementar el primer vertical slice: inspeccionar composición, proponer acción, pedir confirmación y crear una capa de texto.
5. Añadir un proveedor local primero; después diseñar proveedores remotos intercambiables.
6. Revisar seguridad antes de ampliar las capacidades.

## Instrucción para el siguiente agente/desarrollador

Lee primero `README.md`, `docs/ARCHITECTURE.md`, `docs/SECURITY_AND_PRIVACY.md` y `docs/ROADMAP.md`. No asumas que las funciones descritas ya están implementadas. Mantén las propuestas de IA separadas de la ejecución y no introduzcas código arbitrario generado por el modelo.

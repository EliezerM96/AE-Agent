# AE Agent

**Estado:** reconstrucción inicial del proyecto a partir de las especificaciones conservadas. Este repositorio es un punto de partida nuevo; no contiene el código fuente histórico que no pudo recuperarse.

AE Agent busca ser un asistente modular para Adobe After Effects que convierta instrucciones en lenguaje natural en acciones de edición verificables y seguras.

## Principios

- **Local-first:** priorizar ejecución local y minimizar el envío de datos.
- **Provider-agnostic:** poder cambiar entre modelos locales y proveedores externos.
- **Privacy-aware:** no enviar proyectos, nombres de archivos ni contenido a servicios externos sin una decisión explícita.
- **Seguro por diseño:** validar cada acción, limitar las operaciones disponibles y favorecer cambios reversibles.
- **Modular:** separar interfaz, núcleo del agente, proveedores de modelos y herramientas de After Effects.

## Estado actual

Este handoff incluye documentación, una estructura inicial y un pequeño núcleo JavaScript de referencia. **Todavía no es una extensión instalable ni una integración funcional con After Effects.** El panel CEP, el puente ExtendScript, los adaptadores reales de modelos, las pruebas de integración y el empaquetado deben implementarse y verificarse.

## Estructura

```text
ae-agent/
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
├── .gitignore
├── .editorconfig
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── bug_report.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   ├── SECURITY_AND_PRIVACY.md
│   ├── AFTER_EFFECTS_INTEGRATION.md
│   └── HANDOFF.md
├── src/
│   └── core/
│       ├── action-schema.js
│       ├── policy.js
│       └── agent.js
└── tests/
    └── core.test.js
```

## Requisitos previstos

- Adobe After Effects compatible con el método de extensión elegido.
- Node.js para herramientas de desarrollo y pruebas.
- Un entorno de extensión de After Effects (la primera propuesta es CEP + ExtendScript; validar compatibilidad con las versiones objetivo).
- Para modelos remotos: credenciales proporcionadas por el usuario, almacenadas fuera del repositorio.
- Para modelos locales: un endpoint local compatible o un adaptador específico.

## Desarrollo

Ejecutar las pruebas del núcleo con Node.js:

```bash
node --test
```

No se necesita instalar dependencias para las pruebas iniciales.

## Seguridad

No introduzcas claves API en el repositorio. Consulta [SECURITY.md](SECURITY.md) y [docs/SECURITY_AND_PRIVACY.md](docs/SECURITY_AND_PRIVACY.md).

## Próximo objetivo

Implementar un **vertical slice mínimo**: recibir una petición, convertirla en una acción tipada, mostrar una vista previa, pedir confirmación y ejecutar una única operación segura en After Effects. No comenzar con ejecución arbitraria de código generado por el modelo.

# Seguridad y privacidad

## Principios

- **Local-first:** procesar localmente cuando sea viable.
- **Consentimiento explícito:** indicar qué contexto se envía a un proveedor remoto.
- **Minimización:** compartir solo los datos necesarios para la acción solicitada.
- **Credenciales:** guardarlas mediante mecanismos seguros del sistema operativo cuando se implementen; nunca en el repositorio ni en logs.
- **Validación:** no confiar en las propuestas del modelo.
- **Trazabilidad:** mostrar al usuario qué se va a modificar y qué se modificó.

## Límites de confianza

- La petición del usuario puede ser ambigua.
- El contexto de una composición puede contener nombres y rutas sensibles.
- La salida del proveedor puede ser incorrecta o maliciosa.
- Los archivos importados pueden contener contenido no confiable.
- ExtendScript y el panel pueden tener permisos distintos según versión y configuración.

## Política de ejecución

1. Parsear la propuesta como datos.
2. Validar tipo, campos, rangos y límites.
3. Comprobar contexto y permisos.
4. Pedir confirmación cuando corresponda.
5. Ejecutar únicamente mediante funciones permitidas.
6. Informar del resultado sin exponer secretos.

## Pendiente

Antes de publicar una versión funcional se necesita revisar almacenamiento de credenciales, comunicación panel-host, límites de scripting, dependencias y comportamiento en caso de fallo.

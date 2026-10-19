/**
 * Esquema mínimo de acciones. No ejecuta nada en After Effects.
 * Mantener este contrato independiente del proveedor de IA.
 */

export const ACTION_TYPES = Object.freeze([
  "create_text_layer",
  "set_layer_property",
]);

const isPlainObject = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  (Object.getPrototypeOf(value) === Object.prototype ||
    Object.getPrototypeOf(value) === null);

export function validateActionProposal(proposal) {
  const errors = [];

  if (!isPlainObject(proposal)) {
    return { valid: false, errors: ["Proposal must be an object."] };
  }

  if (!ACTION_TYPES.includes(proposal.type)) {
    errors.push(`Unsupported action type: ${String(proposal.type)}`);
  }

  if (typeof proposal.summary !== "string" || proposal.summary.trim() === "") {
    errors.push("summary must be a non-empty string.");
  }

  if (proposal.type === "create_text_layer") {
    if (!isPlainObject(proposal.params)) {
      errors.push("params must be an object.");
    } else {
      if (typeof proposal.params.text !== "string") {
        errors.push("params.text must be a string.");
      }
      if (
        proposal.params.name !== undefined &&
        typeof proposal.params.name !== "string"
      ) {
        errors.push("params.name must be a string when provided.");
      }
    }
  }

  if (proposal.type === "set_layer_property") {
    if (!isPlainObject(proposal.params)) {
      errors.push("params must be an object.");
    } else {
      if (
        typeof proposal.params.layerId !== "string" ||
        proposal.params.layerId.trim() === ""
      ) {
        errors.push("params.layerId must be a non-empty string.");
      }
      if (
        typeof proposal.params.property !== "string" ||
        proposal.params.property.trim() === ""
      ) {
        errors.push("params.property must be a non-empty string.");
      }
      if (!["position", "scale", "opacity", "rotation"].includes(proposal.params.property)) {
        errors.push("params.property is not allowlisted.");
      }
      if (
        !["string", "number", "boolean"].includes(typeof proposal.params.value) &&
        !Array.isArray(proposal.params.value)
      ) {
        errors.push("params.value must be a primitive or array.");
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

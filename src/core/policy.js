import { validateActionProposal } from "./action-schema.js";

/**
 * Política mínima. La integración real debe añadir contexto de composición,
 * permisos, rangos numéricos y confirmación en la UI.
 */
export function evaluateProposal(proposal) {
  const validation = validateActionProposal(proposal);

  if (!validation.valid) {
    return {
      allowed: false,
      requiresConfirmation: false,
      errors: validation.errors,
    };
  }

  return {
    allowed: true,
    requiresConfirmation: true,
    errors: [],
    reason: "All proposed changes require user confirmation in the initial prototype.",
  };
}

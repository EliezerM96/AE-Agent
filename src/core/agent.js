import { evaluateProposal } from "./policy.js";

/**
 * Coordinador mínimo sin conexión a un modelo ni a After Effects.
 * La ejecución se deja deliberadamente fuera de este módulo.
 */
export function reviewProposal(proposal) {
  const policy = evaluateProposal(proposal);

  return {
    status: policy.allowed ? "awaiting_confirmation" : "rejected",
    proposal,
    policy,
  };
}

import test from "node:test";
import assert from "node:assert/strict";
import { validateActionProposal } from "../src/core/action-schema.js";
import { evaluateProposal } from "../src/core/policy.js";
import { reviewProposal } from "../src/core/agent.js";

test("accepts a well-formed text-layer proposal", () => {
  const result = validateActionProposal({
    type: "create_text_layer",
    summary: "Create a title layer",
    params: { text: "Hello", name: "Title" },
  });
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test("rejects unknown action types", () => {
  const result = validateActionProposal({
    type: "run_arbitrary_script",
    summary: "Run code",
    params: { code: "dangerous()" },
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.includes("Unsupported action type")));
});

test("rejects non-allowlisted layer properties", () => {
  const result = validateActionProposal({
    type: "set_layer_property",
    summary: "Change property",
    params: { layerId: "layer-1", property: "sourceText", value: "x" },
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.includes("not allowlisted")));
});

test("valid proposals still require confirmation", () => {
  const result = evaluateProposal({
    type: "create_text_layer",
    summary: "Create a title layer",
    params: { text: "Hello" },
  });
  assert.equal(result.allowed, true);
  assert.equal(result.requiresConfirmation, true);
});

test("agent review does not execute the proposal", () => {
  const result = reviewProposal({
    type: "create_text_layer",
    summary: "Create a title layer",
    params: { text: "Hello" },
  });
  assert.equal(result.status, "awaiting_confirmation");
});

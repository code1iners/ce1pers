import assert from "node:assert/strict";
import { test } from "node:test";

import { clazz } from "../dist/index.js";

test("clazz remains available after absorbing useClass", () => {
  assert.equal(clazz("button", "active"), "button active");
});

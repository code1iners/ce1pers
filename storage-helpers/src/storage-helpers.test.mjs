import assert from "node:assert/strict";
import { test } from "node:test";

import { useIndexedDatabase } from "../dist/index.js";

test("storage helpers expose the IndexedDB controller without initialization", () => {
  assert.equal(typeof useIndexedDatabase, "function");
});

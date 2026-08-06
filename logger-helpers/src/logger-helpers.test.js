const assert = require("node:assert/strict");
const { test } = require("node:test");

const { dbugger } = require("../dist/index.js");

test("logger helper preserves level selection and message formatting", () => {
  /** Captured console.info calls. */
  const calls = [];
  /** Original console.info implementation for cleanup. */
  const originalInfo = console.info;
  console.info = (...args) => calls.push(args);

  try {
    dbugger({
      title: "Logger",
      description: "hello world",
      parameters: { id: 1 },
      debugLevel: "info",
      includeDateTime: false,
    });
  } finally {
    console.info = originalInfo;
  }

  assert.equal(calls.length, 2);
  assert.equal(calls[0][0], "[Logger] Hello world");
  assert.deepEqual(calls[1][0], { id: 1 });
});

const assert = require("node:assert/strict");
const { test } = require("node:test");

const helpers = require("../dist/index.js");

test("random helpers preserve output lengths and deterministic selection", () => {
  /** Original random source for cleanup. */
  const originalRandom = Math.random;
  Math.random = () => 0.123456789;

  try {
    assert.equal(helpers.generate().length, 10);
    assert.equal(helpers.generate({ length: 15 }).length, 15);
    assert.equal(helpers.generateRandomNumber({ slicing: 6 }), "123456");
    assert.deepEqual(helpers.pick(["first", "second"]), [true, "first"]);
  } finally {
    Math.random = originalRandom;
  }
});

test("random number helper preserves the requested digit count", () => {
  /** Original random source for cleanup. */
  const originalRandom = Math.random;
  Math.random = () => 0.123456789;

  try {
    assert.equal(helpers.generateRandomNumber({ slicing: 6 }), "123456");
  } finally {
    Math.random = originalRandom;
  }
});

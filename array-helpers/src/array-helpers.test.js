const assert = require("node:assert/strict");
const { test } = require("node:test");

const helpers = require("../dist/index.js");

test("array helpers expose combinations and permutations", () => {
  assert.deepEqual(helpers.getCombinations([1, 2, 3], 2), [
    [1, 2],
    [1, 3],
    [2, 3],
  ]);
  assert.deepEqual(helpers.getPermutations([1, 2, 3], 2), [
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 3],
    [3, 1],
    [3, 2],
  ]);
  assert.deepEqual(helpers.getPermutationsWithSelf([1, 2], 2), [
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2],
  ]);
});

test("array helpers preserve bubble sort behavior without mutating input", () => {
  const input = [3, 1, 2];

  assert.deepEqual(helpers.bubble({ array: input }), [1, 2, 3]);
  assert.deepEqual(helpers.bubble({ array: input, order: "descending" }), [3, 2, 1]);
  assert.deepEqual(input, [3, 1, 2]);
});

test("array helpers handle empty bubble-sort input", () => {
  assert.deepEqual(helpers.bubble({ array: [] }), []);
});

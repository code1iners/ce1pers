const assert = require("node:assert/strict");
const { test } = require("node:test");

const { paginator } = require("../dist/index.js");

test("pagination helpers move through pages without losing the current page", () => {
  const pagination = paginator({ array: [1, 2, 3, 4, 5], take: 2 });

  assert.deepEqual(pagination.getValues(), [1, 2]);
  assert.deepEqual(pagination.next(), [3, 4]);
  assert.deepEqual(pagination.next(), [5]);
  assert.deepEqual(pagination.next(), [5]);
  assert.deepEqual(pagination.previous(), [3, 4]);
  assert.deepEqual(pagination.goTo(0), [1, 2]);
});

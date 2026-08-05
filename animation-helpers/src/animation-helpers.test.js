const assert = require("node:assert/strict");
const { test } = require("node:test");

const helpers = require("../dist/index.js");

test("animation helpers expose makeRotateEffect", () => {
  assert.equal(typeof helpers.makeRotateEffect, "function");
});

const assert = require("node:assert/strict");
const { test } = require("node:test");

const helpers = require("../dist/index.js");

test("viewport helpers expose the screen hook without evaluating window at import time", () => {
  assert.equal(typeof helpers.useScreen, "function");
  assert.equal(typeof helpers.useWindow, "undefined");
});

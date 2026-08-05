const assert = require("node:assert/strict");
const { test } = require("node:test");

const helpers = require("../dist/index.js");

test("number helpers preserve base conversion behavior", () => {
  assert.equal(helpers.decimalToHex(10), "a");
  assert.equal(helpers.decimalToBinary(10), "1010");
  assert.equal(helpers.decimalToOctal(10), "12");
  assert.equal(helpers.binaryToDecimal("0010"), 2);
  assert.equal(helpers.hexToDecimal("a"), 10);
});

const assert = require("node:assert/strict");
const { test } = require("node:test");

const { usePassword } = require("../build/index.js");

test("password generation does not use Math.random", () => {
  const originalMathRandom = Math.random;
  Math.random = () => {
    throw new Error("Math.random must not be used for passwords");
  };

  try {
    const result = usePassword({
      useLowercase: true,
      useNumbers: true,
      useSymbols: true,
      useUppercase: true,
      passwordLength: 32,
    }).generate();

    assert.equal(result.ok, true);
    assert.equal(result.data.length, 32);
  } finally {
    Math.random = originalMathRandom;
  }
});

test("password generation rejects invalid lengths", () => {
  const result = usePassword({
    useLowercase: true,
    useNumbers: false,
    useSymbols: false,
    useUppercase: false,
    passwordLength: 0,
  }).generate();

  assert.equal(result.ok, false);
});

const assert = require("node:assert/strict");
const { test } = require("node:test");

const helpers = require("../dist/index.js");

test("naming helpers preserve the four public conversions", () => {
  assert.equal(helpers.camelize("hello world"), "helloWorld");
  assert.equal(helpers.pascalize("hello world"), "HelloWorld");
  assert.equal(helpers.snakeize("HelloWorld"), "hello_world");
  assert.equal(helpers.kebabize("HelloWorld"), "hello-world");
  assert.equal(helpers.extractNamingConvention("hello_world"), "snake");
});

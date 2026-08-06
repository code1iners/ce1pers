const assert = require("node:assert/strict");
const { test } = require("node:test");

const helpers = require("../dist/index.js");

test("date helpers preserve deterministic date conversion and formatting", () => {
  /** Fixed local date used to avoid a clock-dependent assertion. */
  const date = new Date(2024, 0, 2, 3, 4, 5);

  assert.deepEqual(helpers.divideDateByEight("20240102"), {
    year: 2024,
    month: 1,
    date: 2,
  });
  assert.equal(helpers.divideDateByEight("202401"), null);
  assert.equal(helpers.convertDateToEight(date), "20240102");
  assert.equal(
    helpers.withFormat({ date, format: "YYYY/MM/DD HH:mm" }),
    "2024/01/02 03:04",
  );
});

test("date helpers preserve calendar and moment return contracts", () => {
  /** Calendar generated for a leap-year February. */
  const calendar = helpers.makeCalendar(2024, 2);
  /** Current-year February end returned as a Moment instance. */
  const lastDate = helpers.getLastDateOfMonth(2);

  assert.equal(calendar.length, 42);
  assert.equal(calendar.filter(({ month, date }) => month === 2 && date === 29).length, 1);
  assert.equal(helpers.getFirstDateOfMonth(2).format("DD"), "01");
  assert.equal(typeof lastDate.format, "function");
  assert.equal(lastDate.month(), 1);
  assert.match(lastDate.format("DD"), /^(28|29)$/);
});

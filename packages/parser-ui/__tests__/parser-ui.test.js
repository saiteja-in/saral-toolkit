const {isEven} = require("../dist/parser-ui.js");

test("isEven", () => {
  expect(isEven(1)).toBe(false);
  expect(isEven(2)).toBe(true);
  expect(isEven(3)).toBe(false);
});
import { calculateVAT } from "./calculations";

test("calculateVat should return correct values", () => {
  expect(calculateVAT(10)).toBe(1.9);
});

test("calculateVat should fix floating point issues", () => {
  expect(calculateVAT(12)).toBe(2.28);
});

test("calculateVat should not be callable with null", () => {
  // The @ts-expect-error is not needed in chapter 4
  // But added to the solution because we only have one global
  // tsconfig

  // @ts-expect-error
  expect(() => calculateVAT(null)).toThrow();
});

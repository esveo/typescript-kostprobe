import { calculateVAT } from "./calculations";

test("calculateVat should return correct values with DEFAULT VAT", () => {
  expect(calculateVAT(10, "DEFAULT")).toBe(1.9);
});

test("calculateVat should return correct values with REDUCED VAT", () => {
  expect(calculateVAT(10, "REDUCED")).toBe(0.7);
});

test("calculateVat should fix floating point issues", () => {
  expect(calculateVAT(12, "DEFAULT")).toBe(2.28);
});

test("calculateVat should not be callable with null", () => {
  // The @ts-expect-error is not needed in chapter 4
  // But added to the solution because we only have one global
  // tsconfig

  // @ts-expect-error
  expect(() => calculateVAT(null)).toThrow();
});

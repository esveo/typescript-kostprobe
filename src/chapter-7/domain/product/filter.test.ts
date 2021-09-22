import { createProduct } from "./createProduct";
import { filterProducts } from "./filter";
import { Product } from "./types";

const testData: Product[] = [
  createProduct("Prod 1", 1, "ELECTRONICS"),
  createProduct("Prod 2", 2, "ELECTRONICS"),
  createProduct("Prod 3", 3, "FOOD"),
  createProduct("Prod 4", 4, "PARTY_SUPPLIES"),
];

test("filterProducts should match when searching for 1 field", () => {
  expect(filterProducts(testData, { name: "Prod 1" })).toEqual([testData[0]]);
  expect(filterProducts(testData, { productCategory: "ELECTRONICS" })).toEqual([
    testData[0],
    testData[1],
  ]);
});

test("should combine multiple fields with AND", () => {
  expect(
    filterProducts(testData, { productCategory: "ELECTRONICS", name: "Prod 2" })
  ).toEqual([testData[1]]);
});

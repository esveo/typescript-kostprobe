import * as randomModule from "../../lib/math/random";
import { ProductCategory } from "../product-category/types";
import { createProduct } from "./createProduct";

test("createProduct should return correct fields", () => {
  const name = "Test";
  const netPrice = 10;
  const productCategory: ProductCategory = "FOOD";

  const product = createProduct(name, netPrice, productCategory);

  expect(product).toMatchObject({ name, netPrice, productCategory });
});

test("should generate random ids", () => {
  const mockedRandom = jest.spyOn(randomModule, "random");
  const mockedId = 123_456;

  mockedRandom.mockReturnValue(mockedId);

  expect(createProduct("Test", 1, "ELECTRONICS")).toMatchObject({
    id: mockedId,
  });
});

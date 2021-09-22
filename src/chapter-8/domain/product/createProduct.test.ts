import * as randomModule from "../../lib/math/random";
import { ProductCategory } from "../product-category/types";
import { createProduct } from "./createProduct";

test("createProduct should return correct fields", () => {
  const name = "Test";
  const description = "Description";
  const netPrice = 10;
  const productCategory: ProductCategory = "FOOD";

  const product = createProduct(name, description, netPrice, productCategory);

  expect(product).toMatchObject({
    name,
    description,
    netPrice,
    productCategory,
  });
});

test("should generate random ids", () => {
  const mockedRandom = jest.spyOn(randomModule, "random");
  const mockedId = 123_456;

  mockedRandom.mockReturnValue(mockedId);

  expect(createProduct("Test", "Description", 1, "ELECTRONICS")).toMatchObject({
    id: mockedId,
  });
});

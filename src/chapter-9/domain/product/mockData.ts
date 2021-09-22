import { random, sample } from "../../lib/math/random";
import { ProductCategories } from "../product-category/types";
import { createProduct } from "./createProduct";

export function generateMockProduct() {
  const category = sample(ProductCategories);
  const price = random(1, 15);
  const name = `Product ${random(100, 999)}`;
  const description = `This is a randomly generated product`;

  return createProduct(name, description, price, category);
}

export const mockProducts = Array(10)
  .fill(0)
  .map(() => generateMockProduct());

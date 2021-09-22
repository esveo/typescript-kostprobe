import { random } from "../../lib/math/random";
import {
  getVATTypeByProductCategory,
  ProductCategory,
} from "../product-category/types";
import { calculatePriceDetails } from "../vat/calculations";
import { Product } from "./types";

export function createProduct(
  name: string,
  netPrice: number,
  productCategory: ProductCategory
): Product {
  return {
    id: random(100_000, 999_999),
    name,
    netPrice,
    productCategory,
    getPriceDetails: () =>
      calculatePriceDetails(
        netPrice,
        getVATTypeByProductCategory(productCategory)
      ),
  };
}

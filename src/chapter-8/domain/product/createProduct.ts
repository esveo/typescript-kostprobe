import { random } from "../../lib/math/random";
import {
  getVATTypeByProductCategory,
  ProductCategory,
} from "../product-category/types";
import { calculatePriceDetails } from "../vat/calculations";

export function createProduct(
  name: string,
  description: string,
  netPrice: number,
  productCategory: ProductCategory
) {
  return {
    id: random(100_000, 999_999),
    name,
    description,
    netPrice,
    productCategory,
    getPriceDetails: () =>
      calculatePriceDetails(
        netPrice,
        getVATTypeByProductCategory(productCategory)
      ),
  };
}

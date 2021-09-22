import { ProductCategory } from "../product-category/types";
import { Product } from "./types";

export function filterProducts(
  products: Product[],
  by: {
    id?: number;
    name?: string;
    netPrice?: number;
    productCategory?: ProductCategory;
  }
) {
  const keysToCheck: (keyof typeof by)[] = [
    "id",
    "name",
    "netPrice",
    "productCategory",
  ];

  return products.filter((product) => {
    return keysToCheck.every((key) => {
      if (!by[key]) return true;
      return by[key] === product[key];
    });
  });
}

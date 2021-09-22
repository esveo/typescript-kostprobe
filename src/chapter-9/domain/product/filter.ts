import { Product } from "./types";

const keysToCheck = ["id", "name", "netPrice", "productCategory"] as const;

export function filterProducts(
  products: Product[],
  by: Partial<Pick<Product, typeof keysToCheck[number]>>
) {
  return products.filter((product) => {
    return keysToCheck.every((key) => {
      if (!by[key]) return true;
      return by[key] === product[key];
    });
  });
}

// Additional task:
type _ProductWithNonFunctionKeysInValues = {
  [Key in keyof Product]: Product[Key] extends Function ? never : Key;
};
type NonFunctionProductKey =
  _ProductWithNonFunctionKeysInValues[keyof _ProductWithNonFunctionKeysInValues];
type PartialProductWithoutFunctions = Partial<
  Pick<Product, NonFunctionProductKey>
>;

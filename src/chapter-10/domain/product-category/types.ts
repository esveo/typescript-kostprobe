import { VATType } from "../vat/types";

export const ProductCategories = [
  "ELECTRONICS",
  "FOOD",
  "PARTY_SUPPLIES",
] as const;
export type ProductCategory = typeof ProductCategories[number];

type VATTypeByProductCategory = {
  [Key in ProductCategory]: VATType;
};

const VATTypeByProductCategory: VATTypeByProductCategory = {
  ELECTRONICS: "DEFAULT",
  FOOD: "REDUCED",
  PARTY_SUPPLIES: "DEFAULT",
};

export function getVATTypeByProductCategory(
  productCategory: ProductCategory
): VATType {
  return VATTypeByProductCategory[productCategory];
}

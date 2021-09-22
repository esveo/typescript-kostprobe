import { VATType } from "../vat/types";

export type ProductCategory = "ELECTRONICS" | "FOOD" | "PARTY_SUPPLIES";

const VATTypeByProductCategory = {
  ELECTRONICS: "DEFAULT" as VATType,
  FOOD: "REDUCED" as VATType,
  PARTY_SUPPLIES: "DEFAULT" as VATType,
};

export function getVATTypeByProductCategory(
  productCategory: ProductCategory
): VATType {
  return VATTypeByProductCategory[productCategory];
}

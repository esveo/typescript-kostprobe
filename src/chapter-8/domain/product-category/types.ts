import { VATType } from "../vat/types";

const VATTypeByProductCategory = {
  ELECTRONICS: "DEFAULT" as VATType,
  FOOD: "REDUCED" as VATType,
  PARTY_SUPPLIES: "DEFAULT" as VATType,
};

export type ProductCategory = keyof typeof VATTypeByProductCategory;
export const ProductCategories = Object.keys(
  VATTypeByProductCategory
) as ProductCategory[];

export function getVATTypeByProductCategory(
  productCategory: ProductCategory
): VATType {
  return VATTypeByProductCategory[productCategory];
}

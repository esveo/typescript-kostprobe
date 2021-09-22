import { ProductCategory } from "../product-category/types";
import { PriceDetails } from "../vat/calculations";

export type Product = {
  id: number;
  name: string;
  productCategory: ProductCategory;
  netPrice: number;
  getPriceDetails: () => PriceDetails;
};

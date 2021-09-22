import { calculatePriceDetails } from "./domain/vat/calculations";

export function runChapter3() {
  console.log(calculatePriceDetails(10));
  console.log(calculatePriceDetails(100));
  console.log(calculatePriceDetails(1000));
}

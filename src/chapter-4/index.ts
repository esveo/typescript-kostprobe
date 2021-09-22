import { calculatePriceDetails } from "./domain/vat/calculations";

export function runChapter4() {
  console.log(calculatePriceDetails(10));
  console.log(calculatePriceDetails(100));
  console.log(calculatePriceDetails(1000));
}

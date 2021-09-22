import { calculatePriceDetails } from "./domain/vat/calculations";

export function runChapter8() {
  console.log(calculatePriceDetails(10, "DEFAULT"));
  console.log(calculatePriceDetails(100, "REDUCED"));
  console.log(calculatePriceDetails(1000, "DEFAULT"));
}

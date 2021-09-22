import { mockProducts } from "./domain/product/mockData";

export function runChapter7() {
  for (const product of mockProducts) {
    console.log(product);
  }
}

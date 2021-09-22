import { assertNever } from "../../lib/assert/assertNever";
import { VATType } from "./types";

export function calculateVAT(netPrice: number, VATType: VATType) {
  if (netPrice === null)
    throw new Error("Illegal Argument, netPrice should not be null");

  let factor;

  if (VATType === "DEFAULT") {
    factor = 0.19;
  } else if (VATType === "REDUCED") {
    factor = 0.07;
  } else if (VATType === "TEMPORARY_COVID_VAT") {
    factor = 0.16;
  } else {
    assertNever(VATType);
  }

  return Math.round(netPrice * factor * 100) / 100;
}

export function calculateTotalPrice(netPrice: number, VATType: VATType) {
  return netPrice + calculateVAT(netPrice, VATType);
}

export function calculatePriceDetails(netPrice: number, VATType: VATType) {
  return {
    net: netPrice,
    total: calculateTotalPrice(netPrice, VATType),
    vat: calculateVAT(netPrice, VATType),
  };
}

export type PriceDetails = ReturnType<typeof calculatePriceDetails>;

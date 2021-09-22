import { VATType } from "./types";

export function calculateVAT(netPrice: number, VATType: VATType) {
  if (netPrice === null)
    throw new Error("Illegal Argument, netPrice should not be null");

  let factor;

  if (VATType === "DEFAULT") {
    factor = 0.19;
  } else {
    factor = 0.07;
  }

  return Math.round(netPrice * factor * 100) / 100;
}

export function calculateTotalPrice(netPrice: number, VATType: VATType) {
  return netPrice + calculateVAT(netPrice, VATType);
}

export function calculatePriceDetails(
  netPrice: number,
  VATType: VATType
): PriceDetails {
  return {
    net: netPrice,
    total: calculateTotalPrice(netPrice, VATType),
    vat: calculateVAT(netPrice, VATType),
  };
}

export type PriceDetails = {
  net: number;
  total: number;
  vat: number;
};

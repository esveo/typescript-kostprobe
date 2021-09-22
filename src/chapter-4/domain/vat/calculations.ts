export function calculateVAT(netPrice: number) {
  if (netPrice === null)
    throw new Error("Illegal Argument, netPrice should not be null");
  return Math.round(netPrice * 0.19 * 100) / 100;
}

export function calculateTotalPrice(netPrice: number) {
  return netPrice + calculateVAT(netPrice);
}

export function calculatePriceDetails(netPrice: number) {
  return {
    net: netPrice,
    total: calculateTotalPrice(netPrice),
    vat: calculateVAT(netPrice),
  };
}

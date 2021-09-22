export function calculateVAT(netPrice: number) {
  return netPrice * 0.19;
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

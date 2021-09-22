export function round(number: number, decimals = 0) {
  const factor = 10 ** decimals;
  return Math.round(number * factor) / factor;
}

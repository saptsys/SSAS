export function round(value, decimals = 2) {
  return Number(Math.round(parseFloat(value) + 'e' + decimals) + 'e-' + decimals);
}

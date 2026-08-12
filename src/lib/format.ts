/** Philippine peso, no decimals — catalogue prices are whole pesos. */
const pesoFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
})

export function formatPrice(amount: number): string {
  return pesoFormatter.format(amount)
}

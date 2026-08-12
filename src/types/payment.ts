/** Drives which icon a method gets: e-wallet or bank transfer. */
export type PaymentMethodKind = 'wallet' | 'bank'

export interface PaymentMethod {
  id: string
  name: string
  kind: PaymentMethodKind
  description: string
}

export interface OrderStep {
  title: string
  description: string
}

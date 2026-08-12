import type { OrderStep, PaymentMethod } from '@/types/payment'

/**
 * Accepted payment methods.
 *
 * Account numbers are deliberately NOT stored here — they are sent privately
 * over Messenger when an order is confirmed. Publishing them on a static site
 * invites misdirected payments and scam screenshots.
 */
export const PAYMENT_METHODS: readonly PaymentMethod[] = [
  {
    id: 'gcash',
    name: 'GCash',
    kind: 'wallet',
    description:
      'Send your payment through GCash. We will give you the exact account name and number once your order is confirmed.',
  },
  {
    id: 'maya',
    name: 'PayMaya',
    kind: 'wallet',
    description:
      'Pay straight from your Maya wallet. Works for both wallet-to-wallet transfers and QR payments.',
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    kind: 'bank',
    description:
      'Transfer from any local bank through online banking, a mobile app, or over the counter.',
  },
  {
    id: 'maribank',
    name: 'Maribank',
    kind: 'bank',
    description:
      'Send payment from your Maribank account using the app. Transfers usually reflect within minutes.',
  },
]

/** The manual order flow, since checkout is not automated yet. */
export const ORDER_STEPS: readonly OrderStep[] = [
  {
    title: 'Pick your resource',
    description:
      'Browse the products page and note the title of what you need. You can ask about more than one in the same message.',
  },
  {
    title: 'Message us',
    description:
      'Send us a message on Messenger telling us which resource you want. We will confirm the total and answer any questions.',
  },
  {
    title: 'Choose how to pay',
    description:
      'Tell us your preferred method and we will send the account details privately in the same conversation.',
  },
  {
    title: 'Send your proof of payment',
    description:
      'Send a screenshot of your receipt or reference number so we can verify the payment on our end.',
  },
  {
    title: 'Receive your files',
    description:
      'We send the download link right in the chat. Files are yours to keep, so save a copy once you download them.',
  },
]

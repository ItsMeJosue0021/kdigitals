import { BankIcon, WalletIcon } from '@/components/ui/icons'
import type { PaymentMethod } from '@/types/payment'

interface PaymentMethodCardProps {
  method: PaymentMethod
}

export function PaymentMethodCard({ method }: PaymentMethodCardProps) {
  const Icon = method.kind === 'wallet' ? WalletIcon : BankIcon

  return (
    <article className="border-line/70 hover:border-brand/40 bg-surface flex h-full flex-col rounded-2xl border p-6 transition-colors">
      <span className="bg-brand/10 text-brand-ink dark:bg-brand/20 inline-flex size-11 items-center justify-center rounded-full">
        <Icon className="size-5.5" />
      </span>

      <h3 className="text-ink mt-4 text-lg font-semibold">{method.name}</h3>

      <p className="text-ink-soft mt-2 text-sm leading-relaxed">
        {method.description}
      </p>
    </article>
  )
}

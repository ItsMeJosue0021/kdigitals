import { Link } from 'react-router'
import { MessengerCallout } from '@/components/common/MessengerCallout'
import { PageHeader } from '@/components/layout/PageHeader'
import { PaymentMethodCard } from '@/components/payment/PaymentMethodCard'
import { InfoIcon } from '@/components/ui/icons'
import { ORDER_STEPS, PAYMENT_METHODS } from '@/data/payment'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/routes/paths'

export function PaymentOptionsPage() {
  useDocumentTitle('Payment Options')

  return (
    <>
      <PageHeader
        eyebrow="How to pay"
        title="Payment Options"
        description="We accept GCash, PayMaya, Maribank, and bank transfers. Orders are arranged over Messenger, so you always talk to a real person before paying."
      />

      <div className="max-w-page mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        {/* The most important thing on the page: there is no checkout yet. */}
        <div className="border-accent/40 bg-accent/10 flex flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-start sm:gap-5 sm:p-7">
          <span className="bg-accent/20 text-accent-ink inline-flex size-11 shrink-0 items-center justify-center rounded-full">
            <InfoIcon className="size-5.5" />
          </span>

          <div>
            <h2 className="text-ink text-lg font-semibold">
              Online payment is not available yet
            </h2>
            <p className="text-ink-soft mt-2 leading-relaxed">
              You cannot check out or pay directly on this website. Every order
              is completed through Messenger: you tell us what you need, we send
              the payment details privately, and we deliver your files in the
              same conversation.
            </p>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="text-ink text-2xl font-bold">
            Accepted payment methods
          </h2>
          <p className="text-ink-soft mt-2 max-w-2xl leading-relaxed">
            Choose whichever is most convenient for you. Account details are
            shared privately in your Messenger chat once your order is
            confirmed, never posted publicly.
          </p>

          <ul
            role="list"
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PAYMENT_METHODS.map((method) => (
              <li key={method.id} className="flex">
                <PaymentMethodCard method={method} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-ink text-2xl font-bold">How ordering works</h2>
          <p className="text-ink-soft mt-2 max-w-2xl leading-relaxed">
            Five steps from picking a resource to downloading it. Most orders
            are finished within the same conversation.
          </p>

          <ol role="list" className="mt-8 flex flex-col gap-4">
            {ORDER_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="border-line/70 flex gap-4 rounded-2xl border bg-white p-5 sm:gap-5 sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="bg-brand inline-flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                >
                  {index + 1}
                </span>

                <div>
                  <h3 className="text-ink font-semibold">{step.title}</h3>
                  <p className="text-ink-soft mt-1.5 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-ink text-2xl font-bold">Good to know</h2>

          <ul
            role="list"
            className="text-ink-soft mt-6 grid gap-4 sm:grid-cols-2"
          >
            <li className="border-line/70 rounded-2xl border bg-white p-5">
              <h3 className="text-ink font-semibold">Digital products only</h3>
              <p className="mt-1.5 text-sm leading-relaxed">
                Everything in the shop is a downloadable file. Nothing is
                shipped, so there are no delivery fees or waiting time.
              </p>
            </li>
            <li className="border-line/70 rounded-2xl border bg-white p-5">
              <h3 className="text-ink font-semibold">Keep your receipt</h3>
              <p className="mt-1.5 text-sm leading-relaxed">
                Save your reference number until you have downloaded your files.
                It is the fastest way for us to check a payment.
              </p>
            </li>
            <li className="border-line/70 rounded-2xl border bg-white p-5">
              <h3 className="text-ink font-semibold">
                We never message you first
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed">
                Payment details are only ever sent inside a chat you started. If
                someone messages you out of the blue asking for payment, it is
                not us.
              </p>
            </li>
            <li className="border-line/70 rounded-2xl border bg-white p-5">
              <h3 className="text-ink font-semibold">Questions before paying</h3>
              <p className="mt-1.5 text-sm leading-relaxed">
                Not sure a resource fits your grade level? Ask first. We would
                rather answer questions than have you buy the wrong file.
              </p>
            </li>
          </ul>
        </section>

        <MessengerCallout
          className="mt-14"
          title="Ready to order?"
          description="Send us a message with the resource you need and we will walk you through payment."
        />

        <p className="text-ink-soft mt-6 text-center text-sm">
          Still browsing?{' '}
          <Link
            to={ROUTES.home}
            className="text-brand font-medium hover:underline"
          >
            See all products
          </Link>
        </p>
      </div>
    </>
  )
}

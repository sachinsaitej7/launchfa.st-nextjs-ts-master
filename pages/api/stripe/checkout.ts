import Stripe from 'stripe'
import { makeOrigin } from '@/lib/utils/origin'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let metadata = {}
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
  if (!STRIPE_SECRET_KEY) return res.status(500).end()
  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
  const session = await stripe.checkout.sessions.create({
    metadata,
    mode: 'payment',
    payment_method_configuration: 'pmc_1O2qH3SE9voLRYpuz5FLmkvn',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          product: 'prod_OqWkk7Rz9Yw18f',
          unit_amount: 150 * 100,
        },
      },
    ],
    discounts: [
      {
        coupon: 'M0OTIWMA',
      },
    ],
    custom_fields: [
      {
        type: 'text',
        key: 'github',
        optional: true,
        label: {
          type: 'custom',
          custom: 'GitHub Username',
        },
      },
    ],
    cancel_url: new URL('/stripe/cancel', makeOrigin(req)).toString(),
    success_url: new URL('/stripe/success', makeOrigin(req)).toString(),
  })
  if (session.url) return res.redirect(session.url)
}

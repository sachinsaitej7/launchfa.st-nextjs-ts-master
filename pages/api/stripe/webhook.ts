import type { NextApiRequest, NextApiResponse } from 'next'

// Stripe API Reference
// https://stripe.com/docs/webhooks#webhook-endpoint-def
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const event = req.body
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break
      case 'payment_method.attached':
        const paymentMethod = event.data.object
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }
    // Return a response to acknowledge receipt of the event
    return res.status(200).end()
  } catch (e: any) {
    const tmp = e.message || e.toString()
    console.log(tmp)
    return res.status(500).send(tmp)
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'

// Lemon Squeezy API Reference
// https://docs.lemonsqueezy.com/guides/tutorials/webhooks-logsnag
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(403).end()
  try {
    const context = req.body
    const eventName = context['meta']['event_name']
    const obj = context['data']['attributes']
    const objId = context['data']['id']
    // Handle each event based on
    // https://docs.lemonsqueezy.com/guides/developer-guide/webhooks
    // Return a response to acknowledge receipt of the event
    return res.status(200).send('received')
  } catch (e: any) {
    const tmp = e.message || e.toString()
    console.log(tmp)
    return res.status(500).send(tmp)
  }
}

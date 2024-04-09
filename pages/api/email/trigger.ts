import redis from '@/lib/db/upstash'
import resend from '@/lib/email/resend'
import { isAdmin } from '@/lib/utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

async function POST(req: NextApiRequest, res: NextApiResponse) {
  // Parse the JSON data from the request body
  const context = req.body
  // Check if the 'resend' module is available
  // If 'resend' is not available, return a 500 Internal Server Error response
  if (!resend) return res.status(500).end()
  // Check if the requester is an admin
  // If the requester is not an admin, return a 403 Forbidden response
  if (!isAdmin(req, res)) return res.status(403).end()
  // Send an email using Resend
  // Read more on https://resend.com/docs/api-reference/emails/send-email
  const mail = await resend.emails.send({
    text: context.text,
    subject: context.subject,
    from: 'Rishi Raj Jain <emails@rishi.app>',
    to: typeof context.to === 'string' ? [context.to] : context.to,
  })
  // Store the email's ID sent in your Redis
  // if (redis && mail) {
  //   await redis.rpush('emails', mail.id)
  // }
  // Return a successful response with a status code of 200
  return res.status(200).end()
}

// A function to get an email from it's Resend Generated ID
// Read more on https://resend.com/docs/api-reference/emails/retrieve-email
async function GET(req: NextApiRequest, res: NextApiResponse) {
  const xEmailID = req.headers['x-email-id']
  // Check if the 'x-email-id' header is missing
  // If the header is missing, return a 400 Bad Request response
  if (!xEmailID) return res.status(400).end()
  // Check if the 'resend' module is available
  // If 'resend' is not available, return a 500 Internal Server Error response
  if (!resend) return res.status(500).end()
  // Check if the 'redis' module is available
  if (redis) {
    // Retrieve the email using Resend's 'get' method
    const email = await resend.emails.get(JSON.stringify(xEmailID))
    // Return the email as a JSON response with a status code of 200
    return res.status(200).send(email)
  }
  // If 'redis' is not available, return a 500 Internal Server Error response
  return res.status(500).end()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return await GET(req, res)
  } else if (req.method === 'POST') {
    return await POST(req, res)
  }
}

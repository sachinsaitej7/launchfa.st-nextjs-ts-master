import nodemailer from 'nodemailer'
import { isAdmin } from '@/lib/utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
  if (request.method !== 'POST') return res.status(403)
  // Parse the JSON data from the request body
  const context = request.body
  // Check if the 'nodemailer' module is available
  // If 'nodemailer' is not available, return a 500 Internal Server Error response
  if (!nodemailer) return res.status(500).end()
  // Check if the requester is an admin
  // If the requester is not an admin, return a 403 Forbidden response
  if (!isAdmin(request, res)) return res.status(403).end()
  // Send an email using nodemailer
  // https://www.smtp2go.com/setupguide/node-js-script/
  const smtpTransport = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    auth: {
      user: process.env.SMTP2GO_USERNAME,
      pass: process.env.SMTP2GO_PASSWORD,
    },
    port: 2525, // 8025, 587 and 25 can also be used.
  })
  smtpTransport.sendMail({
    text: context.text,
    subject: context.subject,
    from: context['verified_sender'] ?? 'jain71000@gmail.com',
    to: typeof context.to === 'string' ? [context.to] : context.to,
  })
  // Return a successful response with a status code of 200
  return res.status(200).end()
}

import fetch from 'node-fetch'
import redis from '@/lib/db/upstash'
import { makeOrigin } from '@/lib/utils/origin'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, generateRandomToken } from '@/lib/utils/auth'

export async function sendVerificationEmail(origin: string, email: string) {
  if (!redis) return
  // Check if 'email' exists
  // Generate a random token
  const token = generateRandomToken()
  // Store the generated token in the Redis database associated with the 'email'
  await redis.hset('tokens', { [email]: token })
  // Construct the email verification URL
  const verificationUrl = new URL('/api/email/verify', origin)
  verificationUrl.searchParams.set('token', token)
  // Send an email with the verification link to the user
  return await fetch(new URL('/api/email/trigger', origin).toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-key': process.env.PRIVATE_ACCESS_KEY!,
    },
    body: JSON.stringify({
      to: email,
      subject: 'Verify email address',
      text: `Click the following link to verify your email address:\n${verificationUrl}`,
    }),
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(403).end()
  // Check if the 'redis' module is available
  // If 'redis' is not available, return a 500 Internal Server Error response
  if (!redis || !process.env.PRIVATE_ACCESS_KEY) return res.status(500).end()
  // Get the user session from the 'request'
  const session = await getSession(req, res)
  // Check if a valid session exists
  if (session) {
    // Extract the 'email' property from the session
    const { user } = session
    const email = user?.email
    // @ts-ignore
    const { google } = user
    if (google && google === 1) {
      // Set the user as verified in DB
      // await redis.hset('approved', { [email]: 1 })
      // Return a success response with a status code of 200
      return res.redirect('/')
    }
    if (email) {
      const emailResponse = await sendVerificationEmail(makeOrigin(req), email)
      // Check if the email was sent successfully (HTTP status 200-299)
      if (emailResponse?.ok) {
        // If the email was sent successfully, return a redirect response with a status code of 302
        res.setHeader('Email-Sent', 'True')
        return res.redirect('/')
      }
    }
  }
  // If no valid session or email was found, return a redirect response with a status code of 302
  // and 'email-sent' set to false
  res.setHeader('Email-Sent', 'False')
  return res.redirect('/')
}

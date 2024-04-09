import redis from '@/lib/db/upstash'
import { getSession } from '@/lib/utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(403).end()
  // Check if the 'redis' module is available
  // If 'redis' is not available, return a 500 Internal Server Error response
  if (!redis) return res.status(500).end()
  // Extract the 'token' query parameter from the URL
  const token_from_url = req.query.token
  // Get the user session from the 'request'
  const session = await getSession(req, res)
  // Check if a valid session exists
  if (session) {
    // Extract the 'email' property from the session
    const { user } = session
    const email = user?.email
    // Check if 'email' exists
    if (email) {
      // Retrieve the stored token associated with the 'email' from the Redis database
      const token = await redis.hget('tokens', email)
      // Check if the retrieved token matches the 'token_from_url'
      if (token === token_from_url) {
        // If the tokens match, mark the user as approved in Redis
        await redis.hset('approved', { [email]: 1 })
        // Return a success response with a status code of 200
        return res.redirect('/')
      }
      // If the tokens do not match, return an 'invalid token' response with a status code of 403
      return res.status(403).send('invalid token')
    }
  }
  // If no valid session or email was found, return a 'could not verify' response with a status code of 500
  return res.status(500).send('could not verify')
}

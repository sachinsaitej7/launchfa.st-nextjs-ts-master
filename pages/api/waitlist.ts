import redis from '@/lib/db/upstash'
import { isAdmin } from '@/lib/utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

async function POST(request: NextApiRequest, res: NextApiResponse) {
  // Parse the incoming form data from the 'request'
  const context = request.body
  // Extract the 'email' from the form data
  const email = context['email']
  // Check if 'email' is missing in the form data
  // If 'email' is missing, return a 400 Bad Request response
  if (!email) return res.status(400).end()
  // Check if the 'redis' module is available
  if (redis) {
    // Add the 'email' to the waitlist in Redis
    await redis.rpush('waitlist', email)
    // Return a successful response with a status code of 200
    return res.status(200).end()
  }
  // If 'redis' is not available, return a 500 Internal Server Error response
  return res.status(500).end()
}

async function GET(request: NextApiRequest, res: NextApiResponse) {
  // Check if the requester is an admin
  // If the requester is not an admin, return a 403 Forbidden response
  if (!isAdmin(request, res)) return res.status(403).end()
  // Check if the 'redis' module is available
  if (redis) {
    // Retrieve the waitlist from Redis
    const list = await redis.lrange('waitlist', 0, -1)
    // Return the waitlist as a JSON response with a status code of 200
    return res.status(200).json({ list })
  }
  // If 'redis' is not available, return a 500 Internal Server Error response
  return res.status(500).end()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') return await GET(req, res)
  if (req.method === 'POST') return await POST(req, res)
}

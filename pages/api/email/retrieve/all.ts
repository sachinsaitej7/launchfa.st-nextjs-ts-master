import redis from '@/lib/db/upstash'
import { isAdmin } from '@/lib/utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

// A function to get list of all emails' ID sent
// Use this to extract each email via GET request to
// /email with the header 'x-email-id' of one of the IDs retrieved
export default async function handler(request: NextApiRequest, res: NextApiResponse) {
  if (!isAdmin(request, res) || !(request.method === 'GET')) return res.status(403).end()
  if (redis) {
    const list = await redis.lrange('emails', 0, -1)
    return res.status(200).json(list)
  }
  return res.status(500).end()
}

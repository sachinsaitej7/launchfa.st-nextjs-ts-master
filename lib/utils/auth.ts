import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import redis from '../db/upstash'
import { getServerSession } from 'next-auth/next'
import authOptions from '@/pages/api/auth/options'
import { NextApiRequest, NextApiResponse } from 'next'

// Generate a random token
export function generateRandomToken() {
  return crypto.randomBytes(20).toString('hex')
}

// Generate a random string based on an input value
export function generateRandomString(inputValue: string) {
  return crypto.createHash('sha256').update(String(inputValue)).digest('hex')
}

// Set the password for a given email in Redis
export async function setPassword(email: string, password: string) {
  if (!redis) return
  return await redis.hset('login', { [email]: password })
}

// Get the password for a given email from Redis
export async function getPassword(email: string) {
  if (!redis) return
  return await redis.hget('login', email)
}

// Hash a password using bcrypt
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

// Compare a password with its hash using bcrypt
export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}

// A function to assess whether a user is admin based on the header value
export function isAdmin(request: NextApiRequest, res: NextApiResponse) {
  const xAccessKey = request.headers['x-access-key']
  if (xAccessKey) {
    return xAccessKey === process.env.PRIVATE_ACCESS_KEY
  }
  return false
}

export async function getSession(req: NextApiRequest, res: NextApiResponse) {
  return await getServerSession(req, res, authOptions)
}

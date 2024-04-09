import { NextApiRequest } from 'next'

export function makeOrigin(request: NextApiRequest) {
  const host = request.headers['host']
  if (!host) return 'https://launchfast-nextjs-ts.vercel.app'
  const protocol = host.includes('localhost:') ? 'http' : 'https'
  return `${protocol}://${host}`
}

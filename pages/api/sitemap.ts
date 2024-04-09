import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(403).end()
  const prefix = 'https://www.launchfa.st'
  const slugs = ['signin', 'signup', 'terms', 'careers', 'privacy']
  try {
    const sitemap = `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${prefix}</loc></url>${slugs
      .map((i) => `<url><loc>${prefix}/${i}</loc></url>`)
      .join('')}</urlset>`
    res.setHeader('Content-Type', 'text/xml')
    return res.status(200).send(sitemap)
  } catch (e: any) {
    const tmp = e.message || e.toString()
    console.log(tmp)
    return res.status(500).send(tmp)
  }
}

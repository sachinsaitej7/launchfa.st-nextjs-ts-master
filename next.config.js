module.exports = {
  output: 'standalone',
  async redirects() {
    return [
      {
        permanent: true,
        source: '/signin',
        destination: '/api/auth/signin',
      },
      {
        permanent: true,
        source: '/signup',
        destination: '/api/auth/signin',
      },
      {
        permanent: true,
        source: '/signout',
        destination: '/api/auth/signout',
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
}

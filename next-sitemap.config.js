/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://techmiresolutions.com',
  generateRobotsTxt: true,
  exclude: ['/studio', '/studio/*', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/studio', '/api'] },
    ],
  },
}

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', 
        '/_next/',
        '/user/products/components/*', // Prevent product pages from being indexed
      ],
    },
    sitemap: 'https://biositeph.com/sitemap.xml',
  }
}

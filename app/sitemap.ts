import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { PRODUCT_CATEGORIES, UNLISTED_CATEGORIES } from '@/lib/productCategories'

export default function sitemap(): MetadataRoute.Sitemap {
  const mainPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/career`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/events`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const productPages: MetadataRoute.Sitemap = Object.keys(PRODUCT_CATEGORIES)
    .filter((slug) => !UNLISTED_CATEGORIES.has(slug))
    .map((slug) => ({
      url: `${SITE_URL}/products/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.9,
    }))

  return [...mainPages, ...productPages]
}

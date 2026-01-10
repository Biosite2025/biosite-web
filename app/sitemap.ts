import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://biositeph.com'
  
  // Product category pages
  const productCategories = [
    'arterial-blood-gas-electrolytes-co-oximetry',
    'biogenex',
    'biomedical-freezers',
    'biorefrigerators',
    'biosafety-cabinets',
    'blood-bank',
    'centrifuges',
    'clinical-chemistry',
    'clinical-microscopy',
    'coagulation',
    'dakewe',
    'dialysis-renal-equipments',
    'dry-bath',
    'gastro-endo',
    'hamamatsusliderscanner',
    'hba1c-hplc',
    'hematology',
    'hiplaas',
    'hospital-disposables',
    'icu-er-equipments',
    'immunology',
    'lab-oven-incubator',
    'laboratory-disposables',
    'laboratory-equipements',
    'medical-diagnostic-imaging',
    'microbiology',
    'microscopes',
    'molecular-diagnostics',
    'moticsliderscanner',
    'nikonmicroscopes',
    'or-equipment',
    'pipettors',
    'poct',
    'rapid-testkit',
    'sakura',
    'vitro',
  ]
  
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/user/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/user/career`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/user/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/user/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]
  
  const productPages = productCategories.map(category => ({
    url: `${baseUrl}/user/products/components/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))
  
  return [...mainPages, ...productPages]
}

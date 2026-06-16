import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { servicesByCategoryQuery } from '@/sanity/lib/queries'
import ServiceCategoryPage from '@/components/services/ServiceCategoryPage'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'SEO',
  description: 'Dominate Google with our expert SEO services. From keyword research to technical SEO — we keep you on page one.',
}

export default async function SEOPage() {
  const services = await client.fetch(servicesByCategoryQuery, { category: 'search-engine-optimization' }).catch(() => [])
  return (
    <ServiceCategoryPage
      title="SEO"
      intro="Ready to dominate Google? With our SEO expertise, your business will stay visible online. We optimize content, track trends, and tweak strategies to keep you at the top."
      services={services}
      parentHref="/search-engine-optimization"
    />
  )
}

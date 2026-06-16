import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { servicesByCategoryQuery } from '@/sanity/lib/queries'
import ServiceCategoryPage from '@/components/services/ServiceCategoryPage'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Digital Marketing',
  description: 'Data-driven digital marketing strategies to grow your brand, reach your audience, and drive conversions.',
}

export default async function DigitalMarketingPage() {
  const services = await client.fetch(servicesByCategoryQuery, { category: 'digital-marketing' }).catch(() => [])
  return (
    <ServiceCategoryPage
      title="Digital Marketing"
      intro="Reach your audience where they are. From social media strategy to community management, we build meaningful connections that drive growth."
      services={services}
      parentHref="/digital-marketing"
    />
  )
}

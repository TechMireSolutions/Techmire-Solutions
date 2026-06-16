import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { servicesByCategoryQuery } from '@/sanity/lib/queries'
import ServiceCategoryPage from '@/components/services/ServiceCategoryPage'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Graphic Design',
  description: 'From branding to UI/UX, our graphic design team creates visuals that communicate, captivate, and convert.',
}

export default async function GraphicDesignPage() {
  const services = await client.fetch(servicesByCategoryQuery, { category: 'graphic-design' }).catch(() => [])
  return (
    <ServiceCategoryPage
      title="Graphic Design"
      intro="From brand identities to textile designs, our creative team builds visuals that communicate your brand story and captivate your audience."
      services={services}
      parentHref="/graphic-design"
    />
  )
}

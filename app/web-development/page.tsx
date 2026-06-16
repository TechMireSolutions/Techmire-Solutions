import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { servicesByCategoryQuery } from '@/sanity/lib/queries'
import ServiceCategoryPage from '@/components/services/ServiceCategoryPage'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Web Development',
  description: 'From custom websites to e-commerce solutions, we build fast, functional, and stunning web experiences.',
}

export default async function WebDevelopmentPage() {
  const services = await client.fetch(servicesByCategoryQuery, { category: 'web-development' }).catch(() => [])
  return (
    <ServiceCategoryPage
      title="Web Development"
      intro="Your website is your storefront. We create fast, functional, and stunning sites — from sleek one-pagers to dynamic e-commerce hubs that impress visitors and set you apart."
      services={services}
      parentHref="/web-development"
    />
  )
}

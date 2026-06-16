import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { servicesByCategoryQuery } from '@/sanity/lib/queries'
import ServiceCategoryPage from '@/components/services/ServiceCategoryPage'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Software Development',
  description: 'Custom software solutions from web apps to enterprise-grade platforms. No cookie-cutter solutions — just top-notch code.',
}

export default async function SoftwareSolutionPage() {
  const services = await client.fetch(servicesByCategoryQuery, { category: 'software-solution' }).catch(() => [])
  return (
    <ServiceCategoryPage
      title="Software Development"
      intro="Got a problem? We'll code the solution. From custom apps to enterprise software, our expert devs deliver bug-free, tailored products — no cookie-cutter solutions, just top-notch code."
      services={services}
      parentHref="/software-solution"
    />
  )
}

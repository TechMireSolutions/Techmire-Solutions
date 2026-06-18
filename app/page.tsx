import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { homepageQuery, servicesQuery, clientLogosQuery, valuePillarsQuery, promiseItemsQuery } from '@/sanity/lib/queries'
import HeroSection from '@/components/home/HeroSection'
import ExpertiseSection from '@/components/home/ExpertiseSection'
import AboutStrip from '@/components/home/AboutStrip'
import ServicesCarousel from '@/components/home/ServicesCarousel'
import WhyUsSection from '@/components/home/WhyUsSection'
import CTABanner from '@/components/home/CTABanner'
import ClientsSection from '@/components/home/ClientsSection'
import PromiseSection from '@/components/home/PromiseSection'
import MarqueeTicker from '@/components/ui/MarqueeTicker'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'TechmireSolutions — Software House and Design Studio',
  description:
    "At Techmire Solutions, we're on a mission to redefine what a Software House can do. From web development to digital marketing, we build the future of your business.",
}

export default async function HomePage() {
  const [homepage, services, clients, pillars, promises] = await Promise.all([
    client.fetch(homepageQuery).catch(() => null),
    client.fetch(servicesQuery).catch(() => []),
    client.fetch(clientLogosQuery).catch(() => []),
    client.fetch(valuePillarsQuery).catch(() => []),
    client.fetch(promiseItemsQuery).catch(() => []),
  ])

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TechmireSolutions',
    url: 'https://techmiresolutions.com',
    logo: 'https://techmiresolutions.com/logo.png',
    description: 'Software House and Design Studio based in Karachi, Pakistan.',
    address: { '@type': 'PostalAddress', streetAddress: 'R-591, F.B Area Block 20', addressLocality: 'Karachi', addressRegion: 'Sindh', addressCountry: 'PK' },
    contactPoint: { '@type': 'ContactPoint', telephone: '+92-317-222-5152', contactType: 'customer service' },
    sameAs: [
      'https://facebook.com/techmiresolutions',
      'https://linkedin.com/company/techmiresolutions',
      'https://instagram.com/techmiresolutions',
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <HeroSection data={homepage} />
      <ExpertiseSection />
      <MarqueeTicker text="SOFTWARE HOUSE AND DESIGN STUDIO" repeat={8} speed={35} />
      <AboutStrip data={homepage} />
      <ServicesCarousel heading={homepage?.servicesHeading || 'What We Do Best'} services={services} />
      <WhyUsSection heading={homepage?.whyUsHeading || 'We Are On Our Way To Be The Best'} pillars={pillars} />
      <CTABanner data={homepage} />
      <ClientsSection heading={homepage?.clientsHeading || 'Our Amazing Clients'} clients={clients} />
      <PromiseSection heading={homepage?.promiseHeading || 'Pinky Promise'} items={promises} />
    </>
  )
}

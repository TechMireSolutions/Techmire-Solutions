import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { serviceBySlugQuery, servicesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import InnerPageHero from '@/components/ui/InnerPageHero'
import AnimatedText from '@/components/ui/AnimatedText'
import type { Service } from '@/sanity/lib/types'

export const revalidate = 60

export async function generateStaticParams() {
  const services: Service[] = await client.fetch(servicesQuery).catch(() => [])
  return services.map((s) => ({ slug: s.slug.current }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service: Service = await client.fetch(serviceBySlugQuery, { slug: params.slug }).catch(() => null)
  if (!service) return { title: 'Service Not Found' }
  return {
    title: service.seo?.metaTitle || service.title,
    description: service.seo?.metaDescription || service.shortDescription,
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service: Service = await client.fetch(serviceBySlugQuery, { slug: params.slug }).catch(() => null)
  if (!service) notFound()

  return (
    <>
      {/* Hero */}
      <InnerPageHero
        title={service.title}
        subtitle={service.tagline || service.shortDescription}
        overline="Service"
      />

      {/* Content */}
      <section className="bg-light py-20 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-8">
            {service.coverImage && (
              <FadeUp delay={0.1} className="relative w-full aspect-[16/9] mb-16">
                <Image src={urlFor(service.coverImage).width(1200).height(675).url()} alt={service.title} fill className="object-cover rounded-2xl shadow-2xl" priority />
              </FadeUp>
            )}
          {service.fullDescription && (
            <FadeUp>
              <div className="prose prose-lg prose-gray max-w-none">
                <PortableText value={service.fullDescription} />
              </div>
            </FadeUp>
          )}
          </div>

          <div className="lg:col-span-4 sticky top-32">
            {service.featureList && service.featureList.length > 0 && (
              <FadeUp delay={0.2} className="bg-white p-8 rounded-2xl shadow-xl border border-dark/5">
                <h2 className="text-dark font-[200] text-2xl mb-6">What's Included</h2>
                <div className="border-t border-dark/10">
                  {service.featureList.map((f, i) => (
                    <div key={i} className="flex items-center gap-4 py-4 border-b border-dark/10">
                      <span className="text-orange text-lg shrink-0">✓</span>
                      <span className="text-dark/70 text-[15px] font-light">{f}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-light py-20 px-6 lg:px-10 border-t border-dark/10">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>
            <AnimatedText
              el="h2"
              text="Ready to start?"
              type="word"
              className="font-[200] text-dark"
            />
          </div>
          <FadeUp delay={0.2}>
            <Link href="/get-a-quote" className="group inline-flex items-center gap-2 bg-dark hover:bg-orange text-white text-[13px] font-medium px-7 py-3.5 rounded-full transition-all duration-300 shrink-0">
              Get a Free Quote
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: service.title, description: service.shortDescription,
        provider: { '@type': 'Organization', name: 'TechmireSolutions', url: 'https://techmiresolutions.com' },
      }) }} />
    </>
  )
}

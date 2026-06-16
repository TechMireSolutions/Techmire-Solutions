import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { serviceBySlugQuery, servicesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
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
      <section className="bg-dark pt-36 pb-20 px-6 lg:px-10 border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div>
            <FadeUp>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-6 h-px bg-orange" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">Service</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h1 className="font-normal text-white leading-[0.95]" style={{ fontSize: 'clamp(44px, 6.5vw, 96px)' }}>
                {service.title}
              </h1>
            </FadeUp>
            {service.tagline && (
              <FadeUp delay={0.15}>
                <p className="text-white/40 text-[16px] mt-6 leading-relaxed max-w-md">{service.tagline}</p>
              </FadeUp>
            )}
          </div>
          {service.coverImage && (
            <FadeUp delay={0.1} className="relative h-[300px] lg:h-[380px]">
              <Image src={urlFor(service.coverImage).width(700).height(450).url()} alt={service.title} fill className="object-cover rounded-xl" priority />
            </FadeUp>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#f5f5f0] py-20 px-6 lg:px-10">
        <div className="max-w-[860px] mx-auto">
          {service.fullDescription && (
            <FadeUp>
              <div className="prose prose-lg prose-gray max-w-none">
                <PortableText value={service.fullDescription} />
              </div>
            </FadeUp>
          )}
          {service.featureList && service.featureList.length > 0 && (
            <FadeUp delay={0.1}>
              <div className="mt-14">
                <h2 className="text-dark font-normal text-2xl mb-8">What&apos;s Included</h2>
                <div className="border-t border-dark/10">
                  {service.featureList.map((f, i) => (
                    <div key={i} className="flex items-center gap-5 py-4 border-b border-dark/10">
                      <span className="text-orange text-sm shrink-0">✓</span>
                      <span className="text-dark/70 text-[15px]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-20 px-6 lg:px-10 border-t border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <FadeUp>
            <h2 className="font-normal text-white text-3xl">Ready to start?</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link href="/get-a-quote" className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-dark text-[14px] font-medium px-7 py-3.5 rounded-pill transition-colors shrink-0">
              Get a Free Quote ↗
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

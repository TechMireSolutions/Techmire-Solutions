import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
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
    openGraph: service.seo?.ogImage
      ? { images: [urlFor(service.seo.ogImage).width(1200).height(630).url()] }
      : undefined,
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service: Service = await client.fetch(serviceBySlugQuery, { slug: params.slug }).catch(() => null)
  if (!service) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-dark pt-36 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeUp>
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#e8522a]">Service</span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1
                className="text-light font-normal mt-3"
                style={{ fontSize: 'clamp(44px, 6vw, 88px)', lineHeight: 1.0 }}
              >
                {service.title}
              </h1>
            </FadeUp>
            {service.tagline && (
              <FadeUp delay={0.2}>
                <p className="text-body text-xl mt-5 leading-relaxed">{service.tagline}</p>
              </FadeUp>
            )}
          </div>
          {service.coverImage && (
            <FadeUp delay={0.15} className="relative h-[350px]">
              <Image
                src={urlFor(service.coverImage).width(700).height(450).url()}
                alt={service.title}
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </FadeUp>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="bg-light py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          {service.fullDescription && (
            <FadeUp>
              <div className="prose prose-lg prose-gray max-w-none">
                <PortableText value={service.fullDescription} />
              </div>
            </FadeUp>
          )}

          {service.featureList && service.featureList.length > 0 && (
            <FadeUp delay={0.1}>
              <div className="mt-12">
                <h2 className="text-dark font-medium text-2xl mb-6">What&apos;s Included</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.featureList.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                    >
                      <span className="text-[#e8522a] mt-0.5">✓</span>
                      <span className="text-dark text-[15px]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeUp>
            <h2 className="text-light font-normal text-4xl mb-3">Ready to start?</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-body mb-8">Let&apos;s talk about your project and bring it to life.</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#e8522a] hover:bg-[#d4471f] text-white text-[15px] font-medium px-8 py-4 rounded-pill transition-colors"
            >
              Get a Free Quote ↗
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.shortDescription,
            provider: {
              '@type': 'Organization',
              name: 'TechmireSolutions',
              url: 'https://techmiresolutions.com',
            },
          }),
        }}
      />
    </>
  )
}

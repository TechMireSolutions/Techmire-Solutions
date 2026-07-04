import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { servicesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import InnerPageHero from '@/components/ui/InnerPageHero'
import FadeUp from '@/components/ui/FadeUp'
import AnimatedText from '@/components/ui/AnimatedText'
import type { Service } from '@/sanity/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore all TechmireSolutions services, managed dynamically from Sanity CMS.',
}

const CATEGORY_LABELS: Record<string, string> = {
  'top-level': 'Core Service',
  'graphic-design': 'Graphic Design',
  'digital-marketing': 'Digital Marketing',
  'web-development': 'Web Development',
  'software-solution': 'Software Development',
  'search-engine-optimization': 'SEO',
}

export default async function ServicesPage() {
  const services: Service[] = await client.fetch(servicesQuery).catch(() => [])

  return (
    <>
      <InnerPageHero
        title="Services"
        subtitle="Explore our complete service lineup, managed from Sanity CMS and connected to dedicated detail pages."
        overline="Our Expertise"
      />

      <section className="bg-light py-24 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
              <AnimatedText
                el="h2"
                text="All Services"
                type="word"
                className="font-[200] text-dark leading-[0.95]"
              />
            </div>
            <p className="text-dark/45 text-[14px] leading-[1.8] max-w-md font-light">
              Add, edit, reorder, or publish services in Sanity. This page updates from the same CMS data.
            </p>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border-t border-l border-dark/10">
              {services.map((service, i) => (
                <FadeUp key={service._id} delay={i * 0.035}>
                  <Link
                    href={`/services/${service.slug.current}`}
                    className="group relative block min-h-[360px] border-r border-b border-dark/10 bg-light overflow-hidden"
                  >
                    {service.coverImage && (
                      <Image
                        src={urlFor(service.coverImage).width(760).height(520).url()}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-light group-hover:bg-dark/80 transition-colors duration-500" />
                    <div className="relative z-10 h-full min-h-[360px] p-7 lg:p-8 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-6">
                        <span className="text-[10px] text-dark/30 group-hover:text-white/35 uppercase tracking-[0.24em] font-medium transition-colors duration-500">
                          {CATEGORY_LABELS[service.parentCategory] || service.parentCategory || 'Service'}
                        </span>
                        <span className="w-10 h-10 rounded-full border border-dark/10 group-hover:border-white/20 group-hover:text-white flex items-center justify-center text-dark/35 transition-all duration-500 shrink-0">
                          <ArrowUpRight aria-hidden size={14} />
                        </span>
                      </div>

                      <div>
                        <p className="text-[11px] text-orange font-medium mb-4 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </p>
                        <h3
                          className="font-[200] text-dark group-hover:text-white leading-[0.95] transition-colors duration-500 mb-5"
                          style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-dark/45 group-hover:text-white/55 text-[14px] leading-[1.75] font-light transition-colors duration-500">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="border border-dark/10 px-8 py-12">
              <p className="text-dark/45 text-[14px]">
                Services coming soon. Add service documents in Sanity CMS to populate this page.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

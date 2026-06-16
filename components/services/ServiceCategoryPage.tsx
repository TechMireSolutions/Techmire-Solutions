'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import type { Service } from '@/sanity/lib/types'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ServiceCategoryPageProps {
  title: string
  // parentHref kept for future breadcrumbs
  intro: string
  services: Service[]
  parentHref: string
}

export default function ServiceCategoryPage({ title, intro, services }: ServiceCategoryPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark pt-36 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#e8522a]">Our Services</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="text-light font-normal mt-3"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 1.0 }}
            >
              {title}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-lg mt-5 max-w-2xl leading-relaxed">{intro}</p>
          </FadeUp>
        </div>
      </section>

      {/* Sub-services carousel */}
      <section className="bg-light py-20 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="text-dark font-normal text-3xl mb-10">Our {title} Services</h2>
          </FadeUp>

          {services.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1.2}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2.1 },
                1024: { slidesPerView: 3.1 },
                1280: { slidesPerView: 3.5 },
              }}
              className="!pb-12"
            >
              {services.map((service) => (
                <SwiperSlide key={service._id}>
                  <SubServiceCard service={service} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-400">Services coming soon — add them via Sanity CMS.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeUp>
            <h2 className="text-light font-normal text-4xl mb-5">Ready to get started?</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#e8522a] hover:bg-[#d4471f] text-white text-[15px] font-medium px-8 py-4 rounded-pill transition-colors duration-300"
            >
              Get a Free Quote ↗
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  )
}

function SubServiceCard({ service }: { service: Service }) {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48 bg-gray-50 overflow-hidden">
        {service.coverImage ? (
          <Image
            src={urlFor(service.coverImage).width(500).height(280).url()}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-150">
            <span className="text-gray-300 text-5xl">◆</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-dark font-medium text-lg mb-2">{service.title}</h3>
        <p className="text-gray-500 text-[14px] leading-relaxed flex-1">{service.shortDescription}</p>
        <Link
          href={`/services/${service.slug.current}`}
          className="mt-5 inline-flex items-center gap-2 text-[#e8522a] text-[13px] font-medium hover:gap-3 transition-all"
        >
          Learn More ↗
        </Link>
      </div>
    </div>
  )
}

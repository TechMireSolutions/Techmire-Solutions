'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import SectionLabel from '@/components/ui/SectionLabel'
import FadeUp from '@/components/ui/FadeUp'
import type { Service } from '@/sanity/lib/types'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ServicesCarouselProps {
  heading: string
  services: Service[]
}

const FALLBACK_SERVICES = [
  { _id: '1', title: 'Web Development', shortDescription: 'Your website is your storefront, and we\'ll make it shine.', slug: { current: 'web-development' }, parentCategory: 'top-level', order: 1 },
  { _id: '2', title: 'Software Development', shortDescription: 'Got a problem? We\'ll code the solution.', slug: { current: 'software-development' }, parentCategory: 'top-level', order: 2 },
  { _id: '3', title: 'SEO', shortDescription: 'Ready to dominate Google? With our SEO expertise, your business will stay visible.', slug: { current: 'search-engine-optimization' }, parentCategory: 'top-level', order: 3 },
  { _id: '4', title: 'Graphic Design', shortDescription: 'From brand identities to print materials — we make your vision visible.', slug: { current: 'graphic-design' }, parentCategory: 'top-level', order: 4 },
  { _id: '5', title: 'Digital Marketing', shortDescription: 'Reach your audience where they are with data-driven strategies.', slug: { current: 'digital-marketing' }, parentCategory: 'top-level', order: 5 },
  { _id: '6', title: 'App Development', shortDescription: 'Native and cross-platform apps that users love.', slug: { current: 'app-development' }, parentCategory: 'top-level', order: 6 },
  { _id: '7', title: 'UI/UX Design', shortDescription: 'Interfaces that are beautiful, intuitive, and conversion-optimized.', slug: { current: 'ui-ux-design' }, parentCategory: 'top-level', order: 7 },
  { _id: '8', title: 'Branding', shortDescription: 'Build a brand identity that resonates and endures.', slug: { current: 'branding' }, parentCategory: 'top-level', order: 8 },
]

export default function ServicesCarousel({ heading, services }: ServicesCarouselProps) {
  const displayServices = services.length > 0 ? services : FALLBACK_SERVICES

  return (
    <section className="bg-light py-24 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <FadeUp>
          <SectionLabel>Our Services</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            className="text-dark font-normal mt-3 mb-12"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1 }}
          >
            {heading || 'What We Do Best'}
          </h2>
        </FadeUp>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={24}
          slidesPerView={1.2}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 3.5 },
          }}
          className="services-swiper !pb-12"
        >
          {displayServices.map((service) => (
            <SwiperSlide key={service._id}>
              <ServiceCard service={service} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const href =
    service.parentCategory === 'top-level'
      ? `/${service.slug.current}`
      : `/services/${service.slug.current}`

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-52 bg-gray-50 overflow-hidden">
        {service.coverImage ? (
          <Image
            src={urlFor(service.coverImage).width(500).height(300).url()}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-400 text-sm">{service.title}</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-dark font-medium text-xl mb-2">{service.title}</h3>
        <p className="text-gray-500 text-[14px] leading-relaxed flex-1">{service.shortDescription}</p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 text-[#e8522a] text-[13px] font-medium hover:gap-3 transition-all"
        >
          Explore More ↗
        </Link>
      </div>
    </div>
  )
}

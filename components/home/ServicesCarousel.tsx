'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeUp from '@/components/ui/FadeUp'
import type { Service } from '@/sanity/lib/types'

interface ServicesCarouselProps {
  heading: string
  services: Service[]
}

const FALLBACK_SERVICES = [
  { _id: '1', title: 'Web Development', shortDescription: 'Fast, functional sites — from one-pagers to full e-commerce platforms.', slug: { current: 'web-development' }, parentCategory: 'top-level', order: 1 },
  { _id: '2', title: 'Software Development', shortDescription: 'Custom apps and enterprise software, built bug-free and to spec.', slug: { current: 'software-solution' }, parentCategory: 'top-level', order: 2 },
  { _id: '3', title: 'SEO', shortDescription: 'Rank higher, stay visible, and own your niche on Google.', slug: { current: 'search-engine-optimization' }, parentCategory: 'top-level', order: 3 },
  { _id: '4', title: 'Graphic Design', shortDescription: 'Brand identities, print, UI/UX — visuals that communicate and convert.', slug: { current: 'graphic-design' }, parentCategory: 'top-level', order: 4 },
  { _id: '5', title: 'Digital Marketing', shortDescription: 'Data-driven strategies that grow audiences and drive revenue.', slug: { current: 'digital-marketing' }, parentCategory: 'top-level', order: 5 },
  { _id: '6', title: 'App Development', shortDescription: 'Native and cross-platform mobile apps users love to open.', slug: { current: 'app-development' }, parentCategory: 'top-level', order: 6 },
  { _id: '7', title: 'UI/UX Design', shortDescription: 'Interfaces that are intuitive, beautiful, and conversion-optimised.', slug: { current: 'ui-ux-design' }, parentCategory: 'top-level', order: 7 },
  { _id: '8', title: 'Branding', shortDescription: 'Strategic brand identities that last and resonate deeply.', slug: { current: 'branding' }, parentCategory: 'top-level', order: 8 },
]

export default function ServicesCarousel({ heading, services }: ServicesCarouselProps) {
  const list = services.length > 0 ? services : FALLBACK_SERVICES
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="bg-[#f5f5f0] py-28 lg:py-36 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">

        <FadeUp>
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <span className="w-5 h-px bg-dark/30" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-dark/35 font-medium">Our Services</span>
            </div>
            <Link
              href="/graphic-design"
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] text-dark/30 hover:text-dark transition-colors"
            >
              View all <span className="text-[10px]">↗</span>
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2
            className="font-normal text-dark leading-[1.0] mb-16"
            style={{ fontSize: 'clamp(36px, 4.5vw, 64px)' }}
          >
            {heading || 'What We Do Best'}
          </h2>
        </FadeUp>

        <div className="border-t border-dark/[0.07]">
          {list.map((service, i) => {
            const href = service.parentCategory === 'top-level'
              ? `/${service.slug.current}`
              : `/services/${service.slug.current}`
            const isHovered = hovered === service._id
            const isAnyHovered = hovered !== null

            return (
              <motion.div
                key={service._id}
                onHoverStart={() => setHovered(service._id)}
                onHoverEnd={() => setHovered(null)}
                animate={{ opacity: isAnyHovered && !isHovered ? 0.35 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={href}
                  className="group flex items-center justify-between py-5 border-b border-dark/[0.07] transition-all"
                >
                  <div className="flex items-center gap-7 lg:gap-12">
                    <span className="text-[11px] text-dark/20 font-medium tabular-nums w-5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-normal text-dark transition-colors"
                      style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}
                    >
                      {service.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 lg:gap-10">
                    <span className="hidden md:block text-dark/30 text-[13px] max-w-[260px] line-clamp-1">
                      {service.shortDescription}
                    </span>
                    <div className="w-9 h-9 rounded-full border border-dark/10 flex items-center justify-center text-[11px] text-dark/30 shrink-0 transition-all duration-300 group-hover:bg-dark group-hover:border-dark group-hover:text-white group-hover:scale-110">
                      ↗
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

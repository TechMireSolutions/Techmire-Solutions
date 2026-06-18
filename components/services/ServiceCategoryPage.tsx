'use client'

import Link from 'next/link'
import FadeUp from '@/components/ui/FadeUp'
import type { Service } from '@/sanity/lib/types'

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
      <section className="bg-dark pt-36 pb-20 px-6 lg:px-10 border-b border-white/[0.06]">
        <div className="w-full">
          <FadeUp>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-orange" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">Our Services</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1
              className="font-normal text-white leading-[0.95]"
              style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}
            >
              {title}
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-white/40 text-[15px] mt-7 max-w-lg leading-relaxed">{intro}</p>
          </FadeUp>
        </div>
      </section>

      {/* Sub-services list */}
      <section className="bg-[#f5f5f0] py-24 px-6 lg:px-10">
        <div className="w-full">
          <FadeUp>
            <h2
              className="font-normal text-dark mb-12"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
            >
              {title} Services
            </h2>
          </FadeUp>

          {services.length > 0 ? (
            <div className="border-t border-dark/10">
              {services.map((service, i) => (
                <FadeUp key={service._id} delay={i * 0.04}>
                  <Link
                    href={`/services/${service.slug.current}`}
                    className="group flex items-center justify-between py-5 border-b border-dark/10 hover:border-dark/30 transition-colors"
                  >
                    <div className="flex items-center gap-6 lg:gap-10">
                      <span className="text-[12px] text-dark/20 font-medium w-6 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="font-normal text-dark group-hover:text-dark/60 transition-colors"
                        style={{ fontSize: 'clamp(18px, 2vw, 28px)' }}
                      >
                        {service.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="hidden md:block text-dark/30 text-[13px] max-w-xs line-clamp-1">
                        {service.shortDescription}
                      </span>
                      <span className="w-9 h-9 rounded-full border border-dark/10 group-hover:border-dark/40 group-hover:bg-dark group-hover:text-white flex items-center justify-center text-[12px] text-dark/40 transition-all shrink-0">
                        â†—
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          ) : (
            <p className="text-dark/40 text-[14px]">Services coming soon â€” manage via Sanity CMS.</p>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-dark py-20 px-6 lg:px-10 border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <FadeUp>
            <h2 className="font-normal text-white text-3xl">Ready to get started?</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-dark text-[14px] font-medium px-7 py-3.5 rounded-pill transition-colors shrink-0"
            >
              Get a Free Quote â†—
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  )
}

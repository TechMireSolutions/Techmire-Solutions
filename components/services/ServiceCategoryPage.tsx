'use client'

import Link from 'next/link'
import FadeUp from '@/components/ui/FadeUp'
import InnerPageHero from '@/components/ui/InnerPageHero'
import AnimatedText from '@/components/ui/AnimatedText'
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
      <InnerPageHero
        title={title}
        subtitle={intro}
        overline="Our Services"
      />

      {/* Sub-services list */}
      <section className="bg-light py-24 px-6 lg:px-10">
        <div className="w-full max-w-[1200px] mx-auto">
          <div style={{ fontSize: 'clamp(24px, 3vw, 40px)' }} className="mb-12">
            <AnimatedText
              el="h2"
              text={`${title} Services`}
              type="word"
              className="font-[200] text-dark"
            />
          </div>

          {services.length > 0 ? (
            <div className="border-t border-dark/10">
              {services.map((service, i) => (
                <FadeUp key={service._id} delay={i * 0.04}>
                  <Link
                    href={`/services/${service.slug.current}`}
                    className="group flex items-center justify-between py-6 lg:py-8 border-b border-dark/10 hover:border-dark/30 transition-colors"
                  >
                    <div className="flex items-center gap-6 lg:gap-10">
                      <span className="text-[12px] text-dark/20 font-medium w-6 shrink-0 transition-colors duration-400 group-hover:text-orange">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="font-[200] text-dark group-hover:text-orange transition-colors duration-400"
                        style={{ fontSize: 'clamp(20px, 2.5vw, 36px)' }}
                      >
                        {service.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="hidden md:block text-dark/40 text-[14px] font-light max-w-sm line-clamp-2">
                        {service.shortDescription}
                      </span>
                      <span className="w-10 h-10 rounded-full border border-dark/10 group-hover:border-orange group-hover:bg-orange group-hover:text-white flex items-center justify-center text-[12px] text-dark/40 transition-all duration-400 shrink-0">
                        ↗
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
      <section className="bg-light py-20 px-6 lg:px-10 border-t border-dark/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-[1200px] mx-auto">
          <div style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>
            <AnimatedText
              el="h2"
              text="Ready to get started?"
              type="word"
              className="font-[200] text-dark"
            />
          </div>
          <FadeUp delay={0.2}>
            <Link
              href="/get-a-quote"
              className="group inline-flex items-center gap-2 bg-dark hover:bg-orange text-white text-[13px] font-medium px-7 py-3.5 rounded-full transition-all duration-300 shrink-0"
            >
              Get a Free Quote
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  )
}

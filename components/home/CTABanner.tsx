'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, MoveRight } from 'lucide-react'
import FadeUp from '@/components/ui/FadeUp'
import MagneticButton from '@/components/ui/MagneticButton'
import AnimatedText from '@/components/ui/AnimatedText'
import type { HomepageData } from '@/sanity/lib/types'

export default function CTABanner({ data }: { data: HomepageData | null }) {
  return (
    <section className="bg-light py-28 lg:py-44 px-8 lg:px-16 overflow-hidden">

      <FadeUp>
        <div className="flex items-center gap-3 mb-14">
          <span className="w-4 h-px bg-dark/25" />
          <span className="text-[10.5px] uppercase tracking-[0.24em] text-dark/30 font-medium">Let's Work Together</span>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-28 items-end">

        <div style={{ fontSize: 'clamp(44px, 6.5vw, 96px)' }}>
          <AnimatedText
            el="h2"
            text={data?.ctaBannerHeading || "Let's build something extraordinary."}
            type="word"
            delay={0.1}
            className="font-[200] text-dark leading-[0.86] tracking-[-0.045em]"
          />
        </div>

        <div>
          <FadeUp delay={0.1}>
            <p className="text-dark/38 text-[14px] leading-[1.88] font-light max-w-sm">
              {data?.ctaBannerParagraph || "We're not here to sell you a package. We're here to build the future of your business. Ditch the off-the-shelf."}
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex items-center gap-6 mt-10">
              <MagneticButton
                href="/contact-us"
                className="group inline-flex items-center gap-2.5 bg-dark hover:bg-orange text-white text-[12.5px] font-medium px-7 py-3.5 min-h-[44px] rounded-full transition-all duration-300"
              >
                Contact Us
                <ArrowUpRight
                  aria-hidden
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </MagneticButton>

              <Link
                href="/get-a-quote"
                className="group inline-flex items-center gap-2.5 text-[12.5px] text-dark/32 hover:text-dark transition-colors duration-300 min-h-[44px]"
              >
                Get a quote
                <MoveRight
                  aria-hidden
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Decorative thin line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 lg:mt-28 h-px bg-dark/[0.07] origin-left"
      />
    </section>
  )
}

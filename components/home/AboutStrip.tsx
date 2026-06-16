'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import FadeUp from '@/components/ui/FadeUp'
import type { HomepageData } from '@/sanity/lib/types'

function Counter({ to, suffix = '' }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let frame = 0
    const total = 60
    const timer = setInterval(() => {
      frame++
      const progress = frame / total
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * to))
      if (frame >= total) { setCount(to); clearInterval(timer) }
    }, 20)
    return () => clearInterval(timer)
  }, [isInView, to])

  return <span ref={ref}>{count}{suffix}</span>
}

interface AboutStripProps { data: HomepageData | null }

export default function AboutStrip({ data }: AboutStripProps) {
  const stats = [
    { to: 4, suffix: '+', label: 'Years in business' },
    { to: 30, suffix: '+', label: 'Team members' },
    { to: 50, suffix: '+', label: 'Projects delivered' },
    { to: 20, suffix: '+', label: 'Happy clients' },
  ]

  return (
    <section className="bg-dark py-28 lg:py-36 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">

        <FadeUp>
          <div className="flex items-center gap-3 mb-14">
            <span className="w-5 h-px bg-orange/60" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/25 font-medium">About Us</span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <FadeUp>
              <h2
                className="font-normal text-white leading-[1.0]"
                style={{ fontSize: 'clamp(36px, 4.5vw, 64px)' }}
              >
                {data?.aboutHeading || "The Software House You Can Trust"}
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-white/35 text-[14.5px] leading-[1.9] mt-7 max-w-md">
                {data?.aboutParagraph || "At Techmire Solutions, we're on a mission to redefine what a Software House can do. From turning napkin sketches into full-blown apps to spearheading digital transformation."}
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 mt-10 text-[13px] text-white/30 hover:text-white border-b border-white/[0.08] hover:border-white/30 pb-px transition-all duration-300"
              >
                Read our story ↗
              </Link>
            </FadeUp>
          </div>

          {/* Stats grid with counters */}
          <div className="grid grid-cols-2 gap-px bg-white/[0.05] border border-white/[0.05]">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.08} className="bg-dark p-8 lg:p-10 group hover:bg-[#111] transition-colors duration-500">
                <p
                  className="font-normal text-white group-hover:text-orange transition-colors duration-500"
                  style={{ fontSize: 'clamp(40px, 4vw, 60px)', lineHeight: 1 }}
                >
                  <Counter to={stat.to} suffix={stat.suffix} />
                </p>
                <p className="text-white/25 text-[11px] uppercase tracking-[0.15em] mt-3">{stat.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
